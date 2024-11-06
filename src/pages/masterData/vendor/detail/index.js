import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Header from "./Header";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function DetailVendor() {
  return (
    <React.Fragment>
      <Helmet title="Detail Vendor" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Vendor
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/vendor">
          Master Vendor
        </Link>
        <Typography>Detail Vendor</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailVendor;
