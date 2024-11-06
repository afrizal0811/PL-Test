import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  Typography,
  IconButton,
  TextField,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { GetConfig } from "../../../utils/ConfigHeader";
import { DesktopDatePicker } from "@material-ui/lab";
import PopupImport from "./PopupImport";
import { getBrach } from "../../../utils/jwt";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Paper = styled(MuiPaper)(spacing);

export default function TransferKuotaTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  const [start, setstart] = React.useState(new Date());
  const [end, setend] = React.useState(new Date());
  const [openImport, setopenImport] = React.useState(false);

  useEffect(() => {
    getData(1);
  }, [pageSize, start, end]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "RefNbr",
      headerName: "Ref Nbr.",
      sortable: false,
      width: 130,
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      width: 150,
    },
    {
      field: "Date",
      headerName: "Date",
      sortable: false,
      type: "Date",
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        </>
      ),
      width: 105,
    },
    {
      field: "SourceBranchID",
      headerName: "Branch",
      sortable: false,
      width: 105,
    },
    {
      field: "CreatedByID",
      headerName: "Created By",
      sortable: false,
      width: 105,
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => {
              history(`/transfer-kuota/detail/${params.row.RefNbr}`);
            }}
          >
            Detail
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            disabled={params.row.Status == "On Hold" ? false : true}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.RefNbr)}
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
            process.env.REACT_APP_DOMAIN_API
          }/GetTransferKuotaByPagination?page=${page}&rowsCount=${pageSize}&start=${moment(
            start
          ).format("YYYY-MM-DD")}&end=${moment(end).format(
            "YYYY-MM-DD"
          )}&branch=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status == 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
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
          `${process.env.REACT_APP_DOMAIN_API}/DeleteTransferKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/transfer-kuota`;
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

  // // ini untuk pop up notifikasi
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
        <Button
          color="primary"
          onClick={() => {
            // if (data.filter((ae) => ae.Status == "On Hold").length > 0) {
            //   NotifyError("Error!", "Terdapat transfer kuota yang belum rilis");
            // } else {
            history("add");
            // }
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        <Button
          color="primary"
          onClick={() => {
            // history("add");
            setopenImport(true);
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Import
        </Button>
      </GridToolbarContainer>
    );
  }

  CustomToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <Card mb={6}>
      <Grid container spacing={2} mb={1} px={2} mt={3}>
        <Grid item md={3}>
          <DesktopDatePicker
            disabled={loading}
            label="Start Date"
            inputFormat={"dd/MM/yyyy"}
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
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              rows={data}
              getRowId={(r) => r.RefNbr}
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
                history(`/transfer-kuota/detail/${params.row["RefNbr"]}`);
              }}
              rowCount={totalPage}
              page={curretPage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                setcurretPage(page + 1);
                getData(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
      <PopupImport openImport={openImport} setopenImport={setopenImport} />
    </Card>
  );
}
