import React from "react";
import { VectorMap } from "react-jvectormap";
import styled from "styled-components/macro";

import { red } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import { CardContent, Card as MuiCard, Typography } from "@mui/material";

const MapContainer = styled.div`
  height: 300px;
`;

const Card = styled(MuiCard)(spacing);

function SouthAmerica() {
  const options = {
    map: "south_america_mill",
    regionStyle: {
      initial: {
        fill: red[500],
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
          South America Map
        </Typography>
        <MapContainer>
          <VectorMap {...options} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}

export default SouthAmerica;
