import React from "react";
import { VectorMap } from "react-jvectormap";
import styled from "styled-components/macro";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { spacing } from "@mui/system";

const MapContainer = styled.div`
  height: 300px;
`;

const Card = styled(MuiCard)(spacing);

function USA() {
  const options = {
    map: "us_aea",
    regionStyle: {
      initial: {
        fill: blue[500],
      },
    },
    backgroundColor: "transparent",
    containerStyle: {
      width: "100%",
      height: "100%",
    },
    zoomOnScroll: false,
  };

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          USA Map
        </Typography>
        <MapContainer>
          <VectorMap {...options} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}

export default USA;
