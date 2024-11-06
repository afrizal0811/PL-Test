import { spacing } from "@material-ui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardContent,
  Checkbox,
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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function SourcePopup(props) {
  const [Inventory, setInventory] = useState("");
  const [openInv, setopenInv] = useState(false);
  const [availOnly, setavailOnly] = useState(false);
  const [OptionInventory, setOptionInventory] = useState([]);
  const [editmode, seteditmode] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [BranchID, setBranchID] = useState(props.Branch);
  const [Warehouse, setWarehouse] = useState({ warehouseID: props.Warehouse });
  const [qtyTemp, setqtyTemp] = useState(0);
  const [OnlyAvailable, setOnlyAvailable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);

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
      if (Inventory.length > 2) {
        getData(currentPage);
      }
      if (Inventory.length == 0) getData(currentPage);
    }
  }, [
    props.openSource,
    pageSize,
    Inventory,
    availOnly,
    Warehouse.warehouseID,
    BranchID,
  ]);

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetMutasiKuotaSummaryByPagination?page=${currentPage}&rowsCount=${pageSize}&branchID=${
            props.Branch
          }&warehouseID=${props.Warehouse}&inventoryID=${
            Inventory.length > 2 ? Inventory : ""
          }&location=&isDry=True&isFrozen=True&FromBranchID=${
            props.SrcBranch
          }&FromWarehouseID=${props.SrcWarehouse}&isAvailable=${availOnly}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data stockitem = ", response);
          if (response.status == 200) {
            const resdata = response.data[0].record;
            const newdata = resdata.map((item, i) => {
              item.id = i;
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
      width: 120,
      sortable: false,
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
              // type={"number"}
              // style={{ width: "100%" }}
              disabled={!isInEditModeZona}
              value={
                params.api.getRowMode(params.id) === "edit"
                  ? qtyTemp
                  : params.value
              }
              color={
                qtyTemp > params.row.EndSaldo || qtyTemp < 0 ? "error" : ""
              }
              InputProps={{
                readOnly: params.api.getRowMode(params.id) === "view",
                inputProps: { min: 0, max: params.row.EndSaldo },
              }}
              onChange={(e) => {
                setqtyTemp(e.target.value);
                console.log(e.target.value);
              }}
              onBlur={(e) => {
                if (
                  params.row.EndSaldo >= qtyTemp &&
                  params.api.getRowMode(params.id) === "edit" &&
                  qtyTemp > 0
                ) {
                  console.log("blur", qtyTemp);
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
                      ...value,
                      // Description: value.Description,
                      // id: value.id,
                      // InventoryID: value.InventoryID,
                      // InventoryEndSaldoSiteLocID:
                      //   value.InventoryEndSaldoSiteLocID,
                      // Qty:
                      //   value.id == params.id
                      //     ? qtyTemp
                      //     : console.log(value.Qty),
                      // // Qty: value.id == params.id ? qtyTemp : 0,
                      // EndSaldo: value.EndSaldo,
                      // BaseUnit: value.BaseUnit,
                      // Warehouse: value.Warehouse,
                    }))
                  );
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                  seteditmode(false);
                } else {
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                  seteditmode(false);
                }
              }}
              onKeyUp={(e) => {
                if (
                  e.key === "Enter" &&
                  params.row.EndSaldo >= qtyTemp &&
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
                      ...value,
                      // Description: value.Description,
                      // id: value.id,
                      // InventoryID: value.InventoryID,
                      // Qty:
                      //   value.id == params.id
                      //     ? qtyTemp
                      //     : console.log(value.Qty),
                      // // Qty: qtyTemp,
                      // EndSaldo: value.EndSaldo,
                      // BaseUnit: value.BaseUnit,
                      // Warehouse: value.Warehouse,
                    }))
                  );
                  // console.log(DataRows);
                  params.api.setRowMode(params.id, "view");
                  setqtyTemp(0);
                  seteditmode(false);
                } else {
                  // params.api.setRowMode(params.id, "view");
                  // setqtyTemp(0);
                  // seteditmode(false);
                  console.log(DataRows);
                }
              }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "WarehouseID",
      headerName: "From Warehouse",
      width: 140,
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
      width: 400,
      sortable: false,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 70,
      sortable: false,
    },
    {
      field: "EndSaldo",
      type: "number",
      headerName: "Qty Before Transfer",
      width: 160,
      sortable: false,
    },
    {
      field: "FromBranchId",
      headerName: "Source Branch",
      width: 140,
      sortable: false,
    },
    {
      field: "FromWarehouseID",
      headerName: "Source Warehouse",
      width: 140,
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

  // React.useEffect(() => {
  //   if (!openInv) {
  //     setOptionInventory([]);
  //   }
  // }, [openInv]);

  return (
    <Dialog
      open={props.openSource}
      onClose={() => props.setOpenSource(false)}
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
          <CloseIcon fontSize="large" />
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
                <Checkbox
                  checked={availOnly}
                  onChange={(e) => {
                    setavailOnly(!availOnly);
                  }}
                />
                Show Available Items Only
              </Grid>
              <Grid item md={3}>
                {/* <CbData
                  value={BranchID == "" ? props.Branch : `${BranchID}`}
                  defaultValue={BranchID == "" ? props.Branch : `${BranchID}`}
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
                /> */}
              </Grid>
              <Grid item md={3}>
                {/* <TextField
                  label="Warehouse"
                  value={Warehouse}
                  onChange={(e) => {
                    setWarehouse(e.target.value);
                  }}
                  fullWidth
                /> */}
                {/* <CbData
                  value={
                    Warehouse?.warehouseID == undefined
                      ? " "
                      : `${Warehouse.warehouseID}`
                  }
                  defaultValue={
                    Warehouse?.warehouseID == undefined
                      ? " "
                      : `${Warehouse.warehouseID}`
                  }
                  required
                  all
                  label="From Warehouse"
                  source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse?branch=${BranchID}`}
                  id="warehouseID"
                  desc="description"
                  onChange={(e) => {
                    setWarehouse(e[0]);
                    console.log("e", e);
                  }}
                /> */}
              </Grid>
            </Grid>
            <Paper>
              <div style={{ width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={DataRows}
                  getRowId={(row) => row.id}
                  columns={column}
                  autoHeight
                  disableColumnMenu
                  editMode="row"
                  checkboxSelection
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  density="compact"
                  ref={refdata}
                  // onCellEditCommit={handleRowEditCommit}
                  selectionModel={selectedRows}
                  onSelectionModelChange={(e) => {
                    setSelectedRows(e);
                    // refdata.current.setRowMode(e.map(e), "edit");
                    const selectedIDs = new Set(e);
                    const selectedRows = DataRows.filter((row) =>
                      selectedIDs.has(row.id)
                    );
                    // console.log("select", selectedRows);
                    setSelectedObj(selectedRows);
                  }}
                  onCellDoubleClick={(e) => {
                    let filter = [...refdata.current.getSelectedRows()].map(
                      ([id, value]) => ({
                        id: value.id,
                      })
                    );
                    console.log(
                      "isInEditModeZona",
                      filter.filter((row) => row.id == e.id).length > 0
                    );
                    console.log("editmode", editmode);
                    const isInEditModeZona =
                      filter.filter((row) => row.id == e.id).length > 0;
                    if (editmode == false && isInEditModeZona) {
                      // console.log("klik", e);
                      setqtyTemp(e.value);
                      refdata.current.setRowMode(e.id, "edit");
                      seteditmode(true);
                    }
                  }}
                  paginationMode="server"
                  pageSize={pageSize}
                  rowsPerPageOptions={[5, 10, 25]}
                  onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
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
            props.setData(
              [...refdata.current.getSelectedRows()].map(([id, value]) => ({
                id: value.id + props.Data.length,
                DetailSourceID: value.MutasiKuotaID,
                InventoryID: value.InventoryID,
                Descr: value.InventoryDescription,
                UOM: value.UOM,
                TransferQty: parseFloat(value.qty),
                unAllo: parseFloat(value.qty),
                DstQty: 0,
                ToWarehouseID: "",
                Qty: 0,
                QtyTemp: value.qty,
                QtyBeforeTransfer: value.EndSaldo,
                QtyAfterTransfer: value.EndSaldo - value.qty,
              }))
            );
            props.setOpenSource(false);
            setSelectedObj([]);
            setInventory("");
            setSelectedRows([]);
          }}
          color="primary"
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => props.setOpenSource(false)}
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
