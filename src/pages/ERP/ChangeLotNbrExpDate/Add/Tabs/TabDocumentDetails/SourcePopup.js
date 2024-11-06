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
  TextField,
} from "@mui/material";
// import { columnsSource } from "./ColumnSouce";
// import { columnsDestination } from "./ColumnDestination";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import CbData from "../../../../../../components/shared/dropdown";
import { GetConfig } from "../../../../../../utils/ConfigHeader";

export default function SourceEdit(props) {
  const [srcQty, setsrcQty] = useState("");
  const [srcUOM, setsrcUOM] = useState("");
  const [srcLotnbr, setsrcLotnbr] = useState("");
  const [srcExpdate, setsrcExpdate] = useState("");
  const [srcList, setsrcList] = useState("");
  const [warning, setwarning] = useState(false);
  const [uomConversion, setUomConversion] = useState(null);

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
    console.log("props.dataedit", props.dataEdit);
    if (props.dataEdit !== "") {
      const newList = props.rowSource.filter(
        (item) => item.id === props.dataEdit
      );
      getStockItemConversion(newList[0].InventoryID);
      console.log("list", newList);
      setsrcList(newList[0]);
      setsrcUOM(newList[0]?.UOM);
      setsrcQty(newList[0]?.Qty);
      setsrcLotnbr(newList[0]?.SrcLotNbr);
      setsrcExpdate(newList[0]?.SrcExpDate);
    }
  }, [props.dataEdit]);

  const handleChangeUOM = (evt) => {
    const ConversionUOM = uomConversion.UOMConversions[0]?.MultiplyOrDivide;
    const ConversionFactor = uomConversion.UOMConversions[0]?.ConversionFactor;

    let RemainKuota;

    // If not base UOM
    if (srcUOM === uomConversion.BaseUOM) {
      RemainKuota = srcList.QtyAvailable - evt.floatValue;
    } else {
      RemainKuota =
        ConversionUOM === "Multiply"
          ? srcList.QtyAvailable / ConversionFactor - evt.floatValue
          : srcList.QtyAvailable * ConversionFactor - evt.floatValue;
    }
    setsrcQty(evt.floatValue);
    if (RemainKuota < 0) {
      setwarning(true);
    } else {
      setwarning(false);
    }
  };

  const EditRows = async () => {
    const newdata = props.rowSource.map((item, i) => {
      if (srcList.QtyAvailable) {
        if (props.dataEdit === item.id && srcQty <= srcList.QtyAvailable) {
          item.Qty = srcQty;
        }
        if (props.dataEdit === item.id && srcQty >= srcList.QtyAvailable) {
          item.Qty = srcList.QtyAvailable;
        }
      } else {
        if (props.dataEdit === item.id && srcQty <= srcList.Qty) {
          item.Qty = srcQty;
        }
        if (props.dataEdit === item.id && srcQty >= srcList.Qty) {
          item.Qty = srcList.Qty;
        }
      }
      if (props.dataEdit === item.id) {
        // item.Qty = srcQty;
        item.SrcLotNbr = srcLotnbr;
        item.UOM = srcUOM;
        item.SrcExpDate = moment(srcExpdate).format("YYYY-MM-DD");
        // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
      }
      return item;
    });
    props.setrowSource(newdata);
    // props.setDriver(newdata);
    props.setDataEdit("");
    props.setOpenEdit(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        disabled={props.Status !== "On Hold" ? true : false}
        onClick={() => props.setOpenAddItem(true)}
      >
        Add Item
      </Button>
      <Dialog
        open={props.openEdit}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => props.setOpenEdit(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Data Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} md={12} mt={2}>
            <Grid item md={6} xs={12}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemUOMById?inventoryID=${srcList?.InventoryID}`}
                id={"uom"}
                config={GetConfig()}
                desc=""
                label="UOM"
                onChange={(e) => {
                  setsrcUOM(e);
                  setsrcQty(0);
                }}
                value={srcUOM}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <NumberFormat
                autoFocus
                id="srcqty"
                label="Source Qty"
                value={srcQty}
                inputProps={{
                  max: srcList?.QtyAvailable,
                  min: 0,
                }}
                onValueChange={(e) => {
                  // console.log(e);
                  handleChangeUOM(e);
                  // setsrcQty(e.floatValue);
                }}
                color={
                  (srcList?.QtyAvailable && srcQty > srcList?.QtyAvailable) ||
                  (!srcList?.QtyAvailable && srcQty > srcList?.Qty) ||
                  warning
                    ? "warning"
                    : ""
                }
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
                id="srcqty"
                label="Source Qty"
                type="number"
                value={srcQty}
                inputProps={{
                  max: srcList?.QtyAvailable,
                  min: 0,
                }}
                onChange={(e) => setsrcQty(e.target.value)}
                color={
                  (srcList?.QtyAvailable && srcQty > srcList?.QtyAvailable) ||
                  (!srcList?.QtyAvailable && srcQty > srcList?.Qty)
                    ? "warning"
                    : ""
                }
                fullWidth
              /> */}
            </Grid>
            <Grid item md={6} xs={12} mt={2}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemLotNbr?inventoryID=${srcList?.InventoryID}&warehouseID=${srcList?.SiteCD}&locationID=${srcList?.LocationID}`}
                id={"lotSerialNbr"}
                desc={""}
                config={GetConfig()}
                all
                label="Source Lot Nbr"
                onChange={(e) => {
                  console.log("lotnbr", e);
                  if (e !== null) {
                    setsrcLotnbr(e[0]?.lotSerialNbr);
                    setsrcExpdate(e[0]?.expiryDate);
                  }
                }}
                value={srcLotnbr}
              />
            </Grid>
            <Grid item md={6} xs={12} mt={2}>
              <DatePicker
                label="Sourcer Exp Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={srcExpdate}
                inputFormat={"dd/MM/yyyy"}
                onChange={(value) => {
                  setsrcExpdate(value);
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
              props.setOpenEdit(false);
              props.setDataEdit("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={EditRows}
            disabled={
              srcQty == "" || srcLotnbr == "" || srcExpdate == "" || warning
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
