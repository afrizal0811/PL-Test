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
const Paper = styled(MuiPaper)(spacing);

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box sx={{ bgcolor: "yellow" }}>
      <TextField
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

export default function AllocatedPopup(props) {
  const [pageSize, setpageSize] = useState(5);
  const [Inventory, setInventory] = useState("");
  const [editmode, seteditmode] = useState(false);
  const [Rows, setRows] = useState(props.DataSource);
  const [Warehouse, setWarehouse] = useState("");
  const [qtyTemp, setqtyTemp] = useState(0);
  const [widthrow, setwidthrow] = useState(420);
  const [searchText, setSearchText] = React.useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [isBlocking, setIsBlocking] = useState(false);
  var indexCount = 0;
  const [selectionModel, setSelectionModel] = React.useState([]);

  React.useEffect(() => {
    setRows(props.DataSource);
    if (props.DataSource.filter((ae) => ae.Descr.length > 60).length > 0) {
      setwidthrow(790);
    } else {
      setwidthrow(420);
    }
  }, [props.DataSource]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      field: "DstAlloKuota",
      headerName: "Qty Selected",
      width: 150,
      sortable: false,
      type: "number",
      renderCell: (params) => {
        const ItemIndex = Rows.findIndex((obj) => obj.id === params.id);
        return (
          <FormControl style={{ width: "100%" }}>
            <NumberFormat
              thousandsGroupStyle="thousand"
              fullWidth
              required
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              customInput={TextField}
              disabled={!selectionModel.includes(params.id)}
              value={params.value}
              onChange={(e) => {
                if (e.target.value >= 0) {
                  Rows[ItemIndex].DstAlloKuota = e.target.value;
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
      width: 150,
      sortable: false,
    },
    {
      field: "Descr",
      headerName: "Description",
      width: widthrow,
      sortable: false,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 150,
      sortable: false,
    },
    {
      field: "UnAlloKuota",
      headerName: "Qty Available",
      width: 150,
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
    const filteredRows = props.DataSource.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <Dialog
      open={props.openAllocated}
      onClose={() => props.setOpenAllocated(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenAllocated(false)}
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
                  value={
                    Warehouse?.WarehouseID == undefined
                      ? " "
                      : `${Warehouse.WarehouseID}`
                  }
                  defaultValue={
                    Warehouse?.WarehouseID == undefined
                      ? " "
                      : `${Warehouse.WarehouseID}`
                  }
                  required
                  all
                  label="Warehouse"
                  source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps`}
                  id="WarehouseID"
                  desc="Description"
                  onChange={(e) => {
                    setWarehouse(e[0]);
                    console.log("e", e);
                  }}
                />
              </Grid>
              <Grid item md={4}>
                <QuickSearchToolbar
                  sx={{ ml: "auto" }}
                  value={searchText}
                  onChange={(event) => requestSearch(event.target.value)}
                  clearSearch={() => requestSearch("")}
                />
              </Grid>
            </Grid>
            <Paper>
              <div style={{ width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={Rows}
                  getRowId={(row) => row.id}
                  columns={column}
                  editMode="row"
                  density="compact"
                  checkboxSelection
                  disableColumnMenu
                  ref={refdata}
                  disableSelectionOnClick
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
                      setqtyTemp(e.value);
                      refdata.current.setRowMode(e.id, "edit");
                      seteditmode(true);
                    }
                  }}
                  onSelectionModelChange={(e) => {
                    setSelectionModel(e);
                    const unselectedIDs = new Set(e);
                    const selectedIDs = new Set(e);
                    const unselectedModel = Rows.filter(
                      (item) => !unselectedIDs.has(item.id)
                    );
                    const selectedModel = Rows.filter((item) =>
                      selectedIDs.has(item.id)
                    );
                    console.log("unselect:", unselectedModel);
                    console.log("select:", selectionModel);
                    if (selectedObj.length == 0) {
                      setSelectedObj(selectedModel);
                    }
                    selectedModel.map((select) => {
                      if (!selectedObj.some((item) => item.id == select.id)) {
                        setSelectedObj(selectedObj.concat(select));
                      }
                    });
                    unselectedModel.map((unselect) => {
                      if (selectedObj.some((item) => item.id == unselect.id)) {
                        setSelectedObj(
                          selectedObj.filter((obj) => obj.id != unselect.id)
                        );
                      }
                    });
                  }}
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  autoHeight
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                />
              </div>
            </Paper>
            <div>{selectionModel.length + " rows selected"}</div>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        <Button
          onClick={() => {
            let selobj = selectedObj.map((value, i) => ({
              id: i++ + props.Data.length,
              DstAlloKuota: value.DstAlloKuota,
              DstBranchID: Warehouse.Branch,
              InventoryID: value.InventoryID,
              Descr: value.Descr,
              DstSiteID: Warehouse.WarehouseID,
              UOM: value.UOM,
              isOverLimit: value.DstAlloKuota > value.UnAlloKuota,
            }));
            let same = selobj.filter((el) => {
              return props.Data.some((f) => {
                return (
                  f.InventoryID === el.InventoryID &&
                  f.DstSiteID === el.DstSiteID
                );
              });
            });
            if (same.length > 0) {
              alert(
                `item ${same[0].InventoryID} sudah diAlokasikan ke warehouse ${same[0].DstSiteID} sebelumnya`
              );
            } else {
              let dataadd = selobj.filter((ad) =>
                same.every((fd) => fd.id !== ad.id)
              );
              console.log("data", dataadd);
              props.setData(dataadd);
              props.setOpenAllocated(false);
              setIsBlocking(false);
              setSelectedObj([]);
              setSelectedRows([]);
              requestSearch("");
            }
          }}
          color="primary"
          disabled={!Warehouse?.WarehouseID || !Warehouse?.Branch}
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => {
            props.setOpenAllocated(false);
            requestSearch("");
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
