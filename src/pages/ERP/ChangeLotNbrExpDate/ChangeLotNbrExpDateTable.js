import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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

export default function ChangeLotNbrExpDateTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "RefNbr",
      headerName: "Reference Nbr",
      width: 140,
      sortable: false,
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
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 300,
    },
    // {
    //   field: "SrcLotNbr",
    //   headerName: "Source Lot Nbr",
    //   sortable: false,
    //   width: 150,
    // },
    // {
    //   field: "ToLotNbr",
    //   headerName: "Destination Lot Nbr",
    //   sortable: false,
    //   width: 150,
    // },
    {
      field: "Status",
      headerName: "Status",
      sortable: false,
      width: 140,
    },
    // {
    //   field: "ReceiptNbr",
    //   headerName: "Receipt Nbr",
    //   sortable: false,
    //   width: 150,
    // },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 110,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              history(
                `/change-lot-nbr-exp-date/detail/${params.row["RefNbr"]}`
              );
            }}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
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
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data ChangeLotNbrExpDateReps = ", response);
          if (response.status == 200) {
            const resdata = response.data;
            // const newdata = [];
            // Object.keys(resdata).forEach(function (key) {
            //   let resdataSource = resdata[
            //     key
            //   ].changeLotNbrExpDateDetailResourceRep.map((item, i) => {
            //     item.id = i;
            //     return item;
            //   });
            //   let resdataDestination = resdata[
            //     key
            //   ].changeLotNbrExpDateDetailDestinationRep.map((item, i) => {
            //     item.id = i;
            //     return item;
            //   });
            //   let resdataApproval = resdata[
            //     key
            //   ].changeLotNbrExpDateApprovalDetailRep.map((item, i) => {
            //     item.id = i;
            //     return item;
            //   });
            //   let resdataOther = resdata[
            //     key
            //   ].changeLotNbrExpDateOtherInformationDetailRep.map((item, i) => {
            //     item.id = i;
            //     return item;
            //   });
            //   newdata.push({
            //     id: key,
            //     RefNbr: resdata[key].refNbr,
            //     Date: resdata[key].date,
            //     Description: resdata[key].description,
            //     SrcLotNbr: resdataSource[0].srcLotNbr,
            //     ToLotNbr: resdataDestination[0].toLotNbr,
            //     ApprovedStatus: resdataApproval[0].approvedStatus,
            //     ReceiptNbr: resdataOther[0].receiptNbr,
            //   });
            // });
            let sort = resdata.sort((a, b) => {
              var c = new Date(b.Date);
              var d = new Date(a.Date);
              return c - d;
            });
            setData(sort);
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
    console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus!");
            getData();
            // setTimeout(() => {
            //   window.location.reload();
            // }, 800);
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
        title: "Apakah Anda yakin melakukan hapus data ini?",
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

  const SyncSiteLoc = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/StockItemSyncReps/SyncSiteLoc`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            // NotifySuccess("success", "Data Telah DiSinkronisasi");
            // setTimeout(() => {
            //   window.location.reload();
            // }, 800);
            SyncLotNbr();
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

  const SyncLotNbr = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/StockItemSyncReps/SyncStockSalesLotNbr`,
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

  const notifySync = async () => {
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
          SyncSiteLoc();
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
        <Button
          color="success"
          onClick={notifySync}
          disableElevation
          style={{ marginLeft: "auto" }}
        >
          <span>
            <SyncIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Sync
        </Button>
        {/* <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          // className={"float-right"}
          style={{ marginLeft: "auto" }}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        /> */}
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
              autoHeight
              disableColumnFilter
              disableColumnMenu
              density="compact"
              getRowId={(row) => row.RefNbr}
              columns={columns}
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
                  `/change-lot-nbr-exp-date/detail/${params.row["RefNbr"]}`
                );
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}
