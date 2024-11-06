import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";

import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function UpdateChangeLotNbrExpDate() {
  return (
    <React.Fragment>
      <Helmet title="Change Lot Nbr & Exp Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/change-lot-nbr-exp-date">
          Change Lot Nbr & Exp Date
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Change Lot Nbr & Exp Date
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
