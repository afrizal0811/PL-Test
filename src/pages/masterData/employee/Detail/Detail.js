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

function DetailEmployee() {
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [employeeSetting, setEmployeeSetting] = useState({});
  const [employeeHistory, setEmployeeHistory] = useState([]);

  return (
    <React.Fragment>
      <Helmet title="Detail Employee" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Employee
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/employee">
          Employee
        </Link>
        <Typography>Detail Employee</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Card mb={6}>
        <Header
          setLoading={setLoading}
          setContactInfo={setContactInfo}
          setAddressInfo={setAddressInfo}
          setEmployeeSetting={setEmployeeSetting}
          setEmployeeHistory={setEmployeeHistory}
        />
        <Tabs
          loading={loading}
          contactInfo={contactInfo}
          addressInfo={addressInfo}
          employeeSetting={employeeSetting}
          employeeHistory={employeeHistory}
        />
      </Card>
    </React.Fragment>
  );
}

export default DetailEmployee;
