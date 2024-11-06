import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import TableKategori from "./TableKategori";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function Kategori() {
  return (
    <React.Fragment>
      <Helmet title="Kategori" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Kategori</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Kategori
      </Typography>

      <Divider my={6} />

      <TableKategori />
    </React.Fragment>
  );
}
