/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../../utils/ConfigHeader";

const PopupEdit = (props) => {
  const [uomDropdown, setUomDropdown] = useState([]);
  const [uomConversion, setUomConversion] = useState(null);
  const [dataItems, setDataItems] = useState(null);
  // const [UOM, setUOM] = useState(null);
  const [qty, setqty] = useState(0);
  const [max, setmax] = useState(0);

  useEffect(() => {
    setDataItems(props.dataEdit);
    getDropdownStockItem(props.dataEdit?.InventoryID);
    getStockItemConversion(props.dataEdit?.InventoryID);
    // setUOM(props.dataEdit?.UOM);
    setqty(props.dataEdit?.AdjusmentQty);
    // setmax(props.dataEdit?.KuotaAvailable);
    console.log("props.dataEdit", props.dataEdit);
    console.log("props.table", props.TableData);
  }, [props.openEdit === true, props.dataEdit]);

  const getDropdownStockItem = async (inventoryID) => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemUOMById?inventoryID=${inventoryID}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data;

            setUomDropdown(resdata);
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

  const EditRows = () => {
    // setDataItems({
    //   ...dataItems,
    //   TransferQty: qty,
    //   UOM: UOM,
    // });
    const filterItemByID = props.TableData.filter((item) => {
      return dataItems.KuotaAdjustmentDetailID
        ? item.KuotaAdjustmentDetailID !== dataItems.KuotaAdjustmentDetailID
        : item.InventoryID !== dataItems.InventoryID;
    });
    // console.log("filterItemByID", [
    //   ...filterItemByID,
    //   { ...dataItems, QTYAdjustment: qty },
    // ]);

    props.setData([...filterItemByID, { ...dataItems, AdjusmentQty: qty }]);
    props.setOpenEdit(false);
  };

  return (
    <Dialog
      open={props.openEdit}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => props.setOpenEdit(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{props.popupTitle}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} md={12} mt={2}>
          {/* <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="selectUOM">UOM</InputLabel>
              <Select
                onChange={(e) => {
                  if (UOM === uomConversion?.BaseUOM) {
                    setDataItems({
                      ...dataItems,
                      // TransferQty: 0,
                      // UOM: e.target.value,
                      RemainKuota: dataItems?.AvailableKuotaBase,
                      KuotaAvailable: dataItems?.AvailableKuotaBase,
                    });
                    setUOM(e.target.value);
                    setqty(0);
                  } else {
                    setDataItems({
                      ...dataItems,
                      // TransferQty: 0,
                      // UOM: e.target.value,
                      RemainKuota: dataItems?.AvailableKuotaPurchase,
                      KuotaAvailable: dataItems?.AvailableKuotaPurchase,
                    });
                    setUOM(e.target.value);
                    setqty(0);
                  }
                }}
                fullWidth
                name="UOM"
                label="UOM"
                id="selectUOM"
                value={UOM}
              >
                <MenuItem value="Pilih UOM" disabled>
                  Pilih UOM
                </MenuItem>
                {(uomDropdown || []).map((uom) => (
                  <MenuItem key={uom.uom} value={uom.uom}>
                    {uom.uom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item md={12} xs={12} mt={2}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                label="Qty"
                type="number"
                name="TransferQty"
                color={dataItems?.RemainKuota < 0 ? "error" : ""}
                value={qty}
                // inputProps={{
                //   max: dataItems?.AvailableKuotaBase - dataItems?.TransferQty,
                //   // UOM === uomConversion?.BaseUOM
                //   //   ? dataItems?.AvailableKuotaBase - dataItems?.TransferQty
                //   //   : dataItems?.AvailableKuotaPurchase -
                //   //     dataItems?.TransferQty,
                //   min: 0,
                // }}
                onChange={(e) => {
                  setqty(e.target.value);
                  setDataItems({
                    ...dataItems,
                    // TransferQty: e.target.value,
                    RemainKuota:
                      parseFloat(dataItems?.KuotaAvailable) +
                      parseFloat(e.target.value),
                    KuotaAvailable: dataItems?.KuotaAvailable,
                  });
                  // if (UOM === uomConversion?.BaseUOM) {
                  //   setDataItems({
                  //     ...dataItems,
                  //     // TransferQty: e.target.value,
                  //     RemainKuota:
                  //       dataItems?.AvailableKuotaBase - e.target.value,
                  //     KuotaAvailable: dataItems?.AvailableKuotaBase,
                  //   });
                  // } else {
                  //   setDataItems({
                  //     ...dataItems,
                  //     // TransferQty: e.target.value,
                  //     RemainKuota:
                  //       dataItems?.AvailableKuotaPurchase - e.target.value,
                  //     KuotaAvailable: dataItems?.AvailableKuotaPurchase,
                  //   });
                  // }
                }}
                focused
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <TextField
                disabled
                autoFocus
                label="Kuota Available"
                type="number"
                name="KuotaAvailable"
                value={
                  dataItems?.KuotaAvailable
                  // UOM === uomConversion?.BaseUOM
                  //   ? dataItems?.AvailableKuotaBase
                  //   : dataItems?.AvailableKuotaPurchase
                  // dataItems?.KuotaAvailable
                }
                fullWidth
              />
            </FormControl>
          </Grid>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <TextField
                disabled
                autoFocus
                label="Kuota setelah Adjustment"
                type="number"
                name="RemainKuota"
                value={
                  qty === 0 || !qty
                    ? dataItems?.KuotaAvailable
                    : parseFloat(dataItems?.KuotaAvailable) + parseFloat(qty)
                  // qty === 0
                  //   ? UOM === uomConversion?.BaseUOM
                  //     ? dataItems?.AvailableKuotaBase
                  //     : dataItems?.AvailableKuotaPurchase
                  //   : dataItems?.RemainKuota
                }
                fullWidth
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setDataItems(null);
            props.setOpenEdit(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          onClick={EditRows}
          // disabled={dataItems?.RemainKuota < 0}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupEdit;
