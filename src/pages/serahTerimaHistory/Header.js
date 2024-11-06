import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import QRScanner from "./scanner";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header(props) {
  const [ProcessOrderNbr, setProcessOrderNbr] = useState("");
  const [ProcessOrderDate, setProcessOrderDate] = useState(new Date());
  const [openScanner, setOpenScanner] = useState(false);

  const serahTerimaClick = () => {
    swal
      .fire({
        title: "Apakah yakin akan proses serah terima dokumen?",
        text: "Anda tidak bisa kembalikan proses ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, lanjutkan!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          props.setStatusSTHistory("Serah Terima");
          swal.fire("Berhasil!", "Telah diubah status.", "success");
        }
      });
  };

  const correctOrderClick = () => {
    swal
      .fire({
        title: "Apakah yakin akan correct order?",
        text: "Anda tidak bisa kembalikan proses ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, lanjutkan!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          props.setStatusSTHistory("Draft");
          swal.fire("Berhasil!", "Telah diubah status.", "success");
        }
      });
  };

  const getScanner = () => {
    setOpenScanner(true);
  };

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Button
            mr={2}
            variant="contained"
            color="primary"
            onClick={getScanner}
          >
            Scan
          </Button>
          <Button
            mr={2}
            variant="contained"
            color="success"
            disabled={props.checkedSerahTerima === true ? false : true}
            onClick={serahTerimaClick}
          >
            {console.log(
              "ini di checkedSerahTerima = ",
              props.checkedSerahTerima
            )}
            Serah Terima
          </Button>
          <Button
            mr={2}
            variant="contained"
            color="warning"
            disabled={props.StatusSTHistory === "Serah Terima" ? false : true}
            onClick={correctOrderClick}
          >
            Correct Order
          </Button>
          <Button mr={2} variant="contained" color="error">
            Report
          </Button>
        </CardContent>
        <Dialog
          open={openScanner}
          onClose={() => setOpenScanner(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth="true"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            Scanner
            <IconButton
              aria-label="close"
              onClick={() => setOpenScanner(false)}
              style={{ position: "absolute", right: "5px", top: "5px" }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <QRScanner />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenScanner(false)}
              color="primary"
              variant="contained"
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Process Order Ref. Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={ProcessOrderNbr}
                  onChange={(newValue) => {
                    setProcessOrderNbr(ProcessOrderNbr);
                  }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  id="outlined-helperText"
                  label="Status"
                  value={props.StatusSTHistory}
                  onChange={(newValue) => {
                    props.setStatusSTHistory(newValue);
                  }}
                />
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="Process Order Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={ProcessOrderDate}
                  onChange={(newValue) => {
                    setProcessOrderDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
