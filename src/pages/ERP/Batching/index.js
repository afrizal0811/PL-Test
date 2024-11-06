import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";
import LocationSuggestionTable from "./LocationSuggestionTable";
import RoutingDetailTable from "./RoutingDetailTable";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";

import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Batching() {
  return (
    <React.Fragment>
      <Helmet title="Batching" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/batching">
          Batching
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Batching
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
          <RoutingDetailTable />
          <LocationSuggestionTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Batching;
