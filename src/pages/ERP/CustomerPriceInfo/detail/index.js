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

export default function DetailCustomerPriceInfo() {
  return (
    <React.Fragment>
      <Helmet title="Detail Customer Price Information" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link component={NavLink} to="/customer-price-info">
          Customer Price Information
        </Link>
        <Typography>Customer Price Information Detail</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Customer Price Information
      </Typography>
      <Header />
    </React.Fragment>
  );
}
