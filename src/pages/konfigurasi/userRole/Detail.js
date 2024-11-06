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

import { spacing } from "@mui/system";
import Header from "./Header";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function DetailUserRole() {
  return (
    <React.Fragment>
      <Helmet title="Detail User Role" />
      <Typography variant="h3" gutterBottom display="inline">
        User Role
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Link component={NavLink} to="/konfigurasi/user-role">
          User Role
        </Link>
        <Typography>Detail User Role</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Header />
    </React.Fragment>
  );
}

export default DetailUserRole;
