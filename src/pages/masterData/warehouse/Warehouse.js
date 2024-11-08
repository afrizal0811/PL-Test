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
import TableWarehouse from "./TableWarehouse";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Warehouse() {
  return (
    <React.Fragment>
      <Helmet title="Warehouse" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Warehouse</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Warehouse
      </Typography>

      <Divider my={6} />

      <TableWarehouse />
    </React.Fragment>
  );
}

export default Warehouse;
