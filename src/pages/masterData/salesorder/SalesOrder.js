import React from "react";
import TableSalesOrder from "./TableSalesOrder";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function SalesOrder() {
  return (
    <React.Fragment>
      <Helmet title="Sales Order" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Sales Order</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Sales Order
      </Typography>

      <Divider my={6} />

      <TableSalesOrder />
    </React.Fragment>
  );
}

export default SalesOrder;
