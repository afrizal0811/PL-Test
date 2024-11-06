import React from "react";
import Table from "./Table";
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
