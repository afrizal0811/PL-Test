import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SynchIcon from "@material-ui/icons/Sync";
import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import {
  Link,
  Text,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Grid,
  CircularProgress,
  Tooltip,
  TextField,
  IconButton,
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { GetConfig } from "../../../utils/ConfigHeader";
import CbData from "../../../components/shared/dropdown";
import PropTypes from "prop-types";
import { Clear, Search } from "@material-ui/icons";
import { DesktopDatePicker } from "@material-ui/lab";
import QuickSearch from "../../components/QuickSearch";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function TableInvoice() {
  const [selection, setSelection] = useState(0);
  const [refnbr, setrefnbr] = useState("");
  const [start, setstart] = useState(null);
  const [end, setend] = useState(null);
  const [customer, setcustomer] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [currentPage, setcurrentPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);

  useEffect(() => {
    getData(1);
  }, [pageSize, refnbr, customer, start, end]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "LastSync",
      headerName: "Last Sync",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss")}</p>
        </>
      ),
    },
    {
      field: "Type",
      headerName: "Type",
      sortable: false,
      width: 150,
    },
    {
      field: "ReferenceNbr",
      sortable: false,
      headerName: "Invoice Ref Nbr",
      minWidth: 200,
      // renderCell: kotaCell,
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      // disableColumnMenu: true,
      width: 100,
    },
    {
      field: "Date",
      sortable: false,
      headerName: "Invoice date",
      type: "text",
      width: 200,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss")}</p>
        </>
      ),
    },
    {
      field: "DueDate",
      sortable: false,
      headerName: "Due date",
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
  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/InvoiceReps?page=${page}&rowsCount=${pageSize}&refernceNbr=${refnbr}&customerID=${customer}&start=${
              !!start ? moment(start).format("MM-DD-YYYY") : ""
            }&end=${!!end ? moment(end).format("MM-DD-YYYY") : ""}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
            // const resdata = response.data;
            // console.log("res", resdata);
            // setData(resdata);
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
          `${process.env.REACT_APP_DOMAIN_API}` + "/InvoiceSyncReps/Sync",
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
      <Grid container spacing={4} mb={1} px={2} mt={3}>
        <Grid item md={3}>
          <QuickSearch
            value={refnbr}
            placeholder="Reference Nbr"
            onChange={(evt) => setrefnbr(evt.target.value)}
            onClear={() => setrefnbr("")}
          />
        </Grid>
        <Grid item md={3}>
          <QuickSearch
            value={customer}
            placeholder="CustomerID"
            onChange={(evt) => setcustomer(evt.target.value)}
            onClear={() => setcustomer("")}
          />
        </Grid>
        {/* <Grid item md={3}>
          <CbData
            source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
            id={"BranchID"}
            desc={"BranchName"}
            size="small"
            label="Branch"
            value={!!branch ? branch : "ALL"}
            defaultValue={!!branch ? branch : "ALL"}
            onChange={(e) => {
              setbranch(e);
              // setData({
              //   ...Data,
              //   AllocatedBranchID: e,
              //   // AllocatedWarehouseID: "",
              // });
              console.log("e", e);
            }}
          />
        </Grid> */}
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
              rows={data}
              columns={columns}
              disableColumnFilter
              density="compact"
              disableColumnMenu
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
              }}
              autoHeight
              // rowHeight={60}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/invoice/${params.row["ReferenceNbr"]}`);
              }}
              onPageSizeChange={(e) => {
                // console.log("eae", e);
                setPageSize(e);
              }}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              getRowId={(r) => r.ReferenceNbr}
              rowCount={totalPage}
              page={currentPage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                getData(page + 1);
                setcurrentPage(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function MasterInvoice() {
  return (
    <React.Fragment>
      <Helmet title="Master Invoice" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Invoice</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Master Invoice
      </Typography>

      <Divider my={6} />

      <TableInvoice />
    </React.Fragment>
  );
}

export default MasterInvoice;
