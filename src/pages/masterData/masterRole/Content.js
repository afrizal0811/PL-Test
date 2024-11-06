import React, { useEffect } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import {
  Card,
  CardContent as MuiCardContent,
  Grid,
  InputAdornment,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { NotifyError } from "../../services/notification.service";
import Tabs from "./Tabs/Tabs";
import { GetConfig } from "../../../utils/ConfigHeader";
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Content({
  access,
  setAccess,
  description,
  setDescription,
  roleName,
  setRoleName,
  checkedPermission,
  setCheckedPermission,
}) {
  const getDataAccess = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/PermissionList`,
        GetConfig()
      );
      setAccess(data);
    } catch (error) {
      NotifyError("There was an error!", error);
    }
  };
  useEffect(() => {
    getDataAccess();
  }, []);
  const handleCheckRow = (row) => {
    const finded = checkedPermission.includes(row.PermissionID);
    if (finded) {
      const filtered = checkedPermission.filter(
        (el) => el !== row.PermissionID
      );

      setCheckedPermission(filtered);
    } else {
      setCheckedPermission([...checkedPermission, row.PermissionID]);
    }
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="body2" gutterBottom>
          Add Master Roles
        </Typography>
        <Grid container spacing={2} md={8} mt={1}>
          <Grid item md={12} xs={12}>
            <TextField
              name="RoleName"
              label="Role Name *"
              value={roleName}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              onChange={(e) => setRoleName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <TextField
              name="description"
              label="Role Description"
              value={description}
              type="text"
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
              }}
              my={2}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} md={12} mt={1}>
          <Tabs
            checkedPermission={checkedPermission}
            accessRights={access}
            handleCheckRow={handleCheckRow}
          />
        </Grid>
      </CardContent>
    </Card>
  );
}
