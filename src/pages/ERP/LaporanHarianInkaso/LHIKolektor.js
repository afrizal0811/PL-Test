import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";

import { spacing } from "@material-ui/system";
import LaporanHarianInkasoMobile from "./Kolektor/LaporanHarianInkasoMobile";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function LaporanHarianInkasoKolektor() {
  return (
    <React.Fragment>
      <Helmet title="Laporan Harian Inkaso (Kolektor)" />

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
          {/* <Paper sx={{ display: { xs: "block", sm: "none" } }}> */}
          <LaporanHarianInkasoMobile />
          {/* </Paper> */}
          {/* <Paper sx={{ display: { sm: "block", xs: "none" } }}>
            <LaporanHarianInkasoTable />
          </Paper> */}
          {/* <Footer /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
