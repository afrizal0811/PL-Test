import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "../Add/Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function AddMasterKendaraan() {
  return (
    <React.Fragment>
      <Helmet title="Add Master Kendaraan" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-kendaraan">
          Master Data Kendaraan
        </Link>
        <Typography>Add Master Kendaraan</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Add Master Kendaraan
      </Typography>

      <Header />
    </React.Fragment>
  );
}
