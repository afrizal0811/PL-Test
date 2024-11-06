import React from "react";
import CustomerPriceInfoTable from "./CustomerPriceInfoTable";
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

export default function CustomerPriceInfo() {
  return (
    <React.Fragment>
      <Helmet title="Customer Price Information" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/customer-price-info">
          Customer Price Information
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Customer Price Information
      </Typography>

      <Divider my={6} />

      <CustomerPriceInfoTable />
    </React.Fragment>
  );
}
