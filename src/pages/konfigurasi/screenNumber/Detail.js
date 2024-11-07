import SaveIcon from "@mui/icons-material/Save";
import {
  CardContent,
  Grid,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
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

function Header() {
  const [loading, setLoading] = useState(false);
  const [screenID, setscreenID] = useState("");
  const [screenNo, setscreenNo] = useState("");
  const [description, setdescription] = useState("");
  // const [screenNo, setscreenNo] = useState("");
  const { id } = useParams();

  useEffect(() => {
    console.log("id", id);
    if (id !== undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ScreenNoReps/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setscreenID(resdata.ScreenID);
            setscreenNo(resdata.ScreenID);
            setdescription(resdata.Description);
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

  const createData = async () => {
    setLoading(true);
    try {
      const payload = {
        screenID: screenID,
        // screenNo: screenNo,
        description: description,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ScreenNoReps/CreateMasterScreenNo",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/screen-number/detail/${screenID}`;
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
      const payload = {
        screenID: screenID,
        // screenNo: screenNo,
        description: description,
      };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ScreenNoReps/UpdateMasterScreenNo/",
          payload
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/screen-number/detail/${screenID}`;
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

  const onSumbitHandler = async () => {
    if (id === undefined) {
      createData();
    } else {
      editData();
    }
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Screen Number
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} xs={6}>
            <TextField
              name="ScreenID"
              label="Screen ID"
              value={screenID}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              disabled={id !== undefined}
              onChange={(e) => setscreenID(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="description"
              label="Description"
              value={description}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              onChange={(e) => setdescription(e.target.value)}
            />
          </Grid>
          {/* <Grid item md={12} xs={12}>
            <TextField
              name="description"
              label="Description"
              value={description}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              onChange={(e) => setdescription(e.target.value)}
            />
          </Grid> */}
          {/* <Grid item md={6} xs={6}>
            <TextField
              name="screenNo"
              label="Value"
              value={screenNo}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              onChange={(e) => setscreenNo(e.target.value)}
            />
          </Grid> */}
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              disabled={screenID === "" || description === ""}
              onClick={onSumbitHandler}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function DetailScreenNumber() {
  return (
    <React.Fragment>
      <Helmet title="Detail Screen Number" />
      <Typography variant="h3" gutterBottom display="inline">
        Screen Number
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Link component={NavLink} to="/konfigurasi/screen-number">
          Screen Number
        </Link>
        <Typography>Detail Screen Number</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Header />
    </React.Fragment>
  );
}

export default DetailScreenNumber;
