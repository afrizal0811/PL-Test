import React from "react";
import TableCustomer from "./TableCustomer";
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

function Customer() {
  return (
    <React.Fragment>
      <Helmet title="Customer" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Customer</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Customer
      </Typography>

      <Divider my={6} />

      <TableCustomer />
    </React.Fragment>
  );
}

export default Customer;
