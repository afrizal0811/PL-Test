import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoaderFullScreen = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.75,
        position: "absolute",
        zIndex: 50,
      }}
    >
      <CircularProgress disableShrink style={{ textAlign: "center" }} />
    </Box>
  );
};

export default LoaderFullScreen;
