import { spacing } from "@material-ui/system";
import { TabPanel } from "@mui/lab";
import { Grid, TextField as MuiTextField } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

export default function Shipping(props) {
  return (
    <TabPanel value="3">
      <Grid container spacing={3} md={8}>
        <Grid item md={12} xs={12}>
          <u>
            <h1>Tax Setting</h1>
          </u>
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="taxRegistrationID"
            label="Tax Registration ID"
            value={props.shipping.taxRegistrationID}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="taxZone"
            label="Tax Zone"
            value={props.shipping.taxZone}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
      </Grid>
    </TabPanel>
  );
}
