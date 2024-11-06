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

export default function UpdateMasterCompetitor() {
  return (
    <React.Fragment>
      <Helmet title="Update Master Competitor" />
      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-competitor">
          Master Data Competitor
        </Link>
        <Typography>Detail Master Data Competitor</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Master Data Competitor
      </Typography>
      <Header />
    </React.Fragment>
  );
}
