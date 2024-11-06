import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import TableCompetitor from "./TableCompetitor";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function MasterCompetitor() {
  return (
    <React.Fragment>
      <Helmet title="Master Competitor" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Data Competitor</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Master Data Competitor
      </Typography>

      <Divider my={6} />

      <TableCompetitor />
    </React.Fragment>
  );
}
