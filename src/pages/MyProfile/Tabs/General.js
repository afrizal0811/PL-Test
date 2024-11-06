import { Button, Grid, TextField as MuiTextField } from "@mui/material";
import { spacing } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components/macro";
import DialogChangePassword from "./DialogChangePassword";

const TextField = styled(MuiTextField)(spacing);

export default function General(props) {
  const [isModalChangePasswordOpen, setIsModalChangePasswordOpen] =
    useState(false);

  return (
    <>
      <Grid container spacing={1} md={12}>
        <Grid item md={8}>
          <Grid container spacing={3} md={12} alignItems="center">
            <Grid item md={12} xs={12}>
              <u>
                <h1>Contact Info</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="accountName"
                label="First Name"
                value={props.contactInfo.firstName}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {console.log("ini props.contactInfo = ", props.contactInfo)}
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="addressLine1"
                label="Last Name"
                value={props.contactInfo.lastName}
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
                label="Middle Name"
                value={props.contactInfo.middleName}
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
                label="Email"
                value={props.contactInfo.email}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <u>
                <h1>Address Info</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="phone1"
                label="Country"
                value={props.addressInfo.Country}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <u>
                <h1>Profile Info</h1>
              </u>
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="phone1"
                label="Employee Login"
                value={props.employeeSetting.EmployeeLogin}
                fullWidth
                variant="outlined"
                disabled={true}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                disabled={props.isLoading}
                onClick={() => setIsModalChangePasswordOpen(true)}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid container spacing={3} md={12}>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Employee Settings</h1>
              </u>
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="name"
                label="Employee Class"
                value={props.employeeSetting.EmployeeClass}
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
                label="Branch"
                value={props.employeeSetting.BranchID}
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
                label="Department"
                value={props.employeeSetting.DepartmentID}
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
      <DialogChangePassword
        isModalOpen={isModalChangePasswordOpen}
        setIsModalOpen={setIsModalChangePasswordOpen}
        username={props.employeeSetting.EmployeeLogin}
      />
    </>
  );
}
