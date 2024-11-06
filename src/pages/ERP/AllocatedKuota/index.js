import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import AllocatedKuotaTable from "./AllocatedKuotaTable.js";

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
