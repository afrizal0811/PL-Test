import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import swal from "sweetalert2";
import axios from "axios";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
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
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DetailPopup from "./DetailPopup";
import { Edit } from "@material-ui/icons";
import { GetConfig } from "../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function TableScheduller() {
  const [selection, setSelection] = useState();
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [openDetail, setOpenDetail] = useState(false);

  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);

  useEffect(() => {
    getData(1);
  }, []);

  const columns = [
    {
      field: "SchedullerName",
      headerName: "Scheduler Name",
      width: 200,
    },
    {
      field: "ServiceMethod",
      headerName: "Service Method",
      width: 200,
    },
    {
      field: "ServiceFunction",
      headerName: "Service Function",
      width: 200,
    },
    {
      field: "SchedullerHashSettingID",
      headerName: "Schedule Day",
      width: 200,
      renderCell: (params) => (
        <p>
          {params.row.IsMonday ? "Monday, " : ""}
          {params.row.IsTuesday ? "Tuesday, " : ""}
          {params.row.IsWednesday ? "Wednesday, " : ""}
          {params.row.IsThursday ? "Thursday, " : ""}
          {params.row.IsFriday ? "Friday, " : ""}
          {params.row.IsSaturday ? "Saturday, " : ""}
          {params.row.IsSunday ? "Sunday, " : ""}
        </p>
      ),
    },
    {
      field: "SchedullerHashSettingID",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<Edit />}
            onClick={() => setOpenDetail(true)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 16 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.SchedullerName)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/Scheduller/Scheduller/Remove?schedullerName=" +
            id
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
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

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/Scheduller?page=${page}&rowsCount=5`,
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => {
            // history(`/konfigurasi/create-set-key`);
            setSelection({});
            setOpenDetail(true);
          }}
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
        <Typography variant="h6" gutterBottom>
          Konfigurasi Scheduler
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
        </Grid>
      ) : (
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rows={data}
              autoHeight
              getRowId={(r) => r.SchedullerHashSettingID}
              columns={columns}
              pageSize={5}
              selectionModel={selection?.SchedullerHashSettingID}
              onSelectionModelChange={(e) => {
                setSelection(
                  data.filter((i) => e.includes(i.SchedullerHashSettingID))[0]
                );
                console.log("selec", selection);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellDoubleClick={(params, event) => {
                setOpenDetail(true);
                // console.log(params.row["customer"]);
                // history(`/konfigurasi/set-key/${params.row["setupKey"]}`);
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
      <DetailPopup
        openDetail={openDetail}
        setOpenDetail={(e) => setOpenDetail(e)}
        selection={selection}
        // name={}
      />
    </Card>
  );
}

function Scheduller() {
  return (
    <React.Fragment>
      <Helmet title="Scheduler" />
      <Typography variant="h3" gutterBottom display="inline">
        List Scheduler
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Typography>Scheduler</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <TableScheduller />
    </React.Fragment>
  );
}

export default Scheduller;
