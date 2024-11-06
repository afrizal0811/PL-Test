import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CloseIcon from "@material-ui/icons/Close";

const Button = styled(MuiButton)(spacing);

export default function HapusUpdateDialog(props) {
  return (
    <Dialog
      open={props.openHapusUpdate}
      onClose={() => props.setOpenHapusUpdate(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="auto"
    >
      <DialogTitle id="alert-dialog-title">
        HAPUS (DAN UPDATE)
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenHapusUpdate(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ width: 1000, overflowX: "hidden" }}>
          <Header />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => props.setOpenHapusUpdate(false)}
          color="primary"
          variant="contained"
        >
          Hapus
        </Button>
        <Button
          onClick={() => props.setOpenHapusUpdate(false)}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
        <Button
          onClick={() => props.setOpenHapusUpdate(false)}
          color="primary"
          variant="contained"
        >
          Hapus & Update
        </Button>
        <Button
          onClick={() => props.setOpenHapusUpdate(false)}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
