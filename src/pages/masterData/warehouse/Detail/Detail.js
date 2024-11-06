import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";
import Tabs from "./Tabs/Tabs";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

function DetailWarehouse() {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <React.Fragment>
      <Helmet title="Detail Warehouse" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Warehouse
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/warehouse">
          Warehouse
        </Link>
        <Typography>Detail Warehouse</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <Header setLocation={(e) => setLocation(e)} setLoading={setLoading} />
        <Tabs location={location} loading={loading} />
      </Card>
    </React.Fragment>
  );
}

export default DetailWarehouse;
