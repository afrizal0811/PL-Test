import {
  Add,
  Delete,
  MoreHoriz,
  Refresh,
  Reply,
  Save,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  Button,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach, getEmployee } from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import DialogRefNbr from "./DialogRefNbr";
import Tabs from "./Tabs";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [RefNbr, setRefNbr] = useState("");
  const [date, setDate] = useState(new Date());
  const [FinPeriodID, setFinPeriodID] = useState(moment().format("MMYYYY"));
  const [DataSource, setDataSource] = useState([]);
  const [DataDest, setDataDest] = useState([]);
  const [DataApproval, setDataApproval] = useState([]);
  const [DataOther, setDataOther] = useState({});
  const [loading, setLoading] = useState(false);
  const [reasonApprove, setreasonApprove] = useState("");
  const [reasonReject, setreasonReject] = useState("");
  const [approve, setapprove] = useState(false);
  const [reject, setreject] = useState(false);
  const [Status, setStatus] = useState("On Hold");
  const [Description, setDescription] = useState("");

  const [openRefnbr, setopenRefnbr] = useState(false);
  const [Approver, setApprover] = useState(false);
  const [Kirim, setKirim] = useState(0);
  const [Submit, setSubmit] = useState(0);

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      getData(id);
    }
  }, []);

  useEffect(() => {
    console.log(DataDest);
  }, [DataDest]);

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  const getData = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setDate(resdata.Date);
            setRefNbr(resdata.RefNbr);
            setFinPeriodID(resdata.FinPeriodID);
            setDescription(resdata.Description);
            setStatus(resdata.Status);
            const newdest = resdata.ChangeLotNbrExpDateDetailDestinationRep.map(
              (item, i) => {
                item.id = i;
                // item.brnchID = item.BrnchID;
                // item.inventoryDesc = item.InventoryDesc;
                // item.inventoryID = item.InventoryID;
                item.ToLocationID = item.LocationID;
                item.ToQty = item.Qty;
                // item.reasonCode = item.ReasonCode;
                item.ToSiteCD = item.SiteCD;
                item.ToReasonCode = item.ReasonCode;
                item.ToUOM = item.UOM;
                // item.toExpDate = item.ToExpDate;
                // item.toLotNbr = item.ToLotNbr;
                // item.uom = item.UOM;
                return item;
              }
            );
            const newsrc = resdata.ChangeLotNbrExpDateDetailResourceRep.map(
              (item, i) => {
                item.id = i;
                // item.brnchID = item.BrnchID;
                // item.inventoryDesc = item.InventoryDesc;
                // item.inventoryID = item.InventoryID;
                // item.locationID = item.LocationID;
                // item.qty = item.Qty;
                // item.reasonCode = item.ReasonCode;
                // item.siteCD = item.SiteCD;
                // item.srcExpDate = item.SrcExpDate;
                // item.srcLotNbr = item.SrcLotNbr;
                // item.uom = item.UOM;
                return item;
              }
            );
            const approval = resdata.ChangeLotNbrExpDateApprovalDetailRep.map(
              (item, i) => {
                item.id = i;
                return item;
              }
            );

            // const other =
            //   resdata.ChangeLotNbrExpDateOtherInformationDetailRep.map(
            //     (item, i) => {
            //       item.id = i;
            //       return item;
            //     }
            //   );

            let obj = approval.find((o) =>
              o.AssignedAcctCD.includes(getEmployee())
            );
            // let obj = approval.find((o) => o.AssignedAcctCD === "BDG001");
            console.log(
              "other",
              resdata.ChangeLotNbrExpDateOtherInformationDetailRep !== []
            );
            if (obj !== undefined && obj?.ApprovedByAcctCD !== getEmployee()) {
              setApprover(true);
            } else {
              setApprover(false);
            }
            // if(obj.ApprovedDate && obj?.AssignedAcctCD)
            // setData(newdata);
            if (resdata.ChangeLotNbrExpDateOtherInformationDetailRep !== []) {
              setDataOther(
                resdata.ChangeLotNbrExpDateOtherInformationDetailRep[0]
              );
            }
            // setDataOther(other);
            setDataApproval(approval);
            setDataDest(newdest);
            setDataSource(newsrc);
            // setValueKey(resdata.Description);
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

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus!");
            setTimeout(() => {
              window.location.href = `/change-lot-nbr-exp-date`;
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

  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan hapus data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const notifySubmit = async () => {
    Swal.fire({
      title: "Apakah Anda yakin untuk submit dokumen ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        setSubmit(Submit + 1);
      }
    });
  };

  const notifyApprove = () => {
    Swal.fire({
      title: "Apakah Anda sudah yakin untuk Approve dokumen ini?",
      input: "text",
      inputLabel: "Reason",
      showCancelButton: true,
    }).then((result) => {
      console.log("result", result);
      if (result.value) {
        // handleApprove();
      }
    });
  };

  const SaveHandler = async (e) => {
    const payload = {
      refNbr: RefNbr,
      date: date,
      finPeriodID: FinPeriodID,
      status: Status,
      description: Description,
      brnchID: getBrach(),
      // brnchID: "PRODWHOLE",
      changeLotNbrExpDateOtherInformationDetailRep: [],
      changeLotNbrExpDateApprovalDetailRep: [],
      changeLotNbrExpDateDetailDestinationRep: e?.DataDesti,
      changeLotNbrExpDateDetailResourceRep: e?.DataSource,
    };
    console.log("save triger", e);

    if (id == undefined) {
      // console.log(payload);
      createData(payload);
    } else if (e.Submit == true) {
      editData(payload, true);
    } else {
      editData(payload, false);
    }
  };

  const createData = async (payload) => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/CreateChangeLotNbrExpDate`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status == 201) {
            let res = response.data;
            NotifySuccess("success", "Data telah ditambah!");
            setTimeout(() => {
              window.location.href = `/change-lot-nbr-exp-date/detail/${res.RefNbr}`;
            }, 1000);
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
    }
  };

  const editData = async (payload, submit) => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/UpdateChangeLotNbrExpDate/`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("edit", response);
          if (response.status === 200 || response.status == 201) {
            setTimeout(() => {
              if (submit == true) {
                handleSubmit();
              } else {
                NotifySuccess("success", "Data telah disimpan!");
                getData(id);
              }
            }, 1000);
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
    }
  };

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSubmit = async () => {
    // await SaveHandler(e);
    // setKirim(!Kirim);
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/ChangeStatusSubmit/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah di-submit!");
            getData(id);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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
    }
  };

  const handleRelease = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/ReleaseIssueReceipt/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah di-release!");
            getData(id);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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
    }
  };
  const handleApprove = async () => {
    setLoading(true);
    try {
      // let employeeid = ;
      await axios
        .put(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/ChangeLotNbrExpDateReps/ChangeStatusApproval/${id}&${getEmployee()}&${reasonApprove}`,
          {},
          GetConfig()
          // `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/ChangeStatusApproval/${id}&BDG003&${reasonApprove}`
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            setreasonApprove("");
            NotifySuccess("success", "Data telah di-approve!");
            getData(id);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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
    }
  };
  const handleReject = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/ChangeLotNbrExpDateReps/ChangeStatusReject/${id}&${getEmployee()}&${reasonReject}`,
          {},
          GetConfig()
          // `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/ChangeStatusReject/${id}&BDG002&${reasonReject}`
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah di-reject!");
            getData(id);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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
    }
  };

  return (
    <div style={{ paddingRight: 11, paddingLeft: 11 }}>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
            <IconButton
              component="span"
              disabled={loading}
              onClick={() => history("/change-lot-nbr-exp-date")}
            >
              <Reply />
            </IconButton>
            <IconButton
              component="span"
              disabled={Status !== "On Hold"}
              onClick={() => {
                setKirim(Kirim + 1);
              }}
            >
              <Save />
            </IconButton>
            <IconButton
              component="span"
              // disabled={loading}
              onClick={() => window.location.reload()}
            >
              <Refresh />
            </IconButton>
            <IconButton
              onClick={() => {
                window.location.replace("/change-lot-nbr-exp-date/add");
              }}
              component="span"
              // disabled={Loading}
            >
              <Add />
            </IconButton>
            <IconButton
              component="span"
              disabled={Status !== "On Hold" || loading}
              onClick={() => notifyConfirm(id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
              aria-haspopup="true"
              component="span"
              // disabled={Loading}
              onClick={toggleMenu}
            >
              <MoreHoriz />
            </IconButton>
            <Menu
              id="menu-appbar"
              sx={{ zIndex: 1 }}
              anchorEl={anchorMenu}
              open={Boolean(anchorMenu)}
              onClose={closeMenu}
            >
              <MenuItem
                disabled={
                  Status !== "On Hold" ||
                  loading ||
                  Status == "Reject" ||
                  DataDest.length == 0 ||
                  DataDest.filter(
                    (ao) =>
                      ao.ToQty == 0 ||
                      ao.ToExpDate == "" ||
                      ao.ToExpDate == "Invalid date" ||
                      !ao.ToLocationID ||
                      !ao.ToSiteCD ||
                      !ao.ToLotNbr ||
                      ao.ToLotNbr == ""
                  ).length > 0 ||
                  DataSource.filter(
                    (ao) =>
                      ao.Qty == 0 ||
                      ao.SrcExpDate == "" ||
                      ao.SrcExpDate == "Invalid date"
                  ).length > 0
                }
                onClick={() => {
                  notifySubmit();
                  console.log("DataDest", DataDest);
                  closeMenu();
                }}
              >
                Submit
              </MenuItem>
              <MenuItem
                disabled={!Approver || Status == "Reject" || loading}
                onClick={() => {
                  setapprove(true);
                  closeMenu();
                }}
              >
                Approve
              </MenuItem>
              <MenuItem
                disabled={Status !== "Open" || loading}
                onClick={() => {
                  handleRelease();
                  closeMenu();
                }}
              >
                Release
              </MenuItem>
              <MenuItem
                disabled={!Approver || Status == "Reject" || loading}
                onClick={() => {
                  closeMenu();
                  setreject(true);
                }}
              >
                Reject
              </MenuItem>
            </Menu>
          </Grid>
          <Grid container spacing={12}>
            <Grid item md={4}>
              <Paper mt={3}>
                <TextField
                  label="Reference Nbr"
                  size="small"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment>
                        <>
                          <IconButton onClick={() => setopenRefnbr(true)}>
                            <SearchIcon />
                          </IconButton>
                        </>
                      </InputAdornment>
                    ),
                  }}
                  value={RefNbr}
                  // onClick={() => setopenRefnbr(true)}
                  onChange={(newValue) => {
                    setRefNbr(RefNbr);
                  }}
                  // style={{ width: "70%" }}
                  fullWidth
                />
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={date}
                  InputProps={{
                    readOnly: Status !== "On Hold" ? true : false,
                  }}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" fullWidth />
                  )}
                />
              </Paper>
              <Paper mt={3}>
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/DropDown/PostPeriod`}
                  id={"dropdownPostPeriod"}
                  desc={"dropdownPostPeriodStartDate"}
                  config={GetConfig()}
                  size="small"
                  label="Post Period"
                  // disabled={Loading}
                  InputProps={{
                    readOnly: Status !== "On Hold" ? true : false,
                  }}
                  value={FinPeriodID}
                  onChange={(newValue) => {
                    setFinPeriodID(newValue);
                    // console.log(newValue);
                  }}
                />
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper mt={1}>
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-static"
                    size="small"
                    margin="dense"
                    fullwidth={true}
                    disabled
                    variant="outlined"
                    value={Status}
                  />
                </FormControl>
              </Paper>
              <Paper mt={1}>
                <TextField
                  id="outlined-multiline-static"
                  margin="dense"
                  label="Description"
                  fullwidth={true}
                  multiline
                  size="small"
                  fullWidth
                  rows={3}
                  variant="outlined"
                  value={Description}
                  InputProps={{
                    readOnly: Status !== "On Hold" ? true : false,
                  }}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          {loading ? (
            <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
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
            <Tabs
              DataApproval={DataApproval}
              setDataApproval={(e) => setDataApproval(e)}
              DataSource={DataSource}
              setDataSource={(e) => setDataSource(e)}
              DataDest={DataDest}
              setDataDest={(e) => {
                setDataDest(e);
                console.log("set datadest dari tab", e);
              }}
              Status={Status}
              Kirim={Kirim}
              setSubmit={(e) => setSubmit(e)}
              setKirim={(e) => setKirim(e)}
              Submit={Submit}
              SaveHandler={(e) => SaveHandler(e)}
              DataOther={DataOther}
            />
          )}
        </CardContent>
      </Card>
      <div>
        <Dialog
          open={approve}
          onClose={(e) => setapprove(false)}
          sx={{ zIndex: 1 }}
        >
          <DialogTitle>Approve Reason</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Jika sudah yakin untuk melakukan approval, Anda dapat menambahkan
              reason dibawah
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="approvalReason"
              type="text"
              value={reasonApprove}
              fullWidth
              variant="standard"
              onChange={(e) => setreasonApprove(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                setreasonApprove("");
                setapprove(false);
              }}
            >
              Batal
            </Button>
            <Button
              disabled={reasonApprove.trim() == ""}
              onClick={(e) => {
                if (reasonApprove.trim().length > 50) {
                  NotifyError("Panjang karakter melebihi batas");
                } else {
                  handleApprove();
                  setapprove(false);
                }
              }}
            >
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <DialogRefNbr
          openRefnbr={openRefnbr}
          setopenRefnbr={(e) => setopenRefnbr(e)}
        />
        <Dialog
          open={reject}
          onClose={(e) => setreject(false)}
          sx={{ zIndex: 1 }}
        >
          <DialogTitle>Reject Reason</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Jika sudah yakin untuk melakukan Reject, Anda dapat menambahkan
              reason dibawah
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="RejectReason"
              type="text"
              fullWidth
              value={reasonReject}
              variant="standard"
              onChange={(e) => setreasonReject(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                setreject(false);
                setreasonReject("");
              }}
            >
              Batal
            </Button>
            <Button
              disabled={reasonReject.trim() == ""}
              onClick={(e) => {
                if (reasonReject.trim().length > 50) {
                  NotifyError("Panjang karakter melebihi batas");
                } else {
                  handleReject();
                  setreject(false);
                }
              }}
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
