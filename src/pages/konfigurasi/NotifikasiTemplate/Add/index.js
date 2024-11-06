import React from "react";
import Header from "./Header";
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

export default function AddNotifikasiTemplate() {
  return (
    <React.Fragment>
      <Helmet title="Add Notifikasi Template" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/konfigurasi/notifikasi-template">
          Notifikasi Template
        </Link>
        <Typography>Add Notifikasi Template</Typography>
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
