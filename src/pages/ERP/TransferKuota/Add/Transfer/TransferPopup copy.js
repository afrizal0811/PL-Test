import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useMemo, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import CbData from "../../../../../components/shared/dropdown";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box sx={{ bgcolor: "yellow" }}>
      <TextField
        // variant="outline"
        value={props.value}
        onChange={props.onChange}
        placeholder="Inventory"
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
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          pr: 4,
          m: (theme) => theme.spacing(0),
          "& .MuiSvgIcon-root": {
            mr: 5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
          float: "right",
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function TransferPopup(props) {
  const [searchText, setSearchText] = React.useState("");
  const [editmode, seteditmode] = useState(false);
  const [DataRows, setDataRows] = useState(props.GridSource);
  const [Rows, setRows] = useState(props.GridSource);
  const [Warehouse, setWarehouse] = useState("");
  const [qtyTemp, setqtyTemp] = useState(0);
  const [widthrow, setwidthrow] = useState(420);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [BranchID, setBranchID] = useState("");

  React.useEffect(() => {
    setRows(props.GridSource);
    if (props.GridSource.filter((ae) => ae.Descr.length > 60).length > 0) {
      setwidthrow(790);
    } else {
      setwidthrow(420);
    }
  }, [props.GridSource]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      field: "DstQty",
      headerName: "Qty Selected",
      width: 120,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        // if (!isInEditModeZona) {
        //   params.api.setRowMode(params.id, "view");
        // } else {
        //   params.api.setRowMode(params.id, "edit");
        // }
        return (
          <FormControl style={{ width: "100%" }}>
            <NumberFormat
              thousandsGroupStyle="thousand"
              fullWidth
              required
              // label="Price (Include PPN)"
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              customInput={TextField}
              // type={"number"}
              // style={{ width: "100%" }}
              disabled={!isInEditModeZona}
              value={
                params.api.getRowMode(params.id) === "edit"
                  ? qtyTemp
                  : params.value
              }
              color={
                params.row.TransferQty - qtyTemp < 0 || qtyTemp < 0
                  ? "error"
                  : ""
              }
              InputProps={{
                readOnly: params.api.getRowMode(params.id) === "view",
                inputProps: { min: 0, max: params.row.TransferQty },
              }}
              onChange={(e) => {
                setqtyTemp(e.target.value);
                console.log(params.row.TransferQty);
                console.log(params.row.TransferQty - qtyTemp);
              }}
              onBlur={(e) => {
                if (
                  params.row.TransferQty - qtyTemp >= 0 &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  console.log("blur", qtyTemp);
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      DstQty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      Descr: value.Descr,
                      id: value.id,
                      InventoryID: value.InventoryID,
                      DetailSourceID: value.DetailSourceID,
                      TransferQty: value.TransferQty,
                      QtyAvail: value.TransferQty - value.DstQty,
                      QtyBeforeTransfer: value.QtyBeforeTransfer,
                      QtyAfterTransfer: value.QtyAfterTransfer,
                      ToWarehouseID: value.ToWarehouseID,
                      DstQty: value.DstQty,
                      Qty: value.DstQty,
                      // Qty: qtyTemp,
                      UOM: value.UOM,
                    }))
                  );
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                } else {
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                  seteditmode(false);
                }
              }}
              onKeyUp={(e) => {
                if (
                  e.key === "Enter" &&
                  params.row.TransferQty - qtyTemp >= 0 &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      DstQty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      Descr: value.Descr,
                      id: value.id,
                      InventoryID: value.InventoryID,
                      TransferQty: value.TransferQty,
                      DetailSourceID: value.DetailSourceID,
                      QtyAvail: value.TransferQty - value.DstQty,
                      QtyBeforeTransfer: value.QtyBeforeTransfer,
                      QtyAfterTransfer: value.QtyAfterTransfer,
                      Qty: value.DstQty,
                      ToWarehouseID: value.ToWarehouseID,
                      DstQty: value.DstQty,
                      UOM: value.UOM,
                    }))
                  );
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                }
              }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
    },
    {
      field: "Descr",
      headerName: "Description",
      width: widthrow,
      sortable: false,
    },
    {
      field: "ToWarehouseID",
      headerName: "To Warehouse",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        // if (!isInEditModeZona) {
        //   params.api.setRowMode(params.id, "view");
        // } else {
        //   params.api.setRowMode(params.id, "edit");
        // }
        return (
          <FormControl style={{ width: "100%" }}>
            <CbData
              value={
                params.api.getRowMode(params.id) === "edit"
                  ? Warehouse
                  : params.value
              }
              disabled={!isInEditModeZona}
              defaultValue={
                params.api.getRowMode(params.id) === "edit"
                  ? Warehouse
                  : params.value
              }
              // required
              size={"small"}
              // all
              label="To Warehouse"
              source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse?branch=${BranchID}`}
              id="warehouseID"
              desc="description"
              onChange={(e) => {
                setWarehouse(e);
                params.api.updateRows([
                  {
                    id: params.id,
                    ToWarehouseID: e,
                    // zoneID: String(e[0].zoneID),
                    // description: String(e[0].description),
                    // NamaKota: String(e[0].namaKota),
                  },
                ]);
                setRows(
                  [...params.api.getRowModels()].map(([id, value]) => ({
                    ...value,
                    ToWarehouseID: value.ToWarehouseID,
                  }))
                );
                console.log("e", e);
              }}
              // onBlur={(e) => {
              //   console.log("e blur", e);
              //   params.api.updateRows([
              //     {
              //       id: params.id,
              //       ToWarehouseID: Warehouse,
              //     },
              //   ]);
              //   params.api.commitRowChange(params.id);
              //   props.setGridSource(
              //     [...params.api.getRowModels()].map(([id, value]) => ({
              //       ...value,
              //       ToWarehouseID: value.ToWarehouseID,
              //     }))
              //   );
              //   setWarehouse("");
              // }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 70,
      sortable: false,
    },
    {
      field: "TransferQty",
      headerName: "Transfer Qty",
      width: 115,
      type: "number",
      sortable: false,
    },
  ];

  const refdata = useRef(null);
  const column = useMemo(
    () =>
      columns.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refdata.current = params.api;
          return null;
        },
      }),
    [columns]
  );

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = props.GridSource.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    console.log("searchValue", searchValue);
    console.log("filteredRows", filteredRows);
    console.log("props.GridSource", props.GridSource);
    console.log("refdata", refdata);
    setRows(filteredRows);
  };

  return (
    <Dialog
      open={props.openTransferKuota}
      onClose={() => props.setOpenTransferKuota(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenTransferKuota(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={2} mb={3} md={9}>
              <Grid item md={4}>
                <CbData
                  value={BranchID == "" ? " " : `${BranchID}`}
                  defaultValue={BranchID == "" ? " " : `${BranchID}`}
                  required
                  // disabled={GridSource.length > 0}
                  label="Branch"
                  source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps`}
                  id="BranchID"
                  desc="BranchName"
                  onChange={(e) => {
                    setBranchID(e);
                    console.log("e", e);
                  }}
                />
              </Grid>
              <Grid item md={4}>
                {/* <TextField
                  label="Inventory"
                  value={Inventory}
                  onChange={(e) => {
                    setInventory(e.target.value);
                  }}
                  fullWidth
                /> */}
                <QuickSearchToolbar
                  sx={{ ml: "auto" }}
                  value={searchText}
                  onChange={(event) => requestSearch(event.target.value)}
                  clearSearch={() => requestSearch("")}
                />
              </Grid>
            </Grid>
            <Paper>
              <div style={{ height: 370, width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={Rows}
                  getRowId={(row) => row.id}
                  columns={column}
                  editMode="row"
                  checkboxSelection
                  density="compact"
                  disableColumnFilter
                  disableColumnMenu
                  ref={refdata}
                  disableSelectionOnClick
                  // onCellEditCommit={handleRowEditCommit}
                  selectionModel={selectedRows}
                  onCellDoubleClick={(e) => {
                    let filter = [...refdata.current.getSelectedRows()].map(
                      ([id, value]) => ({
                        id: value.id,
                      })
                    );
                    console.log("double", e);
                    const isInEditModeZona =
                      filter.filter((row) => row.id == e.id).length > 0;
                    if (editmode == false && isInEditModeZona) {
                      // console.log("klik", e);
                      setqtyTemp(e.row.DstQty);
                      refdata.current.setRowMode(e.id, "edit");
                      seteditmode(true);
                    }
                  }}
                  onSelectionModelChange={(e) => {
                    setSelectedRows(e);
                    // refdata.current.setRowMode(e.map(e), "edit");
                    const selectedIDs = new Set(e);
                    const selectedRows = Rows.filter((row) =>
                      selectedIDs.has(row.id)
                    );
                    console.log("select", selectedRows);
                    setSelectedObj(selectedRows);
                  }}
                  pageSize={5}
                  // paginationMode="server"
                  // rowCount={totaldata}
                  // pagination
                  // onPageChange={(page) => {
                  //   getData(page + 1);
                  //   console.log("page = ", page);
                  // }}
                />
              </div>
            </Paper>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        {/* <Button color="primary" variant="contained">
          Add
        </Button> */}
        <Button
          onClick={() => {
            props.setData(
              [...refdata.current.getSelectedRows()].map(([id, value]) => ({
                id: value.id + props.Data.length,
                Qty: value.DstQty,
                // QtyAvail: value.QtyAvail,
                ToBranchID: BranchID,
                InventoryID: value.InventoryID,
                DetailSourceID: value.DetailSourceID,
                Descr: value.Descr,
                ToWarehouseID: value.ToWarehouseID,
                UOM: value.UOM,
                QtyBeforeTransfer: value.QtyBeforeTransfer,
                QtyAfterTransfer: value.QtyAfterTransfer,
              }))
            );
            props.setOpenTransferKuota(false);
            setSearchText("");
            requestSearch("");
            setSelectedRows([]);
          }}
          color="primary"
          disabled={!BranchID || editmode || qtyTemp !== 0}
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => {
            requestSearch("");
            props.setOpenTransferKuota(false);
          }}
          color="error"
          variant="contained"
          mr={3}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
