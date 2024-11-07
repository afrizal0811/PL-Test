import {
  CardContent,
  CircularProgress,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [loading, setLoading] = useState(false);
  const [Desc, setDesc] = useState("");
  const [Sync, setSync] = useState("");
  const [Branch, setBranch] = useState("");
  const [IDZona, setIDZona] = useState("");
  const [statusZona, setstatusZona] = useState("active");
  const history = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (idd) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/ShippingZoneSyncReps/" +
            idd,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200) {
            setDesc(response.data.Description);
            setIDZona(response.data.ZoneID);
            setstatusZona(response.data.Status);
            setBranch(response.data.Branch);
            setSync(response.data.LastSync);
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

  return (
    <Card mb={6}>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
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
        <>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Header
            </Typography>
            <Typography variant="body2" gutterBottom mt={2}>
              Shipping Zone
            </Typography>
            <Grid container spacing={6} md={12} mt={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  name="zoneID"
                  label="ID Zona"
                  value={IDZona}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="Deskripsi"
                  label="Description"
                  value={!Desc || Desc == "" ? " " : Desc}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="Branch"
                  label="Branch"
                  value={!Branch || Branch == "" ? " " : Branch}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="Status"
                  label="Status"
                  value={!statusZona || statusZona == "" ? " " : statusZona}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </>
      )}
    </Card>
  );
}

function DetailZona() {
  return (
    <React.Fragment>
      <Helmet title="Detail Zona" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Shipping Zone
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-zona">
          Shipping Zone
        </Link>
        <Typography>Detail Shipping Zone</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailZona;
