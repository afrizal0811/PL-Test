import React from "react";
import { VectorMap } from "react-jvectormap";
import styled from "styled-components/macro";

import { spacing } from "@material-ui/system";
import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const MapContainer = styled.div`
  height: 300px;
`;

const Card = styled(MuiCard)(spacing);

function NorthAmerica() {
  const options = {
    map: "north_america_mill",
    regionStyle: {
      initial: {
        fill: green[500],
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
          North America Map
        </Typography>
        <MapContainer>
          <VectorMap {...options} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}

export default NorthAmerica;
