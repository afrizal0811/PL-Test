import React from "react";
import styled from "styled-components/macro";
import { Button as MuiButton } from "@material-ui/core";
import { spacing } from "@material-ui/system";

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
