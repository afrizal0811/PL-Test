import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function AddExpiryDate() {
  return (
    <React.Fragment>
      <Helmet title="Detail Expiry Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/expiry-date">
          Expiry Date
        </Link>
        <Typography>Detail Expiry Date</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Detail Expiry Date
      </Typography>
      <Header />
    </React.Fragment>
  );
}
