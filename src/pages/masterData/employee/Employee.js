import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import TableEmployee from "./TableEmployee";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function Employee() {
  return (
    <React.Fragment>
      <Helmet title="Employee" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Employee</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Employee
      </Typography>

      <Divider my={6} />

      <TableEmployee />
    </React.Fragment>
  );
}

export default Employee;
