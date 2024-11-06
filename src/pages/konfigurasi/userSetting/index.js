import React, { useState } from "react";
import Header from "./Header";
import Tabs from "./Tabs/Tabs";
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

export default function UserSetting() {
  const [loading, setLoading] = useState(false);
  const [contactInfo, setContactInfo] = useState({});
  const [addressInfo, setAddressInfo] = useState({});
  const [employeeSetting, setEmployeeSetting] = useState({});
  const [employeeHistory, setEmployeeHistory] = useState([]);

  return (
    <React.Fragment>
      <Helmet title="Pengaturan User" />
      <Typography variant="h3" gutterBottom display="inline">
        Pengaturan User
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Typography>Pengaturan User</Typography>
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
