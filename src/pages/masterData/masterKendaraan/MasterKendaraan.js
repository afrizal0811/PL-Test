import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box, spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
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

function QuickSearchToolbar(props) {
  return (
    <Box sx={{ bgcolor: "", ml: "auto" }}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        style={{ marginLeft: "auto" }}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          pr: 4,
          m: (theme) => theme.spacing(0),
          "& .MuiSvgIcon-root": {
            mr: 5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
          float: "right",
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

function TableKendaraan() {
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

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "IDKendaraan",
      headerName: "ID Kendaraan",
      sortable: false,
      width: 150,
    },
    {
      field: "NamaKendaraan",
      headerName: "Nama Kendaraan",
      sortable: false,
      width: 170,
    },
    {
      field: "NoPolisi",
      headerName: "No Polisi",
      sortable: false,
      width: 110,
    },
    {
      field: "NamaDriver",
      headerName: "Nama Driver",
      sortable: false,
      width: 250,
    },
    {
      field: "StatusKendaraan",
      headerName: "Status Kendaraan",
      sortable: false,
      width: 110,
    },
    {
      field: "LastModified",
      headerName: "Last Modified",
      sortable: false,
      type: "text",
      width: 180,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 110,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              history(
                `/master-data/update-kendaraan/${params.row.IDKendaraan}`
              );
            }}
          >
            Edit
          </Button>
          {/* <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.IDKendaraan)}
          >
            Delete
          </Button> */}
        </strong>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/KendaraanReps/",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data KendaraanReps = ", response);
          if (response.status == 200) {
            const resdata = response.data;
            const newdata = [];
            Object.keys(resdata).forEach(function (key) {
              let resdataDriver = resdata[key].KendaraanDriverLineRep.map(
                (item, i) => {
                  item.id = i;
                  return item?.NamaDriver;
                }
              );
              console.log("ini data namadriver = ", resdataDriver);
              newdata.push({
                id: key,
                IDKendaraan: resdata[key].IDKendaraan,
                NamaKendaraan: resdata[key].NamaKendaraan,
                NoPolisi: resdata[key].NoPolisi,
                StatusKendaraan: resdata[key].StatusKendaraan,
                LastModified: resdata[key].LastModifiedDateTime,
                NamaDriver: resdataDriver.toString(),
              });
            });
            setData(newdata);
            setrows(newdata);
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

  const deleteData = async (id) => {
    setLoading(true);
    console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(`${process.env.REACT_APP_DOMAIN_API}` + "/KendaraanReps/" + id)
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

  // ini untuk pop up notifikasi
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
          console.log("ini di swal delete, result = ", result);
          console.log("ini di swal delete, id = ", id);
          deleteData(id);
        }
      });
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setrows(filteredRows);
  };

  React.useEffect(() => {
    setrows(data);
  }, [data]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => history("/master-data/add-kendaraan")}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        {/* <TextField
          variant="standard"
          value={searchText}
          onChange={(event) => requestSearch(event.target.value)}
          placeholder="Search…"
          // className={"float-right"}
          style={{ marginLeft: "auto" }}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: searchText == "" ? "visible" : "hidden" }}
                onClick={() => requestSearch("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        /> */}
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Grid container>
          <Grid md={6}>
            <Typography variant="h6" gutterBottom>
              Master Data Kendaraan
            </Typography>
          </Grid>
          <Grid md={6}>
            <QuickSearchToolbar
              sx={{ ml: "auto" }}
              value={searchText}
              onChange={(event) => requestSearch(event.target.value)}
              clearSearch={() => requestSearch("")}
            />
          </Grid>
        </Grid>
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
              rows={rows}
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
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(
                  `/master-data/update-kendaraan/${params.row["IDKendaraan"]}`
                );
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function MasterKendaraan() {
  const [searchText, setSearchText] = React.useState("");
  return (
    <React.Fragment>
      <Helmet title="Master Kendaraan" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Data Kendaraan</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Master Data Kendaraan
      </Typography>

      <Divider my={6} />

      <TableKendaraan />
    </React.Fragment>
  );
}

export default MasterKendaraan;
