import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import LaporanHarianInkasoTable from "./LaporanHarianInkasoTable";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  Paper,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function LaporanHarianInkasoDetail() {
  return (
    <React.Fragment>
      <Helmet title="Laporan Harian Inkaso Detail" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/laporan-harian-inkaso">
          Laporan Harian Inkaso
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Laporan Harian Inkaso Detail
      </Typography>

      {/* <Header /> */}
      <LaporanHarianInkasoTable />
      {/* <Footer /> */}
    </React.Fragment>
  );
}
