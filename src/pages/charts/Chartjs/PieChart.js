import React from "react";
import Chart from "react-chartjs-2";
import styled, { withTheme } from "styled-components/macro";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 300px;
`;

function PieChart({ theme }) {
  const data = {
    labels: ["Social", "Search Engines", "Direct", "Other"],
    datasets: [
      {
        data: [260, 125, 54, 146],
        backgroundColor: [
          theme.palette.secondary.main,
          orange[500],
          red[500],
          theme.palette.grey[300],
        ],
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Pie Chart
        </Typography>
        <Typography variant="body2" gutterBottom>
          Pie charts are excellent at showing the relational proportions between
          data.
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Chart type="pie" data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(PieChart);
