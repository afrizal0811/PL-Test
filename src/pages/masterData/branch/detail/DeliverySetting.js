import { spacing } from "@material-ui/system";
import { Grid, TextField as MuiTextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

TabDeliverySetting.propTypes = {
  TaxZone: PropTypes.any,
};

export default function TabDeliverySetting(props) {
  return (
    <>
      <Grid container spacing={3} md={8}>
        <Grid item md={12} xs={12}>
          <u>
            <h1>Shipping Instructions</h1>
          </u>
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="taxZone"
            label="Tax Zone"
            value={!props.TaxZone ? " " : props.TaxZone}
            fullWidth
            variant="outlined"
            my={2}
            InputLabelProps={{
              shrink: true,
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
