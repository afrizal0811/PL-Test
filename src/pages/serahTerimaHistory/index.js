import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";
import SerahTerimaTable from "./SerahTerimaTable";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";

import { spacing } from "@mui/system";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function SerahTerimaHistory() {
  const [StatusSTHistory, setStatusSTHistory] = useState("Draft");
  const [checkedSerahTerima, setCheckedSerahTerima] = useState(false);
  const [checkedRouting, setCheckedRouting] = useState(false);

  const handleCheckSerahTerima = (event) => {
    setCheckedSerahTerima(event.target.checked);
  };
  const handleCheckRouting = (event) => {
    setCheckedRouting(event.target.checked);
  };

  return (
    <React.Fragment>
      <Helmet title="Serah Terima History" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/serah-terima-history">
          Serah Terima History
        </Link>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Serah Terima History
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header
            StatusSTHistory={StatusSTHistory}
            setStatusSTHistory={setStatusSTHistory}
            checkedSerahTerima={checkedSerahTerima}
            checkedRouting={checkedRouting}
          />
          <SerahTerimaTable
            StatusSTHistory={StatusSTHistory}
            setStatusSTHistory={setStatusSTHistory}
            handleCheckSerahTerima={handleCheckSerahTerima}
            handleCheckRouting={handleCheckRouting}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SerahTerimaHistory;
