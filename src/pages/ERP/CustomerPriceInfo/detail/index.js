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
