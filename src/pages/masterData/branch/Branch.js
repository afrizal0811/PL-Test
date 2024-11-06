import Button from "@material-ui/core/Button";
import SynchIcon from "@material-ui/icons/Sync";
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
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
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
    field: "LastSync",
    headerName: "Last Sync",
    width: 200,
  },
  {
    field: "BranchID",
    headerName: "Branch ID",
    width: 200,
  },
  {
    field: "BranchName",
    headerName: "Branch Name",
    width: 200,
  },
  // {
  //   field: "Company",
  //   headerName: "Company",
  //   width: 200,
  // },
  {
    field: "Active",
    headerName: "Active",
    type: "boolean",
    width: 200,
  },
  // {
  //   field: "active",
  //   headerName: "Active",
  //   type: "boolean",
  //   width: 200,
  // },
  // {
  //   field: "accountName",
  //   headerName: "Account Name",
  //   width: 200,
  // },
  // {
  //   field: "createdOn",
  //   headerName: "Created On",
  //   width: 200,
  // },
];

function TableBranch() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_DOMAIN_API}` + `/BranchReps`, GetConfig())
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const newdata = response.data.map((item, i) => {
              item.id = i;
              item.LastSync = moment(item.LastSync).format(
                "DD/MM/YYYY, h:mm:ss a"
              );
              return item;
            });
            setData(newdata);
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
          `${process.env.REACT_APP_DOMAIN_API}` + "/BranchSyncReps/Sync",
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
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
          Sync
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Master Data Branch
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
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Timer
              active={true}
              duration={null}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Timecode />
            </Timer>
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
                console.log(data[selection[0]]);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/branch/${params.row["BranchID"]}`);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function Branch() {
  return (
    <React.Fragment>
      <Helmet title="Branch" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Branch</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Branch
      </Typography>

      <Divider my={6} />

      <TableBranch />
    </React.Fragment>
  );
}

export default Branch;
