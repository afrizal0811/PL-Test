import { Grid, TextField as MuiTextField } from "@mui/material";
import { spacing } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

TabFinancial.propTypes = {
  data: PropTypes.object,
};

export default function TabFinancial(props) {
  return (
    <>
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
            value={!props.data?.financial?.terms ? "" : "ada"}
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
