import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import {
  Grid,
  Checkbox,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardContent,
  InputAdornment,
  IconButton,
  FormControl,
  Autocomplete,
  CircularProgress,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { Clear } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import { getBrach } from "../../../../../../utils/jwt";
import { GetConfig } from "../../../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function DialogAddItem(props) {
  const [Inventory, setInventory] = useState("");
  const [availOnly, setavailOnly] = useState(false);
  const [OptionInventory, setOptionInventory] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [Warehouse, setWarehouse] = useState("");
  const [qtyTemp, setqtyTemp] = useState(0);
  const [OnlyAvailable, setOnlyAvailable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [IDinc, setIDinc] = useState(props.IDLength);

  // React.useEffect(() => {
  //   setRowsState((prevRowCountState) => {
  //   });
  // }, [rowsState, setRowsState]);

  React.useEffect(() => {
    if (props.openAddItem == true) {
      getData(currentPage);
      console.log("tes", Inventory);
      setSelectedObj([]);
      setSelectedRows([]);
    }
  }, [currentPage, Inventory, props.openAddItem]);

  // React.useEffect(() => {
  //   setIDinc
  // }, [props.IDLength]);

  React.useEffect(() => {
    if (Warehouse.length > 2 || Inventory.length > 2) {
      getData(currentPage);
    }
    if (Warehouse.length == 0 || Inventory.length == 0) getData(currentPage);
  }, [Warehouse, Inventory, availOnly]);

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/StockItemReps/StockItemSiteLocPagination?page=${currentPage}&rowsCount=5&inventoryID=${
            Inventory.length > 2 ? Inventory : ""
          }&warehouse=${
            Warehouse.length > 2 ? Warehouse : ""
          }&branch=${getBrach()}&justAvailable=${availOnly}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data stockitem = ", response);
          if (response.status == 200) {
            const resdata = response.data[0].record;
            const newdata = resdata.map((item, i) => {
              item.id = i;
              item.inventoryQtyAvailableSiteLocID =
                item.InventoryQtyAvailableSiteLocID;
              item.inventoryDesc = item.Description;
              item.qtyAvailable = item.QtyAvailable;
              item.qtyOnHand = item.QtyOnHand;
              item.warehouse = item.Warehouse;
              item.inventoryID = item.InventoryID;
              item.uom = item.BaseUnit;
              item.locationID = item.LocationID;
              item.qty = 0;
              return item;
            });
            // setData(newdata);
            setDataRows(newdata);
            settotaldata(response.data[0].totalCountData);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      field: "qty",
      headerName: "Qty Selected",
      width: 130,
      type: "number",
      renderCell: (params) => {
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: id,
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
              disabled={!isInEditModeZona}
              value={
                params.api.getRowMode(params.id) === "edit"
                  ? qtyTemp
                  : params.value
              }
              color={
                qtyTemp > params.row.qtyAvailable || qtyTemp < 0 ? "error" : ""
              }
              InputProps={{
                readOnly: params.api.getRowMode(params.id) === "view",
                inputProps: { min: 0, max: params.row.qtyAvailable },
              }}
              onChange={(e) => {
                setqtyTemp(e.target.value);
              }}
              onBlur={(e) => {
                if (
                  params.row.qtyAvailable >= qtyTemp &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      qty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setDataRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      inventoryDesc: value.inventoryDesc,
                      inventoryQtyAvailableSiteLocID:
                        value.InventoryQtyAvailableSiteLocID,
                      id: value.id,
                      inventoryID: value.inventoryID,
                      qtyAvailable: value.qtyAvailable,
                      qtyOnHand: value.qtyOnHand,
                      qty: value.qty,
                      uom: value.uom,
                      warehouse: value.warehouse,
                      locationID: value.locationID,
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
                  params.row.qtyAvailable >= qtyTemp &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      qty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setDataRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      inventoryDesc: value.inventoryDesc,
                      id: value.id,
                      inventoryQtyAvailableSiteLocID:
                        value.InventoryQtyAvailableSiteLocID,
                      inventoryID: value.inventoryID,
                      qtyAvailable: value.qtyAvailable,
                      qtyOnHand: value.qtyOnHand,
                      qty: value.qty,
                      uom: value.uom,
                      warehouse: value.warehouse,
                      locationID: value.locationID,
                    }))
                  );
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                }
              }}
              displayType="input"
              type="text"
              thousandSeparator={true}
              allowNegative={false}
            />
            {/* <TextField
              type={"number"}
              style={{ width: "100%" }}
              disabled={!isInEditModeZona}
              value={
                params.api.getRowMode(params.id) === "edit"
                  ? qtyTemp
                  : params.value
              }
              color={
                qtyTemp > params.row.qtyAvailable || qtyTemp < 0 ? "error" : ""
              }
              InputProps={{
                readOnly: params.api.getRowMode(params.id) === "view",
                inputProps: { min: 0, max: params.row.qtyAvailable },
              }}
              onChange={(e) => {
                setqtyTemp(e.target.value);
              }}
              onBlur={(e) => {
                if (
                  params.row.qtyAvailable >= qtyTemp &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      qty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setDataRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      inventoryDesc: value.inventoryDesc,
                      inventoryQtyAvailableSiteLocID:
                        value.InventoryQtyAvailableSiteLocID,
                      id: value.id,
                      inventoryID: value.inventoryID,
                      qtyAvailable: value.qtyAvailable,
                      qtyOnHand: value.qtyOnHand,
                      qty: value.qty,
                      uom: value.uom,
                      warehouse: value.warehouse,
                      locationID: value.locationID,
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
                  params.row.qtyAvailable >= qtyTemp &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  seteditmode(false);
                  params.api.updateRows([
                    {
                      id: params.id,
                      qty: qtyTemp,
                    },
                  ]);
                  params.api.commitRowChange(params.id);
                  setDataRows(
                    [...params.api.getRowModels()].map(([id, value]) => ({
                      inventoryDesc: value.inventoryDesc,
                      id: value.id,
                      inventoryQtyAvailableSiteLocID:
                        value.InventoryQtyAvailableSiteLocID,
                      inventoryID: value.inventoryID,
                      qtyAvailable: value.qtyAvailable,
                      qtyOnHand: value.qtyOnHand,
                      qty: value.qty,
                      uom: value.uom,
                      warehouse: value.warehouse,
                      locationID: value.locationID,
                    }))
                  );
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                }
              }}
            /> */}
          </FormControl>
        );
      },
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      width: 110,
      sortable: false,
    },
    {
      field: "locationID",
      headerName: "Location",
      width: 110,
      sortable: false,
    },
    {
      field: "inventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
    },
    {
      field: "inventoryDesc",
      headerName: "Description",
      width: 150,
      sortable: false,
    },
    {
      field: "uom",
      headerName: "UOM",
      width: 90,
      sortable: false,
    },
    {
      field: "qtyAvailable",
      headerName: "Qty Available",
      width: 130,
      sortable: false,
    },
    {
      field: "qtyOnHand",
      headerName: "Qty On Hand",
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

  const handleCheckOnlyAvailable = (event) => {
    setOnlyAvailable(event.target.checked);
  };

  const getOptionInventory = async (e) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=${e}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log("ini data stockitem = ", response);
          if (response.status == 200 || response.status == 201) {
            const resdata = response.data;
            // const newres = [];
            // Object.keys(resdata).forEach(function (key) {
            //   newres.push(resdata[key][props.inventoryID]);
            // });
            console.log("newres", resdata);
            setOptionInventory(resdata);
            // setOptionInventory(newres);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // React.useEffect(() => {
  //   if (!openInv) {
  //     setOptionInventory([]);
  //   }
  // }, [openInv]);

  return (
    <Dialog
      open={props.openAddItem}
      onClose={() => props.setOpenAddItem(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="xl"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenAddItem(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <TextField
                  label="Inventory"
                  value={Inventory}
                  onChange={(e) => {
                    setInventory(e.target.value);
                  }}
                  fullWidth
                />
                <Checkbox
                  checked={availOnly}
                  onChange={(e) => {
                    setavailOnly(!availOnly);
                  }}
                />
                Show Available Items Only
              </Grid>
              <Grid item md={3}>
                <TextField
                  label="Warehouse"
                  value={Warehouse}
                  onChange={(e) => {
                    setWarehouse(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Paper>
              <div style={{ width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={DataRows}
                  autoHeight
                  density="compact"
                  getRowId={(row) => row.id}
                  columns={column}
                  editMode="row"
                  checkboxSelection
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
                      setqtyTemp(e.value);
                      refdata.current.setRowMode(e.id, "edit");
                      seteditmode(true);
                    }
                  }}
                  onSelectionModelChange={(e) => {
                    setSelectedRows(e);
                    // refdata.current.setRowMode(e.map(e), "edit");
                    const selectedIDs = new Set(e);
                    const selectedRows = DataRows.filter((row) =>
                      selectedIDs.has(row.id)
                    );
                    console.log("select", selectedRows);
                    setSelectedObj(selectedRows);
                  }}
                  paginationMode="server"
                  pageSize={5}
                  rowCount={totaldata}
                  pagination
                  onPageChange={(page) => {
                    getData(page + 1);
                    console.log("page = ", page);
                  }}
                />
              </div>
            </Paper>
          </CardContent>
        </Card>
      </DialogContent>
      {/* <Divider
        my={6}
        ml={6}
        mr={6}
        style={{
          height: "2px",
          border: "none",
          backgroundColor: "#bdbdbd",
        }}
      /> */}
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        {/* <Button color="primary" variant="contained">
          Add
        </Button> */}
        <Button
          onClick={() => {
            props.setDataAdd(
              [...refdata.current.getSelectedRows()].map(([id, value]) => ({
                id: props.IDLength + id,
                InventoryQtyAvailableSiteLocID:
                  value.inventoryQtyAvailableSiteLocID,
                Qty: value.qty,
                InventoryID: value.inventoryID,
                UOM: value.uom,
                ToUOM: value.uom,
                InventoryDesc: value.inventoryDesc,
                SiteCD: value.warehouse,
                ToSiteCD: value.warehouse,
                QtyAvailable: value.qtyAvailable,
                LocationID: value.locationID,
                ToLocationID: value.locationID,
                SrcExpDate: "",
                ToExpDate: "",
                ReasonCode: "CHANGELTEX",
                ToReasonCode: "CHANGELTEXD",
              }))
            );
            props.setOpenAddItem(false);
            setSelectedObj([]);
            setSelectedRows([]);
            setInventory("");
          }}
          color="primary"
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => {
            setInventory("");
            props.setOpenAddItem(false);
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
