import { TabPanel } from "@mui/lab";
import { Grid, TextField as MuiTextField } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

export default function General(props) {
  return (
    <TabPanel value="1">
      <Grid container spacing={1} md={12}>
        <Grid item md={8}>
          <Grid container spacing={3} md={12}>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Account Info</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="accountName"
                label="Account Name"
                value={props.general.accountName}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Account Address</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="mainAddress"
                label="Main Address"
                value={props.general.mainAddress}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="mainContact"
                label="Main Contact"
                value={props.general.mainContact}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="country"
                label="Country"
                value={props.general.country}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={3} md={12}>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Primary Contact</h1>
              </u>
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="name"
                label="Name"
                value={props.primaryContact.NamePC}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="email"
                label="Email"
                value={props.primaryContact.EmailPC}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="jobTitle"
                label="Contact"
                value={props.primaryContact.Phone1PC}
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
    </TabPanel>
  );
}
