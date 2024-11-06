import React from "react";
import AllocatedKuotaTable from "./AllocatedKuotaTable.js";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function AllocatedKuota() {
  return (
    <React.Fragment>
      <Helmet title="Allocated Kuota" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/allocated-kuota">
          Allocated Kuota
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Allocated Kuota
      </Typography>

      <Divider my={6} />

      <AllocatedKuotaTable />
    </React.Fragment>
  );
}
