import React, { useState } from "react";
// import FakturTabel from "./FakturTabel";
// import DetailFakturTabel from "./DetailFakturTabel";
import CloseIcon from "@material-ui/icons/Close";
import { spacing } from "@material-ui/system";
import {
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Button as MuiButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import styled from "styled-components/macro";
// import CbData from "../../../../../components/shared/dropdown";
import { Timer } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

const Button = styled(MuiButton)(spacing);

const columnsKeterangan = [
  {
    field: "creditLimit",
    headerName: "Batas Piutang",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "umurJT",
    headerName: "Umur JT Terlama",
    width: 200,
    editable: false,
    // renderCell: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  {
    field: "topLock",
    headerName: "Top Lock",
    width: 200,
    editable: false,
  },
  {
    field: "topPrint",
    headerName: "Top Print",
    width: 200,
    editable: false,
  },
  {
    field: "piutangJT",
    headerName: "Piutang Sudah JT",
    width: 200,
    type: "number",
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "piutangTotal",
    headerName: "Piutang (Total)",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "umur1",
    headerName: "Umur 0-30",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "umur2",
    headerName: "Umur 31 - 45",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "umur3",
    headerName: "Umur 46 - 60",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "umur4",
    headerName: "Umur > 60",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "soMenunggu",
    headerName: "Menunggu",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "apAdjust",
    headerName: "Uang Muka",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
];

const columnsFakturBelumLunas = [
  { field: "invoiceNbr", headerName: "Nomor Faktur", width: 190 },
  {
    field: "invoiceDate",
    headerName: "Tanggal Faktur",
    width: 200,
    editable: false,
    renderCell: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  {
    field: "curyDocBal",
    headerName: "Hutang",
    type: "number",
    width: 200,
    editable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "tglKembali",
    headerName: "Tgl. TT",
    width: 200,
    editable: false,
    renderCell: (params) =>
      params.value == "0001-01-01T00:00:00"
        ? ""
        : moment(params.value).format("DD-MM-YYYY"),
  },
  {
    field: "keterangan",
    headerName: "Ket. TT",
    width: 200,
    editable: false,
  },
  // {
  //   field: "keluar",
  //   headerName: "Keluar",
  //   width: 200,
  //   editable: false,
  // },
];

export default function KeteranganPopup(props) {
  console.log(props);
  const [StatusUrgen, setStatusUrgen] = useState(false);
  const [Batal, setBatal] = useState(false);
  const [Urgent, setUrgent] = useState(false);
  const [keterangan, setketerangan] = useState("");
  const [ReasonBatal, setReasonBatal] = useState("");
  // const [totalNominalJT, settotalNominalJT] = useState("");KetOtorisasi
  // const [jumlahBelumJT, setjumlahBelumJT] = useState("");
  // const [totalNominalBelumJT, settotalNominalBelumJT] = useState("");
  const [Detail, setDetail] = useState([]);
  const [DetailFBL, setDetailFBL] = useState([]);
  const [openFaktur, setopenFaktur] = useState(false);
  // const [DetailFaktur, setDetailFaktur] = useState([]);
  // const [Faktur, setFaktur] = useState({});
  const [Loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (props.openKeterangan && props.SelectedSO.length == 1) {
      getKeterangan(props.SelectedSO[0].IDListSOOtorisasi);
      setketerangan(props.SelectedSO[0].KetOtorisasi);
      setUrgent(
        props.SelectedSO[0]?.StatusOtorisasi == "Urgent" ? true : false
      );
      setBatal(props.SelectedSO[0]?.StatusOtorisasi == "Batal" ? true : false);
    }
    // console.log("selectedso", props.SelectedSO);
  }, [props.openKeterangan]);

  // React.useEffect(() => {
  //   if (openFaktur) {
  //     getFBL(props.SelectedSO[0].CustomerID);
  //   }
  // }, [openFaktur]);

  const handleSave = () => {
    Swal.fire({
      title: "Apakah Anda yakin akan menyimpan record ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Save",
    }).then((result) => {
      if (result.isConfirmed) {
        // deleteData(data[id].ScreenID);
        props.setopenKeterangan(false);
        SendKeterangan(
          props.SelectedSO[0].IDListSOOtorisasi,
          keterangan,
          Urgent,
          Batal,
          ReasonBatal
        );
      }
    });
  };

  const SendKeterangan = async (id, ket, urgent, batal, reason) => {
    try {
      setLoading(true);
      const res = await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/SimpanKeterangan?IDListSOOtorisasi=${id}&Keterangan=${ket}&batal=${batal}&urgent=${urgent}&reasonBatal=${reason}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204
          ) {
            NotifySuccess("success", "Data Telah Disimpan");
            setBatal(false);
            setUrgent(false);
            setReasonBatal("");
            setopenFaktur(false);
            setketerangan("");
            props.setopenKeterangan(false);
            props.getData();

            // console.log("ini respon dari server", data);
            // setTimeout(() => {
            //   window.location.href = `/master-data/master-kendaraan`;
            // }, 1000);
          } else {
            NotifyError(
              "There was an error!",
              `${response.status} - ${response.statusText}`
            );
            // console.log("ini respon dari server", response);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setBatal(false);
      setUrgent(false);
      setketerangan("");
      setReasonBatal("");
      setopenFaktur(false);
      setLoading(false);
      props.getData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKeterangan = async (id) => {
    try {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/KetSOOtorisasi?IDListSOOtorisasi=${id}`,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            let resp = response.data;
            const newdata = [resp].map((item, i) => {
              item.id = i;
              return item;
            });
            setDetail(newdata);

            setDetailFBL(
              response.data.fakturBelumLunas.filter(
                (ae) => ae.invoiceNbr !== "-"
              )
            );
            // setTimeout(() => {
            //   window.location.href = `/master-data/master-kendaraan`;
            // }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // const getFBL = async (cust) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios
  //       .get(
  //         `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/GetKetFBL?CustomerID=${cust}`
  //       )
  //       .then(function (response) {
  //         if (response.status == 200) {
  //           const resdata = response.data;
  //           console.log("res", resdata);
  //           // setData(resdata);
  //         }
  //       });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  // const handleClickFaktur = async () => {
  //   setopenFaktur(!openFaktur);
  //   if (openFaktur) {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/GetKetFBL`
  //       );
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   } else {
  //     console.log("Faktur ditutup", openFaktur);
  //   }
  // };

  return (
    <Dialog
      open={props.openKeterangan}
      sx={{ zIndex: 11, mt: 10 }}
      onClose={() => props.setopenKeterangan(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Keterangan
        <IconButton
          aria-label="close"
          onClick={() => props.setopenKeterangan(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={6} mb={3}>
          <Grid item md={4}>
            <Typography variant="subtitle1" gutterBottom mt={3}>
              Status Otorisasi
            </Typography>
            <Paper mt={3}>
              <FormControl>
                <FormGroup aria-label="position" row>
                  {/* <FormControlLabel
                    value={Urgent}
                    onChange={(e) => setUrgent(e.target.checked)}
                    control={<Checkbox />}
                    label="Urgent"
                    labelPlacement="end"
                  /> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Urgent}
                        onChange={(e) => setUrgent(e.target.checked)}
                        name="gilad"
                      />
                    }
                    label="Urgent"
                    disabled={
                      props.SelectedSO[0]?.StatusSO == "Di-posting" ||
                      props.SelectedSO[0]?.StatusSO == "Ditindaklanjuti"
                      // props.SelectedSO[0]?.StatusOtorisasi == "Urgent"
                    }
                  />
                  {/* <FormControlLabel
                    value={Batal}
                    disabled={
                      props.SelectedSO[0]?.StatusSO == "Diajukan" ||
                      props.SelectedSO[0]?.StatusOtorisasi == "Urgent"
                    }
                    onChange={(e) => setBatal(e.target.checked)}
                    control={<Checkbox />}
                    label="Batal"
                    labelPlacement="end"
                  /> */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Batal}
                        onChange={(e) => setBatal(e.target.checked)}
                        name="gilad"
                      />
                    }
                    label="Batal"
                    disabled={
                      props.SelectedSO[0]?.StatusSO == "Di-posting" ||
                      props.SelectedSO[0]?.StatusSO == "Ditindaklanjuti"
                      // props.SelectedSO[0]?.StatusOtorisasi == "Urgent"
                    }
                  />
                </FormGroup>
              </FormControl>
            </Paper>
            {Batal == true ? (
              <>
                <Paper mt={4}>
                  <TextField
                    label="Reason Batal"
                    type="text"
                    value={ReasonBatal}
                    onChange={(e) => {
                      setReasonBatal(e.target.value);
                    }}
                    style={{ width: "100%" }}
                  />
                </Paper>
              </>
            ) : (
              ""
            )}
          </Grid>
          <Grid item md={6}>
            <Typography variant="subtitle1" gutterBottom mt={3}>
              Keterangan
            </Typography>
            <TextField
              id="outlined-multiline-static"
              margin="dense"
              fullwidth={true}
              value={keterangan}
              onChange={(e) => setketerangan(e.target.value)}
              multiline
              rows={3}
              variant="outlined"
              style={{ width: "100%" }}
              disabled={
                props.SelectedSO[0]?.StatusSO == "Di-posting" ||
                props.SelectedSO[0]?.StatusSO == "Ditindaklanjuti"
              }
            />
          </Grid>
        </Grid>
        <Grid container>
          {Loading ? (
            <Grid container justifyContent="center" DCacing={1} md={12} xs={12}>
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
                ></Timer>
              </Grid>
            </Grid>
          ) : (
            <div style={{ height: 135, width: "100%" }}>
              <DataGrid
                rows={Detail}
                columns={columnsKeterangan}
                density="compact"
                disableSelectionOnClick
                pageSize={2}
                hideFooter
                // rowsPerPageOptions={[]}
              />
            </div>
          )}
          <Button
            onClick={() => setopenFaktur(!openFaktur)}
            color="error"
            variant="contained"
            mt={3}
            mb={3}
          >
            {openFaktur ? "Tutup Faktur Belum Lunas" : "Faktur Belum Lunas"}
          </Button>
          {openFaktur ? (
            Loading ? (
              <Grid
                container
                justifyContent="center"
                DCacing={1}
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
                  ></Timer>
                </Grid>
              </Grid>
            ) : (
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  density="compact"
                  hideFooter
                  getRowId={(row) => row.invoiceNbr}
                  rows={DetailFBL}
                  columns={columnsFakturBelumLunas}
                />
              </div>
            )
          ) : null}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleSave()}
          disabled={keterangan == "" || !props.SelectedSO[0]?.CustomerID}
          color="primary"
          variant="contained"
        >
          Simpan
        </Button>
        <Button
          onClick={() => {
            setUrgent(false);
            setBatal(false);
            setReasonBatal("");
            setopenFaktur(false);
            setketerangan("");
            props.setopenKeterangan(false);
          }}
          color="primary"
          variant="outlined"
          mr={3}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
