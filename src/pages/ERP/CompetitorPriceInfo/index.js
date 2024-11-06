import React from "react";
import CompetitorPriceInfoTable from "./CompetitorPriceInfoTable";
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

export default function CompetitorPriceInfo() {
  return (
    <React.Fragment>
      <Helmet title="Competitor Price Information" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/competitor-price-info">
          Competitor Price Information
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Competitor Price Information
      </Typography>

      <Divider my={6} />

      <CompetitorPriceInfoTable />
    </React.Fragment>
  );
}
