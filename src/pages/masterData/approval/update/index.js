import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function UpdateMasterApproval() {
  return (
    <React.Fragment>
      <Helmet title="Detail Master Approval" />
      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/approval">
          Sistem Approval
        </Link>
        <Typography>Detail Master Approval</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Detail Approval
      </Typography>
      <Header />
    </React.Fragment>
  );
}
