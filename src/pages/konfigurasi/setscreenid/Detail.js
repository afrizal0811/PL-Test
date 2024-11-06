import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import SaveIcon from "@material-ui/icons/Save";
import {
  Alert as MuiAlert,
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { spacing } from "@material-ui/system";
import { TabPanel } from "@material-ui/lab";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Refresh from "@material-ui/icons/Refresh";
import Reply from "@material-ui/icons/Reply";
import { GetConfig } from "../../../utils/ConfigHeader";
// import SaveIcon from "@material-ui/icons/Save";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "salespersonID",
    headerName: "Sales Person ID",
    width: 200,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "locationID",
    headerName: "Location ID",
    width: 200,
  },
  {
    field: "commission",
    headerName: "Commission",
    type: "text",
    width: 200,
  },
  {
    field: "default",
    headerName: "Default",
    type: "boolean",
    width: 200,
  },
];

function Header() {
  const [loading, setLoading] = useState(false);
  const [upKey, setUpKey] = useState("");
  const [valueKey, setValueKey] = useState("");
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // console.log(id);
    if (id != undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/TransaksiMaster/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            setUpKey(resdata.TransaksiID);
            setValueKey(resdata.Description);
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
        TransaksiID: upKey,
        Description: valueKey,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/TransaksiMaster",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/master-data/set-transaksiid/${upKey}`;
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
        TransaksiID: upKey,
        Description: valueKey,
      };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` + "/TransaksiMaster/" + id,
          payload
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/master-data/set-transaksiid/${upKey}`;
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
    if (id == undefined) {
      createData();
    } else {
      editData();
    }
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/set-transaksiid")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => onSumbitHandler()}
        >
          <SaveIcon />
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
          onClick={() => {
            setUpKey("");
            setValueKey("");
            history("/master-data/create-transaksiid");
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          // onClick={onSumbitHandler}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          {/* <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Set Transaksi ID
        </Typography> */}
          <Grid container spacing={2} md={8} mt={1}>
            <Grid item md={6} xs={6}>
              <TextField
                name="setUpKey"
                label="Transaksi ID"
                value={upKey}
                type={"text"}
                fullWidth
                variant="outlined"
                my={2}
                disabled={id != undefined}
                onChange={(e) => setUpKey(e.target.value)}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="valueKey"
                label="Description"
                value={valueKey}
                type="text"
                fullWidth
                variant="outlined"
                my={2}
                onChange={(e) => setValueKey(e.target.value)}
              />
            </Grid>
            {/* <Grid item md={12} xs={6}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                startIcon={<SaveIcon />}
                disabled={upKey == "" || valueKey == ""}
                onClick={onSumbitHandler}
              >
                Save
              </Button>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function DetailTransaksiID() {
  return (
    <React.Fragment>
      <Helmet title="Detail Transaksi ID" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>master-data</Link>
        <Link component={NavLink} to="/master-data/set-transaksiid">
          Transaksi ID
        </Link>
        <Typography>Detail Transaksi ID</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Transaksi ID
      </Typography>
      <Header />
    </React.Fragment>
  );
}

export default DetailTransaksiID;
