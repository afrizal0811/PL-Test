import { Close } from "@material-ui/icons";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { GetConfig } from "../../../../utils/ConfigHeader";

export default function QRScanner(props) {
  const { openScanner, setOpenScanner, setItem } = props;

  const [resultScanner, setResultScanner] = useState();
  const [data, setData] = useState([]);
  const [isScanActive, setIsScanActive] = useState(false);
  const [Loading, setLoading] = useState(false);

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=${id}`,
          !props.config ? GetConfig() : props.config
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setData(resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    if (openScanner) {
      setIsScanActive(true);
    }
  }, [openScanner]);

  return (
    <>
      <Dialog
        open={props.openScanner}
        onClose={() => props.setOpenScanner(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Scanner
          <IconButton
            aria-label="close"
            onClick={() => props.setOpenScanner(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <Close fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>
            {isScanActive ? (
              <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, res) => {
                  if (res) {
                    setResultScanner(res.getText());
                    getData(res.getText());
                    setIsScanActive(false);
                  }
                }}
              />
            ) : (
              <>
                <p>Scan barcode.</p>
                <TextField
                  id="outlined-number"
                  fullWidth
                  value={
                    Loading
                      ? ""
                      : data.length === 0
                      ? "Item tidak ditemukan"
                      : `${data[0]?.inventoryID} - ${data[0]?.description}`
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {!isScanActive ? (
            <Button
              onClick={() => {
                setResultScanner([]);
                setIsScanActive(true);
              }}
              color="warning"
              variant="contained"
            >
              Retry
            </Button>
          ) : null}
          <Button
            onClick={() => {
              if (data.length > 0) {
                props.setItem({
                  inventoryID: data[0].inventoryID,
                  description: data[0].description,
                });
              }
              props.setOpenScanner(false);
            }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
