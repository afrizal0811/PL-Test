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
import ChangeLotNbrExpDateTable from "./ChangeLotNbrExpDateTable";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function ChangeLotNbrExpDate() {
  return (
    <React.Fragment>
      <Helmet title="Change Lot Number and Exp Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Home
        </Link>
        <Link component={NavLink} to="/change-lot-nbr-exp-date">
          Change Lot Number and Exp Date
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Change Lot Number and Exp Date
      </Typography>

      <Divider my={6} />

      <ChangeLotNbrExpDateTable />
    </React.Fragment>
  );
}
