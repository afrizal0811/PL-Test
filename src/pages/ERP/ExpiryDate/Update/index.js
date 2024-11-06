import { spacing } from "@material-ui/system";
import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function UpdateExpiryDate() {
  return (
    <React.Fragment>
      <Helmet title="Update Expiry Date" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/expiry-date">
          Expiry Date Detail
        </Link>
        <Typography>Expiry Date Detail</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Expiry Date Detail
      </Typography>

      <Header />
    </React.Fragment>
  );
}
