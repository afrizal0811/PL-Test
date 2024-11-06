import React from "react";
import TableIssue from "./TableIssue";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function Issue() {
  return (
    <React.Fragment>
      <Helmet title="Issue" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Issue</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Issues
      </Typography>

      <Divider my={6} />

      <TableIssue />
    </React.Fragment>
  );
}
