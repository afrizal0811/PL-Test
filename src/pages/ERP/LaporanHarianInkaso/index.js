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
// import LaporanHarianInkasoMobile from "./Mobile/LaporanHarianInkasoMobile";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function LaporanHarianInkaso() {
  return (
    <React.Fragment>
      <Helmet title="Laporan Harian Inkaso" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/laporan-harian-inkaso">
          Laporan Harian Inkaso
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Laporan Harian Inkaso
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          {/* <Header /> */}
          <LaporanHarianInkasoTable />
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
