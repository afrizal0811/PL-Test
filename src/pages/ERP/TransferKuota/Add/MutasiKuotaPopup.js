import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import swal from "sweetalert2";
import { GetConfig } from "../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

const MutasiKuotaPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);

  const columns = [
    {
      field: "FromWarehouse",
      headerName: "Warehouse From",
      width: 120,
      sortable: false,
    },
    {
      field: "FromBranch",
      headerName: "Branch From",
      width: 120,
      sortable: false,
    },
    {
      field: "ToWarehouse",
      headerName: "Warehouse to",
      width: 120,
      sortable: false,
    },
    {
      field: "ToBranch",
      headerName: "Branch to",
      width: 120,
      sortable: false,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 130,
      sortable: false,
    },
    {
      field: "InventoryDescription",
      headerName: "Description",
      width: 160,
      sortable: false,
    },
  ];

  useEffect(() => {
    if (props.open) {
      setLoading(true);
      getData();
    }
  }, [props.open, currentPage]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/GetMutasiKuotaDetailInventoryByPagination?page=${currentPage}&rowsCount=${pageSize}`,
        GetConfig()
      );

      if (response.status === 200) {
        const resdata = response.data[0];
        setData(resdata.record);
        settotalPage(resdata.totalCountData);
      }
      setLoading(false);
    } catch (error) {
      // console.log(error);
      setLoading(false);
    }
  };

  const notifyConfirm = async () => {
    props.setopen(false);

    swal
      .fire({
        title: "Apakah Anda yakin melakukan Reset Data ini?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Reset",
      })
      .then((result) => {
        if (result.value) {
          handleReset();
          //   console.log("reset");
        } else {
          props.setopen(true);
        }
      });
  };

  const handleReset = async () => {
    if (selectedRows.length > 0) {
      setLoading(true);

      let dataMutasi = selectedObj.map((item) => {
        return {
          branchID: props.searchParams.branchID,
          warehouseID: props.searchParams.warehouseID,
          inventoryID: item.InventoryID,
        };
      });

      try {
        const response = await axios.put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateAllocatedKuota/ResetByInventoryId`,
          dataMutasi
        );

        if (response.status === 200) {
          setSelectedObj([]);
          setSelectedRows([]);
          props.setopen(false);

          NotifySuccess("success", "Data telah reset");
          setLoading(false);
        }
      } catch (error) {
        NotifyError("There was an error!", error);
        // console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setopen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select {props.label}</DialogTitle>
        <DialogContent>
          {loading ? (
            <Card mb={6} mt={0}>
              <Grid
                container
                justifyContent="center"
                spacing={1}
                md={12}
                xs={12}
              >
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <CircularProgress
                    disableShrink
                    style={{ textAlign: "center" }}
                  />
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
            </Card>
          ) : (
            <Paper>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rowsPerPageOptions={[5, 10, 25]}
                  ml={6}
                  mr={6}
                  getRowId={(item) => item.MutasiKuotaDetailID}
                  rows={data}
                  columns={columns}
                  checkboxSelection
                  disableSelectionOnClick
                  selectionModel={selectedRows}
                  onSelectionModelChange={(e) => {
                    setSelectedRows(e);
                    const selectedIDs = new Set(e);
                    const selectedRows = data.filter((row) =>
                      selectedIDs.has(row.MutasiKuotaDetailID)
                    );
                    setSelectedObj(selectedRows);
                  }}
                  rowCount={totalPage}
                  page={currentPage - 1}
                  paginationMode="server"
                  pagination
                  onPageChange={(page) => {
                    setCurrentPage(page + 1);
                  }}
                />
              </div>
            </Paper>
          )}
        </DialogContent>
        <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
          {/* <Button color="primary" variant="contained">
          Add
        </Button> */}
          <Button
            onClick={() => notifyConfirm()}
            color="primary"
            variant="contained"
            disabled={selectedRows.length === 0}
          >
            Reset & Close
          </Button>
          <Button
            onClick={() => props.setopen(false)}
            color="error"
            variant="contained"
            mr={3}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

MutasiKuotaPopup.propTypes = {
  open: PropTypes.bool,
  label: PropTypes.string,
  setOpen: PropTypes.func,
};

MutasiKuotaPopup.defaultProps = {
  open: false,
  label: "",
};

export default MutasiKuotaPopup;
