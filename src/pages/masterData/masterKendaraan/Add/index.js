import React from "react";
import Header from "../Add/Header";
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
