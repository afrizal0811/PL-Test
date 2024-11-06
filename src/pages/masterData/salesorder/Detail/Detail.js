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

function DetailSalesOrder() {
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  const [details, setDetails] = useState([]);
  return (
    <React.Fragment>
      <Helmet title="Detail SO" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Sales Order
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/sales-order">
          Sales Order
        </Link>
        <Typography>Detail Sales Order</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <Header
          setLoading={setLoading}
          setPayment={setPayment}
          setDetails={setDetails}
        />
        <Tabs loading={loading} details={details} payment={payment} />
      </Card>
    </React.Fragment>
  );
}

export default DetailSalesOrder;
