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
