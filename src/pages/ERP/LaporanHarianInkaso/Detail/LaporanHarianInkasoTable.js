import { Add, Clear, Refresh, Reply, Save } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/lab";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Paper as MuiPaper,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Search } from "react-feather";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader";
import SelectPopup from "../../../../components/shared/SelectPopup";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  getBrach,
  getEmployee,
  getEmployeeName,
  getRoleName,
} from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import GantiKolektorDialog from "../Dialogs/GantiKolektorDialog";
import HapusUpdateDialog from "../Dialogs/HapusUpdateDialog";
import OtomatisDialog from "../Dialogs/OtomatisDialog";
import ScanInvoiceDialog from "../Dialogs/ScanInvoiceDialog";
import StatusTTDialog from "../Dialogs/StatusTTDialog";
import TambahDialog from "../Dialogs/TambahDialog";
import columnLHIDetail from "./columnLHI";

// const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function LHITabelDet(props) {
  const [Data, setData] = useState([]);
  const [selectedLHI, setselectedLHI] = useState([]);
  const [BranchID, setBranchID] = useState(getBrach());
  const [status, setstatus] = useState("Draft");
  const [TimeReceived, setTimeReceived] = useState(null);
  const [TglPenagihan, setTglPenagihan] = useState(new Date());
  const [AdminPiutang, setAdminPiutang] = useState(
    getRoleName() === "Super Admin"
      ? ""
      : {
          employeeID: getEmployee(),
          employeeName: getEmployeeName(),
        }
  );
  const [Amount, setAmount] = useState(0);
  const mounted = useRef();
  const { id } = useParams();
  const history = useNavigate();

  const [openAP, setOpenAP] = useState(false);
  const [openOtomatis, setOpenOtomatis] = useState(false);
  const [openTambah, setOpenTambah] = useState(false);
  const [openHapusUpdate, setOpenHapusUpdate] = useState(false);
  const [openGantiKolektor, setOpenGantiKolektor] = useState(false);
  const [openStatusTT, setOpenStatusTT] = useState(false);
  const [openScanInvoice, setOpenScanInvoice] = useState(false);

  const [Loading, setLoading] = React.useState(false);
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  const [MoreBtn, setMoreBtn] = React.useState(false);
  const open = Boolean(MoreBtn);
  const idPopover = open ? "simple-popover" : undefined;
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
    if (id != undefined) {
      getData(id);
    } else {
      // setstatus("Draft");
    }
  }, []);

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/LaporanHarianInkasoDetailReps?rowsCount=1&nomorLHI=${page}`,
          GetConfig()
        )
        .then(async function (response) {
          console.log("res", response);
          if (response.status === 200) {
            const resdata = response.data.record;
            setBranchID(resdata.branchID);
            // const adminPiutangName = ;
            setAdminPiutang({
              employeeID: resdata.usrAdminPiutang,
              employeeName: await getDefaultValueAdminPiutang(
                resdata.usrAdminPiutang
              ),
            });
            // setAmount(resdata.BalanceTotal);
            setTglPenagihan(resdata.tglPenagihan);
            setTimeReceived(
              !!resdata.timeReceived ? resdata.timeReceived : null
            );
            setstatus(
              !!resdata.ketStatusKembali ? resdata.ketStatusKembali : "Draft"
            );
            const newres = resdata.grid.map((ae, key) => {
              return { id: key, ...ae };
            });
            setAmount(resdata.balance);
            console.log("newres", newres);
            setData(newres);
            setLoading(false);
          }
        });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const onSumbitHandler = async (dt, statuss) => {
    const payload = {
      // refNbr: RefNbr,
      nomorLHI: id,
      branchID: getBrach(),
      usrAdminPiutang: AdminPiutang.employeeID,
      namaAdminPiutang: AdminPiutang.EmployeeName,
      tglPenagihan: moment(TglPenagihan).format("MM-DD-YYYY"),
      // ketStatusKembali: status,
      timeReceived:
        TimeReceived !== null ? moment(TimeReceived).format("MM-DD-YYYY") : "",
      // balanceTotal: Amount,
      // laporanHarianInkasoGridRep: dt,

      // request dari BE, untuk kirim null di custhariTT dan CustHariTagih
      laporanHarianInkasoGridRep: dt.map((ae) => {
        return {
          ...ae,
          custHariTT: 0,
          custHariTagih: null,
        };
      }),
    };
    if (id == undefined) {
      createData({
        ...payload,
        ketStatusKembali: "Draft",
        // createdByID: getEmployee(),
      });
      // console.log(payload);
    } else {
      editData({
        ...payload,
        ketStatusKembali: !!statuss ? statuss : status,
      });
    }
  };

  const createData = async (payload) => {
    setLoading(true);
    try {
      console.log(payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/LaporanHarianInkasoReps/CreateLaporanHarianInkaso",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah Disimpan");
            setTimeout(() => {
              window.location.href = `/laporan-harian-inkaso/detail/${response.data.NomorLHI}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const editData = async (payload) => {
    setLoading(true);
    try {
      console.log(payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/LaporanHarianInkasoReps/UpdateLaporanHarianInkaso",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (
            response.status === 200 ||
            response.status == 201 ||
            response.status == 204
          ) {
            NotifySuccess("success", "Data Telah Dirubah");
            setTimeout(() => {
              window.location.href = `/laporan-harian-inkaso/detail/${id}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const notifyConfirmSave = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        onSumbitHandler(Data);
      }
    });
  };

  const notifyConfirmOpen = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        onSumbitHandler(Data, "Open");
      }
    });
  };

  const notifyConfirmClose = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        onSumbitHandler(Data, "Closed");
      }
    });
  };

  const notifyConfirmDelete = async () => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        console.log("ini di swal delete, result = ", result);
        console.log("ini di swal delete, id = ", id);
        var c = Data.filter(function (objFromA) {
          return !selectedLHI.find(function (objFromB) {
            return objFromA.id === objFromB.id;
          });
        });
        setData(c);
        setMoreBtn(false);
        if (!!id && c.length > 0) onSumbitHandler(c);
      }
    });
  };

  const getDefaultValueAdminPiutang = async (employeeID) => {
    if (!id) return;
    const res = await axios.get(
      `${
        process.env.REACT_APP_DOMAIN_API
      }/EmployeeReps/DropDown/EmployeeIsAdminPiutang?branchID=${getBrach()}`,
      GetConfig()
    );
    const defaultValue =
      res.data.find((data) => data.employeeID === employeeID)?.employeeName ??
      "";
    return defaultValue;
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => history("/laporan-harian-inkaso")}
        >
          <Reply />
        </IconButton>
        <IconButton
          disabled={
            AdminPiutang == "" ||
            !AdminPiutang ||
            Loading ||
            status == "Closed" ||
            Data.length == 0
          }
          component="span"
          onClick={notifyConfirmSave}
        >
          <Save />
        </IconButton>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => {
            history("/laporan-harian-inkaso/add");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <Button
          component="span"
          disabled={status !== "Draft" || Data.length == 0 || Loading}
          style={{
            color:
              status !== "Draft" || Data.length == 0 ? grey[400] : grey[700],
          }}
          onClick={notifyConfirmOpen}
        >
          Open
        </Button>
        <Button
          component="span"
          // disabled={Loading}
          disabled={
            status !== "On Progress" ||
            Data.filter((ae) => ae.balance > 0 && !ae.keterangan).length != 0 ||
            Loading
          }
          style={{
            color:
              status !== "On Progress" ||
              Data.filter((ae) => ae.balance > 0 && !ae.keterangan).length != 0
                ? grey[400]
                : grey[700],
          }}
          onClick={notifyConfirmClose}
        >
          Close
        </Button>
        <IconButton
          component="span"
          aria-describedby={"simple-popover"}
          disabled={Loading}
          onClick={(e) => {
            setMoreBtn(!MoreBtn);
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreHorizontal />
        </IconButton>
        <Popover
          id={"simple-popover"}
          sx={{ zIndex: 8 }}
          open={MoreBtn}
          anchorEl={anchorEl}
          onClose={(e) => setMoreBtn(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div style={{ border: "1px solid", width: "300px" }}>
            <Grid container md={12}>
              <Grid item md={6} spacing={3}>
                <Typography variant="h5" p={2}>
                  Insert
                </Typography>
                <Button
                  onClick={() => {
                    setOpenOtomatis(true);
                    setMoreBtn(false);
                  }}
                  disabled={status != "Draft"}
                >
                  Otomatis
                </Button>
                <br />
                <Button
                  disabled={status != "Draft"}
                  onClick={() => {
                    setOpenTambah(true);
                    setMoreBtn(false);
                  }}
                >
                  Tambah
                </Button>
                <br />
                <Button
                  onClick={() => {
                    setOpenScanInvoice(true);
                    setMoreBtn(false);
                  }}
                >
                  Scan Invoice
                </Button>
                <br />
              </Grid>
              <Grid item md={6}>
                <Typography variant="h5" p={2}>
                  Modify
                </Typography>
                <Button
                  disabled={selectedLHI.length == 0 || status != "Draft"}
                  onClick={() => {
                    notifyConfirmDelete();
                  }}
                >
                  Hapus
                </Button>
                <br />
                <Button
                  disabled={selectedLHI.length === 0 || status != "Draft"}
                  onClick={() => {
                    setOpenGantiKolektor(true);
                    setMoreBtn(false);
                  }}
                >
                  Ganti Kolektor
                </Button>
                <br />
                <Button
                  disabled={selectedLHI.length === 0}
                  onClick={() => {
                    // setopenReject(true);
                    setOpenStatusTT(true);
                    setMoreBtn(false);
                  }}
                >
                  Status
                </Button>
              </Grid>
            </Grid>
          </div>
        </Popover>
      </Grid>

      <Card mb={6}>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  fullWidth
                  label="No. LHI"
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled={Loading}
                  value={id !== undefined ? id : " "}
                  // onChange={(newValue) => {
                  //   setBranchID(BranchID);
                  // }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  label="Branch"
                  disabled={Loading}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  // disabled
                  value={!!BranchID ? BranchID : " "}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Admin Piutang"
                  fullWidth
                  required
                  disabled={Loading}
                  color={!!AdminPiutang ? "" : "warning"}
                  focused={!!AdminPiutang ? false : true}
                  InputProps={{
                    endAdornment:
                      (getRoleName() === "Super Admin" && status === "Draft") ||
                      (getRoleName() === "Supervisor AR" &&
                        status === "Draft") ? (
                        <InputAdornment>
                          {AdminPiutang ? (
                            <>
                              <IconButton
                                onClick={() => setAdminPiutang("")}
                                // disabled={Loading}
                              >
                                <Clear />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <IconButton
                                onClick={() => setOpenAP(true)}
                                // disabled={Loading}
                              >
                                <Search />
                              </IconButton>
                            </>
                          )}
                        </InputAdornment>
                      ) : (
                        ""
                      ),
                  }}
                  value={
                    AdminPiutang.employeeID ? AdminPiutang.employeeName : " "
                  }
                />
              </Paper>
              <Paper mt={3}>
                <DesktopDatePicker
                  label="Tanggal Penagihan"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  disabled={Loading || status === "Closed"}
                  value={TglPenagihan}
                  onChange={(newValue) => {
                    setTglPenagihan(newValue);
                    console.log(newValue);
                  }}
                  // readOnly
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      disabled={Loading || status === "Closed"}
                      {...params}
                    />
                  )}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Status"
                  disabled={Loading}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  // disabled
                  value={!!status ? status : " "}
                />
              </Paper>
              <Paper mt={3}>
                <DesktopDatePicker
                  label="Date Time Received by Collector"
                  value={TimeReceived}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                  // onChange={(newValue) => {
                  //   setTglPenagihan(newValue);
                  // }}
                  inputFormat={"dd/MM/yyyy"}
                  readOnly
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      disabled={Loading}
                      label="Date Time Received by Collector"
                      InputLabelProps={{
                        shrink: true,
                        readOnly: true,
                      }}
                      value={TimeReceived == null ? " " : TimeReceived}
                      {...params}
                    />
                  )}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  disabled={Loading}
                  fullWidth
                  // required
                  inputProps={{
                    readOnly: true,
                  }}
                  // disabled
                  label="Amount"
                  value={Amount}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  // onChange={(e) => setAmount(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      <Card mb={6}>
        {Loading ? (
          <Loader />
        ) : (
          <Paper>
            <div style={{ width: "100%" }}>
              <DataGrid
                // rowsPerPageOptions={[5, 10, 25]}
                rows={Data}
                disableSelectionOnClick={
                  Loading || status === "Closed" ? true : false
                }
                autoHeight
                getRowId={(ia) => ia.id}
                columns={columnLHIDetail}
                // disableColumnFilter
                // disableColumnMenu
                density="compact"
                // pageSize={5}
                checkboxSelection={
                  Loading || status === "Closed" ? false : true
                }
                selectionModel={selectedLHI.map((a) => a.id)}
                onSelectionModelChange={(e) => {
                  console.log(Data.filter((i) => e.includes(i.id)));
                  setselectedLHI(Data.filter((i) => e.includes(i.id)));
                }}
                // onCellCLick={handleCellClick}
                // onRowCLick={handleRowClick}
              />
            </div>
          </Paper>
        )}
      </Card>
      <OtomatisDialog
        openOtomatis={openOtomatis}
        setOpenOtomatis={setOpenOtomatis}
        Data={Data}
        AdminPiutang={AdminPiutang}
        tanggalLHI={TglPenagihan}
        setDataTambah={(e) => {
          console.log("data tambah", e);
          setData(
            Data.concat(
              e.map((value, index) => ({
                ...value,
                nomorLHI: id != undefined ? id : "",
                tglPenagihan: TglPenagihan,
                tglFaktur: value.date,
                usrKolektor: value.kolektorTagih,
                namaKolektor: value.namaKolektorTagih,
                // addressLine1: value.AddressLine1,
                // baru: true,
                // tglPenagihan: !!id ? id : "",
                id:
                  "id" +
                  new Date().getTime() +
                  Math.floor(Math.random() * 123) +
                  index +
                  Math.random().toString(16).slice(2),
              }))
            )
          );
        }}
      />
      <HapusUpdateDialog
        openHapusUpdate={openHapusUpdate}
        setOpenHapusUpdate={setOpenHapusUpdate}
        selectedLHI={selectedLHI}
      />

      {openTambah && (
        <TambahDialog
          openTambah={openTambah}
          setOpenTambah={setOpenTambah}
          Data={Data}
          setDataTambah={(e) => {
            console.log("data tambah", e);
            setData(
              Data.concat(
                e.map((value, index) => ({
                  ...value,
                  nomorLHI: id != undefined ? id : "",
                  tglPenagihan: TglPenagihan,
                  tglFaktur: value.date,
                  usrKolektor: value.kolektorTagih,
                  namaKolektor: value.namaKolektorTagih,
                  // baru: true,
                  // addressLine1: value.AddressLine1,
                  id:
                    "id" +
                    new Date().getTime() +
                    Math.floor(Math.random() * 123) +
                    index +
                    Math.random().toString(16).slice(2),
                }))
              )
            );
          }}
        />
      )}

      {openScanInvoice && (
        <ScanInvoiceDialog
          open={openScanInvoice}
          setOpen={setOpenScanInvoice}
          dataLhi={Data}
          setDataLhi={(e) => {
            setData(
              Data.concat(
                e.map((value, index) => ({
                  ...value,
                  nomorLHI: id !== undefined ? id : "",
                  tglPenagihan: TglPenagihan,
                  tglFaktur: value.date,
                  usrKolektor: value.kolektorTagih,
                  namaKolektor: value.namaKolektorTagih,
                  // baru: true,
                  // addressLine1: value.AddressLine1,
                  id:
                    "id" +
                    new Date().getTime() +
                    Math.floor(Math.random() * 123) +
                    index +
                    Math.random().toString(16).slice(2),
                }))
              )
            );
          }}
        />
      )}

      <GantiKolektorDialog
        openGantiKolektor={openGantiKolektor}
        setOpenGantiKolektor={setOpenGantiKolektor}
        selectedLHI={selectedLHI}
        nomorLHI={id}
        dataLHI={Data}
        GetData={(e) => getData(e)}
      />
      <StatusTTDialog
        openStatusTT={openStatusTT}
        setOpenStatusTT={setOpenStatusTT}
        selectedLHI={selectedLHI}
        GetData={(e) => getData(e)}
      />
      <SelectPopup
        open={openAP}
        name={"Admin Piutang"}
        all
        api={`${
          process.env.REACT_APP_DOMAIN_API
        }/EmployeeReps/DropDown/EmployeeIsAdminPiutang?branchID=${getBrach()}`}
        id={"employeeName"}
        desc={"employeeID"}
        setopen={(e) => {
          setOpenAP(e);
        }}
        Temp={AdminPiutang}
        setTemp={(e) => {
          setAdminPiutang(e);
          console.log("e", e);
        }}
      />
    </>
  );
}
