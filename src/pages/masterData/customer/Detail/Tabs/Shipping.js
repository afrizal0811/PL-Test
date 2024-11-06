import React from "react";
import { Grid, TextField as MuiTextField } from "@material-ui/core";
import { TabPanel } from "@material-ui/lab";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

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
