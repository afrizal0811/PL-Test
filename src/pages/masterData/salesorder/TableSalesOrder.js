import { spacing } from "@material-ui/system";
import SyncIcon from "@mui/icons-material/Sync";
import { DesktopDatePicker } from "@mui/lab";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
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
const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "LastSync",
    headerName: "Last Sync",
    width: 140,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "OrderType",
    headerName: "Order Type",
    width: 130,
  },
  {
    field: "OrderNbr",
    headerName: "Order Nbr",
    width: 150,
  },
  {
    field: "Status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "Date",
    headerName: "Date",
    type: "text",
    width: 140,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "EffectiveDate",
    headerName: "Sched. Shipment",
    type: "text",
    width: 140,
    renderCell: (params) =>
      params.row?.ShippingSettings?.ScheduledShipmentDate ? (
        <p>
          {moment(params.row.ShippingSettings?.ScheduledShipmentDate).format(
            "DD-MM-YYYY"
          )}
        </p>
      ) : (
        <></>
      ),
  },
  {
    field: "CustomerID",
    headerName: "Customer",
    type: "text",
    width: 200,
  },
  {
    field: "OrderedQty",
    headerName: "Ordered QTY",
    type: "text",
    width: 130,
  },
  {
    field: "OrderTotal",
    headerName: "Order Total",
    type: "text",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "CurrencyID",
    headerName: "Currency",
    type: "text",
    width: 130,
  },
  {
    field: "LastModified",
    headerName: "Last Modified",
    type: "text",
    width: 140,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
];

export default function TableSalesOrder() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();
  const [pageSize, setPageSize] = useState(5);

  const [startDate, setstartDate] = React.useState(new Date());
  const [endDate, setendDate] = React.useState(new Date());
  const [currentPage, setcurrentPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);

  useEffect(() => {
    getData(1);
  }, [startDate, endDate]);

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/SalesOrderReps?page=${page}&rowsCount=5&start=${moment(
              startDate
            ).format("YYYY-MM-DD")}&end=${moment(endDate).format(
              "YYYY-MM-DD"
            )}`,
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
          // if (response.status == 200) {
          //   let i = 0;
          //   const resdata = response.data;
          //   const newres = [];
          //   Object.keys(resdata).forEach(function (key) {
          //     newres.push({
          //       id: key,
          //       orderNbr: resdata[key].OrderNbr,
          //       orderType: resdata[key].OrderType,
          //       status: resdata[key].Status,
          //       customer: resdata[key].CustomerID,
          //       date: moment(resdata[key].Date).format("DD/MM/YYYY, h:mm:ss a"),
          //       orderTotal: resdata[key].OrderTotal,
          //       currencyID: resdata[key].CurrencyID,
          //       effectiveDate: moment(resdata[key].EffectiveDate).format(
          //         "DD/MM/YYYY, h:mm:ss a"
          //       ),
          //       orderedQty: resdata[key].OrderedQty,
          //       lastSync: moment(resdata[key].LastSync).format(
          //         "DD/MM/YYYY, h:mm:ss a"
          //       ),
          //       lastModified: moment(resdata[key].LastModified).format(
          //         "DD/MM/YYYY, h:mm:ss a"
          //       ),
          //     });
          //   });
          //   setData(newres);
          // }
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

  const Sync = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/SalesOrderSync/Sync`,
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
        title: "Apakah Anda yakin melakukan Syncronisasi?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Sync",
      })
      .then((result) => {
        if (result.value) {
          Sync();
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
            <SyncIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Sync
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={3}>
        <Typography variant="h6" gutterBottom>
          Master Data Sales Order
        </Typography>
        <Typography variant="body2" gutterBottom>
          {/* Button Toolbar */}
        </Typography>
      </CardContent>
      <Grid container spacing={2} mb={1} px={2}>
        <Grid item md={3}>
          <DesktopDatePicker
            disabled={loading}
            label="Start Date"
            inputFormat={"dd/MM/yyyy"}
            value={startDate}
            onChange={(newValue) => {
              setstartDate(newValue);
              console.log("date", newValue);
            }}
            cancelText
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Grid>
        <Grid item md={3}>
          <DesktopDatePicker
            disabled={loading}
            label="End Date"
            inputFormat={"dd/MM/yyyy"}
            value={endDate}
            onChange={(newValue) => {
              setendDate(newValue);
              console.log("date", newValue);
            }}
            cancelText
            renderInput={(params) => <TextField {...params} fullWidth />}
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
              getRowId={(row) => row.OrderNbr}
              autoHeight
              rows={data}
              columns={columns}
              pageSize={5}
              disableColumnFilter
              disableColumnMenu
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/sales-order/${params.row["OrderNbr"]}`);
              }}
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
