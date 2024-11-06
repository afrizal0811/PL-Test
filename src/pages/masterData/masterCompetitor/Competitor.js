import React from "react";
import TableCompetitor from "./TableCompetitor";
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
