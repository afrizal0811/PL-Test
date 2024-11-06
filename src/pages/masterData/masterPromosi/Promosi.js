import { spacing } from "@material-ui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker } from "@mui/lab";
import {
  Autocomplete,
  CircularProgress,
  Grid,
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
import QuickSearch from "../../components/QuickSearch";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function TablePromo() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [principal, setprincipal] = React.useState("");
  const [stat, setstat] = React.useState({ label: "ALL", value: "" });
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  // const token = window.localStorage.getItem("accessToken");
  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  const columns = [
    {
      field: "promoID",
      headerName: "Promo ID",
      width: 150,
    },
    {
      field: "promoDescr",
      headerName: "Description",
      width: 370,
    },
    {
      field: "principal",
      headerName: "Principal",
      type: "text",
      width: 200,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      type: "date",
      width: 190,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "date",
      width: 190,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "id",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.promoID)}
          ></Button>
        </strong>
      ),
    },
  ];

  useEffect(() => {
    setcurretPage(1);
    getData(1);
  }, [pageSize, principal, start, end, stat]);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/Promo/Pagination2?page=${page}&rowsCount=${pageSize}&principal=${principal}${
            !!start ? "&sDate=" + moment(start).format("MM-DD-YYYY") : ""
          }${!!end ? "&eDate=" + moment(end).format("MM-DD-YYYY") : ""}${
            !!stat.value ? "&active=" + stat.value : ""
          }`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("res", response);
          if (response.status == 200) {
            // const resdata = response.data;
            // const newdata = resdata.map((item, i) => {
            //   item.id = i;
            //   return item;
            // });
            // setData(newdata);
            const resdata = response.data[0];
            // console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log("err", error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/Promo/Delete/" +
            id +
            "/screenID",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
            getData(1);
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
          deleteData(id);
        }
      });
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => history("/master-data/master-promo/add")}
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
        {/* <Typography variant="h6" gutterBottom>
          Master Data Promotion
        </Typography>
        <Typography variant="body2" gutterBottom></Typography> */}
        <Grid container spacing={3}>
          <Grid item md={3}>
            <DesktopDatePicker
              disabled={loading}
              label="Start Date"
              inputFormat={"dd/MM/yyyy"}
              maxDate={new Date(moment(end).format())}
              value={start}
              onChange={(newValue) => {
                setstart(newValue);
                console.log("date", newValue);
              }}
              cancelText
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <DesktopDatePicker
              disabled={loading}
              label="End Date"
              inputFormat={"dd/MM/yyyy"}
              value={end}
              onChange={(newValue) => {
                setend(newValue);
                console.log("date", newValue);
              }}
              cancelText
              renderInput={(params) => (
                <TextField {...params} size="small" fullWidth />
              )}
            />
          </Grid>
          <Grid item md={3}>
            <QuickSearch
              value={principal}
              placeholder="Nama Principal"
              onChange={(evt) => setprincipal(evt.target.value)}
              onClear={() => setprincipal("")}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            {/* <FormControl fullWidth>
              <InputLabel id="status-zona">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Status"
                size="small"
                value={stat}
                onChange={(e) => setstat(e.target.value)}
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={""}>ALL</MenuItem>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Non Active</MenuItem>
              </Select>
            </FormControl> */}
            <Autocomplete
              id="multiple-limit-tags"
              options={[
                { label: "ALL", value: "" },
                { label: "Active", value: "true" },
                { label: "Inactive", value: "false" },
              ]}
              getOptionLabel={(option) => option.label}
              value={stat}
              defaultValue={stat}
              onChange={(e, value) => {
                setstat(value);
                console.log({ e, value });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  fullWidth
                  label="Status"
                  placeholder="Status"
                />
              )}
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
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              autoHeight
              getRowId={(a) => a.promoID}
              rows={data}
              density="compact"
              columns={columns}
              disableColumnFilter
              disableColumnMenu
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
                  `/master-data/master-promo/detail/${params.row["promoID"]}`
                );
              }}
              rowCount={totalPage}
              page={curretPage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                getData(page + 1);
                setcurretPage(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function Promo() {
  return (
    <React.Fragment>
      <Helmet title="Promo" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Promotion</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Promotion
      </Typography>

      <Divider my={6} />

      <TablePromo />
    </React.Fragment>
  );
}

export default Promo;
