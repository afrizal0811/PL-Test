import CloseIcon from "@material-ui/icons/Close";
import { spacing } from "@material-ui/system";
import {
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Button as MuiButton,
  Paper,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Button = styled(MuiButton)(spacing);

export default function TambahDIalog(props) {
  const [Data, setData] = useState([]);
  const [selectedLHI, setselectedLHI] = useState([]);
  const [customerValue, setCustomerValue] = React.useState("");
  const [RefNbr, setRefNbr] = useState("");
  const [soNbr, setSoNbr] = React.useState("");
  const [JatuhTempo, setJatuhTempo] = useState(true);
  const [creditmemo, setcreditmemo] = useState(false);
  const [widthrow, setwidthrow] = useState(440);
  const [Loading, setLoading] = useState(false);
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [isLoadingAddToLHI, setIsLoadingAddToLHI] = useState(false);

  const ColumnTambah = [
    {
      field: "kolektorTagih",
      headerName: "Kolektor TG",
      width: 115,
      sortable: false,
    },
    {
      field: "kolektorTT",
      headerName: "Kolektor TT",
      width: 115,
      sortable: false,
    },
    {
      field: "customerID",
      headerName: "Customer",
      width: widthrow,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <p>
            {params.value} - {params.row.customerName}
          </p>
        ) : (
          <></>
        ),
    },

    {
      field: "orderNbr",
      headerName: "No. SO",
      width: 130,
      sortable: false,
    },
    {
      field: "referenceNbr",
      headerName: "No. Invoice",
      width: 130,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      width: 130,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : (
          <></>
        ),
    },

    {
      field: "tglJatuhTempo",
      headerName: "Invoice Due Date",
      width: 130,
      sortable: false,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : (
          <></>
        ),
    },
    {
      field: "balance",
      headerName: "Hutang",
      width: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              value={params.value}
              displayType={"text"}
            />
          </>
        );
      },
    },
  ];

  const getData = async (page) => {
    setLoading(true);
    try {
      let payload = {
        page: page,
        rowsCount: pageSize,
        customer: customerValue,
        jatuhTempo: JatuhTempo,
        creditMemo: creditmemo,
        referenceNbr: [RefNbr],
        soNbr: soNbr,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/DataTambahLHI`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data[0];
            const newres = [];
            Object.keys(resdata.record).forEach(function (key) {
              newres.push({
                id: key,
                ...resdata.record[key],
              });
            });
            setData(
              newres.filter((bo) =>
                props.Data.every((ao) => ao.referenceNbr != bo.referenceNbr)
              )
            );
            let leng = 1;
            resdata.record.map((ae) => {
              if (leng <= ae.customerName.length) {
                leng = ae.customerName.length;
              }
              setwidthrow(leng * 7 + 120);
            });
            settotalPage(resdata.totalCountData);
            setselectedLHI([]);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log({ isLoadingAddToLHI });

  const handleClickAddToLHI = () => {
    setIsLoadingAddToLHI(true);
    props.setOpenTambah(false);
    const newDataLHI = selectedLHI.map((ae) => {
      return {
        ...ae,
        // UsrAdminPiutang: CustomerID?.AdminPiutangEmployeeID,
        // NamaAdminPiutang: CustomerID?.AdminPiutangEmployeeName,
        // AddressLine1: CustomerID?.AddressLine1,
      };
    });
    props.setDataTambah(newDataLHI);
    setIsLoadingAddToLHI(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData(1);
  };

  return (
    <>
      <Dialog
        open={props.openTambah}
        onClose={() => props.setOpenTambah(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
        // fullScreen
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          TAMBAH
          <IconButton
            aria-label="close"
            onClick={() => props.setOpenTambah(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Card mb={3}>
            <CardContent>
              <form onSubmit={handleSearch}>
                <Grid container spacing={4}>
                  <Grid item md={4}>
                    <TextField
                      label="Customer"
                      fullWidth
                      name="customer"
                      onChange={(e) => setCustomerValue(e.target.value)}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={JatuhTempo}
                          onChange={() => setJatuhTempo(!JatuhTempo)}
                        />
                      }
                      label="Tampilkan hanya yang jatuh tempo"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <TextField
                      fullWidth
                      name="soNbr"
                      label="No.SO"
                      value={soNbr ?? ""}
                      onChange={(e) => setSoNbr(e.target.value)}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={creditmemo}
                          onChange={() => setcreditmemo(!creditmemo)}
                        />
                      }
                      label="Credit Memo"
                    />
                  </Grid>
                  <Grid item md={2}>
                    <TextField
                      fullWidth
                      name="RefNbr"
                      label="No. Invoice"
                      value={RefNbr ?? ""}
                      onChange={(e) => setRefNbr(e.target.value)}
                    />
                  </Grid>
                  <Grid item md={4}>
                    <Button color="primary" variant="contained" type="submit">
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
          {/* <TambahManualTable /> */}
          <Card mb={6} mt={0}>
            {Loading ? (
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
                <div style={{ width: "100%" }}>
                  <DataGrid
                    rowsPerPageOptions={[5, 10, 15]}
                    rows={Data}
                    columns={ColumnTambah}
                    autoHeight
                    // getRowId={(ae) => ae.id}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    disableColumnFilter
                    disableColumnMenu
                    checkboxSelection
                    density="compact"
                    selectionModel={selectedLHI.map((a) => a.id)}
                    onSelectionModelChange={(e) => {
                      console.log(Data.filter((i) => e.includes(i.id)));
                      setselectedLHI(Data.filter((i) => e.includes(i.id)));
                    }}
                    rowCount={totalPage}
                    page={curretPage}
                    paginationMode="server"
                    pagination
                    onPageChange={(page) => {
                      setcurretPage(page);
                      getData(page + 1);
                      console.log("page = ", page);
                      // setselectedLHI([]);
                    }}
                  />
                </div>
              </Paper>
            )}
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickAddToLHI}
            disabled={selectedLHI.length <= 0 || isLoadingAddToLHI}
            color="primary"
            variant="contained"
          >
            Tutup & Masukkan ke LHI
          </Button>
          <Button
            onClick={() => props.setOpenTambah(false)}
            color="primary"
            variant="outlined"
          >
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
