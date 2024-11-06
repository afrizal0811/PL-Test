import React from "react";
import Header from "./Header";
import DeskCallTable from "./DeskCallTable";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

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
