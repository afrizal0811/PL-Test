import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker } from "@mui/lab";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
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
import MobileTable from "../../../components/shared/MobileTable";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach, getEmployee, getRoleName } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Paper = styled(MuiPaper)(spacing);

export default function ExpiryDateTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [start, setstart] = useState(null);
  const [end, setend] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(1);

  useEffect(() => {
    getData(1);
  }, [pageSize, start, end]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "refNbr",
      headerName: "Ref Number",
      sortable: false,
      width: 140,
    },
    {
      field: "docDate",
      headerName: "Date",
      sortable: false,
      type: "date",
      width: 110,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        </>
      ),
    },
    {
      field: "branchID",
      headerName: "Branch ID",
      sortable: false,
      width: 120,
    },
    {
      field: "customerID",
      headerName: "Customer ID",
      sortable: false,
      width: 110,
    },
    {
      field: "customerName",
      headerName: "Customer",
      sortable: false,
      width: 150,
    },
    {
      field: "locationID",
      headerName: "Location ID",
      sortable: false,
      width: 105,
    },
    {
      field: "locationName",
      headerName: "Location",
      sortable: false,
      width: 150,
    },
    {
      field: "inventoryID",
      headerName: "Item ID",
      sortable: false,
      width: 105,
    },
    {
      field: "inventoryID_Desc",
      headerName: "Item",
      sortable: false,
      width: 150,
    },
    {
      field: "uom",
      headerName: "UOM",
      sortable: false,
      width: 100,
    },
    {
      field: "qtyStock",
      headerName: "Qty",
      type: "number",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              value={params.value}
              displayType={"text"}
            />
          </>
        );
      },
    },
    {
      field: "expDateStock",
      headerName: "Expiry Date",
      sortable: false,
      type: "date",
      width: 120,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
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
          {/* <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              history(`/expiry-date/detail/${params.value}`);
            }}
          >
            Edit
          </Button> */}
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.refNbr)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/ExpiryDate/Pagination2?page=${page}&rowsCount=${pageSize}&userId=${
            getRoleName() == "CRM Admin" ? "" : getEmployee()
          }${!!start ? "&sDate=" + moment(start).format("MM-DD-YYYY") : ""}${
            !!end ? "&eDate=" + moment(end).format("MM-DD-YYYY") : ""
          }&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data ExpiryDate = ", response);
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log("error: ", error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    // console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/ExpiryDate/Delete/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            // getData();
            setTimeout(() => {
              window.location.reload();
            }, 1000);
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

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        <Button color="primary" onClick={() => history("add")} disableElevation>
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
      <Grid container spacing={2} mb={1} px={2} mt={3}>
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
            renderInput={(params) => <TextField {...params} fullWidth />}
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
        <>
          <Paper sx={{ display: { xs: "block", sm: "none" } }}>
            <Button
              sx={{ mt: 4, ml: 4 }}
              color="primary"
              variant="outlined"
              onClick={() => history("add")}
              // disableElevation
            >
              <span>
                <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
              </span>
              Add
            </Button>
            <MobileTable
              data={data}
              rowDetail={columns}
              // label={"Expiry Date"}
              id={"refNbr"}
              totaldata={totalPage}
              page={curretPage}
              onCellDoubleClick={(e) => {
                history(`/expiry-date/detail/${e}`);
              }}
              onPageChange={(e, page) => {
                setcurretPage(page);
                getData(page + 1);
                console.log("page = ", page);
              }}
            />
          </Paper>
          <Paper sx={{ display: { sm: "block", xs: "none" } }}>
            <div style={{ width: "100%", padding: "10px" }}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                getRowId={(row) => row.refNbr}
                rows={data}
                columns={columns}
                pageSize={pageSize}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                autoHeight
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
                  history(`/expiry-date/detail/${params.row["refNbr"]}`);
                }}
                rowCount={totalPage}
                page={curretPage}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  setcurretPage(page);
                  getData(page + 1);
                  console.log("page = ", page);
                }}
              />
            </div>
          </Paper>
        </>
      )}
    </Card>
  );
}
