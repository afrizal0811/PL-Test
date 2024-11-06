import { Button as MuiButton } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

const Button = styled(MuiButton)(spacing);

export default function RefreshButton() {
  return (
    <div style={{ height: "35px" }}>
      <div style={{ float: "right" }}>
        <Button mr={2} variant="outlined" color="primary">
          Refresh
        </Button>
      </div>
    </div>
  );
}
