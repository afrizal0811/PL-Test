import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { GetConfig } from "../../../../../utils/ConfigHeader";
import moment from "moment";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function SourcePopup(props) {
  const [Inventory, setInventory] = useState("");
  const [openInv, setopenInv] = useState(false);
  const [OptionInventory, setOptionInventory] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [Warehouse, setWarehouse] = useState("");
  const [widthrow, setwidthrow] = useState(420);
  const [OnlyAvailable, setOnlyAvailable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  // React.useEffect(() => {
  //   setRowsState((prevRowCountState) => {
  //   });
  // }, [rowsState, setRowsState]);

  // React.useEffect(() => {
  //   getData(currentPage);
  //   console.log("tes", Inventory);
  // }, [currentPage, Inventory]);

  React.useEffect(() => {
    if (props.openSource) {
      if (Inventory.length > 1) {
        getData(currentPage);
      }
      if (Inventory.length == 0) getData(currentPage);
    }
  }, [props.openSource, currentPage, Inventory, pageSize]);

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetMutasiKuotaSummaryByPagination2?page=${currentPage}&rowsCount=${pageSize}&branchID=${
            props.BranchID
          }&warehouseID=${props.Warehouse}&date=${moment().format(
            "YYYY-MM-DD"
          )}&inventoryID=${
            Inventory.length > 1 ? Inventory : ""
          }&kelompok=${""}&isDry=True&isFrozen=True`,
          GetConfig()

          // &warehouseID=${
          //   props.Warehouse
          // }&inventoryID=${
          //   Inventory.length > 2 ? Inventory : ""
          // }&isDry=True&isFrozen=True&date=${moment().format("YYYY-MM-DD")}`,
          // GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data stockitem = ", response);
          if (response.status == 200) {
            const resdata = response.data[0].record;
            // const newdata = resdata.map((item, i) => {
            //   item.id = i;
            //   item.inventoryQtyAvailableSiteLocID =
            //     item.InventoryQtyAvailableSiteLocID;
            //   item.inventoryDesc = item.Description;
            //   item.qtyAvailable = item.QtyAvailable;
            //   item.qtyOnHand = item.QtyOnHand;
            //   item.warehouse = item.Warehouse;
            //   item.inventoryID = item.InventoryID;
            //   item.uom = item.BaseUnit;
            //   item.locationID = item.LocationID;
            //   item.qty = 0;
            //   return item;
            // });
            // setData(newdata);
            setDataRows(resdata);
            if (
              resdata.filter((ae) => ae.InventoryDescription.length > 60)
                .length > 0
            ) {
              setwidthrow(790);
            } else {
              setwidthrow(420);
            }
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
      field: "WarehouseID",
      headerName: "Warehouse",
      width: 115,
      sortable: false,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
    },
    {
      field: "InventoryDescription",
      headerName: "Description",
      width: widthrow,
      sortable: false,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 70,
      sortable: false,
    },
    // {
    //   field: "BegSaldo",
    //   type: "number",
    //   headerName: "BegSaldo",
    //   width: 140,
    //   sortable: false,
    // },
    {
      field: "PurchaseEndSaldo",
      type: "number",
      headerName: "Qty Available",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        return (Math.round(params.value * 100) / 100).toFixed(2);
      },
    },
    {
      field: "FromBranchId",
      headerName: "Source Branch",
      width: 120,
      sortable: false,
    },
    {
      field: "FromWarehouseID",
      headerName: "Source Warehouse",
      width: 120,
      sortable: false,
    },
  ];

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
      open={props.openSource}
      onClose={() => {
        setSelectionModel([]);
        props.setOpenSource(false);
      }}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenSource(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon
            fontSize="large"
            onClick={() => {
              setSelectionModel([]);
              props.setOpenSource(false);
            }}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid container spacing={2} mb={3}>
              <Grid item md={3}>
                <TextField
                  label="Inventory"
                  value={Inventory}
                  onChange={(e) => {
                    setInventory(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              {/* <Grid item md={3}>
                <TextField
                  label="Warehouse"
                  value={Warehouse}
                  onChange={(e) => {
                    setWarehouse(e.target.value);
                  }}
                  fullWidth
                />
              </Grid> */}
            </Grid>
            <Paper>
              <div style={{ width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={DataRows}
                  getRowId={(row) => row.MutasiKuotaID}
                  density="compact"
                  columns={columns}
                  autoHeight
                  rowsPerPageOptions={[5, 10, 25]}
                  pageSize={pageSize}
                  disableColumnMenu
                  onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                  editMode="row"
                  checkboxSelection
                  disableSelectionOnClick
                  // onCellEditCommit={handleRowEditCommit}
                  selectionModel={selectedRows}
                  onSelectionModelChange={(e) => {
                    //setSelectedRows(e);
                    // refdata.current.setRowMode(e.map(e), "edit");
                    setSelectionModel(e);
                    const unselectedIDs = new Set(e);
                    const selectedIDs = new Set(e);
                    const unselectedModel = DataRows.filter(
                      (item) => !unselectedIDs.has(item.MutasiKuotaID)
                    );
                    const selectedModel = DataRows.filter((item) =>
                      selectedIDs.has(item.MutasiKuotaID)
                    );
                    console.log("unselect:", unselectedModel);
                    if (selectedObj.length == 0) {
                      setSelectedObj(selectedModel);
                    }
                    selectedModel.map((select) => {
                      if (
                        !selectedObj.some(
                          (item) => item.MutasiKuotaID == select.MutasiKuotaID
                        )
                      ) {
                        setSelectedObj(selectedObj.concat(select));
                      }
                    });
                    unselectedModel.map((unselect) => {
                      if (
                        selectedObj.some(
                          (item) => item.MutasiKuotaID == unselect.MutasiKuotaID
                        )
                      ) {
                        setSelectedObj(
                          selectedObj.filter(
                            (obj) => obj.MutasiKuotaID != unselect.MutasiKuotaID
                          )
                        );
                      }
                    });
                    // const selectedModel = selectedRows.map((item) => {});
                    // setSelectedObj(selectedRows);
                  }}
                  paginationMode="server"
                  // pageSize={}
                  rowCount={totaldata}
                  pagination
                  onPageChange={(page) => {
                    getData(page + 1);
                    console.log("page = ", page);
                  }}
                />
              </div>
            </Paper>
            <div>{selectionModel.length + " rows selected"}</div>
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
            props.setData(
              selectedObj.map((value, i) => ({
                id: i + props.Data.length,
                InventoryID: value.InventoryID,
                DetailSourceID: value.MutasiKuotaID,
                Descr: value.InventoryDescription,
                UOM: value.UOM,
                SrcQty: value.EndSaldo,
              }))
            );
            props.setOpenSource(false);
            setSelectedObj([]);
            setSelectedRows([]);
          }}
          color="primary"
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => {
            setSelectionModel([]);
            props.setOpenSource(false);
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
