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
import TableIssue from "./TableIssue";

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
