import { Box, spacing } from "@material-ui/system";
import { Add, Delete, Refresh, Reply, Save } from "@mui/icons-material";
import { DatePicker, TabContext, TabPanel } from "@mui/lab";
import {
  Button,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  Paper as MuiPaper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import CbDataPG from "../../../components/shared/dropdownPG";
import { getBrach } from "../../../utils/jwt";
import AssignOrders from "./AssignOrders";
import columnRouting from "./columnRouting";
import DriverPopup from "./DriverPopup";
import KendaraanPopup from "./KendaraanPopup";
import PendingOrders from "./PendingOrders";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [Branch, setBranch] = useState(getBrach());
  const [TipeStorage, setTipeStorage] = useState("Dry");
  const [Zona, setZona] = useState("");
  const [RoutingDate, setRoutingDate] = useState(new Date());
  const [SearchText, setSearchText] = useState("");
  const [Vehicle, setVehicle] = useState("");

  const [openKendaraan, setopenKendaraan] = useState(false);

  const [selSO, setselSO] = useState([]);
  // const [openKendaraan, setopenKendaraan] = useState(false);

  const history = useNavigate();
  const [Panel, setPanel] = React.useState("2");
  const [dataEdit, setDataEdit] = useState("");
  const [openDriver, setOpenDriver] = React.useState(false);

  const [Data, setData] = useState([]);
  const [pageSize, setpageSize] = useState(5);
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);
  const [selKendaraan, setselKendaraan] = React.useState([]);

  // const handleCheckReqRouting = (event) => {
  //   setReqRouting(event.target.checked);
  // };

  const notifyConfirm = async () => {
    Swal.fire({
      title: `Konfirmasi Routing`,
      text: `${selKendaraan[0]?.VehicleID} - ${selKendaraan[0]?.VehicleName} dengan Nomor Polisi ${selKendaraan[0]?.NoPolisi}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.value) {
        // props.setselSO(selSO);
        // let a = Data.filter((ae) => ae.id == selKendaraan.id)
        const newdata = Data.map((item, i) => {
          if (selKendaraan[0].id === item.id) {
            item.Confirm = true;
            // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
          }
          return item;
        });
        setData(newdata);
      }
    });
  };

  function CustomToolbar() {
    return (
      <>
        <p
          style={{
            padding: 0,
            margin: 0,
            marginLeft: "15px",
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          Kendaraan
        </p>
        <GridToolbarContainer
          style={{ padding: 0, margin: 0, marginLeft: "5px" }}
        >
          <Button
            color="primary"
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              setopenKendaraan(!openKendaraan);
            }}
            mr={2}
            disableElevation
          >
            Tambah
          </Button>
          <Button
            color="primary"
            disabled={selKendaraan.length <= 0 ? true : false}
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              var c = Data.filter(function (objFromA) {
                return !selKendaraan.find(function (objFromB) {
                  return objFromA.id === objFromB.id;
                });
              });
              setData(c);
            }}
            mr={2}
            disableElevation
          >
            Remove
          </Button>
          <Button
            color="primary"
            disabled={
              selKendaraan.length <= 0 ||
              selKendaraan[0]?.Confirm == true ||
              selSO.length == 0
                ? true
                : false
            }
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              notifyConfirm();
            }}
            mr={2}
            disableElevation
          >
            Confirm
          </Button>
          <Button
            disabled={
              selKendaraan.length <= 0 || selKendaraan[0]?.Confirm == false
            }
            color="primary"
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              const newdata = Data.map((item, i) => {
                if (selKendaraan[0].id === item.id) {
                  item.Confirm = false;
                  // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
                }
                return item;
              });
              setData(newdata);
            }}
            mr={2}
            disableElevation
          >
            Unconfirm
          </Button>
          <Button
            disabled={
              selKendaraan.length <= 0 || selKendaraan[0]?.Confirm == true
            }
            color="primary"
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              setDataEdit(selKendaraan[0].id);
              setOpenDriver(true);
            }}
            mr={2}
            disableElevation
          >
            Change Driver
          </Button>
          {/* <GridToolbarExport /> */}
        </GridToolbarContainer>
      </>
    );
  }

  return (
    <div>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          onClick={() => history("/competitor-price-info")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            false
            // NoBPOM == "" || CPDate == "" || CPPrice == "" || CPLocation == ""
          }
          // onClick={() => notifySubmit()}
        >
          <Save />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          onClick={() => {
            window.location.replace("/competitor-price-info/add");
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          // disabled={id == undefined}
          // onClick={() => notifyConfirm(id)}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={3}>
        <CardContent>
          <Grid container md={12} spacing={4}>
            <Grid item md={4}>
              <TextField
                label="Branch"
                size="small"
                fullWidth
                value={Branch}
                onChange={(newValue) => {
                  setBranch(Branch);
                }}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-kendaraan">Storage Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  size="small"
                  label="Storage Type"
                  value={TipeStorage}
                  fullWidth
                  onChange={(e) => setTipeStorage(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Dry">Dry</MenuItem>
                  <MenuItem value="Frozen">Frozen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <DatePicker
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
                inputFormat={"dd/MM/yyyy"}
                fullWidth
                value={RoutingDate}
                onChange={(newValue) => {
                  setRoutingDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField size="small" fullWidth {...params} />
                )}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Vehicle ID"
                size="small"
                fullWidth
                value={Vehicle == "" ? " " : Vehicle}
                onChange={(e) => {
                  setVehicle(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={4}>
              <CbDataPG
                value={Zona == "" ? " " : `${Zona}`}
                defaultValue={Zona == "" ? " " : `${Zona}`}
                required
                size="small"
                // config={GetConfig()}
                // disabled={Loading}
                label="Shipping Zone"
                desc={"description"}
                // all
                source={`${process.env.REACT_APP_DOMAIN_API}/ShippingZoneSyncReps?page=1&rowsCount=100`}
                id="zoneID"
                onChange={(e) => {
                  setZona(e);
                  console.log("e", e);
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Search"
                size="small"
                fullWidth
                value={SearchText == "" ? " " : SearchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card mb={3} mt={0}>
        <Paper>
          <div style={{ width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              rows={Data}
              autoHeight
              getRowId={(ia) => ia.id}
              columns={columnRouting}
              disableColumnFilter
              disableColumnMenu
              density="compact"
              pageSize={pageSize}
              components={{
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                GridToolbar: {
                  printOptions: {
                    pageStyle:
                      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
                  },
                },
              }}
              onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
              // checkboxSelection
              selectionModel={selKendaraan.map((a) => a.id)}
              onSelectionModelChange={(e) => {
                setselKendaraan(Data.filter((i) => e.includes(i.id)));
                // setselKendaraan(
                //   e.map((a) => {
                //     Data.filter((aa) => aa.LaporanHarianInkasoGridRepID == a);
                //   })
                // );
              }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                // history(`detail/${params.row.nomerLHI}`);
              }}
              // onCellCLick={handleCellClick}
              // onRowCLick={handleRowClick}
              rowCount={totalPage}
              page={curretPage}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                setcurretPage(page);
                // getDataFilter(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      </Card>
      <Card mb={6} mt={0}>
        <p
          style={{
            padding: 0,
            margin: 0,
            marginLeft: "15px",
            marginTop: "15px",
            fontWeight: "bold",
          }}
        >
          Sales Order
        </p>
        <TabContext value={Panel}>
          <Box style={{ marginLeft: "5px" }}>
            <Button
              color="primary"
              onClick={() => {
                // history("/laporan-harian-inkaso/add");
                setPanel("1");
              }}
              mr={2}
              disabled={Panel == 1}
              // style={{
              //   color: Panel == 1 ? "white" : "#a7d2f0",
              //   // background: "#0078d2",
              // }}
              disableElevation
            >
              Assign Orders
            </Button>
            <Button
              color="primary"
              onClick={() => {
                // history("/laporan-harian-inkaso/add");
                setPanel("2");
              }}
              mr={2}
              disabled={Panel == 2}
              // style={{
              //   color: Panel == 2 ? "white" : "#a7d2f0",
              //   // background: "#0078d2",
              // }}
              disableElevation
            >
              Pending Orders
            </Button>
          </Box>
          <TabPanel value="1">
            <AssignOrders
              selKendaraan={selKendaraan}
              selSO={selSO}
              setselSO={(ae) => setselSO(ae)}
            />
            {/* Assign Orders */}
          </TabPanel>
          <TabPanel value="2">
            <PendingOrders
              selKendaraan={selKendaraan}
              setselSO={(ae) => setselSO(ae)}
            />
          </TabPanel>
        </TabContext>
      </Card>
      <KendaraanPopup
        openCust={openKendaraan}
        setopenCust={(e) => {
          setopenKendaraan(e);
        }}
        TempCustomer={Data}
        setTempCustomer={(e) => {
          // setData(e);
          let newdata = e.map((ae) => {
            return {
              id: ae.id,
              Kepemilikan: ae.Kepemilikan,
              RefNbrRouting: "",
              VehicleID: ae.IDKendaraan,
              VehicleName: ae.NamaKendaraan,
              NoPolisi: ae.NoPolisi,
              DriverName: ae.KendaraanDriverLineRep[0]?.NamaDriver,
              DriverID: ae.KendaraanDriverLineRep[0]?.IDDriver,
              HelperName: ae.KendaraanDriverLineRep[1]?.NamaDriver,
              HelperID: ae.KendaraanDriverLineRep[1]?.IDDriver,
              ShippingZone: ae.KendaraanZonaLineRep[0]?.ZoneID,
              TotalSO: "",
              QtyDelivWhole: "",
              QtyDelivLoose: "",
              PlanVolume: ae.KendaraanGeneralLineRep[0]?.KapasitasVolume,
              PlanWeight: ae.KendaraanGeneralLineRep[0]?.KapasitasWeight,
              ActualWeight: "",
              ActualVolume: "",
              ActualUtilWeight: "",
              ActualUtilVolume: "",
              DispatchDate: "",
              BatchNbr: "",
              Confirm: false,
            };
          });
          setData(newdata);
          console.log("cus", e);
        }}
      />
      <DriverPopup
        rowKend={Data}
        setrowKend={(e) => setData(e)}
        dataEdit={dataEdit}
        setDataEdit={(e) => setDataEdit(e)}
        openEdit={openDriver}
        setOpenEdit={(e) => setOpenDriver(e)}
      />
    </div>
  );
}
