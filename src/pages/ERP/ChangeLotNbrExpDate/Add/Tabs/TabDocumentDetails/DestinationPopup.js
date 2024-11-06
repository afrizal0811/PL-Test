import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// import DestinationTable from "./DestinationTable";
import { DatePicker } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
// import { columnsSource } from "./ColumnSouce";
// import { columnsDestination } from "./ColumnDestination";
import { Clear } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import { Search } from "react-feather";
import NumberFormat from "react-number-format";
import CbData from "../../../../../../components/shared/dropdown";
import { GetConfig } from "../../../../../../utils/ConfigHeader";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Grid item md={12}>
      <TextField
        // variant="contained"
        value={props.value}
        onChange={props.onChange}
        label="Search location"
        placeholder="Search…"
        InputProps={{
          startAdornment: <Search fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <Clear fontSize="small" />
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
    </Grid>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function DestinationEdit(props) {
  const [warehouse, setwarehouse] = useState("");
  const [location, setlocation] = useState("");
  const [dstExpdate, setdstExpdate] = useState("");
  const [dstLotnbr, setdstLotnbr] = useState("");
  const [srclist, setsrclist] = useState("");
  const [dstqty, setdstqty] = useState("");
  const [dstList, setdstList] = useState("");
  const [dstUOM, setdstUOM] = useState("");

  const [searchText, setSearchText] = React.useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState("");

  const [uomConversion, setUomConversion] = useState(null);
  const [warning, setwarning] = useState(false);

  const [DataLoc, setDataLoc] = useState([]);
  const [RowLoc, setRowLoc] = useState([]);
  const [FilterCustomer, setFilterCustomer] = React.useState([]);
  const [SelectedLoc, setSelectedLoc] = React.useState({});
  const columnsLoc = [
    {
      field: "warehouseID",
      headerName: "Warehouse ID",
      width: 200,
    },
    {
      field: "locationID",
      headerName: "Location ID",
      width: 200,
    },
  ];

  // useEffect(() => {
  //   getData(currentPage);
  // }, [currentPage]);

  useEffect(() => {
    setcurrentPage(1);
    // getData(1);
  }, [warehouse]);

  const getData = async (currentPage) => {
    try {
      await axios
        .get(
          // `${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Location?page=${currentPage}&rowsCount=4&warehouseID=${warehouse}`
          `${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Location?page=1&rowsCount=4&warehouseID=${warehouse}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data[0].record;
            setDataLoc(resdata);
            setRowLoc(resdata);
            // setRows(resdata);
            settotaldata(response.data[0].totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const getStockItemConversion = async (inventoryID) => {
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

            setUomConversion(resdata);
            console.log("uom conversion", resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // getData();
    console.log("props.destiedit", props.destiEdit);
    console.log(
      "props.rowDesti",
      props.rowDesti.filter((item) => item.id === props.destiEdit)
    );
    if (props.destiEdit !== "") {
      const newList = props.rowDesti.filter(
        (item) => item.id === props.destiEdit
      );
      // const newListsrc = props.rowSource.filter(
      //   (item) => item.inventoryID === newList[0].InventoryID
      // );
      getStockItemConversion(newList[0].InventoryID);
      // console.log("list", newList);
      // setsrclist(newListsrc[0]);
      setdstList(newList[0]);
      setwarehouse(newList[0].ToSiteCD);
      setlocation(newList[0].ToLocationID);
      setSelectedLoc([newList[0].ToLocationID]);
      setdstExpdate(newList[0].ToExpDate);
      setdstLotnbr(newList[0].ToLotNbr);
      setdstqty(newList[0].ToQty);
      setdstUOM(newList[0].ToUOM);
    }
  }, [props.destiEdit]);
  useEffect(() => {
    if (props.destiEdit !== "") {
      const newListsrc = props.rowSource.filter(
        (item) => item.id === dstList.id
      );
      setsrclist(newListsrc[0]);
      console.log("newListsrc", newListsrc);
    }
  }, [dstList]);

  const handleChangeUOM = (evt) => {
    const ConversionUOM = uomConversion.UOMConversions[0]?.MultiplyOrDivide;
    const ConversionFactor = uomConversion.UOMConversions[0]?.ConversionFactor;

    let RemainKuota;
    let srcqtyB;
    let srcqtyP;
    // If not base UOM
    if (srclist.UOM === uomConversion.BaseUOM) {
      srcqtyB = srclist.Qty;
    } else {
      srcqtyP =
        ConversionUOM === "Multiply"
          ? srclist.Qty / ConversionFactor
          : srclist.Qty * ConversionFactor;
    }

    // If not base UOM
    if (dstUOM === srclist.UOM) {
      console.log("if", srclist.Qty);
      RemainKuota = srclist.Qty - evt.floatValue;
    } else if (dstUOM === uomConversion.BaseUOM) {
      console.log("elseif", srclist.Qty);
      RemainKuota =
        ConversionUOM === "Multiply"
          ? srclist.Qty * ConversionFactor - evt.floatValue
          : srclist.Qty / ConversionFactor - evt.floatValue;
    } else {
      console.log("else", srclist.Qty);
      RemainKuota =
        ConversionUOM === "Multiply"
          ? srclist.Qty / ConversionFactor - evt.floatValue
          : srclist.Qty * ConversionFactor - evt.floatValue;
    }
    setdstqty(evt.floatValue);
    if (RemainKuota < 0) {
      setwarning(true);
    } else {
      setwarning(false);
    }
  };

  const EditRows = async () => {
    const newdata = props.rowDesti.map((item, i) => {
      if (props.destiEdit === item.id && dstqty < srclist.Qty) {
        item.ToQty = dstqty;
      }
      if (props.destiEdit === item.id && dstqty >= srclist.Qty) {
        item.ToQty = srclist.Qty;
      }
      // if (props.destiEdit === item.id && !dstList.Qty) {
      //   item.ToQty = dstqty;
      // }
      if (props.destiEdit === item.id) {
        item.ToSiteCD = warehouse;
        item.ToLocationID = location;
        item.ToExpDate = moment(dstExpdate).format("YYYY-MM-DD");
        item.ToLotNbr = dstLotnbr;
        item.ToUOM = dstUOM;
      }
      return item;
    });
    props.setrowDesti(newdata);
    setSelectedLoc({});
    // props.setDriver(newdata);
    props.setDestiEdit("");
    props.setOpenDesti(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = DataLoc.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRowLoc(filteredRows);
  };
  return (
    <>
      <Dialog
        open={props.openDesti}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => props.setOpenDesti(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Data Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} md={12} mt={2}>
            {/* <Grid item md={6} xs={12}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps`}
                id={"WarehouseID"}
                desc={"Description"}
                label="Warehouse"
                onChange={(e) => {
                  setwarehouse(e);
                }}
                value={warehouse}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <QuickSearchToolbar
                value={searchText}
                onChange={(event) => requestSearch(event.target.value)}
                clearSearch={() => requestSearch("")}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={RowLoc}
                  getRowId={(row) => row.locationID}
                  columns={columnsLoc}
                  pageSize={4}
                  selectionModel={SelectedLoc}
                  onSelectionModelChange={(selection) => {
                    setSelectedLoc(selection);
                    setlocation(selection[0]);
                    console.log("sel", selection);
                  }}
                  // paginationMode="server"
                  // rowCount={totaldata}
                  // pagination
                  // page={currentPage - 1}
                  // onPageChange={(page) => {
                  //   // eslint-disable-next-line react-hooks/rules-of-hooks
                  //   // getData(page + 1);
                  //   console.log("page = ", page);
                  //   setcurrentPage(page + 1);
                  // }}
                />
              </div>
            </Grid> */}
            <Grid item md={6} xs={12}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemUOMById?inventoryID=${dstList?.InventoryID}`}
                id={"uom"}
                name="UOM"
                desc=""
                config={GetConfig()}
                label="UOM"
                onChange={(e) => {
                  setdstUOM(e);
                  setdstqty(0);
                }}
                value={dstUOM}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                autoFocus
                id="dstqty"
                label="To Qty"
                inputProps={{
                  max: srclist.Qty,
                  min: 0,
                }}
                value={dstqty}
                color={warning || dstqty == "" || !dstqty ? "warning" : ""}
                focused={warning || dstqty == "" || !dstqty ? true : false}
                onValueChange={(e) => handleChangeUOM(e)}
                fullWidth
                thousandsGroupStyle="thousand"
                required
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                displayType="input"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
              />
              {/* <TextField
                autoFocus
                id="dstqty"
                label="To Qty"
                type="number"
                inputProps={{
                  max: dstList.Qty,
                  min: 0,
                }}
                value={dstqty}
                color={
                  dstqty > dstList.Qty || dstqty == "" || !dstqty
                    ? "warning"
                    : ""
                }
                focused={
                  dstqty > dstList.Qty || dstqty == "" || !dstqty ? true : false
                }
                onChange={(e) => setdstqty(e.target.value)}
                fullWidth
              /> */}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                autoFocus
                id="dstlot"
                label="To Lot Nbr"
                type="text"
                required
                color={!dstLotnbr || dstLotnbr == "" ? "warning" : ""}
                focused={!dstLotnbr || dstLotnbr == "" ? true : false}
                value={dstLotnbr}
                onChange={(e) => setdstLotnbr(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="To Exp Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={dstExpdate}
                onChange={(value) => {
                  setdstExpdate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenDesti(false);
              props.setDestiEdit("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={EditRows}
            disabled={
              dstLotnbr == "" ||
              SelectedLoc.length < 1 ||
              dstExpdate == "" ||
              dstqty == "" ||
              warning
            }
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
