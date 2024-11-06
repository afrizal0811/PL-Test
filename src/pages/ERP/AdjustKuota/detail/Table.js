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
// import TransferPopup from "./TransferPopup";
import moment from "moment";
import { Box } from "@mui/system";
// import TransferPopupEdit from "./TransferPopupEdit";
import NumberFormat from "react-number-format";
import MutasiKuotaPopup from "./MutasiKuotaPopup";
import NewItemPopup from "./NewItemPopup";
import PopupEdit from "./PopupEdit";
import { getBrach } from "../../../../utils/jwt";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Table(props) {
  const [openAllocated, setOpenAllocated] = useState(false);
  const [openEditAllocated, setOpenEditAllocated] = useState(false);
  const [dataEditAllocated, setDataEditAllocated] = useState(null);
  const [widthrow, setwidthrow] = useState(420);
  const [selectionTCById, setSelectionTCById] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [openMutasiKuota, setopenMutasiKuota] = useState(false);
  const [openNewItem, setOpenNewItem] = useState(false);
  // const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  React.useEffect(() => {
    // if (dataListDetail.filter((ae) => ae.Descr.length > 60).length > 0) {
    //   setwidthrow(790);
    // } else {
    //   setwidthrow(420);
    // }
    console.log("data", props.Data);
    settotalPage(props.TableData.length);
  }, [props.TableData]);

  const columns = [
    // {
    //   field: "FeedbackIcon",
    //   width: 70,
    //   headerName: (
    //     <Box
    //       sx={{
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <FeedbackIcon />
    //     </Box>
    //   ),
    //   sortable: false,
    //   renderCell: (params) =>
    //     params.row.AdjusmentQty > params.row.KuotaAvailable && (
    //       <Tooltip title="Qty tidak boleh lebih besar dari Kuota Available">
    //         <Box>
    //           <FeedbackIcon color="error" />
    //         </Box>
    //       </Tooltip>
    //     ),
    // },
    // {
    //   field: "KuotaAdjustmentDetailID",
    //   headerName: "KuotaAdjustmentDetailID",
    //   sortable: false,
    //   width: 120,
    // },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      sortable: false,
      width: 120,
    },
    {
      field: "InventoryDescription",
      headerName: "Description",
      sortable: false,
      width: widthrow,
    },
    {
      field: "UOM",
      headerName: "UOM",
      sortable: false,
      width: 90,
    },
    {
      field: "KuotaAvailable",
      headerName: "Kuota Available",
      sortable: false,
      width: 150,
      align: "right",
      renderCell: (params) => (
        <>
          {props.Data?.StatusAdjustment == "Released" ? (
            <p>Released</p>
          ) : (
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              value={params.value}
              displayType={"text"}
            />
          )}
        </>
      ),
    },
    {
      field: "AdjusmentQty",
      headerName: "QTY Adjustment",
      sortable: false,
      width: 170,
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
      field: "endsaldo",
      headerName: "Kuota Setelah Adjustment",
      sortable: false,
      width: 200,
      align: "right",
      renderCell: (params) => (
        <>
          {props.Data?.StatusAdjustment == "Released" ? (
            <p>Released</p>
          ) : (
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              value={
                parseFloat(params.row.KuotaAvailable) +
                parseFloat(params.row.AdjusmentQty)
              }
              displayType={"text"}
            />
          )}
        </>
      ),
    },
    {
      field: "FromWarehouseID",
      headerName: "From Warehouse",
      sortable: false,
      align: "right",
      width: 150,
    },
    {
      field: "id",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            size="small"
            startIcon={<EditIcon />}
            disabled={props.Data?.StatusAdjustment == "Released" ? true : false}
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
            disabled={props.Data?.StatusAdjustment == "Released" ? true : false}
            startIcon={<DeleteIcon />}
            onClick={() => {
              // notifyDeleteConfirm(params.row.DetailSourceID)
              const updateList = props.TableData.filter((item) => {
                return params.row.KuotaAdjustmentDetailID
                  ? item.KuotaAdjustmentDetailID !==
                      params.row.KuotaAdjustmentDetailID
                  : item.InventoryID !== params.row.InventoryID;
              });
              props.setTableData(updateList);
            }}
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
    const updateList = props.TableData.filter(
      (item) => item.DetailSourceID !== id
    );
    props.setTableData(updateList);
  };

  return (
    <Card mb={6} mt={4}>
      {props.loading ? (
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
              Adjust
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={
                String(props.Data?.StatusAdjustment).toLocaleLowerCase() !==
                  "on hold" ||
                !props.Data?.FromBranchID ||
                // !props.Data?.ToBranchID ||
                // !props.Data?.ToWarehouseID ||
                !props.Data?.FromWarehouseID
              }
              onClick={() => {
                setopenMutasiKuota(true);
              }}
            >
              Add Item
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 8 }}
              disabled={
                String(props.Data?.StatusAdjustment).toLocaleLowerCase() !==
                  "on hold" ||
                !props.Data?.FromBranchID ||
                !props.Data?.FromWarehouseID ||
                props.Data?.FromBranchID !== getBrach()
              }
              onClick={() => setOpenNewItem(true)}
            >
              Add New Item
            </Button>
          </div>
          <div style={{ width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              density="compact"
              rows={props.TableData}
              getRowId={(r) =>
                r.KuotaAdjustmentDetailID
                  ? r.KuotaAdjustmentDetailID
                  : r.InventoryID
              }
              // rowCount={totalPage}
              disableColumnFilter
              disableColumnMenu
              columns={columns}
              pageSize={pageSize}
              // paginationMode="server"
              pagination
              // page={curretPage - 1}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onPageChange={(page) => {
              //   setcurretPage(page + 1);
              // }}
              onSelectionModelChange={(selection) => {
                setSelectionTCById(selection[0]);
              }}
              onRowDoubleClick={(evt) => {
                // if (dataDetail?.Status !== "Released") {
                //   setOpenEditAllocated(true);
                //   setDataEditAllocated(evt.row);
                // }
              }}
            />
          </div>

          {/* {openAllocated && (
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
                        (ao) => ao.DetailSourceID !== bo.id
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
          )} */}
        </Paper>
      )}
      {openEditAllocated && (
        <PopupEdit
          popupTitle={"Update Item"}
          TableData={props.TableData}
          openEdit={openEditAllocated}
          setOpenEdit={(e) => setOpenEditAllocated(e)}
          dataEdit={dataEditAllocated}
          setData={(e) => props.setTableData(e)}
        />
      )}
      <MutasiKuotaPopup
        open={openMutasiKuota}
        setopen={(e) => {
          setopenMutasiKuota(e);
        }}
        label={"Mutasi Kuota"}
        id={"MutasiKuota"}
        searchParams={{
          // warehouseID: props.Data.ToWarehouseID,
          warehouseID: props.Data.FromWarehouseID,
          isDry: true,
          isFrozen: true,
        }}
        setData={(e) => {
          // console.log("add", e);
          let newData = props.TableData.concat(
            e.filter((bo) =>
              props.TableData.every(
                (ao) => ao.KuotaAdjustmentDetailID != bo.KuotaAdjustmentDetailID
              )
            )
          );
          props.setTableData(newData);
          // settotalPage(newData.length);
        }}
      />
      <NewItemPopup
        data={props.Data}
        open={openNewItem}
        setopen={(e) => {
          setOpenNewItem(e);
        }}
        label={"Add New Item"}
        id={"NewItem"}
        setData={(e) => {
          // console.log("add", e);
          const isDuplicate = props.TableData.some(
            (item) =>
              !item.KuotaAdjustmentDetailID && item.InventoryID == e.InventoryID
          );
          if (!isDuplicate) {
            const newData = props.TableData.concat([e]);
            props.setTableData(newData);
          }
        }}
      />
    </Card>
  );
}
