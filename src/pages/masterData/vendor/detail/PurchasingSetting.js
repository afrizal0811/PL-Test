import { Grid, TextField as MuiTextField } from "@mui/material";
import { spacing } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

TabPurchasingSetting.propTypes = {
  data: PropTypes.object,
};

export default function TabPurchasingSetting(props) {
  return (
    <>
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
            value={
              !props?.data?.purchase?.taxRegistrationID
                ? " "
                : props?.data?.purchase?.taxRegistrationID
            }
            fullWidth
            variant="outlined"
            my={2}
            InputLabelProps={{
              shrink: true,
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="taxZone"
            label="Tax Zone"
            value={
              !props?.data?.purchase?.taxZone
                ? " "
                : props?.data?.purchase?.taxZone
            }
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
