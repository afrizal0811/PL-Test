import React, { Component, useState } from "react";
import QrReader from "modern-react-qr-reader";
import IconButton from "@material-ui/core/IconButton";
import QrCodeScannerIcon from "@material-ui/icons/QrCodeScanner";
import {
  InputAdornment,
  TextField,
  DialogActions,
  DialogTitle,
  Grid,
  Dialog,
  Link,
  Paper as MuiPaper,
  DialogContent,
  Button,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { Close } from "@material-ui/icons";
import Scanner from "./scanner";

const Paper = styled(MuiPaper)(spacing);

export default function QRScanner(props) {
  const [Result, setResult] = useState([]);
  const [delay, setdelay] = useState(500);
  const [scan, setscan] = useState(true);

  function handleScan(data) {
    console.log(data);
    if (data && data !== null) {
      setResult(data);
      setdelay(false);
      setscan(false);
    }
    // setResult(data);
  }

  function handleError(err) {
    console.log(err);
  }

  React.useEffect(() => {
    if (props.openScanner) {
      setscan(true);
    }
  }, [props.openScanner]);

  const _onDetected = (result) => {
    console.log(result);
    setResult(result.codeResult.code);
    setdelay(false);
    setscan(false);
  };

  return (
    <>
      <Dialog
        open={props.openScanner}
        onClose={() => props.setOpenScanner(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullWidth="true"
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
            {scan === true ? (
              <Paper variant="outlined" style={{ width: 280 }}>
                {/* <Scanner onDetected={_onDetected} /> */}
                <QrReader
                  // style={{ height: 240, width: 320 }}
                  onError={(e) => handleError(e)}
                  // legacyMode={true}
                  onScan={(e) => {
                    handleScan(e);
                  }}
                  delay={500}
                />
              </Paper>
            ) : (
              <>
                <p>Scan barcode.</p>
                <TextField
                  id="outlined-number"
                  fullWidth
                  value={Result == null ? " " : Result}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {scan === false ? (
            <Button
              onClick={() => {
                setResult([]);
                setdelay(500);
                setscan(true);
              }}
              color="warning"
              variant="contained"
            >
              Retry
            </Button>
          ) : null}
          <Button
            onClick={() => {
              props.setItem(Result);
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
