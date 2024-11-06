import { spacing } from "@material-ui/system";
import {
  // Card as MuiCard,
  // Divider as MuiDivider,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

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
