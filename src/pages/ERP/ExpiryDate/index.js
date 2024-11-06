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
import ExpiryDateTable from "./ExpiryDateTable";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function ExpiryDate() {
  return (
    <React.Fragment>
      <Helmet title="Expiry Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        {/* <Link component={NavLink} to="/expiry-date">
          Expiry Date
        </Link> */}
        <Typography>Expiry Date</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Expiry Date
      </Typography>

      <Divider my={6} />

      <ExpiryDateTable />
    </React.Fragment>
  );
}
