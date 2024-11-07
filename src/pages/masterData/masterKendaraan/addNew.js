import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker, TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Select,
  Tab,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const columnsDriver = [
  {
    field: "IDDriver",
    headerName: "ID Driver",
    width: 200,
  },
  {
    field: "NamaDriver",
    headerName: "Nama Driver",
    editable: false,
    width: 200,
  },
  {
    field: "Email",
    headerName: "Email",
    editable: false,
    width: 200,
  },
  {
    field: "Contact",
    headerName: "Contact",
    editable: false,
    width: 200,
  },
];

const rowsDriver = [
  {
    id: 1,
    IDDriver: "EP000001",
    NamaDriver: "Adil A",
    Email: "adil@panganglestari.com",
    Contact: "(+62)812-3456-7890",
  },
];

const columnsZona = [
  {
    field: "IDZona",
    headerName: "ID Zona",
    sortable: false,
    width: 200,
    renderCell: { renderSelectCell },
  },
  // {
  //   field: "NamaZona",
  //   headerName: "Nama Zona",
  //   sortable: false,
  //   editable: false,
  //   width: 200,
  // },
  // {
  //   field: "zonaLineRep",
  //   headerName: "Nama Kota",
  //   sortable: false,
  //   editable: false,
  //   width: 180,
  //   renderCell: (params) => (
  //     <>
  //       {params.row.ZonaLineRep.map((id) => (
  //         <>
  //           <span> {id.NamaKota},</span>
  //         </>
  //       ))}
  //     </>
  //   ),
  // },
];

const rowsZona = [
  {
    id: 1,
    IDZona: "Z000001",
    NamaZona: "Zona 1",
    NamaKota: "Jakarta Timur",
  },
  {
    id: 2,
    IDZona: "Z000002",
    NamaZona: "Zona 1",
    NamaKota: "Jakarta Barat",
  },
  {
    id: 3,
    IDZona: "Z000003",
    NamaZona: "Zona 1",
    NamaKota: "Jakarta Pusat",
  },
];

function useApiRef() {
  const apiRef = useRef(null);
  return { apiRef };
}

const SelectCell = (props) => {
  const { id, value, api, field } = props;
  const handleChange = React.useCallback(
    (event) => {
      const editProps = {
        value: String(event.target.value),
      };

      api.commitCellChange({ id, field, props: editProps });
      api.setCellMode(id, field, "view");
      event.stopPropagation();
    },
    [api, field, id]
  );

  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value={"Malang"}>Malang</MenuItem>
        <MenuItem value={"Surabaya"}>Surabaya</MenuItem>
        <MenuItem value={"Jember"}>Jember</MenuItem>
      </Select>
    </FormControl>
  );
};

export function renderSelectCell(params) {
  return <SelectCell {...params} />;
}

