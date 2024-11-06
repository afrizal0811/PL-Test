import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

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
