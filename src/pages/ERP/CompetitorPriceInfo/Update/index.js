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

export default function UpdateCompetitorPriceInfo() {
  return (
    <React.Fragment>
      <Helmet title="Update Master Competitor" />

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/competitor-price-info">
          Competitor Price Information
        </Link>
        <Typography>Update Competitor Price Information</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <Header />
      </Card>
    </React.Fragment>
  );
}
