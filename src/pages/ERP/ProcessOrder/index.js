import React from "react";
import Header from "./Header";
import ProcessOrderTable from "./ProcessOrderTable";
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

export default function ProcessOrder() {
  return (
    <React.Fragment>
      <Helmet title="Process Order" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/process-order">
          Process Order
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Process Order [Create Shipment]
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
          <ProcessOrderTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
