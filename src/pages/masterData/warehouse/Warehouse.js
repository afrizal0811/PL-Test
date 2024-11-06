import React from "react";
import TableWarehouse from "./TableWarehouse";
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
