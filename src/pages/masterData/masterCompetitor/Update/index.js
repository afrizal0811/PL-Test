import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

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
