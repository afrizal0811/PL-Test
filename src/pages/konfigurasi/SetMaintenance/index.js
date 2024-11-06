import { Link } from "@material-ui/core";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import FormSetMaintenance from "./FormSetMaintenance";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const SetMaintenance = () => {
  return (
    <React.Fragment>
      <Helmet title="Set Maintenance" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/konfigurasi/set-maintenance">
          Set Maintenance
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Set Maintenance
      </Typography>

      <Divider my={6} />

      <FormSetMaintenance />
    </React.Fragment>
  );
};

export default SetMaintenance;
