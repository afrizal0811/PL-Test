import {
  Divider,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function DetailPengajuan() {
  const [Panel, setPanel] = React.useState("1");
  return (
    <React.Fragment>
      <Helmet title="Detail Pengajuan" />

      <Breadcrumbs aria-label="Breadcrumb" mb={3}>
        <Link component={NavLink} to="/dashboard-approval">
          Dashboard Approval
        </Link>
        <Link component={NavLink}>Detail Pengajuan</Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Detail Pengajuan
      </Typography>

      <Divider my={6} />

      {/* <AllocatedKuotaTable /> */}
    </React.Fragment>
  );
}
