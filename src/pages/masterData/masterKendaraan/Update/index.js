import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "../Update/Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function UpdateMasterKendaraan() {
  return (
    <React.Fragment>
      <Helmet title="Update Master Kendaraan" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-kendaraan">
          Master Data Kendaraan
        </Link>
        <Typography>Update Master Kendaraan</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Update Master Kendaraan
      </Typography>

      <Header />
    </React.Fragment>
  );
}
