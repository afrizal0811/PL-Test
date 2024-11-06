import React from "react";
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
import TransferKuotaTable from "./Table";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function AllocatedKuota() {
  return (
    <React.Fragment>
      <Helmet title="Transfer Kuota" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/transfer-kuota">
          Transfer Kuota
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Transfer Kuota
      </Typography>

      <Divider my={6} />

      <TransferKuotaTable />
    </React.Fragment>
  );
}
