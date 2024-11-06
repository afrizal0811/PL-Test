import React, { useState } from "react";
import Tabs from "./Tabs/Tabs";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

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
