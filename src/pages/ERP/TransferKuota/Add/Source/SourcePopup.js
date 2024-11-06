import CloseIcon from "@mui/icons-material/Close";
import {
  CardContent,
  Checkbox,
  CircularProgress,
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
import axios from "axios";
import React, { useMemo, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function SourcePopup(props) {
  const [Inventory, setInventory] = useState("");
  const [availOnly, setavailOnly] = useState(false);
  const [DataRows, setDataRows] = useState([]);
  const [defaultDataRows, setDefaultDataRows] = useState([]);
  const [BranchID, setBranchID] = useState(props.Branch);
  const [Loading, setLoading] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [widthrow, setwidthrow] = useState(420);
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  console.log({
    Inventory,
    availOnly,
    DataRows,
    defaultDataRows,
    BranchID,
    widthrow,
    selectedRows,
    selectedObj,
    selectionModel,
  });

  React.useEffect(() => {
    console.log("openSource", props.openSource);
    if (props.openSource) {
      getData(currentPage);
    }
  }, [props.openSource, pageSize, Inventory, availOnly, BranchID, currentPage]);

  const getData = async (currentPage) => {
    setLoading(true);
    try {
      console.log("selected = ", selectedObj);
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetMutasiKuotaSummaryByPagination?page=${currentPage}&rowsCount=${pageSize}&warehouseID=${
            props.Warehouse
          }&inventoryID=${
            Inventory.length > 0 ? Inventory : ""
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
            setDefaultDataRows(
              response.data[0].record.map((item) => ({
                ...item,
                qty: 0,
              }))
            );
            const newdata = resdata.map((item, i) => {
              item.qty = selectionModel.includes(item.MutasiKuotaID)
                ? selectedObj.filter(
                    (ae) => ae.MutasiKuotaID === item.MutasiKuotaID
                  )[0].qty || 0
                : 0;
              return item;
            });
            setDataRows(newdata);
            let leng = 1;
            response.data[0].record.map((ae) => {
              if (leng <= ae.InventoryDescription.length) {
                leng = ae.InventoryDescription.length;
              }
              setwidthrow(leng * 8 + 30);
            });
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
        const ItemIndex = DataRows.findIndex(
          (obj) => obj.MutasiKuotaID === params.id
        );
        const ItemIndexSel = selectedObj.findIndex(
          (obj) => obj.MutasiKuotaID === params.id
        );
        // }
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
              onDoubleClick={(event) => event.stopPropagation()}
              value={params.value}
              onChange={(e) => {
                if (
                  parseFloat(e.target.value) <=
                    parseFloat(params.row.EndSaldo) &&
                  e.target.value >= 0
                ) {
                  DataRows[ItemIndex].qty = parseFloat(e.target.value);
                  selectedObj[ItemIndexSel].qty =
                    parseFloat(e.target.value) || 0;
                }
              }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "WarehouseID",
      headerName: "Allocated Warehouse",
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
      width: widthrow,
      sortable: false,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 70,
      sortable: false,
    },
    {
      field: "AvailableKuotaPurchase",
      type: "number",
      headerName: "Qty Before Transfer",
      width: 160,
      sortable: false,
    },
    {
      field: "FromBranchID",
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
              <Grid item md={3}></Grid>
              <Grid item md={3}></Grid>
            </Grid>
            {Loading ? (
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
            ) : (
              <Paper>
                <div style={{ width: "100%" }}>
                  <DataGrid
                    ml={6}
                    mr={6}
                    rows={DataRows}
                    getRowId={(row) => row.MutasiKuotaID}
                    columns={column}
                    autoHeight
                    disableColumnMenu
                    editMode="row"
                    checkboxSelection
                    disableSelectionOnClick
                    page={currentPage - 1}
                    disableColumnFilter
                    disableColumnSelector
                    density="compact"
                    ref={refdata}
                    selectionModel={selectedRows}
                    onSelectionModelChange={(e) => {
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
                            (item) =>
                              item.MutasiKuotaID == unselect.MutasiKuotaID
                          )
                        ) {
                          setSelectedObj(
                            selectedObj.filter(
                              (obj) =>
                                obj.MutasiKuotaID != unselect.MutasiKuotaID
                            )
                          );
                        }
                      });
                    }}
                    paginationMode="server"
                    pageSize={pageSize}
                    rowsPerPageOptions={[2, 5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                    rowCount={totaldata}
                    pagination
                    onPageChange={(page) => {
                      setcurrentPage(page + 1);
                      console.log("page = ", page);
                    }}
                  />
                </div>
              </Paper>
            )}
            <div>{selectionModel.length + " rows selected"}</div>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        <Button
          onClick={() => {
            console.log("obj", selectedObj);
            const newData = selectedObj.map((value) => ({
              id: value.MutasiKuotaID,
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
              QtyBeforeTransfer: value.AvailableKuotaPurchase,
              QtyAfterTransfer: value.AvailableKuotaPurchase - value.qty,
            }));

            props.setData(newData);
            props.setOpenSource(false);
            setSelectedObj([]);
            setcurrentPage(1);
            setSelectionModel([]);
            setInventory("");
            setSelectedRows([]);
          }}
          color="primary"
          variant="contained"
        >
          Add & Close
        </Button>
        <Button
          onClick={() => {
            props.setOpenSource(false);
            setcurrentPage(1);
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
