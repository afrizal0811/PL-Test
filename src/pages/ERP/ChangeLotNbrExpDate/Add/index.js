import React from "react";
import Header from "./Header";
import Tabs from "./Tabs";
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

export default function AddChangeLotNbrExpDate() {
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
