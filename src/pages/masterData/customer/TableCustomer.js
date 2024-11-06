import SyncIcon from "@mui/icons-material/Sync";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "LastSync",
    headerName: "Last Sync",
    width: 200,
    renderCell: (params) =>
      params.value ? (
        <p>{moment(params.value).format("DD/MM/YYYY, h:mm:ss a")}</p>
      ) : (
        <></>
      ),
  },
  {
    field: "CustomerID",
    headerName: "Customer ID",
    width: 200,
  },
  {
    field: "CustomerName",
    headerName: "Customer name",
    width: 200,
  },
  {
    field: "AdminPiutangEmployeeName",
    headerName: "Admin Piutang",
    width: 200,
  },
  {
    field: "CustomerClass",
    headerName: "Customer Class",
    type: "text",
    width: 200,
  },
  {
    field: "Status",
    headerName: "Customer Status",
    type: "text",
    width: 200,
  },
  {
    field: "LastModified",
    headerName: "Last Modified",
    type: "text",
    width: 200,
    renderCell: (params) =>
      params.value ? (
        <p>{moment(params.value).format("DD/MM/YYYY, h:mm:ss a")}</p>
      ) : (
        <></>
      ),
  },
];

export default function TableCustomer() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [cus, setcus] = useState("");
  const [branch, setbranch] = useState("");
  const [currentpage, setcurrentpage] = useState(1);
  const [totalpage, settotalpage] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    getData(1);
  }, [cus, branch, pageSize]);

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/CustomerReps/AllCustomer?page=${page}&rowsCount=${pageSize}&customerName=${cus}&branch=${
            !!branch ? branch : ""
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
            //     customer: resdata[key].CustomerID,
            //     adminPiutang: resdata[key].AdminPiutangEmployeeName,
            //     customerName: resdata[key].CustomerName,
            //     customerClass: resdata[key].CustomerClass,
            //     customerStatus: resdata[key].Status,
            //     lastSync: moment(resdata[key].LastSync).format(
            //       "DD/MM/YYYY, h:mm:ss a"
            //     ),
            //     lastModified: moment(resdata[key].LastModified).format(
            //       "DD/MM/YYYY, h:mm:ss a"
            //     ),
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

  const Sync = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/CustomerSyncReps/Sync`,
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
        title: "Apakah Anda yakin melakukan syncronisasi?",
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
      <Grid container spacing={4} mb={1} px={2} mt={3}>
        <Grid item md={3}>
          <QuickSearch
            value={cus}
            placeholder="Customer Name"
            onChange={(evt) => setcus(evt.target.value)}
            onClear={() => setcus("")}
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
              autoHeight
              getRowId={(row) => row.CustomerID}
              onPageSizeChange={(e) => {
                // console.log("eae", e);
                setPageSize(e);
              }}
              pageSize={pageSize}
              density="compact"
              disableColumnFilter
              disableColumnMenu
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/customer/${params.row["CustomerID"]}`);
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
