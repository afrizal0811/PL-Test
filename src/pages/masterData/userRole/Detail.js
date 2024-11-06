import { spacing } from "@material-ui/system";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import {
  Backdrop,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import Content from "./Content";
import ModalRole from "./ModalRole";
const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function DetailUserRole() {
  const history = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({ userRoleID: "" });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [branches, setBranches] = useState([]);
  const handleGetDetail = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/UserRole/${id}`,
        GetConfig()
      );
      setData(data);
      if (data.branches?.length > 0) {
        setBranches(data.branches);
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetDetail();
  }, []);
  const handleChangeStatus = (prop) => {
    setData({
      ...data,
      status: prop.target.value,
    });

    setOpen(false);
  };
  const handleSelectRole = (prop) => {
    setData({
      ...data,
      roleName: prop.RoleName,
      roleDescription: prop.RoleDescription,
      roleID: prop.RoleID,
    });

    setOpen(false);
  };
  const handleChangeRole = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    const payload = {
      userRoleID: data.userRoleID,
      userName: data.userName,
      status: data.status,
      roleID: data.roleID,
      branches: branches,
    };
    setLoading(true);
    try {
      const { status } = await axios.put(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/UserRole/${data.userRoleID}`,
        payload,
        GetConfig()
      );
      if (status === 200) {
        NotifySuccess("success", `Role Berhasil diupdate`);
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = () => {
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
            `${process.env.REACT_APP_DOMAIN_API}/MasterRole/UserRole/${data.userRoleID}`,

            GetConfig()
          );
          if (status === 200) {
            NotifySuccess(
              "success",
              `User ${data.displayName} Berhasil didelete`
            );
            history("/master-data/user-role");
          }
        } catch (error) {
          NotifyError("There was an error!", error?.response?.data?.message);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  const handleChangeBranches = (newBranches) => {
    setBranches(newBranches);
  };

  return (
    <React.Fragment>
      <ModalRole
        onCancel={handleCancel}
        open={open}
        onSelect={handleSelectRole}
        data={data}
      />
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
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>User Role</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        User Role
      </Typography>

      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          onClick={() => history("/master-data/user-role")}
        >
          <Reply />
        </IconButton>
        <IconButton onClick={handleSave} component="span">
          <SaveIcon />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton onClick={handleDelete} color="error" component="span">
          <Delete />
        </IconButton>
      </Grid>
      <Divider my={1} />
      <Content
        data={data}
        handleChangeRole={handleChangeRole}
        handleChangeStatus={handleChangeStatus}
        handleChangeBranches={handleChangeBranches}
      />
    </React.Fragment>
  );
}

export default DetailUserRole;
