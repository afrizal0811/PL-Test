import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import {
  Alert,
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@material-ui/system";

import { getEmployeeName } from "../../../utils/jwt";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Default() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Helmet title="Default Dashboard" />
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid item md={3} xs={12}>
          <img
            alt="PL-Banner"
            src="/static/img/PL-Banner.png"
            style={{ maxWidth: "100%", height: "auto" }}
          ></img>
        </Grid>
        <Grid item md={9} xs={12}>
          <Alert mb={4} severity="info">
            This page is only visible by authenticated users.
          </Alert>
          <Typography variant="h3" mt={4} gutterBottom>
            Selamat Datang {getEmployeeName()}
          </Typography>
          {/* <Typography variant="subtitle1">
            {t("Welcome back")}, {getEmployeeName()} {t("We've missed you")}.{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography> */}
        </Grid>

        {/* <Grid item>
          <Actions />
        </Grid> */}
      </Grid>

      {/* <Divider my={6} /> */}

      {/* <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Sales Today"
            amount="2.532"
            chip="Today"
            percentagetext="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="170.212"
            chip="Annual"
            percentagetext="-14%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            chip="Monthly"
            percentagetext="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Pending Orders"
            amount="45"
            chip="Yearly"
            percentagetext="-9%"
            percentagecolor={red[500]}
            illustration="/static/img/illustrations/waiting.png"
          />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          <LineChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DoughnutChart />
        </Grid>
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <BarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <Table />
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}

export default Default;
