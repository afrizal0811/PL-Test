/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const TransferPopupEdit = ({
  popupTitle,
  openEditAllocated,
  dataEditAllocated,
  setOpenEditAllocated,
  dataListDetail,
  setDataListDetail,
}) => {
  const [uomDropdown, setUomDropdown] = useState([]);
  const [uomConversion, setUomConversion] = useState(null);
  const [dataItems, setDataItems] = useState(null);
  const [UOM, setUOM] = useState(null);
  const [qty, setqty] = useState(0);
  const [max, setmax] = useState(0);

  console.log({ dataListDetail });

  useEffect(() => {
    setDataItems(dataEditAllocated);
    getDropdownStockItem(dataEditAllocated?.InventoryID);
    getStockItemConversion(dataEditAllocated?.InventoryID);
    setUOM(
      dataEditAllocated?.UOMSelected
        ? dataEditAllocated?.UOMSelected
        : dataEditAllocated?.UOM
    );
    setqty(dataEditAllocated?.TransferQty);
    // setmax(dataEditAllocated?.KuotaAvailable);
  }, [openEditAllocated === true, dataEditAllocated]);

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

  const handleChange = (evt) => {
    const ConversionUOM = uomConversion.UOMConversions[0]?.MultiplyOrDivide;
    const ConversionFactor = uomConversion.UOMConversions[0]?.ConversionFactor;

    let RemainKuota = dataItems.RemainKuota;
    let TransferQty = evt.target.value;
    let ExtWeight = dataItems.ExtWeight;
    let ExtVolume = dataItems.ExtVolume;
    let BaseItemVolume = dataItems.BaseItemVolume;
    let BaseItemWeight = dataItems.BaseItemWeight;
    let DimensionWeight = dataItems.DimensionWeight || dataItems.BaseItemWeight;
    let DimensionVolume = dataItems.DimensionVolume || dataItems.BaseItemVolume;
    console.log("evt", evt);
    console.log("dataItems", dataItems);
    console.log("uomConversion", uomConversion);
    // If not base UOM
    if (UOM === uomConversion.BaseUOM) {
      RemainKuota = dataItems.AvailableKuotaBase - evt.target.value;
      BaseItemWeight = DimensionWeight;
      BaseItemVolume = DimensionVolume;
      ExtWeight = DimensionWeight * evt.target.value; // Set Field ExtWeight
      ExtVolume = DimensionVolume * evt.target.value; // Set Field ExtVolume
    } else {
      RemainKuota = dataItems.AvailableKuotaPurchase - evt.target.value;
      BaseItemWeight =
        ConversionUOM === "Multiply"
          ? DimensionWeight / ConversionFactor
          : DimensionWeight * ConversionFactor;

      BaseItemVolume =
        ConversionUOM === "Multiply"
          ? DimensionWeight / ConversionFactor
          : DimensionWeight * ConversionFactor;

      ExtWeight =
        ConversionUOM === "Multiply"
          ? BaseItemWeight * evt.target.value
          : BaseItemWeight * ConversionFactor * evt.target.value; // Set Field ExtWeight

      ExtVolume =
        ConversionUOM === "Multiply"
          ? (BaseItemVolume / ConversionFactor) * evt.target.value
          : BaseItemVolume * ConversionFactor * evt.target.value; // Set Field ExtWeight
    }
    // setqty(evt.target.value);
    // setmax(RemainKuota);

    setDataItems({
      ...dataItems,
      TransferQty,
      // RemainKuota: RemainKuota < 0 ? 0 : RemainKuota,
      RemainKuota,
      ExtWeight,
      ExtVolume,
      BaseItemWeight,
      BaseItemVolume,
    });
  };

  const EditRows = () => {
    // setDataItems({
    //   ...dataItems,
    //   TransferQty: qty,
    //   UOM: UOM,
    // });
    const filterItemByID = dataListDetail.filter(
      (item) =>
        item.TransferCabangDetailAllocatedID !==
        dataItems.TransferCabangDetailAllocatedID
    );

    console.log({ dataListDetail, dataItems });

    setDataListDetail([
      ...filterItemByID,
      {
        ...dataItems,
        TransferQty: parseInt(qty),
        // RemainKuota: dataItems.KuotaAvailable - parseInt(qty),
        UOMSelected: UOM,
      },
    ]);
    setOpenEditAllocated(false);
  };

  console.log({ dataItems });

  return (
    <Dialog
      open={openEditAllocated}
      fullWidth={true}
      maxWidth={"sm"}
      onClose={() => setOpenEditAllocated(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{popupTitle}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} md={12} mt={2}>
          <Grid item md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="selectUOM">UOM</InputLabel>
              <Select
                onChange={(e) => {
                  if (e.target.value === uomConversion?.BaseUOM) {
                    setDataItems({
                      ...dataItems,
                      // TransferQty: 0,
                      // UOM: e.target.value,
                      RemainKuota:
                        dataItems?.AvailableKuotaBase ??
                        dataItems?.KuotaAvailableBase,
                      KuotaAvailable:
                        dataItems?.AvailableKuotaBase ??
                        dataItems?.KuotaAvailableBase,
                    });
                    setUOM(e.target.value);
                    setqty(0);
                  } else {
                    setDataItems({
                      ...dataItems,
                      // TransferQty: 0,
                      // UOM: e.target.value,
                      RemainKuota:
                        dataItems?.AvailableKuotaPurchase ??
                        dataItems?.KuotaAvailablePurchase,
                      KuotaAvailable:
                        dataItems?.AvailableKuotaPurchase ??
                        dataItems?.KuotaAvailablePurchase,
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
          </Grid>
          <Grid item md={12} xs={12} mt={2}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                label="Qty"
                type="number"
                name="TransferQty"
                color={dataItems?.RemainKuota < 0 ? "error" : ""}
                value={qty}
                inputProps={{
                  max:
                    UOM === uomConversion?.BaseUOM
                      ? dataItems?.AvailableKuotaBase - dataItems?.TransferQty
                      : dataItems?.AvailableKuotaPurchase -
                        dataItems?.TransferQty,
                  min: 0,
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  setqty(value);
                  setDataItems({
                    ...dataItems,
                    RemainKuota: dataItems?.KuotaAvailable - e.target.value,
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
                label="Remaining Kuota"
                type="number"
                name="RemainKuota"
                value={dataItems?.RemainKuota}
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
            setOpenEditAllocated(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={EditRows} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferPopupEdit;
