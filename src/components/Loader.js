import React from "react";
import { Box, CircularProgress, Stack } from "@material-ui/core";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

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
