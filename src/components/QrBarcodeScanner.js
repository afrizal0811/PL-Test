import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

/**
 *
 * @props
 * - openScanner : props for modal open
 * - setOpenScanner : props for set modal open
 * - onSuccess : callback when scan qr success. accept one params (result: string)
 * @returns
 */
const QrBarcodeScanner = (props) => {
  const { openScanner, setOpenScanner, onSuccess } = props;
  const [isScanActive, setIsScanActive] = useState(false);
  const [resultScanner, setResultScanner] = useState(null);

  const handleClickRetry = () => {
    setResultScanner(null);
    setIsScanActive(true);
  };

  useEffect(() => {
    if (openScanner) {
      setIsScanActive(true);
    } else {
      setIsScanActive(false);
    }
  }, [openScanner]);

  return (
    <>
      <Dialog
        open={openScanner}
        onClose={() => setOpenScanner(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          Scanner{" "}
          <IconButton
            aria-label="close"
            onClick={() => setOpenScanner(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <Close fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {isScanActive ? (
            <BarcodeScannerComponent
              width={500}
              height={500}
              onUpdate={(err, res) => {
                if (res) {
                  onSuccess(res.getText());
                  setResultScanner(res.getText());
                  setIsScanActive(false);
                }
              }}
            />
          ) : resultScanner ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: 4,
                width: 400,
              }}
            >
              <Typography>Result scan : {resultScanner}</Typography>
              <Button
                color="warning"
                variant="contained"
                onClick={handleClickRetry}
              >
                Retry
              </Button>
            </Box>
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QrBarcodeScanner;
