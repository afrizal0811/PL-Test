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

export default function AddMasterCompetitor() {
  return (
    <React.Fragment>
      <Helmet title="Add Master Competitor" />
      <Typography variant="h3" gutterBottom display="inline">
        Add Master Competitor
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-competitor">
          Master Data Competitor
        </Link>
        <Typography>Add Master Competitor</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <Header />
      </Card>
    </React.Fragment>
  );
}
