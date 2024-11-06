import * as React from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { getBrach } from "../../utils/jwt";

function NavbarBranch() {
  return (
    <React.Fragment>
      <Tooltip title="Branch">
        <Typography variant="h4" component="span" mr={5}>
          {getBrach()}
        </Typography>
      </Tooltip>
    </React.Fragment>
  );
}

export default NavbarBranch;
