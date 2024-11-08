import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";
import Tabs from "./Tabs/Tabs";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

function DetailCustomer() {
  const [loading, setLoading] = useState(false);
  const [general, setGeneral] = useState({
    accountName: "empty",
    mainAddress: "empty",
    mainContact: "empty",
    country: "empty",
  });
  const [financial, setFinancial] = useState({});
  const [shipping, setShipping] = useState({});
  const [salesPerson, setSalesPerson] = useState([]);
  const [location, setLocation] = useState([]);
  const [primaryContact, setPrimaryContact] = useState({});

  React.useEffect(() => {
    // getData(id);
    console.log("location", location);
  }, [location]);

  return (
    <React.Fragment>
      <Helmet title="Detail Customer" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Customer
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/customer">
          Customer
        </Link>
        <Typography>Detail Customer</Typography>
      </Breadcrumbs>

      <Divider my={6} />
      <Card mb={6}>
        <Header
          setLoading={(e) => setLoading(e)}
          setGeneral={(e) => setGeneral(e)}
          setFinancial={(e) => setFinancial(e)}
          setShipping={(e) => setShipping(e)}
          setSalesPerson={(e) => setSalesPerson(e)}
          setLocation={(e) => setLocation(e)}
          setPrimaryContact={(e) => setPrimaryContact(e)}
        />
        <Tabs
          loading={loading}
          general={general}
          financial={financial}
          shipping={shipping}
          salesPerson={salesPerson}
          location={location}
          primaryContact={primaryContact}
        />
      </Card>
    </React.Fragment>
  );
}

export default DetailCustomer;
