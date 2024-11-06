import React from "react";
import TableKategori from "./TableKategori";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

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
