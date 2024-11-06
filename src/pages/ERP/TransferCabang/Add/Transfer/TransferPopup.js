/* eslint-disable react-hooks/exhaustive-deps */
import { spacing } from "@material-ui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function TransferPopup({
  setOpenAllocated,
  openAllocated,
  dataDetail,
  setDataListDetail,
}) {
  const [searchType, setSearchType] = useState({
    Inventory: "",
  });
  const [StorageType, setStorageType] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState([]);
  const [widthrow, setwidthrow] = useState(420);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [curretPage, setCurretPage] = useState(1);

  const [qtyTemp, setQtyTemp] = useState(0);
  const [selectedUOM, setSelectedUOM] = useState("Pilih UOM");

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedObj, setSelectedObj] = useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = [
    {
      field: "DstAlloKuota",
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

        let BaseUOM = data[ItemIndex]?.Conversion?.BaseUOM; // Check Base UOM

        const handleChange = (evt) => {
          const ConversionUOM =
            data[ItemIndex].Conversion.UOMConversions[0]?.MultiplyOrDivide; // Get Conversion Status
          const ConversionFactor =
            data[ItemIndex].Conversion.UOMConversions[0]?.ConversionFactor; // Get Conversion Factor

          // With default 0
          // data[ItemIndex].DstAlloKuota =
          //   parseInt(evt.target.value) > data[ItemIndex].AvailableKuotaBase
          //     ? data[ItemIndex].AvailableKuotaBase < 0
          //       ? parseInt(evt.target.value || 0)
          //       : data[ItemIndex].AvailableKuotaBase
          //     : parseInt(evt.target.value || 0); // Set Field DstAlloKuota
          // data[ItemIndex].RemainingKoutaUOM1 =
          //   data[ItemIndex].AvailableKuotaBase - data[ItemIndex].DstAlloKuota < 0
          //     ? 0
          //     : data[ItemIndex].AvailableKuotaBase - data[ItemIndex].DstAlloKuota; // Set Field RemainingKoutaUOM1
          // data[ItemIndex].RemainingKoutaUOM2 =
          //   BaseUOM !== data[ItemIndex].UOMSelected
          //     ? data[ItemIndex].AvailableKuotaPurchase -
          //         data[ItemIndex].DstAlloKuota <
          //       0
          //       ? 0
          //       : data[ItemIndex].AvailableKuotaPurchase -
          //         data[ItemIndex].DstAlloKuota
          //     : data[ItemIndex].AvailableKuotaBase - data[ItemIndex].DstAlloKuota < 0
          //     ? 0
          //     : data[ItemIndex].AvailableKuotaBase - data[ItemIndex].DstAlloKuota; // Set Field RemainingKoutaUOM2

          data[ItemIndex].DstAlloKuota = parseInt(evt.target.value); // Set Field DstAlloKuota
          data[ItemIndex].RemainingKoutaUOM1 =
            data[ItemIndex].AvailableKuotaBase - data[ItemIndex].DstAlloKuota;
          data[ItemIndex].RemainingKoutaUOM2 =
            BaseUOM !== data[ItemIndex].UOMSelected
              ? data[ItemIndex].AvailableKuotaPurchase -
                data[ItemIndex].DstAlloKuota
              : data[ItemIndex].AvailableKuotaBase -
                data[ItemIndex].DstAlloKuota; // Set Field RemainingKoutaUOM2

          if (BaseUOM !== data[ItemIndex].UOMSelected) {
            // If non base UOM
            if (data[ItemIndex].UOMSelected !== "Pilih UOM") {
              data[ItemIndex].BaseItemWeight =
                ConversionUOM === "Multiply"
                  ? data[ItemIndex].DimensionWeight / ConversionFactor
                  : data[ItemIndex].DimensionWeight * ConversionFactor; // Set Field BaseItemWeight

              data[ItemIndex].BaseItemVolume =
                ConversionUOM === "Multiply"
                  ? data[ItemIndex].DimensionVolume / ConversionFactor
                  : data[ItemIndex].DimensionVolume * ConversionFactor; // Set Field BaseItemVolume

              data[ItemIndex].ExtWeight =
                data[ItemIndex].BaseItemWeight * data[ItemIndex].DstAlloKuota; // Set Field ExtWeight
              data[ItemIndex].ExtVolume =
                data[ItemIndex].BaseItemVolume * data[ItemIndex].DstAlloKuota; // Set Field ExtVolume
            } else {
              // If UOMSelected default
              data[ItemIndex].BaseItemWeight = 0; // Set Field BaseItemWeight
              data[ItemIndex].BaseItemVolume = 0; // Set Field BaseItemVolume
              data[ItemIndex].ExtWeight = 0; // Set Field ExtWeight
              data[ItemIndex].ExtVolume = 0; // Set Field ExtVolume
            }
          } else {
            // If base UOM
            data[ItemIndex].ExtWeight =
              data[ItemIndex].DimensionWeight * data[ItemIndex].DstAlloKuota; // Set Field ExtWeight
            data[ItemIndex].ExtVolume =
              data[ItemIndex].DimensionVolume * data[ItemIndex].DstAlloKuota; // Set Field ExtVolume
          }

          setQtyTemp(parseInt(evt.target.value));
        };

        return (
          <FormControl style={{ width: "100%" }}>
            <TextField
              type="number"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                inputProps: {
                  min: 0,
                  max: params.row.Conversion.UOMConversions[0]
                    ?.AvailableKuotaBase,
                },
              }}
              disabled={!selectionModel.includes(params.id)}
              placeholder="0"
              // value={
              //   BaseUOM === data[ItemIndex].UOMSelected
              //     ? params.value > data[ItemIndex].AvailableKuotaBase
              //       ? data[ItemIndex].AvailableKuotaBase
              //       : params.value || ""
              //     : params.value > data[ItemIndex].AvailableKuotaPurchase
              //     ? data[ItemIndex].AvailableKuotaPurchase
              //     : params.value || ""
              // }
              value={params.value}
              onChange={(evt) => {
                handleChange(evt);
                // const ConversionUOM =
                //   params.row.Conversion.UOMConversions[0]?.MultiplyOrDivide; // Get Conversion Status
                // const ConversionFactor =
                //   params.row.Conversion.UOMConversions[0]?.ConversionFactor; // Get Conversion Factor

                // // With default 0
                // // params.row.DstAlloKuota =
                // //   parseInt(evt.target.value) > params.row.AvailableKuotaBase
                // //     ? params.row.AvailableKuotaBase < 0
                // //       ? parseInt(evt.target.value || 0)
                // //       : params.row.AvailableKuotaBase
                // //     : parseInt(evt.target.value || 0); // Set Field DstAlloKuota
                // // params.row.RemainingKoutaUOM1 =
                // //   params.row.AvailableKuotaBase - params.row.DstAlloKuota < 0
                // //     ? 0
                // //     : params.row.AvailableKuotaBase - params.row.DstAlloKuota; // Set Field RemainingKoutaUOM1
                // // params.row.RemainingKoutaUOM2 =
                // //   BaseUOM !== params.row.UOMSelected
                // //     ? params.row.AvailableKuotaPurchase -
                // //         params.row.DstAlloKuota <
                // //       0
                // //       ? 0
                // //       : params.row.AvailableKuotaPurchase -
                // //         params.row.DstAlloKuota
                // //     : params.row.AvailableKuotaBase - params.row.DstAlloKuota < 0
                // //     ? 0
                // //     : params.row.AvailableKuotaBase - params.row.DstAlloKuota; // Set Field RemainingKoutaUOM2

                // params.row.DstAlloKuota = parseFloat(evt.target.value); // Set Field DstAlloKuota
                // params.row.RemainingKoutaUOM1 =
                //   params.row.AvailableKuotaBase - params.row.DstAlloKuota;
                // params.row.RemainingKoutaUOM2 =
                //   BaseUOM !== params.row.UOMSelected
                //     ? params.row.AvailableKuotaPurchase - params.row.DstAlloKuota
                //     : params.row.AvailableKuotaBase - params.row.DstAlloKuota; // Set Field RemainingKoutaUOM2

                // if (BaseUOM !== params.row.UOMSelected) {
                //   // If non base UOM
                //   if (params.row.UOMSelected !== "Pilih UOM") {
                //     params.row.BaseItemWeight =
                //       ConversionUOM === "Multiply"
                //         ? params.row.DimensionWeight / ConversionFactor
                //         : params.row.DimensionWeight * ConversionFactor; // Set Field BaseItemWeight

                //     params.row.BaseItemVolume =
                //       ConversionUOM === "Multiply"
                //         ? params.row.DimensionVolume / ConversionFactor
                //         : params.row.DimensionVolume * ConversionFactor; // Set Field BaseItemVolume

                //     params.row.ExtWeight =
                //       params.row.BaseItemWeight * params.row.DstAlloKuota; // Set Field ExtWeight
                //     params.row.ExtVolume =
                //       params.row.BaseItemVolume * params.row.DstAlloKuota; // Set Field ExtVolume
                //   } else {
                //     // If UOMSelected default
                //     params.row.BaseItemWeight = 0; // Set Field BaseItemWeight
                //     params.row.BaseItemVolume = 0; // Set Field BaseItemVolume
                //     params.row.ExtWeight = 0; // Set Field ExtWeight
                //     params.row.ExtVolume = 0; // Set Field ExtVolume
                //   }
                // } else {
                //   // If base UOM
                //   params.row.ExtWeight =
                //     params.row.DimensionWeight * params.row.DstAlloKuota; // Set Field ExtWeight
                //   params.row.ExtVolume =
                //     params.row.DimensionVolume * params.row.DstAlloKuota; // Set Field ExtVolume
                // }

                // setQtyTemp(parseInt(evt.target.value));
                // params.api.updateRows([
                //   {
                //     MutasiKuotaID: params.id,
                //     DstAlloKuota: evt.target.value,
                //   },
                // ]);
              }}
              // disabled={!isInEditModeZona}
              onDoubleClick={(event) => event.stopPropagation()}
              style={{ width: "100%" }}
              // onBlur={() => {
              //   params.api.updateRows([
              //     {
              //       MutasiKuotaID: params.id,
              //       DstAlloKuota: parseInt(qtyTemp),
              //     },
              //   ]);
              //   setQtyTemp(0);
              // }}
              // onKeyUp={(e) => {
              //   if (
              //     e.key === "Enter" &&
              //     params.row.TransferQty - qtyTemp >= 0 &&
              //     params.api.getRowMode(params.id) === "edit" &&
              //     qtyTemp > 0
              //   ) {
              //     params.api.updateRows([
              //       {
              //         MutasiKuotaID: params.id,
              //         DstAlloKuota: parseInt(qtyTemp),
              //       },
              //     ]);
              //     setQtyTemp(0);
              //   }
              // }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "UOMSelected",
      headerName: "UOM Selected",
      width: 125,
      sortable: false,
      renderCell: (params) => {
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.MutasiKuotaID,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        // const options = [...params.api.getRowModels()].map(
        //   ([id, value]) => value.OptionsUOM
        // );
        // console.log("ref", [...refdata]);

        // const ItemIndex = data.findIndex(
        //   (obj) => obj.MutasiKuotaID === params.id
        // );
        // const handleChange = (evt) => {
        //   const BaseUOM = data[ItemIndex]?.Conversion?.BaseUOM; // Check Base UOM
        //   const ConversionUOM =
        //     data[ItemIndex].Conversion.UOMConversions[0]?.MultiplyOrDivide; // Get Conversion Status
        //   const ConversionFactor =
        //     data[ItemIndex].Conversion.UOMConversions[0]?.ConversionFactor; // Get Conversion Factor

        //   data[ItemIndex].UOMSelected = evt.target.value; // Set Field UOMSelected
        //   data[ItemIndex].RemainingKoutaUOM1 =
        //     data[ItemIndex].AvailableKuotaBase - (data[ItemIndex].DstAlloKuota || 0); // Set Field RemainingKoutaUOM1
        //   if (BaseUOM !== data[ItemIndex].UOMSelected) {
        //     // If non base UOM

        //     // With default 0
        //     // data[ItemIndex].RemainingKoutaUOM2 =
        //     //   data[ItemIndex].AvailableKuotaPurchase -
        //     //     (data[ItemIndex]?.DstAlloKuota || 0) <
        //     //   0
        //     //     ? 0
        //     //     : data[ItemIndex].AvailableKuotaPurchase -
        //     //       data[ItemIndex]?.DstAlloKuota; // Set Field RemainingKoutaUOM2

        //     data[ItemIndex].RemainingKoutaUOM2 =
        //       data[ItemIndex].AvailableKuotaPurchase - data[ItemIndex]?.DstAlloKuota; // Set Field RemainingKoutaUOM2

        //     data[ItemIndex].BaseItemWeight =
        //       ConversionUOM === "Multiply"
        //         ? data[ItemIndex].DimensionWeight / ConversionFactor
        //         : data[ItemIndex].DimensionWeight * ConversionFactor; // Set Field BaseItemWeight

        //     data[ItemIndex].BaseItemVolume =
        //       ConversionUOM === "Multiply"
        //         ? data[ItemIndex].DimensionVolume / ConversionFactor
        //         : data[ItemIndex].DimensionVolume * ConversionFactor; // Set Field BaseItemVolume

        //     data[ItemIndex].ExtWeight =
        //       data[ItemIndex].BaseItemWeight * data[ItemIndex].DstAlloKuota; // Set Field ExtWeight
        //     data[ItemIndex].ExtVolume =
        //       data[ItemIndex].BaseItemVolume * data[ItemIndex].DstAlloKuota; // Set Field ExtVolume
        //   } else {
        //     // If base UOM

        //     // With default 0
        //     // data[ItemIndex].RemainingKoutaUOM2 =
        //     //   data[ItemIndex].AvailableKuotaBase - (data[ItemIndex]?.DstAlloKuota || 0) <
        //     //   0
        //     //     ? 0
        //     //     : data[ItemIndex].AvailableKuotaBase - data[ItemIndex]?.DstAlloKuota; // Set Field RemainingKoutaUOM2

        //     data[ItemIndex].RemainingKoutaUOM2 =
        //       data[ItemIndex].AvailableKuotaBase - data[ItemIndex]?.DstAlloKuota; // Set Field RemainingKoutaUOM2
        //     data[ItemIndex].BaseItemWeight = data[ItemIndex].DimensionWeight; // Set Field BaseItemWeight
        //     data[ItemIndex].BaseItemVolume = data[ItemIndex].DimensionVolume; // Set Field BaseItemVolume
        //     data[ItemIndex].ExtWeight =
        //       data[ItemIndex].DimensionWeight * data[ItemIndex].DstAlloKuota; // Set Field ExtWeight
        //     data[ItemIndex].ExtVolume =
        //       data[ItemIndex].DimensionVolume * data[ItemIndex].DstAlloKuota; // Set Field ExtVolume
        //   }

        //   setSelectedUOM(evt.target.value);
        // };

        return (
          <FormControl style={{ width: "100%" }}>
            <Select
              variant="standard"
              disableUnderline
              onChange={(e) => {
                const BaseUOM = params.row.Conversion?.BaseUOM; // Check Base UOM
                const ConversionUOM =
                  params.row.Conversion.UOMConversions[0]?.MultiplyOrDivide; // Get Conversion Status
                const ConversionFactor =
                  params.row.Conversion.UOMConversions[0]?.ConversionFactor; // Get Conversion Factor

                params.row.UOMSelected = e.target.value; // Set Field UOMSelected
                params.row.RemainingKoutaUOM1 =
                  params.row.AvailableKuotaBase -
                  (params.row.DstAlloKuota || 0); // Set Field RemainingKoutaUOM1
                params.row.RemainingKoutaUOM2 =
                  params.row.AvailableKuotaPurchase - params.row?.DstAlloKuota; // Set Field RemainingKoutaUOM2

                if (BaseUOM !== params.row.UOMSelected) {
                  // If non base UOM

                  // With default 0
                  // params.row.RemainingKoutaUOM2 =
                  //   params.row.AvailableKuotaPurchase -
                  //     (params.row?.DstAlloKuota || 0) <
                  //   0
                  //     ? 0
                  //     : params.row.AvailableKuotaPurchase -
                  //       params.row?.DstAlloKuota; // Set Field RemainingKoutaUOM2

                  // params.row.RemainingKoutaUOM2 =
                  //   params.row.AvailableKuotaPurchase - params.row?.DstAlloKuota; // Set Field RemainingKoutaUOM2

                  params.row.BaseItemWeight =
                    ConversionUOM === "Multiply"
                      ? params.row.DimensionWeight / ConversionFactor
                      : params.row.DimensionWeight * ConversionFactor; // Set Field BaseItemWeight

                  params.row.BaseItemVolume =
                    ConversionUOM === "Multiply"
                      ? params.row.DimensionVolume / ConversionFactor
                      : params.row.DimensionVolume * ConversionFactor; // Set Field BaseItemVolume

                  params.row.ExtWeight =
                    params.row.BaseItemWeight * params.row.DstAlloKuota; // Set Field ExtWeight
                  params.row.ExtVolume =
                    params.row.BaseItemVolume * params.row.DstAlloKuota; // Set Field ExtVolume
                } else {
                  // If base UOM

                  // With default 0
                  // params.row.RemainingKoutaUOM2 =
                  //   params.row.AvailableKuotaBase - (params.row?.DstAlloKuota || 0) <
                  //   0
                  //     ? 0
                  //     : params.row.AvailableKuotaBase - params.row?.DstAlloKuota; // Set Field RemainingKoutaUOM2

                  // params.row.RemainingKoutaUOM2 =
                  //   params.row.AvailableKuotaBase - params.row?.DstAlloKuota; // Set Field RemainingKoutaUOM2
                  params.row.BaseItemWeight = params.row.DimensionWeight; // Set Field BaseItemWeight
                  params.row.BaseItemVolume = params.row.DimensionVolume; // Set Field BaseItemVolume
                  params.row.ExtWeight =
                    params.row.DimensionWeight * params.row.DstAlloKuota; // Set Field ExtWeight
                  params.row.ExtVolume =
                    params.row.DimensionVolume * params.row.DstAlloKuota; // Set Field ExtVolume
                }

                // setSelectedUOM(e.target.value);
                params.api.updateRows([
                  {
                    MutasiKuotaID: params.id,
                    UOMSelected: e.target.value,
                  },
                ]);
              }}
              fullWidth
              // disabled={
              //   [...refdata.current.getSelectedRows()].filter(
              //     (ae) => ae.MutasiKuotaID == params.id
              //   ).length !== 1
              // }
              disabled={!selectionModel.includes(params.id)}
              value={params.value || "Pilih UOM"}
              inputProps={{ "aria-label": "Without label" }}
              // onBlur={() => {
              //   params.api.updateRows([
              //     {
              //       MutasiKuotaID: params.id,
              //       UOMSelected: selectedUOM,
              //     },
              //   ]);
              //   setSelectedUOM("Pilih UOM");
              // }}
            >
              <MenuItem value="Pilih UOM" disabled>
                Pilih UOM
              </MenuItem>
              {(params.row.OptionsUOM || []).map((uom) => (
                <MenuItem key={uom.uom} value={uom.uom}>
                  {uom.uom}
                </MenuItem>
              ))}
            </Select>
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
      field: "AvailableKuotaBase",
      headerName: "Available Kouta Base UOM",
      width: 150,
      sortable: false,
    },
    {
      field: "AvailableKuotaPurchase",
      headerName: "Available Kouta Purchase UOM",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        // const ItemIndex = data.findIndex(
        //   (obj) => obj.MutasiKuotaID === params.id
        // );

        // const ConversionUOM =
        //   data[ItemIndex]?.Conversion?.UOMConversions[0]?.MultiplyOrDivide;
        // const ConversionFactor =
        //   data[ItemIndex]?.Conversion?.UOMConversions[0]?.ConversionFactor;

        // data[ItemIndex].AvailableKuotaPurchase = Math.floor(
        //   ConversionUOM === "Multiply"
        //     ? data[ItemIndex].AvailableKuotaBase / ConversionFactor
        //     : data[ItemIndex].AvailableKuotaBase * ConversionFactor
        // );

        return (
          <FormControl style={{ width: "100%" }}>
            <TextField
              value={params.value}
              type={"number"}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              style={{ width: "100%" }}
            />
          </FormControl>
        );
      },
    },
    {
      field: "FromBranchId",
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
    {
      field: "RemainingKoutaUOM1",
      headerName: "Remaining Kuota UOM 1",
      width: 150,
      sortable: false,
    },
    {
      field: "RemainingKoutaUOM2",
      headerName: "Remaining Kuota UOM 2",
      width: 150,
      sortable: false,
    },
    {
      field: "BaseItemWeight",
      headerName: "Unit Weight",
      width: 130,
    },
    {
      field: "ExtWeight",
      headerName: "Ext Weight",
      width: 130,
    },
    {
      field: "BaseItemVolume",
      headerName: "Unit Volume",
      width: 130,
    },
    {
      field: "ExtVolume",
      headerName: "Ext Volume",
      width: 130,
    },
  ];

  useEffect(() => {
    if (openAllocated) {
      getDataMutasiKoutaSummary().then((res) => {
        if (res.status) {
          const dropdownStockItem = res.data.map((item) =>
            getDropdownStockItem(item.InventoryID).then((res) => {
              if (res.status) {
                return res.data;
              }
            })
          );

          const stockItemConversion = res.data.map((item) =>
            getStockItemConversion(item.InventoryID).then((res) => {
              if (res.status) {
                return res.data;
              }
            })
          );

          const promiseAll = Promise.all(
            [dropdownStockItem, stockItemConversion].map((innerPromiseArray) =>
              Promise.all(innerPromiseArray)
            )
          );

          promiseAll.then((value) => {
            const newData = res.data.map((allData, idx) => {
              const newObj = {
                ...allData,
                OptionsUOM: value[0][idx],
                Conversion: value[1][idx],
                DstAlloKuota: "",
                UOMSelected: "Pilih UOM",
                // AvailableKuotaPurchase: 0,
                RemainingKoutaUOM1: 0,
                RemainingKoutaUOM2: 0,
                ExtWeight: 0,
                ExtVolume: 0,
                BaseItemWeight: 0,
                BaseItemVolume: 0,
              };

              return newObj;
            });

            setData(newData);
            // if (
            //   newData.filter((ae) => ae.InventoryDescription.length > 60)
            //     .length > 0
            // ) {
            //   setwidthrow(790);
            // } else {
            //   setwidthrow(420);
            // }
            let leng = 1;
            newData.map((ae) => {
              if (leng <= ae.InventoryDescription.length) {
                leng = ae.InventoryDescription.length;
              }
              setwidthrow(leng * 8 + 30);
            });
          });
        }
      });

      if (dataDetail.hasOwnProperty("Dry") && dataDetail.Dry) {
        setStorageType("Dry");
      } else if (dataDetail.hasOwnProperty("Frozen") && dataDetail.Frozen) {
        setStorageType("Frozen");
      }
    }
  }, [openAllocated, searchType, curretPage, pageSize]);

  const getDataMutasiKoutaSummary = async () => {
    setLoading(true);
    console.log("data detail", dataDetail);
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .get(
            `${
              process.env.REACT_APP_DOMAIN_API
            }/GetMutasiKuotaSummaryByPagination?page=${curretPage}&rowsCount=${pageSize}&inventoryID=${
              searchType.Inventory
            }&warehouseID=${dataDetail?.ToSiteCD}&FromWarehouseID=${
              dataDetail?.FrSiteCD
            }&isDry=${dataDetail?.Dry || false}&isFrozen=${
              dataDetail?.Frozen || false
            }`,
            GetConfig()
          )
          .then(function (response) {
            // handle success
            if (response.status === 200) {
              const resdata = response.data[0];
              const newdata = resdata.record.map((item, i) => {
                // item.id = i;
                // if(selectedObj)
                item.qty = !!selectedObj.filter(
                  (ae) => ae.MutasiKuotaID === item.MutasiKuotaID
                )[0]
                  ? selectedObj.filter(
                      (ae) => ae.MutasiKuotaID === item.MutasiKuotaID
                    )[0].qty || 0
                  : 0;
                return item;
              });
              setTotalPage(resdata.totalCountData);

              resolve({ status: true, data: newdata });
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

  // const refdata = useRef(null);
  // const column = useMemo(
  //   () =>
  //     columns.concat({
  //       field: "__HIDDEN__",
  //       width: 0,
  //       renderCell: (params) => {
  //         refdata.current = params.api;
  //         return null;
  //       },
  //     }),
  //   [columns]
  // );

  const getDropdownStockItem = (inventoryID) => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
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

  const handleChange = (evt) => {
    setSearchType({
      ...searchType,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("slectobj", selectedObj);
    const AddItems = [];
    data.forEach((item, index) => {
      if (selectedObj.includes(item.MutasiKuotaID)) {
        AddItems.push(data[index]);
      }
    });

    // const newData1 = [...refdata.current.getSelectedRows()].map(
    //   ([id, value]) => ({
    //     ...value,
    //     TransferCabangDetailAllocatedID: value.MutasiKuotaID,
    //     TransferQty: value.DstAlloKuota || 0,
    //     KuotaAvailable:
    //       value.UOMSelected === value.UOM
    //         ? value.AvailableKuotaBase
    //         : value.AvailableKuotaPurchase,
    //     UOM: value.UOMSelected,
    //     LastUpdate: new Date(),
    //     StorageType,
    //     RemainKuota:
    //       value.UOMSelected === value.UOM
    //         ? value.RemainingKoutaUOM1 || 0
    //         : value.RemainingKoutaUOM2 || 0,
    //     Descr: value.InventoryDescription,
    //   })
    // );

    const newData = selectedObj.map((value) => ({
      ...value,
      TransferCabangDetailAllocatedID: value.MutasiKuotaID,
      TransferQty: value.DstAlloKuota || 0,
      KuotaAvailable:
        value.UOMSelected === value.Conversion.BaseUOM ||
        value.UOMSelected === "Pilih UOM"
          ? value.AvailableKuotaBase
          : value.AvailableKuotaPurchase,
      UOM:
        value.UOMSelected === "Pilih UOM"
          ? value.Conversion.BaseUOM
          : value.UOM,
      LastUpdate: new Date(),
      StorageType,
      RemainKuota:
        value.UOMSelected === value.Conversion.BaseUOM ||
        value.UOMSelected === "Pilih UOM"
          ? value.RemainingKoutaUOM1 || 0
          : value.RemainingKoutaUOM2 || 0,
      Descr: value.InventoryDescription,
    }));

    console.log(newData);
    setDataListDetail(newData);
    setSelectedObj([]);
    setSelectionModel([]);
    setOpenAllocated(false);
    setSelectedRows([]);
  };

  return (
    <Dialog
      open={openAllocated}
      onClose={() => setOpenAllocated(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="lg"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => setOpenAllocated(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={2}
              mb={3}
              md={12}
              style={{ justifyContent: "space-between" }}
            >
              <Grid item>
                <FormControl component="fieldset" variant="standard">
                  <TextField
                    label="Inventory"
                    name="Inventory"
                    value={searchType.Inventory}
                    onChange={handleChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
            </Grid>
            {loading ? (
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
                    rows={data}
                    getRowId={(row) => row.MutasiKuotaID}
                    columns={columns}
                    autoHeight
                    disableColumnMenu
                    editMode="row"
                    checkboxSelection
                    disableSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    density="compact"
                    // ref={refdata}
                    // onCellEditCommit={handleRowEditCommit}
                    selectionModel={selectedRows}
                    // onSelectionModelChange={(e) => {
                    //   setSelectedRows(e);
                    //   const selectedIDs = new Set(e);
                    //   const selectedRows = DataRows.filter((row) =>
                    //     selectedIDs.has(row.id)
                    //   );
                    //   console.log("select", selectedRows);
                    //   setSelectedObj(selectedRows);
                    // }}
                    onSelectionModelChange={(e) => {
                      //setSelectedRows(e);
                      // refdata.current.setRowMode(e.map(e), "edit");
                      setSelectionModel(e);
                      const unselectedIDs = new Set(e);
                      const selectedIDs = new Set(e);
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
                      // const selectedModel = selectedRows.map((item) => {});
                      // setSelectedObj(selectedRows);
                    }}
                    paginationMode="server"
                    page={curretPage - 1}
                    pageSize={pageSize}
                    rowsPerPageOptions={[2, 5, 10, 25]}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowCount={totalPage}
                    pagination
                    onPageChange={(page) => {
                      // getData(page + 1);
                      setCurretPage(page + 1);
                      console.log("page = ", page);
                    }}
                  />
                </div>
              </Paper>
            )}
            <div>{selectedObj.length + " rows selected"}</div>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={selectedObj.length < 1}
        >
          Add & Close
        </Button>
        <Button
          onClick={() => setOpenAllocated(false)}
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
