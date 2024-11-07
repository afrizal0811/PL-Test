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

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function TableZona() {
  const [selection, setSelection] = useState(0);
  const [rows, setrows] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    getData();
  }, []);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // console.log("row field", row[field]);
        return searchRegex.test(row[field].toString());
      });
    });
    console.log("filter", filteredRows);
    setrows(filteredRows);
  };

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "AssetID",
      headerName: "ID Asset",
      sortable: false,
      width: 150,
    },
    {
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 270,
    },
    {
      field: "AssetType",
      sortable: false,
      headerName: "Asset Type",
      minWidth: 200,
      // renderCell: kotaCell,
    },
    // {
    //   field: "Status",
    //   headerName: "Status",
    //   sortable: false,
    //   // disableColumnMenu: true,
    //   width: 100,
    // },
    {
      field: "LastSync",
      sortable: false,
      headerName: "Last Sync",
      type: "text",
      width: 200,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss")}</p>
        </>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/FixedAssetReps/",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            const newdata = resdata.map((item, i) => {
              item.id = i;
              return item;
            });
            setData(newdata);
            // setrows(newdata);
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
          `${process.env.REACT_APP_DOMAIN_API}` + "/FixedAssetSyncReps/Sync",
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

  // ini untuk pop up notifikasi
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

  function CustomToolbar(props) {
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
          Master Fixed Asset
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
              autoHeight
              rowsPerPageOptions={[5, 10, 25]}
              rows={data}
              columns={columns}
              // pageSize={pageSize}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                console.log(data[selection[0]]);
              }}
              rowHeight={60}
              components={{
                Toolbar: CustomToolbar,
              }}
              // componentsProps={{
              //   toolbar: {
              //     value: searchText,
              //     onChange: (event) => requestSearch(event.target.value),
              //     clearSearch: () => requestSearch(""),
              //   },
              // }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/fixed-asset/${params.row["AssetID"]}`);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function MasterFixedAsset() {
  const [searchText, setSearchText] = React.useState("");
  return (
    <React.Fragment>
      <Helmet title="Fixed Asset" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Fixed Asset</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Master Fixed Asset
      </Typography>

      <Divider my={6} />

      <TableZona />
    </React.Fragment>
  );
}

export default MasterFixedAsset;