function Header() {
  const [loading, setLoading] = useState(false);
  const [StatusKendaraan, setStatusKendaraan] = useState("active");
  const history = useNavigate();
  const { id } = useParams();
  const [IDKendaraan, setIDKendaraan] = useState("");
  const [NamaKendaraan, setNamaKendaraan] = useState("");
  const [NoPolisi, setNoPolisi] = useState("");
  const [tabPanel, setTabPanel] = useState("1");
  const [pageSizeDriver, setPageSizeDriver] = useState(5);
  const [selectionDriver, setSelectionDriver] = useState(0);
  const [pageSizeZona, setPageSizeZona] = useState(5);
  const [selectionZona, setSelectionZona] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  const handleChangeStatus = (event) => {
    setStatusKendaraan(event.target.value);
  };

  const { refDriver, refZona } = useApiRef();

  const [TanggalRegister, setTanggalRegister] = useState(new Date());
  const [BeratKendaraan, setBeratKendaraan] = useState(0);
  const [KapasitasKendaraan, setKapasitasKendaraan] = useState(0);
  const [openAddDriver, setOpenAddDriver] = useState(false);
  const [openAddZona, setOpenAddZona] = useState(false);
  const [dataDriver, setDataDriver] = useState([]);
  const [dataZona, setDataZona] = useState([]);
  const [counterZona, setcounterZona] = React.useState(dataZona.length + 1);

  useEffect(() => {
    getDataDriver();
    // getDataZona();
    getDropdown();
  }, []);

  const handleClickZona = () => {
    // let idd = new Date().getTime() + Math.floor(Math.random() * 100);
    let idd = counterZona;
    setcounterZona(counterZona + 1);
    if (dataZona.length > 0) {
      refZona?.current?.updateRows([{ id: idd, isNew: true }]);
      refZona?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refZona?.current?.scrollToIndexes({
          rowIndex: refZona?.current?.getRowsCount() - 1,
        });

        refZona?.current?.setCellFocus(idd, "NamaKota");
      });
    } else {
      const detailData = {
        id: idd,
        NamaKota: "",
        _new: true,
      };
      const currentData = Array.from(dataZona);
      currentData.unshift(detailData);
      setDataZona(currentData);
      refZona?.current?.updateRows([{ id: idd, isNew: true }]);
      refZona?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refZona?.current?.scrollToIndexes({
          rowIndex: refZona?.current?.getRowsCount() - 1,
        });

        refZona?.current?.setCellFocus(idd, "IDZona");
      });
    }
  };

  const handleDouble = (e) => {
    const row = refZona.current.getRow(e.id);
    refZona.current.updateRows([{ ...row, isNew: false }]);
  };

  const getDataDriver = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/EmployeeReps",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data Driver = ", response);
          if (response.status === 200) {
            const resdata = response.data;
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                IDDriver: resdata[key].employeeID,
                NamaDriver: resdata[key].employeeName,
                Email: resdata[key].email,
                Contact: resdata[key].phone1,
              });
            });
            setDataDriver(newres);
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

  // const getDataZona = async () => {

  // };

  const getDropdown = async (props) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ZonaReps/DropDown/Zona",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data Zona = ", response);
          if (response.status === 200) {
            const resdata = response.data;
            const newdata = resdata.map((item, key) => {
              item.id = key;
              return item;
            });
            setDataZona(newdata);
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

  const handleSave = async () => {
    setLoading(true);
    try {
      const arrGeneral = [
        {
          beratKendaraan: BeratKendaraan,
          kapasitasKendaraan: KapasitasKendaraan,
          tanggalRegister: TanggalRegister,
        },
      ];
      // const arrDriver = await [...refDriver.current.getRowModels()].map(
      //   ([id, value]) => ({
      //     IDDriver: value.IDDriver,
      //     NamaDriver: value.NamaDriver,
      //     Email: value.Email,
      //     Contact: value.Contact,
      //   })
      // );
      // const arrZona = await [...refZona.current.getRowModels()].map(
      //   ([id, value]) => ({
      //     IDZona: value.IDZona,
      //     NamaZona: value.NamaZona,
      //     zonaLineRep: value.NamaKota,
      //   })
      // );
      const payload = {
        idKendaraan: IDKendaraan,
        namaKendaraan: NamaKendaraan,
        noPolisi: NoPolisi,
        statusKendaraan: StatusKendaraan,
        kendaraanGeneralLineRep: arrGeneral,
        // kendaraanDriverLineRep: arrDriver,
        // kendaraanZonaLineRep: arrZona,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/KendaraanReps/CreateMasterKendaraan",
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              window.location.href = `/master-data/update-kendaraan/${response.data.IDKendaraan}`;
            }, 800);
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

  const toolBar = () => {
    return (
      <GridToolbarContainer style={{ marginBottom: "-5px" }}>
        <Button color="primary" disableElevation onClick={handleClick}>
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Kendaraan
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} sm={12} xs={6}>
            <TextField
              name="IDKendaraan"
              label="ID Kendaraan"
              value={IDKendaraan}
              fullWidth
              variant="outlined"
              disabled={false}
              onChange={(e) => setIDKendaraan(e.target.value)}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="NamaKendaraan"
              label="Nama Kendaraan"
              value={NamaKendaraan}
              fullWidth
              variant="outlined"
              disabled={false}
              onChange={(e) => setNamaKendaraan(e.target.value)}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="NoPolisi"
              label="No Polisi"
              value={NoPolisi}
              fullWidth
              variant="outlined"
              disabled={false}
              onChange={(e) => setNoPolisi(e.target.value)}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <FormControl style={{ width: "100%", marginTop: "6px" }}>
              <InputLabel id="status-kendaraan">Status Kendaraan</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Status Kendaraan"
                value={StatusKendaraan}
                onChange={handleChangeStatus}
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <div style={{ border: "1px solid #0078d2", margin: "14px", flexGrow: 1 }}>
        <TabContext value={tabPanel}>
          <AppBar
            position="static"
            style={{ background: "#0078d2", color: "white" }}
          >
            <TabList
              onChange={handleChangeTab}
              aria-label="simple tabs example"
              style={{ color: "white" }}
            >
              <Tab
                label="General"
                value="1"
                style={{ color: tabPanel === 1 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Driver"
                value="2"
                style={{ color: tabPanel === 2 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Zona"
                value="3"
                style={{ color: tabPanel === 3 ? "white" : "#a7d2f0" }}
              />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <Paper>
              <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
                <Grid container spacing={6} md={6} mt={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="BeratKendaraan"
                      label="Berat Kendaraan (KG)"
                      value={BeratKendaraan}
                      fullWidth
                      variant="outlined"
                      disabled={false}
                      onChange={(e) => setBeratKendaraan(e.target.value)}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="KapasitasKendaraan"
                      label="Kapasitas Kendaraan (KG)"
                      value={KapasitasKendaraan}
                      fullWidth
                      variant="outlined"
                      disabled={false}
                      onChange={(e) => setKapasitasKendaraan(e.target.value)}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Tanggal Register"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputFormat={"dd/MM/yyyy"}
                      value={TanggalRegister}
                      onChange={(value) => {
                        setTanggalRegister(value);
                      }}
                      renderInput={(params) => (
                        <TextField fullWidth {...params} />
                      )}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </TabPanel>
          <TabPanel value="2">
            {loading ? (
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
                <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
                  <DataGrid
                    rowsPerPageOptions={[5, 10, 25]}
                    rows={dataDriver}
                    apiRef={refDriver}
                    columns={columnsDriver}
                    pageSize={pageSizeDriver}
                    onPageSizeChange={(newPageSize) =>
                      setPageSizeDriver(newPageSize)
                    }
                    components={{
                      Toolbar: () => {
                        return (
                          <GridToolbarContainer>
                            <Button
                              color="primary"
                              onClick={() => setOpenAddDriver(true)}
                              disableElevation
                            >
                              <span>
                                <AddIcon
                                  style={{
                                    height: "16px",
                                    verticalAlign: "sub",
                                  }}
                                />
                              </span>
                              Add
                            </Button>
                          </GridToolbarContainer>
                        );
                      },
                    }}
                    selectionModel={selectionDriver}
                    onSelectionModelChange={(selection) => {
                      setSelectionDriver(selection);
                    }}
                  />
                  <Dialog
                    open={openAddDriver}
                    onClose={() => setOpenAddDriver(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="sm"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Hello World! INI DI DRIVER
                      <IconButton
                        aria-label="close"
                        onClick={() => setOpenAddDriver(false)}
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "5px",
                        }}
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
                        Testing
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        // onClick={sendCekReject}
                        color="primary"
                        variant="contained"
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Paper>
            )}
          </TabPanel>
          <TabPanel value="3">
            {loading ? (
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
                <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
                  <DataGrid
                    rowsPerPageOptions={[5, 10, 25]}
                    rows={dataZona}
                    columns={columnsZona}
                    onCellDoubleClick={(e) => {
                      handleDouble(e);
                    }}
                    pageSize={pageSizeZona}
                    onPageSizeChange={(newPageSize) =>
                      setPageSizeZona(newPageSize)
                    }
                    components={{
                      Toolbar: toolBar,
                    }}
                    selectionModel={selectionZona}
                    onSelectionModelChange={(selection) => {
                      setSelectionZona(selection);
                    }}
                  />
                  <Dialog
                    open={openAddZona}
                    onClose={() => setOpenAddZona(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth={true}
                    maxWidth="sm"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Hello World! INI DI ZONA
                      <IconButton
                        aria-label="close"
                        onClick={() => setOpenAddZona(false)}
                        style={{
                          position: "absolute",
                          right: "5px",
                          top: "5px",
                        }}
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
                        Testing
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        // onClick={sendCekReject}
                        color="primary"
                        variant="contained"
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Paper>
            )}
          </TabPanel>
        </TabContext>
      </div>
      <Grid
        container
        spacing={6}
        md={12}
        mt={3}
        paddingLeft={8}
        paddingBottom={5}
      >
        <Button
          mr={2}
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save
        </Button>
      </Grid>
    </Card>
  );
}

function AddMasterKendaraan() {
  return (
    <React.Fragment>
      <Helmet title="Add Master Kendaraan" />
      <Typography variant="h3" gutterBottom display="inline">
        Add Master Kendaraan
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-kendaraan">
          Master Data Kendaraan
        </Link>
        <Typography>Add Master Kendaraan</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default AddMasterKendaraan;
