import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import AddIcon from "@mui/icons-material/Add";
import {
  CircularProgress,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { GetConfig } from "../../../utils/ConfigHeader";
import { NotifyError } from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "RoleName",
    headerName: "Roles Name",
    width: 200,
  },
  {
    field: "RoleDescription",
    headerName: "Roles Description",
    width: 200,
  },
];
function TableUserRole() {
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  const getData = async () => {
    setLoading(true);
    try {
      const payload = {
        ...GetConfig(),
        params: {
          page: 1,
          rowsCount: 10,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/MasterRole`,
        payload
      );
      setData(data);
    } catch (error) {
      NotifyError("There was an error!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="subtitle1">Master Roles List</Typography>
      </CardContent>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
        </Grid>
      ) : (
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              getRowId={(row) => row.RoleID}
              isRowSelectable={(params) => {
                history(
                  `/master-data/master-role/detail/${params.row["RoleID"]}`
                );
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function UserRole() {
  const history = useNavigate();
  return (
    <React.Fragment>
      <Helmet title="User Role" />
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
      <div>
        <Button
          color="primary"
          onClick={() => history(`/master-data/master-role/add`)}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </div>
      <TableUserRole />
    </React.Fragment>
  );
}

export default UserRole;
