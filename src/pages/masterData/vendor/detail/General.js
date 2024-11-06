import { Grid, TextField as MuiTextField } from "@mui/material";
import { spacing } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

TabGeneral.propTypes = {
  data: PropTypes.object,
  primaryContact: PropTypes.object,
};

export default function TabGeneral(props) {
  return (
    <>
      <Grid container spacing={1} md={12}>
        <Grid item md={8}>
          <Grid container spacing={3} md={12}>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Account Info</h1>
              </u>
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                name="accountName"
                label="Account Name"
                value={!props.data?.VendorName ? " " : props.data?.VendorName}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            {/* <Grid item md={12} xs={12}>
              <u>
                <h1>Account Address</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="addressLine1"
                label="Address Line 1"
                value={
                  !props.data?.mainContact?.address?.addressLine1
                    ? " "
                    : props.data?.mainContact?.address?.addressLine1
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="addressLine2"
                label="Address Line 2"
                value={
                  !props.data?.mainContact?.address?.addressLine2
                    ? " "
                    : props.data?.mainContact?.address?.addressLine2
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="city"
                label="City"
                value={
                  !props.data?.mainContact?.address?.city
                    ? " "
                    : props.data?.mainContact?.address?.city
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="postalCode"
                label="Postal Code"
                value={
                  !props.data?.mainContact?.address?.PostalCode
                    ? " "
                    : props.data?.mainContact?.address?.PostalCode
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="country"
                label="Country"
                value={
                  !props.data?.mainContact?.address?.Country
                    ? " "
                    : props.data?.mainContact?.address?.Country
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Additional Account Info</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="phone1"
                label="Phone1"
                value={!props.data?.mainContact?.phone1 ? " " : "ada"}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="phone2"
                label="Phone2"
                value={
                  !props.data?.mainContact?.phone1
                    ? " "
                    : props.data?.mainContact?.phone1
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="phone3"
                label="Phone3"
                value={
                  !props.data?.mainContact?.fax
                    ? " "
                    : props.data?.mainContact?.fax
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="email"
                label="Email"
                value={
                  !props.data?.mainContact?.email
                    ? " "
                    : props.data?.mainContact?.email
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
            <Grid item md={12} xs={12}>
              <u>
                <h1>Primary Contact</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="name"
                label="Name"
                value={
                  !props.primaryContact?.NameContact
                    ? " "
                    : props.primaryContact?.NameContact
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="jobTitle"
                label="Job Title"
                value={
                  !props.primaryContact?.JobTitlePC
                    ? " "
                    : props.primaryContact?.JobTitlePC
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="email"
                label="Email"
                value={
                  !props.primaryContact?.EmailPC
                    ? " "
                    : props.primaryContact?.EmailPC
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="phone1"
                label="Phone1"
                value={
                  !props.primaryContact?.Phone1PC
                    ? " "
                    : props.primaryContact?.Phone1PC
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="phone2"
                label="Phone2"
                value={
                  !props.primaryContact?.Phone2PC
                    ? " "
                    : props.primaryContact?.Phone2PC
                }
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
