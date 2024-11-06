import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import PopupImport from "./PopupImport";
import PopupResetKuota from "./PopupResetKuota";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Paper = styled(MuiPaper)(spacing);

export default function AllocatedKuotaTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  const [openImport, setopenImport] = React.useState(false);
  const [isModalResetKuotaOpen, setIsModalResetKuotaOpen] =
    React.useState(false);

  useEffect(() => {
    getData();
  }, [pageSize, curretPage]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "RefNbr",
      headerName: "Ref Nbr.",
      sortable: false,
      width: 150,
    },
    {
      field: "BranchID",
      headerName: "Branch",
      sortable: false,
      width: 120,
    },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      width: 140,
    },
    {
      field: "Date",
      headerName: "Date",
      sortable: false,
      width: 110,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        </>
      ),
    },
    {
      field: "CreatedByID",
      headerName: "Created By",
      sortable: false,
      width: 140,
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
              history(`/allocated-kuota/detail/${params.row.RefNbr}`);
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
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetAllocatedKuotaByPagination?page=${
            curretPage + 1
          }&rowsCount=${pageSize}&branch=${getBrach()}`,
          GetConfig()
          // `http://localhost:5000/GetAllocatedKuotaByPagination?page=${curretPage}&rowsCount=${pageSize}`
        )
        .then(function (response) {
          // handle success
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
          `${process.env.REACT_APP_DOMAIN_API}/DeleteAllocatedKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/allocated-kuota`;
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
            if (data.filter((ae) => ae.Status == "On Hold").length > 0) {
              NotifyError(
                "Error!",
                "Terdapat allocated kuota yang belum rilis"
              );
            } else {
              history("add");
            }
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
            if (data.filter((ae) => ae.Status == "On Hold").length > 0) {
              NotifyError(
                "Error!",
                "Terdapat allocated kuota yang belum rilis"
              );
            } else {
              // history("add");
              setopenImport(true);
            }
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Import
        </Button>
        <Button color="primary" onClick={() => setIsModalResetKuotaOpen(true)}>
          Reset Kuota
        </Button>
      </GridToolbarContainer>
    );
  }

  CustomToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  console.log({ data });

  return (
    <Card mb={6}>
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
              rowsPerPageOptions={[5, 15, 25, 50]}
              rows={data}
              getRowId={(r) => r.RefNbr}
              columns={columns}
              pageSize={pageSize}
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
                history(`/allocated-kuota/detail/${params.row["RefNbr"]}`);
              }}
              rowCount={totalPage}
              page={curretPage}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                setcurretPage(page);
                getData();
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
      <PopupImport openImport={openImport} setopenImport={setopenImport} />
      <PopupResetKuota
        open={isModalResetKuotaOpen}
        setOpen={setIsModalResetKuotaOpen}
      />
    </Card>
  );
}
