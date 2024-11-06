import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import { spacing } from "@material-ui/system";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Button as MuiButton,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Button = styled(MuiButton)(spacing);

export default function DetailPopup(props) {
  const [StatusLHI, setStatusLHI] = useState("All");
  // const [selection, setselection] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Sunday, setSunday] = useState(false);
  const [Monday, setMonday] = useState(false);
  const [Tuesday, setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Jam, setJam] = useState("");
  const [Minute, setMinute] = useState("");
  const [Interval, setInterval] = useState("");
  const [Name, setName] = useState("");
  const [Method, setMethod] = useState("");
  const [Function, setFunction] = useState("");
  const [Enable, setEnable] = useState(false);

  React.useEffect(() => {
    if (props.openDetail) {
      // getDataDetail(props.CustomerID);
      // if (props.selection.length > 0) {
      //   setSunday(props.selection.IsSunday);
      // }
      !props.selection?.IsSunday ? setSunday(false) : setSunday(true);
      !props.selection?.IsMonday ? setMonday(false) : setMonday(true);
      !props.selection?.IsTuesday ? setTuesday(false) : setTuesday(true);
      !props.selection?.IsWednesday ? setWednesday(false) : setWednesday(true);
      !props.selection?.IsThursday ? setThursday(false) : setThursday(true);
      !props.selection?.IsFriday ? setFriday(false) : setFriday(true);
      !props.selection?.IsSaturday ? setSaturday(false) : setSaturday(true);
      !props.selection?.SchedullerName
        ? setName("")
        : setName(props.selection.SchedullerName);
      !props.selection?.ServiceFunction
        ? setFunction("")
        : setFunction(props.selection.ServiceFunction);
      !props.selection?.ServiceMethod
        ? setMethod("")
        : setMethod(props.selection.ServiceMethod);
      !props.selection?.StartTime
        ? setJam("")
        : setJam(props.selection.StartTime);
      !props.selection?.intervalMinute
        ? setInterval("")
        : setInterval(props.selection.intervalMinute);
      !props.selection?.IsEnabled
        ? setEnable(false)
        : setEnable(props.selection.IsEnabled);
      !props.selection?.MinuteTime
        ? setMinute("")
        : setMinute(props.selection.MinuteTime);
    }
  }, [props.openDetail]);

  // const getDataDetail = async (id) => {
  //   try {
  //     const res = await axios
  //       .get(
  //         `${process.env.REACT_APP_DOMAIN_API}` +
  //           "/DeskcallReps/getDetailDeskcall/" +
  //           id +
  //           `?filterStatusLHI=${StatusLHI == null ? "All" : StatusLHI}`
  //       )
  //       .then(function (response) {
  //         if (response.status == 200) {
  //           const resdata = response.data;
  //           // setDetail(resdata);
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const createData = async () => {
    setLoading(true);
    try {
      // const payload = {
      //   setupkey: upKey,
      //   value: valueKey,
      // };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/Scheduller/Scheduller/AddOrUpdate?schedullerName=${Name}&serviceMethod=${Method}&serviceFunction=${Function}&IsSunday=${Sunday}&IsMonday=${Monday}&IsTuesday=${Tuesday}&IsWednesday=${Wednesday}&IsThursday=${Thursday}&IsFriday=${Friday}&IsSaturday=${Saturday}&startTime=${Jam}&intervalMinute=${Interval}&minuteTime=${Minute}`
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 204
          ) {
            NotifySuccess("success", "Data Telah DiTambah");
            props.setOpenDetail(false);
            setTimeout(() => {
              window.location.href = `/konfigurasi/scheduller`;
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

  const editData = async () => {
    setLoading(true);
    try {
      // const payload = {
      //   setupkey: upKey,
      //   value: valueKey,
      // };
      await axios
        .put(`${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends/")
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            // setTimeout(() => {
            //   window.location.href = `/konfigurasi/set-key/${upKey}`;
            // }, 800);
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

  const onSumbitHandler = async () => {
    if (!props.selection?.SchedullerHashSettingID) {
      createData();
    } else {
      editData();
    }
  };

  return (
    <Dialog
      open={props.openDetail}
      onClose={() => props.setOpenDetail(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        Scheduler Setup
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenDetail(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item md={12} xs={12} mt={3}>
            <TextField
              name="SchedullerName"
              disabled={Loading}
              fullWidth
              color={!Name || Name == "" ? "warning" : ""}
              focused={!Name || Name == "" ? true : false}
              label="Scheduler Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            {!Name ||
              (Name == "" && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              ))}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="SchedullerMethod"
              disabled={Loading}
              color={!Method || Method == "" ? "warning" : ""}
              focused={!Method || Method == "" ? true : false}
              fullWidth
              label="Scheduler Method"
              value={Method}
              onChange={(e) => setMethod(e.target.value)}
            />
            {!Method ||
              (Method == "" && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              ))}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="SchedullerFunction"
              disabled={Loading}
              fullWidth
              color={!Function || Function == "" ? "warning" : ""}
              focused={!Function || Function == "" ? true : false}
              label="Scheduler Function"
              value={Function}
              onChange={(e) => setFunction(e.target.value)}
            />
            {!Function ||
              (Function == "" && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              ))}
          </Grid>
          <Grid item md={12} xs={12}>
            <Typography
              variant="p"
              gutterBottom
              sx={{
                color:
                  !Sunday &&
                  !Monday &&
                  !Tuesday &&
                  !Wednesday &&
                  !Thursday &&
                  !Friday &&
                  !Saturday
                    ? "red"
                    : "",
              }}
            >
              Active Day
            </Typography>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Sunday}
                      onChange={(e) => setSunday(e.target.checked)}
                      name="Sunday"
                    />
                  }
                  label="Sunday"
                />
              </Grid>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Monday}
                      onChange={(e) => setMonday(e.target.checked)}
                      name="Monday"
                    />
                  }
                  label="Monday"
                />
              </Grid>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Tuesday}
                      onChange={(e) => setTuesday(e.target.checked)}
                      name="Tuesday"
                    />
                  }
                  label="Tuesday"
                />
              </Grid>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Wednesday}
                      onChange={(e) => setWednesday(e.target.checked)}
                      name="Wednesday"
                    />
                  }
                  label="Wednesday"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Thursday}
                      onChange={(e) => setThursday(e.target.checked)}
                      name="Thursday"
                    />
                  }
                  label="Thursday"
                />
              </Grid>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Friday}
                      onChange={(e) => setFriday(e.target.checked)}
                      name="Friday"
                    />
                  }
                  label="Friday"
                />
              </Grid>
              <Grid item md={1} xs={6} pr={10} mr={10}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Saturday}
                      onChange={(e) => setSaturday(e.target.checked)}
                      name="Saturday"
                    />
                  }
                  label="Saturday"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={6}>
            <Grid container spacing={4}>
              <Grid item md={4} xs={4}>
                <TextField
                  name="Jam"
                  disabled={Loading}
                  fullWidth
                  color={!Jam || Jam == "" ? "warning" : ""}
                  focused={!Jam || Jam == "" ? true : false}
                  label="Jam"
                  value={Jam}
                  onChange={(e) => {
                    if (e.target.value.includes(",")) {
                      setInterval("");
                    }
                    setJam(e.target.value);
                  }}
                />
                {!Jam ||
                  (Jam == "" && (
                    <FormHelperText style={{ color: "red" }}>
                      Required
                    </FormHelperText>
                  ))}
              </Grid>
              <Grid item md={4} xs={4}>
                <TextField
                  name="Minute"
                  fullWidth
                  disabled={Loading}
                  color={!Minute || Minute == "" ? "warning" : ""}
                  focused={!Minute || Minute == "" ? true : false}
                  // type="number"
                  label="Minute"
                  placeholder="Default *"
                  value={Minute}
                  // inputProps={{
                  //   max: 59,
                  //   min: 0,
                  // }}
                  onChange={(e) => {
                    // if (e.target.value > 59) {
                    //   setMinute(59);
                    // } else if (e.target.value < 0) {
                    //   setMinute(0);
                    // } else {
                    //   setMinute(e.target.value);
                    // }
                    setMinute(e.target.value);
                  }}
                />
                {!Minute ||
                  (Minute == "" && (
                    <FormHelperText style={{ color: "red" }}>
                      Required
                    </FormHelperText>
                  ))}
              </Grid>
              <Grid item md={4} xs={4}>
                <TextField
                  name="Interval"
                  fullWidth
                  disabled={Jam.includes(",") || Loading}
                  label="Interval"
                  value={Interval}
                  onChange={(e) => setInterval(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <Grid item md={2} xs={6}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            disabled={
              Name.length == 0 ||
              Method.length == 0 ||
              Function.length == 0 ||
              Jam.length == 0 ||
              Minute.length == 0 ||
              (!Sunday &&
                !Monday &&
                !Tuesday &&
                !Wednesday &&
                !Thursday &&
                !Friday &&
                !Saturday)
            }
            startIcon={<SaveIcon />}
            onClick={createData}
          >
            Save
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
