import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
const Card = styled(MuiCard)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function DetailPromoActivity() {
  return (
    <React.Fragment>
      <Helmet title="Add Promo Activity" />
      <Typography variant="h3" gutterBottom display="inline">
        Promo Activity
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link component={NavLink} to="/promo-activity">
          Promo Activity
        </Link>
        <Typography>Detail Promo Activity</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}
