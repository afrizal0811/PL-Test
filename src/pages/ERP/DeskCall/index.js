import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function DeskCall() {
  return (
    <React.Fragment>
      <Helmet title="Desk Call" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/desk-call">
          Desk Call
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Desk Call
      </Typography>

      <Header />
    </React.Fragment>
  );
}
