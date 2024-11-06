import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  // Card as MuiCard,
  // Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
// const Card = styled(MuiCard)(spacing);
// const Divider = styled(MuiDivider)(spacing);

export default function AddAllocatedKuota() {
  return (
    <React.Fragment>
      <Helmet title="Add Allocated Kuota" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/allocated-kuota">
          Allocated Kuota
        </Link>
        <Typography>Add Allocated Kuota</Typography>
      </Breadcrumbs>
      <Typography variant="h3" mb={2} gutterBottom display="inline">
        Detail Allocated Kuota
      </Typography>
      <Header />
    </React.Fragment>
  );
}
