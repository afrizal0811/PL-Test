import SearchIcon from "@mui/icons-material/Search";
import {
  CardContent,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import ListSOTable from "./ListSOTable";

import Refresh from "@mui/icons-material/Refresh";
import { MoreHorizontal, Search } from "react-feather";
import CbData from "../../../components/shared/dropdown";
// import CustomerPopup from "../../../components/shared/CustomerPopup";
import { Clear } from "@mui/icons-material";
// import SalesPersonPopup from "./SalesPersonPopup";
// import DeskcallPopup from "./DeskcallPopup";
import { DesktopDatePicker } from "@mui/lab";
import Swal from "sweetalert2";
import SelectPopup from "../../../components/shared/SelectPopup";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach, getEmployeeName } from "../../../utils/jwt";
import CustomerPopup from "../../dashboardApproval/CustomerPopup";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import HistApprovalPopup from "./ProcessingPopup/HistApprovalPopup";
import KeteranganPopup from "./ProcessingPopup/KeteranganPopup";
import OtorisasiPopup from "./ProcessingPopup/OtorisasiPopup";
import RejectPopup from "./ProcessingPopup/RejectPopup";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header(props) {
  const [CustomerID, setCustomerID] = useState("");
  const [AdminPiutang, setAdminPiutang] = useState(getEmployeeName());
  const [Loading, setLoading] = useState(false);
  const [StatusSO, setStatusSO] = useState("");
  const [StatusOto, setStatusOto] = useState("");
  const [NoSO, setNoSO] = useState("");
  const [Data, setData] = useState([]);
  const [TipeSO, setTipeSO] = useState("");
  const [StartDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(moment(new Date()).add(1, "days"));
  const [Storage, setStorage] = useState("");
  const [Termasuk0, setTermasuk0] = useState(false);
  const [PernahReject, setPernahReject] = useState(false);
  const mounted = useRef();
  const [MoreBtn, setMoreBtn] = React.useState(false);
  const [SelectedSO, setSelectedSO] = useState([]);
  const history = useNavigate();

  const [openDetail, setOpenDetail] = useState(false);
  const [openRespon, setOpenRespon] = useState(false);
  const [openCust, setOpenCust] = React.useState(false);

  const [page, setpage] = useState(1);
  const [totaldata, settotaldata] = useState(0);

  const open = Boolean(MoreBtn);
  const id = open ? "simple-popover" : undefined;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openKeterangan, setopenKeterangan] = React.useState(false);
  const [openAP, setOpenAP] = React.useState(false);
  const [openHistApproval, setopenHistApproval] = React.useState(false);
  const [openOtorisasi, setopenOtorisasi] = React.useState(false);
  const [openReject, setopenReject] = React.useState(false);

  const [getData, setgetData] = React.useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  // const [selectedObj, setSelectedObj] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  // useEffect(() => {
  //   setSelectedRows(
  //     Data.filter((bo) =>
  //       selectedObj.every((ao) => ao.IDListSOOtorisasi == bo.IDListSOOtorisasi)
  //     )
  //   );
  // }, [selectedObj]);

  useEffect(() => {
    SyncOto();
  }, []);

  const SyncOto = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/SyncOto`,
          {},
          GetConfig()
          // `http://localhost:5000/GetAllocatedKuotaByPagination?page=${curretPage}&rowsCount=${pageSize}`
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            // const resdata = response.data[0];
            // console.log("res", resdata);
            // setData(resdata.record);
            // settotalPage(resdata.totalCountData);
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

  const pengajuanConfirm = async () => {
    Swal.fire({
      title: "Apakah Anda yakin akan melakukan pengajuan?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ajukan",
    }).then((result) => {
      if (result.value) {
        // var listPengajuan = selected.map(function (obj) {
        //   return obj.IDListSOOtorisasi;
        // });
        async function postPengajuan() {
          let res = await axios
            .post(
              `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/CreatePengajuan`,
              SelectedSO.map((a) => {
                return a.IDListSOOtorisasi;
              }),
              GetConfig()
            )
            .then(function (response) {
              console.log(response);
              if (response.status === 200 || response.status === 201) {
                NotifySuccess("success", "Data Telah Disimpan");
                let data = response.data;
                setgetData(!getData);
                console.log("ini respon dari server", data);
                // setTimeout(() => {
                //   window.location.href = `/master-data/master-kendaraan`;
                // }, 1000);
              }
            })
            .catch(function (error) {
              NotifyError("There was an error!", error);
              console.log(error);
            });
        }
        postPengajuan();
        // console.log(
        //   "ini sweetalert confirm selected.IDListSOOtorisasi",
        //   SelectedSO
        // );
      }
    });
  };

  const PostingConfirm = async () => {
    Swal.fire({
      title: "Apakah Anda yakin akan melakukan Posting?",
      // text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Posting",
    }).then((result) => {
      if (result.value) {
        // var listPengajuan = selected.map(function (obj) {
        //   return obj.IDListSOOtorisasi;
        // });
        async function posting() {
          let res = await axios
            .post(
              `${process.env.REACT_APP_DOMAIN_API}/ApprovalList/AutoPosting`,
              {},
              GetConfig()
            )
            .then(function (response) {
              console.log(response);
              if (response.status === 200 || response.status === 201) {
                NotifySuccess("success", "Telah melakukan Posting");
                let data = response.data;
                setgetData(!getData);
                console.log("ini respon dari server", data);
                // setTimeout(() => {
                //   window.location.href = `/master-data/master-kendaraan`;
                // }, 1000);
              }
            })
            .catch(function (error) {
              NotifyError("There was an error!", error);
              console.log(error);
            });
        }
        posting();
        // console.log(
        //   "ini sweetalert confirm selected.IDListSOOtorisasi",
        //   SelectedSO
        // );
      }
    });
  };

  return (
    <div>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          aria-describedby={"simple-popover"}
          // disabled={Loading}
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
          <div style={{ border: "1px solid" }}>
            <Typography variant="h5" p={2}>
              Processing
            </Typography>
            <Button
              disabled={SelectedSO.length !== 1}
              onClick={() => {
                setopenKeterangan(true);
                setMoreBtn(false);
              }}
            >
              Keterangan
            </Button>
            <br />
            <Button
              // disabled={!SelectedSO}
              disabled={SelectedSO.length !== 1}
              onClick={() => {
                setopenHistApproval(true);
                setMoreBtn(false);
              }}
            >
              History Approval
            </Button>
            <br />
            <Button
              // disabled={!SelectedSO}
              // disabled={SelectedSO.length !== 1}
              onClick={() => {
                PostingConfirm();
                setMoreBtn(false);
              }}
            >
              Posting
            </Button>
            <Typography variant="h5" p={2}>
              Approval
            </Typography>
            <Button
              disabled={
                SelectedSO.length == 0 ||
                SelectedSO?.filter(
                  (ae) =>
                    ae.StatusOtorisasi == "Batal" ||
                    ae.StatusOtorisasi == "Urgent" ||
                    ae.StatusSO == "Di-posting" ||
                    ae.StatusSO == "Ditindaklanjuti" ||
                    ae.StatusSO == "Diajukan"
                ).length > 0
              }
              onClick={() => {
                pengajuanConfirm();
                setMoreBtn(false);
              }}
            >
              Pengajuan
            </Button>
            <br />
            <Button
              disabled={
                SelectedSO.length !== 1 ||
                SelectedSO?.filter((ae) => ae.StatusSO == "Diajukan").length > 0
              }
              onClick={() => {
                setopenOtorisasi(true);
                setMoreBtn(false);
              }}
            >
              Otorisasi
            </Button>
            <br />
            <Button
              disabled={
                SelectedSO.length == 0 ||
                SelectedSO?.filter(
                  (ae) =>
                    ae.StatusSO == "Di-posting" ||
                    ae.StatusSO == "Ditindaklanjuti"
                ).length > 0
              }
              onClick={() => {
                setopenReject(true);
                setMoreBtn(false);
              }}
            >
              Batal
            </Button>
            <Typography variant="h5" p={2}>
              Printing and Emailing
            </Typography>
            <Button
              disabled={SelectedSO.length == 0}
              onClick={() => {
                setOpenRespon(true);
                setMoreBtn(false);
              }}
            >
              Print
            </Button>
          </div>
        </Popover>
      </Grid>
      <Card>
        <CardContent>
          <Grid container spacing={3} mb={4} lg={10}>
            <Grid item md={4} xs={12}>
              <DesktopDatePicker
                disabled={Loading}
                label="Start Date"
                inputFormat={"dd/MM/yyyy"}
                value={StartDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  console.log("date", newValue);
                }}
                cancelText
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DesktopDatePicker
                disabled={Loading}
                label="End Date"
                inputFormat={"dd/MM/yyyy"}
                value={EndDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  console.log("date", newValue);
                }}
                cancelText
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Admin Piutang"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {AdminPiutang ? (
                        <>
                          <IconButton
                            onClick={() => setAdminPiutang("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenAP(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={AdminPiutang}
                onClick={() => {
                  if (!AdminPiutang) {
                    setOpenAP(true);
                  }
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CbData
                // required
                // all
                source={`${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/DropDown/StatusApprovalListSO`}
                id={"statusApprovalListSO"}
                // desc={"dropdownDeskcallTypeGabungan"}
                label="Status Otorisasi"
                disabled={Loading}
                value={StatusSO}
                onChange={(newValue) => {
                  setStatusSO(newValue);
                  // console.log(TransaksiID);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CbData
                // required
                // all
                source={`${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/DropDown/StatusFakturListSO`}
                id={"statusFakturListSO"}
                // desc={"dropdownDeskcallTypeGabungan"}
                label="Status SO"
                disabled={Loading}
                value={StatusOto}
                onChange={(newValue) => {
                  setStatusOto(newValue);
                  // console.log(TransaksiID);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="No. SO"
                type="text"
                value={!!NoSO ? NoSO : " "}
                // disabled
                onChange={(e) => {
                  setNoSO(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">Tipe SO</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Tipe SO"
                  value={TipeSO}
                  onChange={(e) => setTipeSO(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"SO"}>SO</MenuItem>
                  <MenuItem value={"SE"}>SE</MenuItem>
                  <MenuItem value={"SS"}>SS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="CustomerID"
                label="Customer"
                style={{ width: "100%" }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {CustomerID ? (
                        <>
                          <IconButton
                            onClick={() => setCustomerID("")}
                            // disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenCust(true)}
                            // disabled={Loading}
                          >
                            <Search />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={
                  CustomerID
                    ? CustomerID?.customerID + " - " + CustomerID?.customerName
                    : " "
                }
                onClick={() => {
                  if (!CustomerID) {
                    setOpenCust(true);
                  }
                }}
              />
              {/* <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">Storage</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Storage"
                  value={Storage}
                  onChange={(e) => setStorage(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"Dry"}>Dry</MenuItem>
                  <MenuItem value={"Frozen"}>Frozen</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>
            <Grid item md={2} xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Termasuk0}
                    onChange={(e) => setTermasuk0(e.target.checked)}
                    name="gilad"
                  />
                }
                label="Termasuk 0"
              />
            </Grid>
            <Grid item md={2} xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={PernahReject}
                    onChange={(e) => setPernahReject(e.target.checked)}
                    name="gilad"
                  />
                }
                label="Pernah Reject"
              />
            </Grid>
          </Grid>
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
                >
                  <Timecode />
                </Timer>
              </Grid>
            </Grid>
          ) : (
            <ListSOTable
              // Data={Data}
              // SOID={SelectedSO.DeskcallDetailsID}
              CustomerID={!!CustomerID ? CustomerID?.customerID : ""}
              NoSO={!!NoSO ? NoSO : ""}
              AdminPiutang={AdminPiutang}
              StartDate={StartDate}
              EndDate={EndDate}
              StatusSO={StatusSO}
              StatusOto={StatusOto}
              TipeSO={TipeSO}
              Storage={Storage}
              Termasuk0={Termasuk0}
              PernahReject={PernahReject}
              setData={(e) => setData(e)}
              openDetail={openDetail}
              setOpenDetail={(e) => setOpenDetail(e)}
              openRespon={openRespon}
              setOpenRespon={(e) => setOpenRespon(e)}
              SelectedSO={SelectedSO}
              getData={getData}
              setSelectedSO={(e) => {
                // console.log(
                //   "selected so",
                //   SelectedSO.map((a) => {
                //     return a.IDListSOOtorisasi;
                //   })
                // );
                setSelectedSO(e);
              }}
              // selectedRows={selectedRows}
              // setSelectedRows={(e) => setSelectedRows(e)}
              // selectedObj={selectedObj}
              // setSelectedObj={(e) => {
              //   setSelectedObj(e);
              //   console.log("obj", e);
              // }}
              // selectionModel={selectionModel}
              // setSelectionModel={(e) => {
              //   setSelectionModel(e);
              //   console.log(e);
              // }}
            />
          )}
          <KeteranganPopup
            openKeterangan={openKeterangan}
            setopenKeterangan={(e) => {
              setopenKeterangan(e);
            }}
            SelectedSO={SelectedSO}
            getData={(e) => setgetData(!getData)}
            // TempCustomer={CustomerID}
            // setTempCustomer={(e) => {
            //   setCustomerID(e);
            //   console.log("cus", e);
            // }}
          />
          <HistApprovalPopup
            openHistApproval={openHistApproval}
            SelectedSO={SelectedSO}
            setopenHistApproval={(e) => {
              setopenHistApproval(e);
            }}
          />
          <OtorisasiPopup
            openOtorisasi={openOtorisasi}
            setopenOtorisasi={(e) => {
              setopenOtorisasi(e);
            }}
            selectedSO={SelectedSO}
            getData={(e) => setgetData(!getData)}
          />
          <RejectPopup
            openReject={openReject}
            setopenReject={(e) => {
              setopenReject(e);
            }}
            totalSO={Data.length}
            selectedSO={SelectedSO}
            getData={(e) => setgetData(!getData)}
          />
          <SelectPopup
            open={openAP}
            name={"Admin Piutang"}
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
          <CustomerPopup
            openCust={openCust}
            setOpenCust={(e) => {
              setOpenCust(e);
            }}
            TempCustomer={CustomerID}
            setTempCustomer={(e) => {
              setCustomerID(e);
              console.log("cus", e);
            }}
            setSelectedCustomer={setCustomerID}
            selectedCustomer={CustomerID}
          />
          {/* <SalesPersonPopup
            openSP={openSP}
            setOpenSP={(e) => {
              setOpenSP(e);
            }}
            SalesPerson={SalesPerson}
            setSalesPerson={(e) => {
              setSalesPerson(e);
            }}
          /> */}
          {/* <DeskcallPopup
            openDC={openDC}
            setOpenDC={(e) => {
              setOpenDC(e);
            }}
            Deskcall={DeskcallID}
            setDeskcall={(e) => {
              setDeskcallID(e);
            }}
          /> */}
        </CardContent>
      </Card>
    </div>
  );
}
