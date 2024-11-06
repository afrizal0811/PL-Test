import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import {
  Backdrop,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { spacing } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import Content from "./Content";
// import Add from "@mui/icons-material/Add";
import Reply from "@mui/icons-material/Reply";
import axios from "axios";
import Swal from "sweetalert2";
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function DetailUserRole() {
  const history = useNavigate();
  const params = useParams();
  const [roleid, setroleid] = useState([]);
  const [access, setAccess] = useState([]);
  const [checkedPermission, setCheckedPermission] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleAddRole = async () => {
    const branch = window.localStorage.getItem("branch");
    const role_AccessRight = access.reduce((acc, el) => {
      if (checkedPermission.includes(el.PermissionID)) {
        return [
          ...acc,
          {
            accessRightID: el.PermissionID,
            accessRightName: el.Permission,
            access: true,
            brnchID: branch,
          },
        ];
      }
      return acc;
    }, []);

    const payload = {
      roleName,
      roleDescription,
      brnchID: branch,
      role_AccessRight,
    };
    setLoading(true);
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole`,
        payload,
        GetConfig()
      );
      if (status === 200) {
        NotifySuccess("success", `Role ${roleName} Berhasil ditambahkan`);
        setRoleName("");
        setRoleDescription("");
        setCheckedPermission([]);
        window.location.replace(`/master-data/master-role`);
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  const handleGetDetailRole = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/${params.id}`,
        GetConfig()
      );
      const selectedRole = data.role.Role_AccessRight.filter(
        (ae) => ae.Access == true
      ).map((el) => el.AccessRightID);
      setroleid(
        data.role.Role_AccessRight.map((el) => {
          return {
            AccessRightID: el.AccessRightID,
            roles_AccessRightID: el.Roles_AccessRightID,
          };
        })
      );
      setCheckedPermission(selectedRole);
      setRoleName(data.role.RoleName);
      setRoleDescription(data.role.RoleDescription);
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditRole = async () => {
    const branch = window.localStorage.getItem("branch");
    const role_AccessRight = access.reduce((acc, el) => {
      // console.log("el", el);
      // console.log("acc", acc);
      // console.log("checkedPermission", checkedPermission);
      // console.log("access", access);
      // console.log("access", access);
      // acc.access = false;
      if (checkedPermission.includes(el.PermissionID)) {
        return [
          ...acc,
          {
            accessRightID: el.PermissionID,
            accessRightName: el.Permission,
            access: true,
            roleID: params.id,
            brnchID: branch,
            roles_AccessRightID: roleid.filter(
              (ae) => ae.AccessRightID == el.PermissionID
            )[0]?.roles_AccessRightID,
          },
        ];
      }
      // else {
      //   return [
      //     ...acc,
      //     {
      //       accessRightID: el.PermissionID,
      //       accessRightName: el.Permission,
      //       access: false,
      //       roleID: params.id,
      //       roles_AccessRightID: roleid.filter(
      //         (ae) => ae.AccessRightID == el.PermissionID
      //       )[0]?.roles_AccessRightID,
      //       brnchID: branch,
      //     },
      //   ];
      // }
      return acc;
    }, []);
    const payload = {
      role: {
        roleName,
        roleDescription,
        brnchID: branch,
        role_AccessRight,
        isRemoved: false,
        roleID: params.id,
      },
      permissionNotMappeds: role_AccessRight.map((el) => ({
        permissionId: el.accessRightID,
      })),
    };
    setLoading(true);
    console.log("payload", payload);
    try {
      const { status } = await axios.put(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/MasterRole`,
        payload,
        GetConfig()
      );
      if (status === 200) {
        NotifySuccess("success", `Role ${roleName} Berhasil diupdate`);
        handleGetDetailRole();
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (params.id) {
      handleGetDetailRole();
    }
  }, [params.id]);
  const handleSave = () => {
    if (params.id) {
      handleEditRole();
    } else {
      handleAddRole();
    }
  };
  const handleDeleteRole = async () => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const { status } = await axios.delete(
            `${process.env.REACT_APP_DOMAIN_API}/MasterRole/${params.id}`,

            GetConfig()
          );
          if (status === 200) {
            NotifySuccess("success", `Role ${roleName} Berhasil didelete`);
            history("/master-data/master-role");
          }
        } catch (error) {
          NotifyError("There was an error!", error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  return (
    <React.Fragment>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Helmet title="Detail User Role" />
      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Home
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Roles</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Master Roles
      </Typography>

      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          onClick={() => history("/master-data/master-role")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={!!roleName ? false : true}
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton
          onClick={handleDeleteRole}
          disabled={!params.id}
          color="error"
          component="span"
        >
          <Delete />
        </IconButton>
      </Grid>
      <Content
        roleName={roleName}
        setRoleName={setRoleName}
        access={access}
        setAccess={setAccess}
        description={roleDescription}
        checkedPermission={checkedPermission}
        setCheckedPermission={setCheckedPermission}
        setDescription={setRoleDescription}
      />
    </React.Fragment>
  );
}

export default DetailUserRole;
