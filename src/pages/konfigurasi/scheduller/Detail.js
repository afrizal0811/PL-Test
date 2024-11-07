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
  const { id } = useParams();

  useEffect(() => {
    // console.log(id);
    if (id !== undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setUpKey(resdata.setupKey);
            setValueKey(resdata.value);
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
        setupkey: upKey,
        value: valueKey,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/set-key/${upKey}`;
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
        setupkey: upKey,
        value: valueKey,
      };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends/" + id,
          payload
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/set-key/${upKey}`;
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
          Set Key
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} xs={6}>
            <TextField
              name="setUpKey"
              label="Set Up Key"
              value={upKey}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              disabled={id !== undefined}
              onChange={(e) => setUpKey(e.target.value)}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="valueKey"
              label="Value"
              value={valueKey}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              onChange={(e) => setValueKey(e.target.value)}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              disabled={upKey === "" || valueKey === ""}
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

function DetailSetKey() {
  return (
    <React.Fragment>
      <Helmet title="Detail Set Key" />
      <Typography variant="h3" gutterBottom display="inline">
        Set Key
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Link component={NavLink} to="/konfigurasi/set-key">
          Set Key
        </Link>
        <Typography>Detail Set Key</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Header />
    </React.Fragment>
  );
}

export default DetailSetKey;
