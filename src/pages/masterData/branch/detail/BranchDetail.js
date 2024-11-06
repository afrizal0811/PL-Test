import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { Grid, TextField as MuiTextField } from "@material-ui/core";
import { spacing } from "@material-ui/system";

const TextField = styled(MuiTextField)(spacing);

TabBranchDetail.propTypes = {
  AccountName: PropTypes.any,
  Email: PropTypes.any,
  Phone1: PropTypes.any,
  Phone2: PropTypes.any,
  AddressLine1: PropTypes.any,
  AddressLine2: PropTypes.any,
  City: PropTypes.any,
  PostalCode: PropTypes.any,
  LegalName: PropTypes.any,
  TaxRegistrationID: PropTypes.any,
};

export default function TabBranchDetail(props) {
  return (
    <>
      <Grid container spacing={1} md={12}>
        <Grid item md={8}>
          <Grid container spacing={3} md={12} noValidate autoComplete="off">
            <Grid item md={12} xs={12}>
              <u>
                <h1>Main Contact</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="accountName"
                label="Account Name"
                value={!props.AccountName ? " " : props.AccountName}
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
                name="email"
                label="Email"
                value={!props.Email ? " " : props.Email}
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
                name="phone1"
                label="Phone1"
                value={!props.Phone1 ? " " : props.Phone1}
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
                name="phone2"
                label="Phone2"
                value={!props.Phone2 ? " " : props.Phone2}
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Main Address</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="addressline1"
                label="Addres Line1"
                value={props.AddressLine1}
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
                name="addressline2"
                label="Address Line2"
                value={props.AddressLine2}
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
                name="city"
                label="City"
                value={!props.City ? " " : props.City}
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
                name="postalCode"
                label="Postal Code"
                value={!props.PostalCode ? " " : props.PostalCode}
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
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={3} md={12}>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Tax Registration Info</h1>
              </u>
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="legalName"
                label="Legal Name"
                value={!props.LegalName ? " " : props.LegalName}
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="taxRegistrationID"
                label="Tax Registration ID"
                value={!props.TaxRegistrationID ? " " : props.TaxRegistrationID}
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
        </Grid>
      </Grid>
    </>
  );
}
