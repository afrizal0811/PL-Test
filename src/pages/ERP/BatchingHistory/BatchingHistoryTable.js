import React from "react";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  CardContent,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function BatchingHistoryTable(props) {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "Warehouse",
      headerName: "Warehouse",
      width: 150,
    },
    {
      field: "Location",
      headerName: "Location",
      width: 150,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 150,
    },
    {
      field: "LotSerialNbr",
      headerName: "Lot/Serial Nbr",
      width: 150,
    },
    {
      field: "OrderQty",
      headerName: "Qty Order",
      width: 150,
    },
    {
      field: "PickedQty",
      headerName: "Pick",
      width: 150,
    },
    {
      field: "UnpickQty",
      headerName: "Unpick",
      width: 150,
    },
    {
      field: "UnfullPickQty",
      headerName: "Unfull Pick",
      width: 150,
    },
    {
      field: "ConPickQty",
      headerName: "Confirm Pick",
      width: 150,
    },
    {
      field: "PackedQty",
      headerName: "Pack",
      width: 200,
    },
    {
      field: "ConfUnpackQty",
      headerName: "Unpack",
      width: 150,
    },
    {
      field: "UnfullPackQty",
      headerName: "Unfull Pack",
      width: 150,
    },
    {
      field: "ConfPackQty",
      headerName: "Confirm Qty",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      Warehouse: "WHOLESALE",
      Location: "R1S1",
      InventoryID: "CONGRILLT",
      LotSerialNbr: "LREX0089",
      OrderQty: "8",
      PickedQty: "6",
      UnpickQty: "2",
      UnfullPickQty: "",
      ConPickQty: "6",
      PackedQty: "6",
      ConfUnpackQty: "",
      UnfullPackQty: "",
      ConfPackQty: "6",
    },
    {
      id: 2,
      Warehouse: "WHOLESALE",
      Location: "R1S1",
      InventoryID: "AAPOWERAID",
      LotSerialNbr: "LREX0009",
      OrderQty: "10",
      PickedQty: "10",
      UnpickQty: "",
      UnfullPickQty: "",
      ConPickQty: "10",
      PackedQty: "10",
      ConfUnpackQty: "",
      UnfullPackQty: "",
      ConfPackQty: "10",
    },
  ];

  return (
    <Card mb={6} mt={0}>
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onCellCLick={handleCellClick}
            onRowCLick={handleRowClick}
          />
        </div>
      </Paper>
    </Card>
  );
}
