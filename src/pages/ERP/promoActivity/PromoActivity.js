import { spacing } from "@material-ui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DesktopDatePicker } from "@mui/lab";
import {
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
import MobileTable from "../../../components/shared/MobileTable";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach, getEmployee, getRoleName } from "../../../utils/jwt";
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
  const [start, setstart] = useState(null);
  const [end, setend] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  useEffect(() => {
    getData(1);
  }, [pageSize, start, end]);

  const columns = [
    {
      field: "promoActivityID",
      headerName: "Promo Activity ID",
      width: 200,
    },
    {
      field: "promoID",
      headerName: "Promo ID",
      width: 200,
    },
    {
      field: "branchID",
      headerName: "Branch ID",
      width: 200,
    },
    {
      field: "location",
      headerName: "Location",
      type: "text",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      type: "date",
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : (
          <></>
        ),
    },
    {
      field: "customerID",
      headerName: "Customer",
      type: "text",
      width: 200,
    },
    {
      field: "hasil",
      headerName: "Hasil",
      type: "text",
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
            onClick={() => notifyConfirm(params.row.promoActivityID)}
          ></Button>
        </strong>
      ),
    },
  ];

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/PromoActivity/Pagination2?page=${page}&rowsCount=${pageSize}&userId=${
            getRoleName() == "CRM Admin" ? "" : getEmployee()
          }${!!start ? "&sDate=" + moment(start).format("MM-DD-YYYY") : ""}${
            !!end ? "&eDate=" + moment(end).format("MM-DD-YYYY") : ""
          }&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data CustomerPrice = ", response);
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
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
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/PromoActivity/Delete/" +
            id +
            "/SACSAC300002",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            getData();
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
          onClick={() => history("/promo-activity/add")}
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
      {/* <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Promotion Activity
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
      </CardContent> */}
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
              id={"promoActivityID"}
              totaldata={totalPage}
              page={curretPage}
              onCellDoubleClick={(e) => {
                history(`/promo-activity/detail/${e}`);
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
                rows={data}
                getRowId={(row) => row.promoActivityID}
                columns={columns}
                autoHeight
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                selectionModel={selection}
                density="compact"
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
                    `/promo-activity/detail/${params.row["promoActivityID"]}`
                  );
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

function PromoAct() {
  return (
    <React.Fragment>
      <Helmet title="Promo" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        {/* <Link component={NavLink} to="/promo-activity">
          Promotion Activity
        </Link> */}
        <Typography>Promotion Activity</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Promotion Activity
      </Typography>

      <Divider my={6} />

      <TablePromo />
    </React.Fragment>
  );
}

export default PromoAct;
