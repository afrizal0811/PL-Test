import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { spacing } from "@material-ui/system";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import SelectPopup from "../../../../components/shared/SelectPopup";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";

const MuiTextField = styled(TextField)(spacing);

const NewItemPopup = (props) => {
  const [data, setData] = useState({});
  const [qty, setQty] = useState(0);
  const [apiUrl, setApiUrl] = useState(
    `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemNew`
  );
  const [inventoryPopup, setInventoryPopup] = useState(false);

  useEffect(() => {
    if (props.data?.FromWarehouseID) {
      setApiUrl(
        `${
          process.env.REACT_APP_DOMAIN_API
        }/StockItemReps/DropDown/StockItemNew?WarehouseID=${
          props?.data?.FromWarehouseID
        }&BranchID=${getBrach()}`
      );
    }
  }, [props]);

  const handleSubmit = () => {
    const newData = {
      InventoryID: data.inventoryID,
      UOM: data.uom,
      InventoryDescription: data.description,
      AdjusmentQty: qty,
      KuotaAvailable: 0,
    };
    props.setData(newData);
    setData({});
    setQty(0);
    props.setopen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setopen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{props.label}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mb={1} mt={1}>
            <Grid item md={6}>
              <TextField
                label="Inventory ID"
                value={data.inventoryID ? data.inventoryID : " "}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => {
                  setInventoryPopup(true);
                }}
              />
            </Grid>
            <Grid item md={4}>
              <NumberFormat
                label="Qty Adjustment"
                type="text"
                value={qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                customInput={MuiTextField}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                thousandsGroupStyle="thousand"
                fullWidth
                required
                displayType="input"
                thousandSeparator={true}
                allowNegative={false}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                label="UOM"
                value={data.uom ? data.uom : " "}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item md={12}>
              <TextField
                label="Description"
                value={data.description ? data.description : " "}
                fullWidth
                multiline
                disabled
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginTop: 5, marginBottom: 5 }}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!data.inventoryID || qty == 0}
          >
            Add & Close
          </Button>
          <Button
            onClick={() => {
              setData({});
              setQty(0);
              props.setopen(false);
            }}
            color="error"
            variant="contained"
            mr={3}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <SelectPopup
        open={inventoryPopup}
        name={"Inventory"}
        all
        api={apiUrl}
        searchParam="&inventoryID="
        config={GetConfig()}
        id={"inventoryID"}
        desc={"description"}
        setopen={(e) => {
          setInventoryPopup(e);
        }}
        widthFirstCol={200}
        widthSecondCol={650}
        Temp={data}
        setTemp={(e) => {
          setData({
            inventoryID: e.inventoryID,
            description: e.description,
            uom: e.uom,
          });
          // }
          console.log("e", e);
        }}
      />
    </React.Fragment>
  );
};

NewItemPopup.propTypes = {
  open: PropTypes.bool,
  label: PropTypes.string,
  setOpen: PropTypes.func,
};

NewItemPopup.defaultProps = {
  open: false,
  label: "",
};

export default NewItemPopup;
