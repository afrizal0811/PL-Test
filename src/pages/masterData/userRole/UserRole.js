import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import { NotifyError } from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function TableUserRole() {
  const [data, setData] = useState([]);
  const [user, setuser] = useState("");
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    rowsCount: 5,
  });
  const [paginationData, setPaginationData] = useState({
    totalAvailablePage: 0,
    totalCountData: 0,
  });
  const columns = [
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 200,
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "userName",
      headerName: "Username",
      width: 200,
    },
  ];

  const getData = async () => {
    setLoading(true);
    try {
      const payload = {
        ...GetConfig(),
        params,
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole/UserRole`,
        payload
      );
      const res = data[0];
      setData(res.record);
      setPaginationData({
        totalAvailablePage: res.totalAvailablePage,
        totalCountData: res.totalCountData,
      });
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [params]);
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        {/* <Typography variant="body2" gutterBottom>
          User Roles List
        </Typography> */}
        <TextField
          autoFocus
          id="dstlot"
          label="Search Username"
          type="text"
          required
          value={params?.username}
          onChange={(e) =>
            setParams({ ...params, page: 1, username: e.target.value })
          }
          fullWidth
        />
      </CardContent>

      <Paper>
        <div style={{ width: "100%", padding: "10px" }}>
          <DataGrid
            loading={loading}
            page={params.page - 1}
            rowCount={paginationData.totalCountData}
            paginationMode="server"
            rowsPerPageOptions={[5, 10, 25]}
            autoHeight
            rows={data}
            columns={columns}
            getRowId={(row) => row.userRoleID}
            pageSize={params.rowsCount}
            onPageSizeChange={(newPageSize) =>
              setParams({ page: 1, rowsCount: newPageSize })
            }
            isRowSelectable={(params) => {
              history(
                `/master-data/user-role/detail/${params.row["userName"]}`
              );
            }}
            onPageChange={(page) => {
              setParams({ ...params, page: page + 1 });
            }}
          />
        </div>
      </Paper>
    </Card>
  );
}

function UserRole() {
  return (
    <React.Fragment>
      <Helmet title="User Role" />
      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>User Roles</Typography>
      </Breadcrumbs>
      <Typography variant="h3" display="inline">
        User Roles
      </Typography>
      <Divider mt={6} mb={2} />
      <TableUserRole />
    </React.Fragment>
  );
}

export default UserRole;
