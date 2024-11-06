import React from "react";
import Header from "./Header";
// import RoutingTable from "./RoutingTable";
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

function Routing() {
  return (
    <React.Fragment>
      <Helmet title="Routing" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/routing">
          Routing
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Routing
      </Typography>
      <Header />

      {/* <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}

export default Routing;
