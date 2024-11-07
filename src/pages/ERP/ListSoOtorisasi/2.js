import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Link,
  ListItem,
  ListItemText,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box, spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";

const Button = styled(MuiButton)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const customStyleTooltip = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

var selected = [];

const columns = [
  { field: "kodeCustomer", headerName: "Kode Customer", width: 200 },
  {
    field: "namaCustomer",
    headerName: "Nama Customer",
    width: 200,
    editable: false,
  },
  {
    field: "otorisasiAkhir",
    headerName: "Otorisasi Akhir",
    width: 200,
    editable: false,
  },
  {
    field: "ft",
    headerName: "FT",
    width: 150,
    editable: false,
  },
  {
    field: "tanggalFaktur",
    headerName: "Tanggal Faktur",
    width: 200,
    editable: false,
  },
  {
    field: "nilaiFaktur",
    headerName: "Nilai Faktur",
    width: 200,
    editable: false,
  },
  {
    field: "rencanaPiutang",
    headerName: "Rencana Piutang",
    width: 200,
    editable: false,
  },
  {
    field: "overDue",
    headerName: "Over Due",
    width: 200,
    editable: false,
  },
  {
    field: "lev",
    headerName: "Lev",
    width: 200,
    editable: false,
  },
  {
    field: "statusFaktur",
    headerName: "Status Faktur",
    width: 200,
    editable: false,
  },
  {
    field: "adminPiutang",
    headerName: "Admin Piutang",
    width: 200,
    editable: false,
    renderCell: (row) => (
      <Tooltip
        title={row.row.adminPiutang}
        arrow
        placement="top-end"
        TransitionComponent={Zoom}
      >
        <span style={customStyleTooltip}>{row.row.adminPiutang}</span>
      </Tooltip>
    ),
  },
  {
    field: "statusOtorisasi",
    headerName: "Status Otorisasi",
    width: 200,
    editable: false,
  },
  {
    field: "ketOtorisasi",
    headerName: "Ket. Otorisasi",
    width: 300,
    editable: false,
  },
  {
    field: "idOto",
    headerName: "ID Oto",
    width: 200,
    editable: false,
  },
  {
    field: "idListSOOtorisasi",
    headerName: "ID SO Otorisasi",
    width: 200,
    editable: false,
  },
  {
    field: "tglPengajuan",
    headerName: "Tgl Pengajuan",
    width: 200,
    editable: false,
  },
  {
    field: "tglDijawab",
    headerName: "Tgl Dijawab",
    width: 200,
    editable: false,
  },
  {
    field: "daftarFaktur",
    headerName: "Daftar Faktur",
    width: 200,
    editable: false,
    renderCell: (row) => (
      <Tooltip
        title={row.row.daftarFaktur}
        arrow
        placement="top-end"
        TransitionComponent={Zoom}
      >
        <span style={customStyleTooltip}>{row.row.daftarFaktur}</span>
      </Tooltip>
    ),
  },
  {
    field: "lastSync",
    headerName: "Last Sync",
    width: 200,
    editable: false,
  },
];

const columnsKeterangan = [
  { field: "batasPiutang", headerName: "Batas Piutang", width: 200 },
  {
    field: "umurJTTerlama",
    headerName: "Umur JT Terlama",
    width: 200,
    editable: false,
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
    editable: false,
  },
  {
    field: "totalPiutang",
    headerName: "Piutang (Total)",
    width: 200,
    editable: false,
  },
  {
    field: "umur030",
    headerName: "Umur 0-30",
    width: 200,
    editable: false,
  },
  {
    field: "umur3145",
    headerName: "Umur 31 - 45",
    width: 200,
    editable: false,
  },
  {
    field: "umur4660",
    headerName: "Umur 46 - 60",
    width: 200,
    editable: false,
  },
  {
    field: "umur60",
    headerName: "Umur > 60",
    width: 200,
    editable: false,
  },
  {
    field: "soMenunggu",
    headerName: "Menunggu",
    width: 200,
    editable: false,
  },
  {
    field: "uangMuka",
    headerName: "Uang Muka",
    width: 200,
    editable: false,
  },
];

