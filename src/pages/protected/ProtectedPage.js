import React from "react";
import styled from "styled-components/macro";

import { Alert as MuiAlert } from "@material-ui/core";
import { spacing } from "@material-ui/system";

import Default from "../dashboards/Default";

const Alert = styled(MuiAlert)(spacing);

function ProtectedPage() {
  return (
    <React.Fragment>
      <Default />
    </React.Fragment>
  );
}

export default ProtectedPage;
