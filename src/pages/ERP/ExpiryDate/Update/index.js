import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function UpdateExpiryDate() {
  return (
    <React.Fragment>
      <Helmet title="Update Expiry Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/expiry-date">
          Expiry Date Detail
        </Link>
        <Typography>Expiry Date Detail</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Expiry Date Detail
      </Typography>

      <Header />
    </React.Fragment>
  );
}