const columnsFakturBelumLunas = [
  { field: "nomorFaktur", headerName: "Nomor Faktur", width: 200 },
  {
    field: "tglFaktur",
    headerName: "Tanggal Faktur",
    width: 200,
    editable: false,
  },
  {
    field: "hutang",
    headerName: "Hutang",
    width: 200,
    editable: false,
  },
  {
    field: "tglTT",
    headerName: "Tgl. TT",
    width: 200,
    editable: false,
  },
  {
    field: "ketTT",
    headerName: "Ket. TT",
    width: 200,
    editable: false,
  },
  {
    field: "keluar",
    headerName: "Keluar",
    width: 200,
    editable: false,
  },
];

// const rows = [
//   { id: 1, namaCustomer: "Snow", otorisasiAkhir: "Jon", ft: 35 },
//   {
//     id: 2,
//     namaCustomer: "Lannister",
//     otorisasiAkhir: "Cersei",
//     ft: 42,
//   },
//   {
//     id: 3,
//     namaCustomer: "Lannister",
//     otorisasiAkhir: "Jaime",
//     ft: 45,
//   },
//   {
//     id: 4,
//     namaCustomer: "Stark",
//     otorisasiAkhir: "Arya",
//     ft: 16,
//   },
//   {
//     id: 5,
//     namaCustomer: "Targaryen",
//     otorisasiAkhir: "Daenerys",
//     ft: null,
//   },
//   {
//     id: 6,
//     namaCustomer: "Melisandre",
//     otorisasiAkhir: null,
//     ft: 150,
//   },
// ];

