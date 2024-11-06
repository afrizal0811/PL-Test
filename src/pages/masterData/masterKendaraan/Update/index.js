import React from "react";
import Header from "../Update/Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

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
