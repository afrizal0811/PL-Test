import React from "react";
import ApprovalTable from "./ApprovalTable";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  Tab,
  Divider,
} from "@material-ui/core";
import { Box, spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import DaftarPengajuan from "./DaftarPengajuan";

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
