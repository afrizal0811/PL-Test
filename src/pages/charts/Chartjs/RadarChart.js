import React from "react";
import Chart from "react-chartjs-2";
import styled, { withTheme } from "styled-components/macro";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { lighten } from "@mui/material/styles";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

function RadarChart({ theme }) {
  const data = {
    labels: ["Speed", "Reliability", "Comfort", "Safety", "Efficiency"],
    datasets: [
      {
        label: "Model X",
        backgroundColor: lighten(theme.palette.secondary.main, 0.33),
        borderColor: theme.palette.secondary.main,
        pointBackgroundColor: theme.palette.secondary.main,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: theme.palette.secondary.main,
        data: [70, 53, 82, 60, 33],
      },
      {
        label: "Model S",
        backgroundColor: lighten(orange[600], 0.33),
        borderColor: orange[600],
        pointBackgroundColor: orange[600],
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: orange[600],
        data: [35, 38, 65, 85, 84],
      },
    ],
  };

  const options = { maintainAspectRatio: false };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Radar Chart
        </Typography>
        <Typography variant="body2" gutterBottom>
          A radar chart is a way of showing multiple data points and the
          variation between them.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Chart type="radar" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(RadarChart);
