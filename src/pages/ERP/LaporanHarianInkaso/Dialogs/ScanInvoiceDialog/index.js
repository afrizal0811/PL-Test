import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const acquireValidationColor = (isScanSuccess) => {
  if (isScanSuccess) return "green";
  return "red";
};

const useStyles = (isScanSuccess) =>
  makeStyles((theme) => ({
    root: {
      "& .Mui-error": {
        color: acquireValidationColor(isScanSuccess),
      },
      "& .MuiFormHelperText-root": {
        color: acquireValidationColor(isScanSuccess),
      },
    },
  }));

export default function ScanInvoiceDialog({
  open,
  setOpen,
  setDataLhi,
  dataLhi,
}) {
  const [refNbrValue, setRefNbrValue] = React.useState(null);
  const [helperText, setHelperText] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isScanSuccess, setIsScanSuccess] = React.useState(false);

  const cleassesTextfield = useStyles(isScanSuccess)();

  const handleScan = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/ScanInvoice/${refNbrValue}`,
        GetConfig()
      );
      const isAlreadyAddedInPopup = data.some((data) =>
        response?.data[0]?.record
          .map((data) => data.referenceNbr)
          .includes(data.referenceNbr)
      );
      const isAlreadyAddedInDetail = dataLhi.some((data) =>
        response?.data[0]?.record
          .map((data) => data.referenceNbr)
          .includes(data.referenceNbr)
      );

      if (isAlreadyAddedInPopup || isAlreadyAddedInDetail) {
        setIsScanSuccess(false);
        setHelperText(`${refNbrValue} telah ditambahkan`);
      } else {
        setData([...data, ...response?.data[0]?.record]);
        setIsScanSuccess(true);
        setHelperText(`${refNbrValue} berhasil ditambahkan`);
      }
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data;
      setIsLoading(false);
      setIsScanSuccess(false);
      setHelperText(errorMessage);
    }
  };

  const handleClickAddToLHI = () => {
    setOpen(false);
    const newDataLHI = data.map((ae) => {
      return {
        ...ae,
      };
    });
    setDataLhi(newDataLHI);
  };

  const columns = [
    {
      field: "namaKolektorTagih",
      headerName: "Kolektor Tagih",
      flex: 1,
      minWidth: 440,
    },
    {
      field: "namaKolektorTT",
      headerName: "Kolektor TT",
      flex: 1,
      minWidth: 440,
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1,
      minWidth: 440,
    },
    {
      field: "orderNbr",
      headerName: "No. SO",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "referenceNbr",
      headerName: "No. Invoice",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : null,
    },
    {
      field: "tglJatuhTempo",
      headerName: "Invoice Due Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : null,
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
      minWidth: 120,
    },
  ];

  const handleRemove = () => {
    setData([]);
    setHelperText(null);
    setRefNbrValue(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        TAMBAH
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <CardContent>
              <form onSubmit={handleScan}>
                <Grid container spacing={4}>
                  <Grid item md={2}>
                    <TextField
                      label="Total Scanned"
                      fullWidth
                      value={data.length}
                      inputProps={{
                        readOnly: true,
                        disableUnderline: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      label="Scan Invoice"
                      fullWidth
                      value={refNbrValue ?? ""}
                      onChange={(e) => setRefNbrValue(e.target.value)}
                      helperText={helperText}
                      className={cleassesTextfield.root}
                    />
                  </Grid>
                  <Grid item>
                    <Button type="submit" color="primary" variant="contained">
                      Scan
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          <Card>
            {isLoading ? (
              <Grid
                container
                justifyContent="center"
                spacing={1}
                md={12}
                xs={12}
              >
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <CircularProgress
                    disableShrink
                    style={{ textAlign: "center" }}
                  />
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center">
                  <h1 style={{ textAlign: "center" }}>Loading</h1>
                </Grid>
                <Grid item xs={12} justifyContent="center" alignItems="center">
                  <Timer
                    active={true}
                    duration={null}
                    style={{ textAlign: "center", marginBottom: 20 }}
                  >
                    <Timecode />
                  </Timer>
                </Grid>
              </Grid>
            ) : (
              <Paper>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    <Button
                      color="primary"
                      variant="text"
                      disabled={data.length === 0}
                      onClick={handleRemove}
                    >
                      Remove
                    </Button>
                  </div>
                  <DataGrid
                    autoHeight
                    rows={data}
                    columns={columns}
                    disableColumnFilter
                    disableColumnMenu
                    density="compact"
                    getRowId={(row) => row.referenceNbr}
                  />
                </Box>
              </Paper>
            )}
          </Card>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClickAddToLHI}
          disabled={data.length === 0}
          color="primary"
          variant="contained"
        >
          Tutup & Masukkan ke LHI
        </Button>
        <Button
          onClick={() => setOpen(false)}
          color="primary"
          variant="outlined"
        >
          Keluar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