function Header() {
  const [valueStart, setValueStart] = React.useState(new Date());
  const [valueEnd, setValueEnd] = React.useState(new Date());

  const [adminPiutang, setAdminPiutang] = React.useState({
    employeeID: "",
    employeeName: "All",
  });

  const [cbAdminPiutang, setCbAdminPiutang] = useState([]);

  const handleAdminPiutang = (event) => {
    setAdminPiutang(event.target.value);
  };

  const [approval, setApproval] = React.useState([]);

  const handleChangeApproval = (event) => {
    const {
      target: { value },
    } = event;
    setApproval(typeof value === "string" ? value.split(",") : value);
  };
  console.log(
    "ini dari approval state di dalam handlechangeapproval",
    approval
  );

  const [faktur, setFaktur] = React.useState("");

  const handleChangeFaktur = (event) => {
    setFaktur(event.target.value);
  };

  const FormControlSpacing = styled(MuiFormControl)(spacing);

  const FormControl = styled(FormControlSpacing)`
    min-width: 25vh;
  `;

  const [state, setState] = React.useState({
    termasukNol: false,
    pernahReject: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { termasukNol, pernahReject } = state;

  useEffect(() => {
    getCbAdminPiutang();
  }, []);

  const getCbAdminPiutang = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/ListSOOtorisasi/DropDown/EP/AdminPiutang",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status === 200 || response.status === 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push({
              employeeID: resdata[key].EmployeeID,
              employeeName: resdata[key].EmployeeName,
            });
          });
          setCbAdminPiutang(newres);
        }
      });
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  const statusApproval = [
    "Needs Approval",
    "Urgent",
    "Normal",
    "Printed",
    "Reject",
    "Approved",
    "Batal",
  ];

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <Grid item md={10} pr={2}>
                  <Autocomplete
                    displayEmpty
                    id="free-solo-2-demo"
                    value={adminPiutang}
                    onChange={(event, newValue) => {
                      setAdminPiutang(newValue);
                      console.log("ini dari oncahngenya piutang ", newValue);
                    }}
                    options={cbAdminPiutang}
                    getOptionLabel={(option) => option.employeeName}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option.employeeID} - {option.employeeName}
                      </Box>
                    )}
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Admin Piutang"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="Start Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={valueStart}
                  onChange={(value) => {
                    setValueStart(value);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="End Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={valueEnd}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(newValue) => {
                    setValueEnd(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Status Otorisasi
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Status Otorisasi"
                    multiple
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={approval}
                    onChange={handleChangeApproval}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {statusApproval.map((status) => (
                      <MenuItem key={status} value={status}>
                        <Checkbox checked={approval.indexOf(status) > -1} />
                        <ListItemText primary={status} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
              <Paper mt={3} mb={3}>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">
                    Status Faktur
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Status Faktur"
                    value={faktur}
                    onChange={handleChangeFaktur}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Semua"}>Semua</MenuItem>
                    <MenuItem value={"Diusulkan"}>Diusulkan</MenuItem>
                    <MenuItem value={"Diajukan"}>Diajukan</MenuItem>
                    <MenuItem value={"Diposting"}>Diposting</MenuItem>
                    {/* eslint-disable-next-line prettier/prettier */}
                    <MenuItem value={"Ditindaklanjuti"}>
                      Ditindaklanjuti
                    </MenuItem>
                  </Select>
                </FormControl>
              </Paper>
              <FormControl component="fieldset" variant="standard">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={termasukNol}
                        onChange={handleChange}
                        name="termasukNol"
                      />
                    }
                    label="Termasuk 0"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={pernahReject}
                        onChange={handleChange}
                        name="pernahReject"
                      />
                    }
                    label="Pernah Reject"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Detail
        adminPiutang={adminPiutang}
        startdate={valueStart}
        endDate={valueEnd}
        statusApproval={approval}
        statusfaktur={faktur}
        termasuk0={termasukNol}
        pernahReject={pernahReject}
      />
    </div>
  );
}

function Detail(props) {
  const [openKeterangan, setOpenKeterangan] = useState(false);
  const [openOtorisasi, setOpenOtorisasi] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const [openFaktur, setOpenFaktur] = useState(false);
  const handleClickFaktur = async () => {
    setOpenFaktur(!openFaktur);
    if (openFaktur) {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/GetKetFBL`,
          GetConfig()
        );
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Faktur ditutup", openFaktur);
    }
  };

  const [status, setStatus] = React.useState("");

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const [state, setState] = React.useState({
    lanjut: false,
  });

  const handleChangeLanjut = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    console.log("ini didalam onchangenya Lnajut", lanjut);
  };

  const { lanjut } = state;

  const FormControlSpacing = styled(MuiFormControl)(spacing);

  const FormControl = styled(FormControlSpacing)`
    min-width: 25vh;
  `;
  const [loading, setLoading] = useState(false);
  const [rows, setData] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [dataketerangan, setDataKeterangan] = useState([]);
  const [page, setPage] = React.useState(0);
  const prevSelectionModel = React.useRef(selectionModel);

  // function loadServerRows(page, rows) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(rows.slice(page * this.page, (page + 1) * this.page));
  //     }, Math.random() * 500 + 100);
  //   });
  // }

  useEffect(() => {
    getData();
    getCek(page);
  }, [props, page]);

  const getCek = async (page) => {
    setLoading(true);
    try {
      if (page === 0) {
        setData([
          {
            id: "d1",
            kodeCustomer: "G1435",
            namaCustomer: "Budi",
          },
          {
            id: "d2",
            kodeCustomer: "sss",
            namaCustomer: "jdjjd",
          },
          {
            id: "d3",
            kodeCustomer: "G14225",
            namaCustomer: "Riki",
          },
          {
            id: "d4",
            kodeCustomer: "G252",
            namaCustomer: "Sukini",
          },
          {
            id: "d5",
            kodeCustomer: "G36",
            namaCustomer: "Marpuah",
          },
        ]);
      } else {
        // getData();
      }
      setLoading(false);
      setTimeout(() => {
        setSelectionModel(prevSelectionModel.current);
      });
    } catch (error) {
      setLoading(false);
    }
  };

  const getData = async () => {
    var finalStartDate = moment(props.startdate).format("MM/DD/YYYY");
    var finalEndDate = moment(props.endDate).format("MM/DD/YYYY");

    var finalEmployeeID =
      props.adminPiutang.employeeID === null
        ? ""
        : props.adminPiutang.employeeID;
    var finalEmployeeName =
      props.adminPiutang.employeeName === "All"
        ? ""
        : props.adminPiutang.employeeName;
    var finalAdminPiutang = finalEmployeeID + "-" + finalEmployeeName;

    const params = {
      adminPiutang: finalAdminPiutang === "-" ? "" : finalAdminPiutang,
      startDate: finalStartDate === null ? "" : finalStartDate,
      endDate: finalEndDate === null ? "" : finalEndDate,
      statusApproval: props.statusApproval === null ? "" : props.statusApproval,
      statusFaktur: props.statusfaktur === "Semua" ? "" : props.statusfaktur,
      checkT0: props.termasuk0 === null ? "" : props.termasuk0,
      pernahReject: props.pernahReject === null ? "" : props.pernahReject,
    };

    // console.log("ini nyoba value dari piutang di params", finalAdminPiutang);

    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi`,
          { params },
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            let i = 0;
            const resdata = response.data;
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                kodeCustomer: resdata[key].Customer,
                namaCustomer: resdata[key].CustomerName,
                tanggalFaktur: moment(resdata[key].TanggalFaktur).format(
                  "MM/DD/YYYY"
                ),
                otorisasiAkhir: resdata[key].LastOtorisasi,
                ft: resdata[key].JumlahFaktur,
                nilaiFaktur: resdata[key].NilaiFaktur,
                rencanaPiutang: resdata[key].RencanaPiutang,
                overDue: resdata[key].Overdue,
                lev: resdata[key].LevelApproval,
                statusFaktur: resdata[key].Status,
                adminPiutang: resdata[key].AdmPiutang,
                statusOtorisasi: resdata[key].StatusOtorisasi,
                ketOtorisasi: resdata[key].KetOtorisasi,
                idOto: resdata[key].idOto,
                idListSOOtorisasi: resdata[key].IDListSOOtorisasi,
                tglPengajuan: resdata[key].TglPengajuan,
                tglDijawab: resdata[key].TglDijawab,
                daftarFaktur: resdata[key].DaftarFaktur,
                lastSync: moment(resdata[key].LastSync).format("MM/DD/YYYY"),
              });
            });
            setData(newres);
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

  async function dataKeteranganCall(params) {
    var dataUsed = params.shift();
    const data = {
      IDListSOOtorisasi: dataUsed.IDListSOOtorisasi,
      kodeCustomer: dataUsed.kodeCustomer,
    };

    const res = await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/KetSOOtorisasi?`,
        { data },
        GetConfig()
      )
      .then(function (response) {
        if (response.status === 200) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push({
              customer: resdata[key].customer,
              // idOto: idOto,
              batasPiutang: resdata[key].batasPiutang,
              umurJT: resdata[key].umurJT,
              topLock: resdata[key].topLock,
              topPrint: resdata[key].topPrint,
              piutangJT: resdata[key].piutangJT,
              piutangTotal: resdata[key].piutangTotal,
              umur: resdata[key].umur,
              umur2: resdata[key].umur2,
              umur3: resdata[key].umur3,
              umur4: resdata[key].umur4,
              soMenunggu: resdata[key].soMenunggu,
              apAdjust: resdata[key].apAdjust,
            });
          });
        }
      });
    console.log("ini didalam dataKeteranganCall ", selected);
  }

  async function sendKeterangan() {
    return console.log("sendKeterangan telah di trigger");
  }

  function handleSimpanKeterangan() {
    const data = {
      // IDListSOOtorisasi: IDListSOOtorisasi,
      // customerID: kodeCustomer,
      // keterangan: keteranganValue,
      // status: statusValue,
    };
    console.log("ini didalam handleSimpanKeterangan", selected);
    if (lanjut) {
      if (selected !== null) {
        dataKeteranganCall(selected);
      } else {
        sendKeterangan();
      }
    } else {
      sendKeterangan();
    }
  }

  const getDataKeterangan = () => {
    setOpenKeterangan(true);
    dataKeteranganCall(selected);
    console.log("ini didalam getDataKeterangan", selected);
  };

  const pengajuanConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda yakin akan melakukan pengajuan?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ajukan",
      })
      .then((result) => {
        if (result.value) {
          var listPengajuan = selected.map(function (obj) {
            return obj.IDListSOOtorisasi;
          });
          async function postPengajuan() {
            let res = await axios.post(
              `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/CreatePengajuan`,
              listPengajuan,
              GetConfig()
            );
            let data = res.data;
            console.log("ini respon dari server", data);
          }
          postPengajuan();
          console.log(
            "ini sweetalert confirm selected.IDListSOOtorisasi",
            listPengajuan
          );
        }
      });
  };

  const sendDelete = async () => {
    var dataUsed = [];
    Object.keys(selected).forEach(function (obj) {
      dataUsed.push({
        IDListSOOtorisasi: selected[obj].IDListSOOtorisasi,
        kodeCustomer: selected[obj].kodeCustomer,
      });
    });
    var data = JSON.stringify(dataUsed);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/BtnDelete`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setLoading(true);
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda yakin membatalkan pengajuan ini?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
      })
      .then((result) => {
        if (result.value) {
          sendDelete();
        }
      });
  };

  const refreshConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda Yakin Akan Merefresh?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Refresh",
      })
      .then((result) => {
        if (result.value) {
          getData();
        }
      });
  };

  const [pageSize, setPageSize] = React.useState(5);

  const sendCekReject = async () => {
    var dataUsed = [];
    Object.keys(selected).forEach(function (obj) {
      dataUsed.push({
        IDListSOOtorisasi: selected[obj].IDListSOOtorisasi,
        kodeCustomer: selected[obj].kodeCustomer,
      });
    });
    var data = JSON.stringify(dataUsed);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/BtnCekReject`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setLoading(true);
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenReject(false);
  };

  const sendOtorisasi = async () => {
    var dataUsed = [];
    Object.keys(selected).forEach(function (obj) {
      dataUsed.push({
        IDListSOOtorisasi: selected[obj].IDListSOOtorisasi,
        kodeCustomer: selected[obj].kodeCustomer,
      });
    });
    var data = JSON.stringify(dataUsed);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/BtnOtorisasi`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    setLoading(true);
    await axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    setOpenOtorisasi(false);
  };

  return (
    <Card mb={6} mt={0}>
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            checkboxSelection
            rowCount={rows.length}
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
              selected = [];
              newSelectionModel.forEach((element) => {
                selected.push({
                  IDListSOOtorisasi: rows[element].idListSOOtorisasi,
                  kodeCustomer: rows[element].kodeCustomer,
                  namaCustomer: rows[element].namaCustomer,
                  daftarFaktur: rows[element].daftarFaktur,
                  tanggalFaktur: rows[element].tanggalFaktur,
                });
              });
              console.log("ini didalam onchange", selected);
            }}
            selectionModel={selectionModel}
            onPageChange={(newPage) => {
              prevSelectionModel.current = selectionModel;
              setPage(newPage);
            }}
          />
        </div>
      </Paper>
      <CardContent>
        <Button
          mr={2}
          variant="contained"
          color="primary"
          onClick={getDataKeterangan}
        >
          Keterangan
        </Button>
        <Button
          mr={2}
          variant="contained"
          color="error"
          onClick={pengajuanConfirm}
        >
          Pengajuan
        </Button>
        <Button
          mr={2}
          variant="contained"
          color="warning"
          onClick={() => setOpenOtorisasi(true)}
        >
          Otorisasi
        </Button>
        <Button
          mr={2}
          variant="contained"
          color="success"
          onClick={() => setOpenReject(true)}
        >
          Cek Reject
        </Button>
        <Button mr={2} variant="outlined" color="error" onClick={deleteConfirm}>
          Delete
        </Button>
        <Button
          mr={2}
          variant="outlined"
          color="primary"
          onClick={refreshConfirm}
        >
          Refresh
        </Button>
      </CardContent>
      <Dialog
        open={openKeterangan}
        onClose={() => setOpenKeterangan(false)}
        aria-labelledby="form-dialog-title"
        fullWidth="true"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title" variant="h6">
          Keterangan
          <IconButton
            aria-label="close"
            onClick={() => setOpenKeterangan(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent></DialogContent>
        <Grid container spacing={12} mb={3}>
          <Grid item md={4} ml={6}>
            <Typography variant="subtitle1" gutterBottom mt={3}>
              Status
            </Typography>
            <Paper mt={3}>
              <FormControl>
                <Select
                  value={status}
                  onChange={handleChangeStatus}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>
                  <MenuItem value={"needs approval"}>Needs Approval</MenuItem>
                  <MenuItem value={"urgent"}>Urgent</MenuItem>
                  <MenuItem value={"normal"}>Normal</MenuItem>
                  <MenuItem value={"printed"}>Printed</MenuItem>
                  <MenuItem value={"reject"}>Reject</MenuItem>
                  <MenuItem value={"approved"}>Approved</MenuItem>
                  <MenuItem value={"batal"}>Batal</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Typography variant="subtitle1" gutterBottom mt={3}>
              Keterangan
            </Typography>
            <TextField
              id="outlined-multiline-static"
              margin="dense"
              fullwidth={true}
              multiline
              rows={3}
              variant="outlined"
              style={{ width: "100%" }}
            />
            {/* {console.log(
              "ini di dalam keterangan modal",
              this.refs.keteranganText.getValue()
            )} */}
          </Grid>
        </Grid>
        <Paper ml={6} mr={6}>
          <div style={{ height: 350, width: "100%" }}>
            <DataGrid
              ml={6}
              mr={6}
              rows={dataketerangan}
              columns={columnsKeterangan}
              disableSelectionOnClick
              rowsPerPageOptions={[]}
            />
          </div>
          <Button
            onClick={handleClickFaktur}
            color="error"
            variant="contained"
            mt={3}
            mb={3}
          >
            {openFaktur ? "Tutup Faktur Belum Lunas" : "Faktur Belum Lunas"}
          </Button>
          {openFaktur ? (
            <div style={{ height: 250, width: "100%" }}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 25]}
                pageSize={5}
                ml={6}
                mr={6}
                rows={rows}
                columns={columnsFakturBelumLunas}
              />
            </div>
          ) : null}
        </Paper>
        <Divider
          my={6}
          ml={6}
          mr={6}
          style={{
            height: "2px",
            border: "none",
            backgroundColor: "#bdbdbd",
          }}
        />
        <DialogActions>
          <FormControlLabel
            control={
              <Checkbox
                checked={lanjut}
                onChange={handleChangeLanjut}
                name="lanjut"
              />
            }
            label="Lanjut"
          />
          <Button
            onClick={handleSimpanKeterangan}
            color="primary"
            variant="contained"
          >
            Simpan
          </Button>
          <Button
            onClick={() => setOpenKeterangan(false)}
            color="primary"
            variant="outlined"
            mr={3}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openOtorisasi}
        onClose={() => setOpenOtorisasi(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {"Konfirmasi Otorisasi"}
          <IconButton
            aria-label="close"
            onClick={() => setOpenOtorisasi(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            variant="subtitle2"
            color="inherit"
          >
            Apakah saudara/i {"Admin"} akan mengotorisasi:
            {selected.map((obj) => {
              return (
                <div>
                  <ListItem margin="dense" color="inherit">
                    <ListItemText
                      style={{ position: "absolute", left: "0px", top: "2px" }}
                      variant="subtitle2"
                      margin="dense"
                      primary={"Kd. Cust: " + obj.kodeCustomer + ","}
                    />
                  </ListItem>
                  <ListItem margin="dense" color="inherit">
                    <ListItemText
                      style={{ position: "absolute", left: "0px", top: "2px" }}
                      variant="subtitle2"
                      margin="dense"
                      primary={"Nm. Cust: " + obj.namaCustomer + ","}
                    />
                  </ListItem>
                  <ListItem margin="dense" color="inherit">
                    <ListItemText
                      style={{ position: "absolute", left: "0px", top: "2px" }}
                      variant="subtitle2"
                      margin="dense"
                      primary={"No. Faktur: " + obj.daftarFaktur + ","}
                    />
                  </ListItem>
                  <ListItem margin="dense" color="inherit">
                    <ListItemText
                      style={{ position: "absolute", left: "0px", top: "2px" }}
                      variant="subtitle2"
                      margin="dense"
                      primary={"Tgl. Faktur: " + obj.tanggalFaktur}
                    />
                  </ListItem>
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenOtorisasi(false)}
            color="inherit"
            variant="contained"
          >
            No
          </Button>
          <Button onClick={sendOtorisasi} color="primary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openReject}
        onClose={() => setOpenReject(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {/* {"1" + " Dari 1 Customer Reject"} */}
          {`${selected.length} dari ${selected.length} Customer Reject`}
          <IconButton
            aria-label="close"
            onClick={() => setOpenReject(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selected.map((obj) => {
            return (
              <DialogContentText
                id="alert-dialog-description"
                variant="subtitle2"
                color="inherit"
              >
                {obj.IDListSOOtorisasi + "-" + obj.kodeCustomer}
              </DialogContentText>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={sendCekReject} color="primary" variant="contained">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

function ListSOOtorisasi() {
  return (
    <React.Fragment>
      <Helmet title="List SO Otorisasi" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/list-so-otorisasi">
          List SO Otorisasi
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        List SO Otorisasi
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ListSOOtorisasi;
