import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent,
  CircularProgress,
  Divider as MuiDivider,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import moment from "moment";
import { GetConfig } from "../../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [loading, setLoading] = useState(false);
  const [Desc, setDesc] = useState("");
  const [Sync, setSync] = useState("");
  // const [Branch, setBranch] = useState("");
  const [AssetID, setAssetID] = useState("");
  const [AssetType, setAssetType] = useState("active");
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
          `${process.env.REACT_APP_DOMAIN_API}` + "/FixedAssetReps/" + idd,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200) {
            setDesc(response.data.Description);
            setAssetID(response.data.AssetID);
            setAssetType(response.data.AssetType);
            // setBranch(response.data.Branch);
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
              Fixed Asset
            </Typography>
            <Grid container spacing={6} md={12} mt={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  name="Asset ID"
                  label="Asset ID"
                  value={AssetID}
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
                  name="Last Sync"
                  label="Last Sync"
                  value={
                    !Sync || Sync == ""
                      ? " "
                      : moment(Sync).format("DD/MM/YYYY HH:mm:ss")
                  }
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
                  name="Asset Type"
                  label="Asset Type"
                  value={!AssetType || AssetType == "" ? " " : AssetType}
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

function DetailFixedAsset() {
  return (
    <React.Fragment>
      <Helmet title="Detail Fixed Asset" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Fixed Asset
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/fixed-asset">
          Fixed Asset
        </Link>
        <Typography>Detail Fixed Asset</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailFixedAsset;
