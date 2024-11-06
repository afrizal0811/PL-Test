import React from "react";
import Header from "./Header";
import BatchingHistoryTable from "./BatchingHistoryTable";
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

export default function BatchingHistory() {
  return (
    <React.Fragment>
      <Helmet title="Batching History" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/batching-history">
          Batching History
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Batching History
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
          <BatchingHistoryTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
