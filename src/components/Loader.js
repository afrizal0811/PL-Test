import { Box, CircularProgress, Stack } from "@mui/material";
import React from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";

function Loader() {
  return (
    <Stack spacing={1} marginY={12}>
      <Box item style={{ textAlign: "center" }}>
        <CircularProgress disableShrink style={{ textAlign: "center" }} />
      </Box>
      <Box item>
        <h1 style={{ textAlign: "center" }}>Loading</h1>
      </Box>
      <Box item>
        <Timer
          active={true}
          duration={null}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <Timecode />
        </Timer>
      </Box>
    </Stack>
  );
}

export default Loader;
