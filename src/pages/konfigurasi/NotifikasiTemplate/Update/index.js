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
import Header from "./Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function UpdateNotifikasiTemplate() {
  return (
    <React.Fragment>
      <Helmet title="Update Notifikasi Template" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/konfigurasi/notifikasi-template">
          Notifikasi Template
        </Link>
        <Typography>Update Notifikasi Template</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Notifikasi Template
      </Typography>
      {/* <Divider my={6} /> */}

      <Card mt={2}>
        <Header />
      </Card>
    </React.Fragment>
  );
}
