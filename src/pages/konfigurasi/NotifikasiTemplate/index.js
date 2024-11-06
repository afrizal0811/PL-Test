import React from "react";
import NotifikasiTemplateTable from "./NotifikasiTemplateTable";
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

export default function NotifikastiTemplate() {
  return (
    <React.Fragment>
      <Helmet title="Notifikasi Template" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/konfigurasi/notifikasi-template">
          Notifikasi Template
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Notifikasi Template
      </Typography>

      <Divider my={6} />

      <NotifikasiTemplateTable />
    </React.Fragment>
  );
}
