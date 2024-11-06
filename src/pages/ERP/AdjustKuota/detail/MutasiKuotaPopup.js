import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components/macro";

import { spacing } from "@material-ui/system";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

const MutasiKuotaPopup = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [inventory, setinventory] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(1);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      field: "qty",
      headerName: "Qty Selected",
      width: 115,
      sortable: false,
      editable: true,
      renderCell: (params) => {
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.MutasiKuotaID,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;

        const ItemIndex = data.findIndex(
          (obj) => obj.MutasiKuotaID === params.id
        );

        const ItemIndexSel = selectedObj.findIndex(
          (obj) => obj.MutasiKuotaID === params.id
        );
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
                data[ItemIndex].qty = e.target.value;
                selectedObj[ItemIndexSel].qty = e.target.value || 0;
              }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "WarehouseID",
      headerName: "Warehouse ID",
      width: 120,
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
      width: 430,
      sortable: false,
    },
    {
      field: "OptionsUOM",
      headerName: "UOM",
      width: 70,
      sortable: false,
      renderCell: (params) => {
        return <>{params.value?.BaseUOM}</>;
      },
    },
    {
      field: "AvailableKuotaBase",
      headerName: "Available Kouta",
      type: "number",
      width: 150,
      sortable: false,
    },
    {
      field: "FromBranchID",
      headerName: "Source Branch",
      width: 105,
      sortable: false,
    },
    {
      field: "FromWarehouseID",
      headerName: "Source Warehouse",
      sortable: false,
      width: 120,
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

  useEffect(() => {
    if (props.open) {
      getData().then((res) => {
        if (res.status) {
          const stockItemConversion = res.data.map((item) =>
            getStockItemConversion(item.InventoryID).then((res) => {
              if (res.status) {
                return res.data;
              }
            })
          );

          const promiseAll = Promise.all(
            [stockItemConversion].map((innerPromiseArray) =>
              Promise.all(innerPromiseArray)
            )
          );

          promiseAll.then((value) => {
            const newData = res.data.map((allData, idx) => {
              const newObj = {
                ...allData,
                OptionsUOM: value[0][idx],
              };

              return newObj;
            });
            console.log("newdata", newData);

            setData(newData);
            if (
              selectionModel.length > 1 &&
              newData.some((d) => selectionModel.includes(d.MutasiKuotaID))
            ) {
              setSelectedRows(
                selectionModel.filter((item) =>
                  newData.some((i) => item == i.MutasiKuotaID)
                )
              );
            }
          });
        }
      });
      setLoading(true);
      console.log("searchParams", props.searchParams);
    }
  }, [props.open, currentPage, pageSize]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      getData().then((res) => {
        if (res.status) {
          const stockItemConversion = res.data.map(
            async (item) =>
              await getStockItemConversion(item.InventoryID).then((res) => {
                if (res.status) {
                  return res.data;
                }
              })
          );
          const promiseAll = Promise.all(
            [stockItemConversion].map((innerPromiseArray) =>
              Promise.all(innerPromiseArray)
            )
          );
          console.log({ stockItemConversion, promiseAll });
          promiseAll.then((value) => {
            console.log({ valuePromise: value });
            const newData = res.data.map((allData, idx) => {
              const newObj = {
                ...allData,
                OptionsUOM: value[0][idx],
              };
              return newObj;
            });
            console.log("newdata", newData);
            setData(newData);
          });
        }
        console.log({ res, inventory });
      });
    }, 2750);
    return () => clearTimeout(timeout);
  }, [inventory]);

  const handleSubmit = () => {
    console.log("slectobj", selectedObj);

    const newData = selectedObj.map((value) => ({
      ...value,
      KuotaAdjustmentDetailID: new Date().getTime() + Math.random() * 16,
      New: true,
      AdjusmentQty: value.qty || 0,
      KuotaAvailable: value.AvailableKuotaBase,
      UOM: value.OptionsUOM.BaseUOM,
      LastUpdate: new Date(),
      RemainKuota: value.RemainingKoutaUOM1 || 0,
      endsaldo: parseFloat(value.AvailableKuotaBase) + parseFloat(value.qty),
    }));

    props.setData(newData);
    props.setopen(false);
    setSelectedObj([]);
    setSelectionModel([]);
    setinventory("");
    setSelectedRows([]);
  };

  const getData = async () => {
    setLoading(true);
    const payload = {
      ...GetConfig(),
      params: {
        ...props.searchParams,
        page: currentPage,
        rowsCount: pageSize,
        inventoryID: inventory,
        branchID: getBrach(),
      },
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DOMAIN_API}/GetMutasiKuotaSummaryByPagination3`,
          payload
        );

        if (response.status === 200) {
          const resdata = response.data[0];
          const newdata = resdata.record.map((item, i) => {
            item.qty = selectionModel.includes(item.MutasiKuotaID)
              ? selectedObj.filter(
                  (ae) => ae.MutasiKuotaID === item.MutasiKuotaID
                )[0].qty || 0
              : 0;
            return item;
          });
          console.log({ payload, response, newdata, selectionModel });
          settotalPage(resdata.totalCountData);
          resolve({ status: true, data: newdata });
        }
        setLoading(false);
      } catch (error) {
        reject({ status: false, error });
        setLoading(false);
      }
    });
  };

  const getStockItemConversion = (inventoryID) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/StockItemUOMConversion/${inventoryID}`,
            GetConfig()
          )
          .then(function (response) {
            // handle success
            if (response.status === 200) {
              const resdata = response.data;

              resolve({ status: true, data: resdata });
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            reject({ status: false, error });
          });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        reject({ status: false, error });
        setLoading(false);
      }
    });
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth={"lg"}
        onClose={() => {
          props.setopen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add {props.label}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mb={1} mt={1}>
            <Grid item md={3}>
              <TextField
                label="Inventory"
                value={inventory}
                onChange={(e) => {
                  setinventory(e.target.value);
                }}
                fullWidth
              />
            </Grid>
          </Grid>
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
              <div style={{ width: "100%" }}>
                <DataGrid
                  ml={6}
                  mr={6}
                  rows={data}
                  getRowId={(row) => row.MutasiKuotaID}
                  columns={column}
                  autoHeight
                  disableColumnMenu
                  editMode="row"
                  checkboxSelection
                  disableSelectionOnClick
                  disableColumnFilter
                  disableColumnSelector
                  density="compact"
                  selectionModel={selectedRows}
                  onSelectionModelChange={(e) => {
                    const diffPageSelectedModel = selectionModel.filter(
                      (item) =>
                        !e.includes(item) &&
                        !data.some((e) => e.MutasiKuotaID == item)
                    );
                    const selection = [...diffPageSelectedModel, ...e];
                    setSelectionModel(selection);
                    const unselectedIDs = new Set(selection);
                    const selectedIDs = new Set(selection);
                    const unselectedModel = data.filter(
                      (item) => !unselectedIDs.has(item.MutasiKuotaID)
                    );
                    const selectedModel = data.filter((item) =>
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
                  }}
                  paginationMode="server"
                  page={currentPage - 1}
                  pageSize={pageSize}
                  rowsPerPageOptions={[2, 5, 10, 25]}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowCount={totalPage}
                  pagination
                  onPageChange={(page) => {
                    setCurrentPage(page + 1);
                    console.log("page = ", page);
                  }}
                />
              </div>
              <div>{selectionModel.length + " rows selected"}</div>
            </Paper>
          )}
        </DialogContent>
        <DialogActions style={{ marginTop: 5, marginBottom: 5 }}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={selectedObj.length < 1}
          >
            Add & Close
          </Button>
          <Button
            onClick={() => {
              setSelectionModel([]);
              setSelectedObj([]);
              setSelectedRows([]);
              props.setopen(false);
            }}
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
