import { spacing } from "@material-ui/system";
import {
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function LocationSuggestionTable(props) {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "OrderType",
      headerName: "SO Type",
      width: 150,
    },
    {
      field: "OrderNbr",
      headerName: "SO Nbr",
      width: 150,
    },
    {
      field: "ShipmentNbr",
      headerName: "Shipment Nbr",
      width: 150,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 150,
    },
    {
      field: "TranDesc",
      headerName: "Inventory Description",
      width: 200,
    },
    {
      field: "LocQty",
      headerName: "Qty",
      width: 150,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 150,
    },
    {
      field: "LocationID",
      headerName: "Location",
      width: 150,
    },
    {
      field: "PalletNbr",
      headerName: "No Pallet",
      width: 150,
    },
    {
      field: "ExpireDate",
      headerName: "Exp. Date",
      width: 200,
    },
    {
      field: "LotSerialNbr",
      headerName: "Lot/Serial Nbr",
      width: 150,
    },
    {
      field: "SubItemID",
      headerName: "Subitem",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      OrderType: "SD",
      OrderNbr: "SD000089",
      ShipmentNbr: "00000065",
      InventoryID: "SB0001",
      TranDesc: "Sambal Bawang",
      LocQty: "8",
      UOM: "Dus",
      LocationID: "R1S1",
      PalletNbr: "00000891",
      ExpireDate: "16/11/2022",
      LotSerialNbr: "LREX0001",
      Subitem: "1",
    },
    {
      id: 2,
      OrderType: "SD",
      OrderNbr: "SD000089",
      ShipmentNbr: "00000065",
      InventoryID: "KB0001",
      TranDesc: "Kerupuk Bawang",
      LocQty: "25",
      UOM: "Dus",
      LocationID: "R1S1",
      PalletNbr: "00000771",
      ExpireDate: "20/12/2022",
      LotSerialNbr: "LREX0002",
      Subitem: "1",
    },
    {
      id: 3,
      OrderType: "SD",
      OrderNbr: "SD000090",
      ShipmentNbr: "00000065",
      InventoryID: "KU0001",
      TranDesc: "Kerupuk Udang",
      LocQty: "25",
      UOM: "Dus",
      LocationID: "R1S1",
      PalletNbr: "00000890",
      ExpireDate: "20/11/2022",
      LotSerialNbr: "LREX0003",
      Subitem: "1",
    },
    {
      id: 4,
      OrderType: "SD",
      OrderNbr: "SD000090",
      ShipmentNbr: "00000065",
      InventoryID: "SM0001",
      TranDesc: "Sambal Matah",
      LocQty: "15",
      UOM: "Dus",
      LocationID: "R1S1",
      PalletNbr: "00000789",
      ExpireDate: "17/08/2022",
      LotSerialNbr: "LREX0004",
      Subitem: "1",
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
      <CardContent>
        <Button mr={2} variant="contained" color="success" disabled>
          Process
        </Button>
        <div style={{ float: "right" }}>
          <Button mr={2} variant="outlined" color="primary" disabled>
            Peint
          </Button>
          <Button mr={2} variant="contained" color="primary">
            Save
          </Button>
          <Button mr={2} variant="contained" color="error">
            Delete
          </Button>
          <Button mr={2} variant="outlined" color="primary">
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
