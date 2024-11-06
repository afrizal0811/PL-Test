import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { spacing } from "@material-ui/system";
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
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
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

function TableSetKey() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      field: "setupKey",
      headerName: "Set Up Key",
      width: 200,
    },
    {
      field: "value",
      headerName: "Value",
      width: 200,
    },
    {
      field: "id",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.value)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(`${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends/" + id)
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
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

  const notifyConfirm = async (id) => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Hapus Data ini?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
      })
      .then((result) => {
        if (result.value) {
          deleteData(data[id].setupKey);
        }
      });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/SetupBackends",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data.map((item, i) => {
              item.id = i;
              return item;
            });
            setData(resdata);
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => history(`/konfigurasi/create-set-key`)}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Konfigurasi Setup Backend
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
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                // console.log(data[selection[0]]);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/konfigurasi/set-key/${params.row["setupKey"]}`);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function SetKey() {
  return (
    <React.Fragment>
      <Helmet title="Set Key" />
      <Typography variant="h3" gutterBottom display="inline">
        List Set Key
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Set Key</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <TableSetKey />
    </React.Fragment>
  );
}

export default SetKey;
