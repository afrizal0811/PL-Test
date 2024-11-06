import ClearIcon from "@material-ui/icons/Clear";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { spacing } from "@material-ui/system";
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
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useMemo, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import CbData from "../../../../../components/shared/dropdown";
import { useTransferKuotaContext } from "../../../../../contexts/Modules/TransferKuota/TransferKuotaContext";
import ToWarehouseCell from "./ToWarehouseCell";

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

export default function TransferPopup({
  openTransferKuota,
  setOpenTransferKuota,
}) {
  const {
    transferKuotaDetailSourceRep,
    setTransferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
  } = useTransferKuotaContext();

  const [searchText, setSearchText] = React.useState("");
  const [Rows, setRows] = useState(transferKuotaDetailSourceRep);
  const [widthrow, setwidthrow] = useState(420);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [BranchID, setBranchID] = useState("");

  const [rowTransferQty, setRowTransferQty] = useState([]);

  React.useEffect(() => {
    setRows(transferKuotaDetailSourceRep);
    // let leng = 1;
    // GridSource.forEach((ae) => {
    //   if (leng <= ae.Descr.length) {
    //     leng = ae.Descr.length;
    //   }
    //   setwidthrow(leng * 8 + 30);
    // });
    setRowTransferQty(
      transferKuotaDetailSourceRep.map((data) => data.TransferQty)
    );
  }, [transferKuotaDetailSourceRep]);

  React.useEffect(() => {
    if (openTransferKuota) {
      setBranchID("");
      setRows(
        Rows.map((row) => ({
          ...row,
          ToWarehouseID: "",
          unAllo: row.TransferQty,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTransferKuota]);

  React.useEffect(() => {
    if (openTransferKuota && BranchID) {
      setRows(
        Rows.map((row) => ({
          ...row,
          ToWarehouseID: "",
          unAllo: row.TransferQty,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BranchID, openTransferKuota]);

  React.useEffect(() => {
    const newSelectedObj = Rows.filter((row) =>
      selectedRows.includes(row.id ?? row.TransferKuotaDetailSourceID)
    );
    setSelectedObj(newSelectedObj);
  }, [Rows, selectedRows]);

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
          id: value.id ?? value.TransferKuotaDetailSourceID,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id === params.id).length > 0;
        const ItemIndex = Rows.findIndex(
          (obj) => (obj.id ?? obj.TransferKuotaDetailSourceID) === params.id
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
              disabled={!isInEditModeZona}
              onDoubleClick={(event) => event.stopPropagation()}
              value={params.value}
              onChange={(e) => {
                console.log("ochange", params.row.unAllo);
                console.log("e", e);
                if (e.target.value <= rowTransferQty[ItemIndex]) {
                  Rows[ItemIndex].DstQty = parseFloat(e.target.value);
                  Rows[ItemIndex].TransferQty = parseFloat(
                    rowTransferQty[ItemIndex] - e.target.value
                  );
                } else if (e.target.value > rowTransferQty[ItemIndex]) {
                  Rows[ItemIndex].DstQty = params.row.unAllo;
                  Rows[ItemIndex].TransferQty = 0;
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
        let filterIds = [...params.api.getSelectedRows()].map(
          ([id, value]) => ({
            id: value.id ?? value.TransferKuotaDetailSourceID,
          })
        );
        const isInEditModeZona =
          filterIds.filter((row) => row.id === params.id).length > 0;
        const ItemIndex = Rows.findIndex(
          (row) => (row.id ?? row.TransferKuotaDetailSourceID) === params.id
        );

        return (
          <ToWarehouseCell
            index={ItemIndex}
            branchId={BranchID}
            value={params.value}
            isInEditModeZona={isInEditModeZona}
            rowId={params.id}
            selectedRows={selectedRows}
            rows={Rows}
            setRows={setRows}
          />
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
    const filteredRows = transferKuotaDetailSourceRep.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  const handleClosePopup = () => {
    requestSearch("");
    setOpenTransferKuota(false);
    setSelectedRows([]);
    setSelectedObj([]);
  };

  const handleClickAddTransfer = () => {
    let selectedData = [];
    Rows.forEach((item, index) => {
      if (selectedRows.includes(item.id ?? item.TransferKuotaDetailSourceID)) {
        selectedData.push(item);
      }
    });
    const newDataTrans = selectedData.map((value, i) => ({
      id: transferKuotaSourceDetailTransferRep.length + 1 + i,
      Qty: value.DstQty,
      ToBranchID: BranchID,
      InventoryID: value.InventoryID,
      DetailSourceID: value.DetailSourceID,
      Descr: value.Descr,
      ToWarehouseID: value.ToWarehouseID,
      UOM: value.UOM,
      QtyBeforeTransfer: value.QtyBeforeTransfer,
      QtyAfterTransfer: value.QtyAfterTransfer,
    }));
    console.log({ selectedData });
    const emptyData = newDataTrans.filter(
      (trans) => !trans.ToWarehouseID || trans.Qty === 0
    );
    if (emptyData.length > 0) {
      return alert(
        "Mohon lengkapi Data Pada Inventory" +
          emptyData.map((data) => data.InventoryID).toString()
      );
    }
    const qtys = Rows.map((row) => row.DstQty);
    const newSource = transferKuotaDetailSourceRep.map((source, i) => {
      if (
        selectedRows.includes(source.id ?? source.TransferKuotaDetailSourceID)
      ) {
        return {
          ...source,
          TransferQty: source.TransferQty - qtys[i],
        };
      }
      return source;
    });
    const newTrans = transferKuotaSourceDetailTransferRep.concat(newDataTrans);
    setTransferKuotaDetailSourceRep(newSource);
    setTransferKuotaSourceDetailTransferRep(newTrans);
    setOpenTransferKuota(false);
    setSearchText("");
    setSelectedRows([]);
    setBranchID("");
    setRows(
      Rows.map((row) => ({
        ...row,
        ToWarehouseID: "",
      }))
    );
  };

  return (
    <>
      <Dialog
        open={openTransferKuota}
        onClose={handleClosePopup}
        aria-labelledby="form-dialog-title"
        fullWidth="true"
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title" variant="h6">
          Add Item
          <IconButton
            aria-label="close"
            onClick={handleClosePopup}
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
                    value={BranchID === "" ? " " : `${BranchID}`}
                    required
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
                    isRowSelectable={(params) => {
                      return !!BranchID;
                    }}
                    ml={6}
                    mr={6}
                    rows={Rows}
                    getRowId={(row) =>
                      row?.id ?? row?.TransferKuotaDetailSourceID
                    }
                    columns={column}
                    editMode="row"
                    checkboxSelection
                    density="compact"
                    disableColumnFilter
                    disableColumnMenu
                    ref={refdata}
                    disableSelectionOnClick
                    selectionModel={selectedRows}
                    onSelectionModelChange={(rowsId) => {
                      setSelectedRows(rowsId);
                    }}
                    pageSize={5}
                  />
                </div>
              </Paper>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
          <Button
            onClick={handleClickAddTransfer}
            color="primary"
            disabled={
              !BranchID ||
              selectedRows.length === 0 ||
              selectedObj.some((data) => !data.ToWarehouseID)
            }
            variant="contained"
          >
            Add & Close
          </Button>
          <Button
            onClick={handleClosePopup}
            color="error"
            variant="contained"
            mr={3}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
