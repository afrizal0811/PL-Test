import React from "react";
import Header from "./Header";
// import DeskCallTable from "./DeskCallTable";
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

export default function ListSOOtorisasi() {
  return (
    <React.Fragment>
      <Helmet title="List SO Otorisasi" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/list-so-otorisasi">
          List SO Otorisasi
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        List SO Otorisasi
      </Typography>

      <Header />
    </React.Fragment>
  );
}
