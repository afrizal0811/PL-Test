import React from "react";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import {
  Card,
  CardContent as MuiCardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
} from "@material-ui/core";

import Tabs from "./Tabs/Tabs";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Header({
  data,
  handleChangeRole,
  handleChangeStatus,
  handleChangeBranches,
}) {
  return (
    <Card mb={6}>
      <CardContent>
        <Grid container spacing={4} mt={1}>
          <Grid item md={6} xs={6}>
            <TextField
              label="Employee ID*"
              value={data.employeeId}
              type={"text"}
              fullWidth
              variant="outlined"
              disabled
              my={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              disabled
              label="Username"
              value={data.userName}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
              my={2}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={1}>
          <Grid item md={6} xs={6}>
            <TextField
              disabled
              label="Display Name"
              value={data.displayName}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              label="Role Name*"
              disabled
              onClick={handleChangeRole}
              value={data.roleName}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              my={2}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} mt={1}>
          <Grid item md={6} xs={6}>
            {/* <TextField
              // disabled
              label="Status"
              value={data.status}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              onChange={handleStatus}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            /> */}
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Status"
                value={!!data.status ? data.status : "Active"}
                // defaultValue={data.status}
                onChange={handleChangeStatus}
                // my={2}
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Inactive"}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              disabled
              label="Role Description"
              value={data.roleDescription}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
              // my={2}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} md={12} mt={1}>
          <Tabs data={data} handleChangeBranches={handleChangeBranches} />
        </Grid>
      </CardContent>
    </Card>
  );
}
