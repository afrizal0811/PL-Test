import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { Helmet } from "react-helmet-async";
import {
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
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
