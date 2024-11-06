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

export default function AddCompetitorPriceInfo() {
  return (
    <React.Fragment>
      <Helmet title="Add Master Competitor" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/competitor-price-info">
          Competitor Price Information
        </Link>
        <Typography>Detail Competitor Price Information</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Detail Competitor Price Information
      </Typography>

      <Header />
    </React.Fragment>
  );
}
