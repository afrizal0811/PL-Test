import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Table from "./Table";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function DetailMutationAllocatedKuota() {
  return (
    <React.Fragment>
      <Helmet title="Detail Mutation Allocated Kuota" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/mutation-allocated-kuota">
          Mutation Allocated Kuota
        </Link>
        <Typography>Detail Mutation Allocated Kuota</Typography>
      </Breadcrumbs>
      <Typography variant="h3" mb={2} gutterBottom display="inline">
        Detail Mutation Allocated Kuota
      </Typography>
      <Table />
    </React.Fragment>
  );
}
