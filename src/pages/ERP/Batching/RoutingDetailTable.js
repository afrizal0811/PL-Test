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

export default function RoutingDetailTable(props) {
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
      field: "SiteID",
      headerName: "Warehouse",
      width: 150,
    },
    {
      field: "OrderQty",
      headerName: "Qty",
      width: 150,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 150,
    },
    {
      field: "TotalQtySugg",
      headerName: "Total Qty Suggestion",
      width: 150,
    },
    {
      field: "OpenQtySugg",
      headerName: "Open Qty Suggestion",
      width: 150,
    },
    {
      field: "MinExpDate",
      headerName: "Min Exp Date",
      width: 200,
    },
    {
      field: "ShelfLife",
      headerName: "Shelf Life",
      width: 150,
    },
    {
      field: "MinDaysToShip",
      headerName: "Min Days To Ship",
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
      SiteID: "Sidoarjo1",
      OrderQty: "10",
      UOM: "Dus",
      TotalQtySugg: "",
      OpenQtySugg: "",
      MinExpDate: "16/11/2022",
      ShelfLife: "2 Days",
      MinDaysToShip: "30 Days",
    },
    {
      id: 2,
      OrderType: "SD",
      OrderNbr: "SD000089",
      ShipmentNbr: "00000065",
      InventoryID: "KB0001",
      TranDesc: "Kerupuk Bawang",
      SiteID: "Sidoarjo1",
      OrderQty: "25",
      UOM: "Dus",
      TotalQtySugg: "",
      OpenQtySugg: "",
      MinExpDate: "16/11/2022",
      ShelfLife: "2 Days",
      MinDaysToShip: "30 Days",
    },
    {
      id: 3,
      OrderType: "SD",
      OrderNbr: "SD000090",
      ShipmentNbr: "00000065",
      InventoryID: "KU0001",
      TranDesc: "Kerupuk Udang",
      SiteID: "Sidoarjo1",
      OrderQty: "30",
      UOM: "Dus",
      TotalQtySugg: "",
      OpenQtySugg: "",
      MinExpDate: "16/11/2022",
      ShelfLife: "2 Days",
      MinDaysToShip: "30 Days",
    },
    {
      id: 4,
      OrderType: "SD",
      OrderNbr: "SD000090",
      ShipmentNbr: "00000065",
      InventoryID: "SM0001",
      TranDesc: "Sambal Matah",
      SiteID: "Sidoarjo1",
      OrderQty: "15",
      UOM: "Dus",
      TotalQtySugg: "",
      OpenQtySugg: "",
      MinExpDate: "16/11/2022",
      ShelfLife: "2 Days",
      MinDaysToShip: "30 Days",
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
          Suggest Loc.
        </Button>
      </CardContent>
    </Card>
  );
}
