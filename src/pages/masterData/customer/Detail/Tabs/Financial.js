import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { Grid, TextField as MuiTextField } from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

export default function Financial(props) {
  return (
    <TabPanel value="2">
      <Grid container spacing={3} md={8}>
        <Grid item md={12} xs={12}>
          <u>
            <h1>Financial Setting</h1>
          </u>
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="term"
            label="Terms"
            value={props.financial.term}
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
