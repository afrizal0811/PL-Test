import { spacing } from "@material-ui/system";
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
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Card as MuiCard,
  Paper as MuiPaper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import Tabs from "./Tabs";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [RefNbr, setRefNbr] = useState("");
  const [date, setDate] = useState(new Date());
  const [DataSource, setDataSource] = useState([]);
  const [FinPeriodID, setFinPeriodID] = useState("");
  const [loading, setLoading] = useState(false);
  const [Status, setStatus] = useState("unsend");
  const [Description, setDescription] = useState("");

  const history = useNavigate();
  const { id } = useParams();

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    getData(id);
  }, []);

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
          if (response.status == 200) {
            const resdata = response.data;
            setDate(resdata.Date);
            setRefNbr(resdata.RefNbr);
            setFinPeriodID(resdata.FinPeriodID);
            setDescription(resdata.Description);
            setStatus(resdata.Status);
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
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDate/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
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
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const HandleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        refNbr: RefNbr,
        date: Date,
        finPeriodID: FinPeriodID,
        status: Status,
        description: Description,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/ChangeLotNbrExpDate/UpdateChangeLotNbrExpDate/`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah Diupdate");
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

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleSubmit = async (id) => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDate/ChangeStatusSubmit/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiSubmit");
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

  const handleRelease = async (id) => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDate/ReleaseIssueReceipt/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiRelease");
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
  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDate/ChangeStatusApproval/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiApprove");
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
  const handleReject = async (id) => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDate/ChangeStatusReject/${id}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiReject");
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

  return (
    <div style={{ paddingRight: 11, paddingLeft: 11 }}>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
            <IconButton
              component="span"
              // disabled={Loading}
              onClick={() => history("/change-lot-nbr-exp-date")}
            >
              <Reply />
            </IconButton>
            <IconButton
              component="span"
              // disabled={Loading}
              onClick={() => HandleSave()}
            >
              <Save />
            </IconButton>
            <IconButton
              component="span"
              // disabled={Loading}
              onClick={() => window.location.reload()}
            >
              <Refresh />
            </IconButton>
            <IconButton
              component="span"
              // disabled={Loading}
            >
              <Add />
            </IconButton>
            <IconButton
              component="span"
              // disabled={Loading}
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
              anchorEl={anchorMenu}
              open={Boolean(anchorMenu)}
              onClose={closeMenu}
            >
              <MenuItem onClick={handleSubmit}>Submit</MenuItem>
              <MenuItem onClick={handleApprove}>Approve</MenuItem>
              <MenuItem onClick={handleRelease}>Release</MenuItem>
              <MenuItem onClick={handleReject}>Reject</MenuItem>
            </Menu>
          </Grid>
          <Grid container spacing={12}>
            <Grid item md={4}>
              <Paper mt={3}>
                <TextField
                  label="Reference Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={RefNbr}
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
                  value={date}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Paper>
              <Paper mt={3}>
                {/* <TextField
                  id="outlined-helperText"
                  label="Post Period"
                  name="FinPeriodID"
                  fullWidth
                  value={FinPeriodID}
                  onChange={(newValue) => {
                    setFinPeriodID(newValue);
                  }}
                /> */}
                {/* <DatePicker
                  label="Post Period"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={FinPeriodID}
                  onChange={(newValue) => {
                    setFinPeriodID(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                /> */}
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/DropDown/PostPeriod`}
                  id={"dropdownPostPeriod"}
                  desc={"dropdownPostPeriodStartDate"}
                  label="Post Period"
                  // disabled={Loading}
                  value={FinPeriodID}
                  onChange={(newValue) => {
                    setFinPeriodID(newValue);
                    // console.log(newValue);
                  }}
                />
              </Paper>
            </Grid>
            <Grid item md={4}>
              <Paper mt={3}>
                <FormControl fullWidth>
                  <Select
                    value={Status}
                    fullWidth
                    disabled
                    onChange={handleChangeStatus}
                    id="demo-simple-select"
                    displayEmpty
                  >
                    <MenuItem value={"unsend"}>Unsend</MenuItem>
                    <MenuItem value={"pending approval"}>
                      Pending Approval
                    </MenuItem>
                    <MenuItem value={"open"}>Open</MenuItem>
                    <MenuItem value={"reject"}>Reject</MenuItem>
                    <MenuItem value={"released"}>Released</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
              <Paper mt={1}>
                <Typography variant="subtitle1" gutterBottom mb={0}>
                  Keterangan
                </Typography>
                <TextField
                  id="outlined-multiline-static"
                  margin="dense"
                  fullwidth={true}
                  multiline
                  fullWidth
                  rows={3}
                  variant="outlined"
                  value={Description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Tabs
            DataSource={DataSource}
            setDataSource={(e) => setDataSource(e)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
