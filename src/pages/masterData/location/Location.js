import SynchIcon from "@mui/icons-material/Sync";
import {
  CircularProgress,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "bussinessAccount",
    headerName: "Bussiness Account",
    width: 200,
  },
  {
    field: "locationID",
    headerName: "Location ID",
    width: 200,
  },
  {
    field: "accountName",
    headerName: "Account Name",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    type: "boolean",
    width: 200,
  },
  {
    field: "city",
    headerName: "City",
    width: 200,
  },
  {
    field: "state",
    headerName: "State",
    width: 200,
  },
  {
    field: "country",
    headerName: "Country",
    width: 200,
  },
];

function TableLocation() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    // getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get("https://localhost:44366/api/WarehouseReps", GetConfig())
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            let i = 0;
            const resdata = response.data;
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                warehouse: resdata[key].WarehouseID,
                description: resdata[key].Description,
              });
            });
            setData(newres);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const Synch = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          "https://localhost:44366/api/WarehouseSyncReps/Sync",
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            NotifySuccess("success", "Data Telah DiSinkronisasi");
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const notifyConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Synchronisasi?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Synch",
      })
      .then((result) => {
        if (result.value) {
          Synch();
        }
      });
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="success"
          onClick={notifyConfirm}
          disableElevation
          style={{ marginLeft: "auto" }}
        >
          <span>
            <SynchIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Synch
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Master Data Location
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
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
          <div style={{ height: 400, width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                console.log(data[selection[0]]);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function Location() {
  return (
    <React.Fragment>
      <Helmet title="Location" />
      <Typography variant="h3" gutterBottom display="inline">
        List Location
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Location</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <TableLocation />
    </React.Fragment>
  );
}

export default Location;
