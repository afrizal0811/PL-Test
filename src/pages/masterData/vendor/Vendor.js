import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SynchIcon from "@material-ui/icons/Sync";
import axios from "axios";
import swal from "sweetalert2";
import { spacing } from "@material-ui/system";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import Button from "@material-ui/core/Button";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Icon,
  Grid,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import { GetConfig } from "../../../utils/ConfigHeader";
import QuickSearch from "../../components/QuickSearch";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "VendorID",
    headerName: "Vendor ID",
    width: 140,
  },
  {
    field: "VendorName",
    headerName: "Vendor name",
    width: 450,
  },
  {
    field: "VendorClass",
    headerName: "Vendor Class",
    type: "text",
    width: 150,
  },
  {
    field: "Status",
    headerName: "Vendor Status",
    type: "text",
    width: 150,
  },
];

function TableVendor() {
  const [selection, setSelection] = useState(0);
  const [VendorName, setVendorName] = useState("");
  const [VendorClass, setVendorClass] = useState("");
  const [Status, setStatus] = useState({ label: "ALL", value: "" });
  const [data, setData] = useState([]);
  const [VendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [currentpage, setcurrentpage] = useState(1);
  const [totalpage, settotalpage] = useState(0);

  useEffect(() => {
    setcurrentpage(1);
    getData(1);
  }, [pageSize, Status, VendorName, VendorClass]);

  useEffect(() => {
    getVendorClass();
  }, []);

  const getVendorClass = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_DOMAIN_API}/Vendors/class`, GetConfig())
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            console.log("res", resdata);
            setVendorData(resdata);
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

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/Vendors/pagination?page=${page}&rowsCount=${pageSize}&VendorName=${
            !!VendorName ? VendorName : ""
          }&VendorClass=${!!VendorClass ? VendorClass : ""}&Status=${
            !!Status.value ? Status.value : ""
          }`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalpage(resdata.totalCountData);
            // let i = 0;
            // const resdata = response.data;
            // const newres = [];
            // Object.keys(resdata).forEach(function (key) {
            //   newres.push({
            //     id: key,
            //     vendor: resdata[key].VendorID,
            //     vendorName: resdata[key].VendorName,
            //     vendorClass: resdata[key].VendorClass,
            //     vendorStatus: resdata[key].Status,
            //   });
            // });
            // setData(newres);
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
          `${process.env.REACT_APP_DOMAIN_API}` + "/VendorsSync/Sync",
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
      <Grid container spacing={3} m={2}>
        <Grid item md={3}>
          <QuickSearch
            value={VendorName}
            placeholder="Nama Vendor"
            onChange={(evt) => setVendorName(evt.target.value)}
            onClear={() => setVendorName("")}
          />
        </Grid>
        <Grid item md={3}>
          <Autocomplete
            id="multiple-limit-tags"
            options={VendorData}
            // getOptionLabel={(option) => option.label}
            value={VendorClass}
            defaultValue={VendorClass}
            onChange={(e, value) => {
              setVendorClass(value);
              console.log({ e, value });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                fullWidth
                label="Vendor Class"
                placeholder="Vendor Class"
              />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <Autocomplete
            id="multiple-limit-tags"
            options={[
              { label: "ALL", value: "" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            getOptionLabel={(option) => option.label}
            value={Status}
            defaultValue={Status}
            onChange={(e, value) => {
              setStatus(value);
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
              rows={data}
              columns={columns}
              getRowId={(row) => row.VendorID}
              pageSize={pageSize}
              autoHeight
              disableColumnFilter
              disableColumnMenu
              density="compact"
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
                history(`/master-data/vendor/${params.row["VendorID"]}`);
              }}
              rowCount={totalpage}
              page={currentpage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                getData(page + 1);
                setcurrentpage(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function Vendor() {
  return (
    <React.Fragment>
      <Helmet title="Vendor" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Vendor</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Vendor
      </Typography>

      <Divider my={6} />

      <TableVendor />
    </React.Fragment>
  );
}

export default Vendor;
