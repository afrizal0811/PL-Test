import React, { useState } from "react";
import styled from "styled-components/macro";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import swal from "sweetalert2";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  Card as MuiCard,
  CircularProgress,
  Grid,
  Paper as MuiPaper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";
import TransferPopup from "./TransferPopup";
import moment from "moment";
import { Box } from "@mui/system";
import TransferPopupEdit from "./TransferPopupEdit";
import NumberFormat from "react-number-format";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function DetailTransfer({
  dataDetail,
  dataListDetail,
  setDataListDetail,
  requiredField,
  selectionTCById,
  loading,
  setSelectionTCById,
  totalPageDataDetail,
  setPageSize,
  pageSize,
  curretPage,
  setCurretPage,
}) {
  const [openAllocated, setOpenAllocated] = useState(false);
  const [openEditAllocated, setOpenEditAllocated] = useState(false);
  const [dataEditAllocated, setDataEditAllocated] = useState(null);
  const [widthrow, setwidthrow] = useState(420);

  React.useEffect(() => {
    // if (dataListDetail.filter((ae) => ae.Descr.length > 60).length > 0) {
    //   setwidthrow(790);
    // } else {
    //   setwidthrow(420);
    // }
    let leng = 1;
    dataListDetail.map((ae) => {
      if (leng <= ae.Descr.length) {
        leng = ae.Descr.length;
      }
      setwidthrow(leng * 8 + 30);
      // console.log(
      //   "ae.InventoryDescription.length",
      //   ae.InventoryDescription.length
      // );
      // console.log("leng", leng);
      // console.log("widhrow", leng * 14);
    });
  }, [dataListDetail]);

  const columns = [
    {
      field: "FeedbackIcon",
      headerName: (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FeedbackIcon />
        </Box>
      ),
      sortable: false,
      renderCell: (params) =>
        params.row.TransferQty > params.row.KuotaAvailable && (
          <Tooltip title="Qty tidak boleh lebih besar dari Kuota Available">
            <Box>
              <FeedbackIcon color="error" />
            </Box>
          </Tooltip>
        ),
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 200,
    },
    {
      field: "Descr",
      headerName: "Description",
      width: widthrow,
    },
    {
      field: "UOMSelected",
      headerName: "UOM",
      width: 200,
      renderCell: (params) => {
        if (params.row.UOMSelected) {
          return params.value;
        }
        return params.row.UOM;
      },
    },
    {
      field: "TransferQty",
      headerName: "Qty",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "QtyShipment",
      headerName: "Qty Shipment",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value || 0}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "KuotaAvailable",
      headerName: "Kuota Available",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "RemainKuota",
      headerName: "Remaining Kuota",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "BaseItemWeight",
      headerName: "Unit Weight",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "ExtWeight",
      headerName: "Ext Weight",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "BaseItemVolume",
      headerName: "Unit Volume",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "ExtVolume",
      headerName: "Ext Volume",
      width: 200,
      align: "right",
      renderCell: (params) => {
        return (
          <NumberFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        );
      },
    },
    {
      field: "LastUpdate",
      headerName: "Last Update",
      width: 200,
      renderCell: (params) => {
        return <div>{moment(params.value).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      field: "id",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            size="small"
            startIcon={<EditIcon />}
            disabled={dataDetail?.Status == "Released" ? true : false}
            onClick={() => {
              setOpenEditAllocated(true);
              setDataEditAllocated(params.row);
            }}
          ></Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 4 }}
            disabled={dataDetail?.Status == "Released" ? true : false}
            startIcon={<DeleteIcon />}
            onClick={() =>
              notifyDeleteConfirm(params.row.TransferCabangDetailAllocatedID)
            }
          ></Button>
        </strong>
      ),
    },
  ];

  const notifyDeleteConfirm = async (id) => {
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
          HandleDeleteListItem(id);
        }
      });
  };

  const HandleDeleteListItem = (id) => {
    const updateList = dataListDetail.filter(
      (item) => item.TransferCabangDetailAllocatedID !== id
    );

    setDataListDetail(updateList);
  };

  return (
    <Card mb={6} mt={0}>
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
          <div style={{ display: "flex", margin: "10px" }}>
            <Typography variant="h4" style={{ marginRight: 20 }}>
              Allocated
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={
                dataDetail?.Status === "Released" ? true : !requiredField
              }
              onClick={() => {
                setOpenAllocated(true);
              }}
            >
              Add Item
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: 8 }}
              disabled={
                dataDetail?.Status === "Released" ? true : !selectionTCById
              }
              onClick={() => notifyDeleteConfirm(selectionTCById)}
            >
              Remove
            </Button>
          </div>
          <div style={{ width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              autoHeight
              density="compact"
              rows={dataListDetail}
              getRowId={(r) => r.TransferCabangDetailAllocatedID}
              rowCount={totalPageDataDetail}
              columns={columns}
              pageSize={pageSize}
              paginationMode="server"
              pagination
              page={curretPage - 1}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onPageChange={(page) => {
                setCurretPage(page + 1);
              }}
              onSelectionModelChange={(selection) => {
                setSelectionTCById(selection[0]);
              }}
              onRowDoubleClick={(evt) => {
                if (dataDetail?.Status !== "Released") {
                  setOpenEditAllocated(true);
                  setDataEditAllocated(evt.row);
                }
              }}
            />
          </div>

          {openAllocated && (
            <TransferPopup
              openAllocated={openAllocated}
              setOpenAllocated={setOpenAllocated}
              dataListDetail={dataListDetail}
              dataDetail={dataDetail}
              setDataListDetail={(e) => {
                setDataListDetail(
                  dataListDetail.concat(
                    e.filter((bo) =>
                      dataListDetail.every(
                        (ao) => ao.TransferCabangDetailAllocatedID !== bo.id
                      )
                    )
                  )
                );
              }}
            />
          )}

          {openEditAllocated && (
            <TransferPopupEdit
              popupTitle={"Update Allocated Item"}
              dataListDetail={dataListDetail}
              openEditAllocated={openEditAllocated}
              setOpenEditAllocated={setOpenEditAllocated}
              dataEditAllocated={dataEditAllocated}
              setDataListDetail={setDataListDetail}
            />
          )}
        </Paper>
      )}
    </Card>
  );
}
