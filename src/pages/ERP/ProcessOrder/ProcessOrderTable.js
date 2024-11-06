import { spacing } from "@material-ui/system";
import {
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
      field: "OrderDesc",
      headerName: "Description",
      width: 150,
    },
    {
      field: "CustomerOrderNbr",
      headerName: "Customer Order Nbr",
      width: 150,
    },
    {
      field: "StatusSO",
      headerName: "Status SO",
      width: 150,
    },
    {
      field: "StatusSOAddon",
      headerName: "Status SO Addon",
      width: 150,
    },
    {
      field: "CustomerID",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "LocationID",
      headerName: "Location",
      width: 200,
    },
    {
      field: "LocationName",
      headerName: "Location Name",
      width: 150,
    },
    {
      field: "TermsID",
      headerName: "Terms",
      width: 150,
    },
    {
      field: "CuryPaymentTotal",
      headerName: "Total Paid",
      width: 150,
    },
    {
      field: "CuryUnpaidBalance",
      headerName: "Unpaid Balance",
      width: 150,
    },
    {
      field: "CurrencyID",
      headerName: "Currency",
      width: 150,
    },
    {
      field: "OrderQty",
      headerName: "Ordered Qty",
      width: 150,
    },
    {
      field: "OrderTotal",
      headerName: "Order Total",
      width: 150,
    },
    {
      field: "OrderDate",
      headerName: "Order Date",
      width: 150,
    },
    {
      field: "SchedShipDate",
      headerName: "Sched. Shipment",
      width: 150,
    },
    {
      field: "OwnerName",
      headerName: "Owner",
      width: 150,
    },
    {
      field: "ShipmentNbr",
      headerName: "Shipment Nbr",
      width: 150,
    },
    {
      field: "StatusShipmentAddon",
      headerName: "Status Shipment Addon",
      width: 150,
    },
    {
      field: "ShipmentDate",
      headerName: "Shipment Date",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      OrderType: "SD",
      OrderNbr: "SO2109-0013",
      OrderDesc: "",
      CustomerOrderNbr: "CO-PO/2021/09",
      StatusSO: "Open",
      StatusSOAddon: "",
      CustomerID: "CO0001",
      CustomerName: "PT NAA",
      LocationID: "Loc1",
      LocationName: "Cabang 1",
      TermsID: "30D",
      CuryPaymentTotal: "0.00",
      CuryUnpaidBalance: "120,000.00",
      CurrencyID: "IDR",
      OrderQty: "2,00",
      OrderTotal: "120,000.00",
      OrderDate: "09/09/2021",
      SchedShipDate: "09/09/2021",
      OwnerName: "Adadi",
      ShipmentNbr: "",
      StatusShipmentAddon: "",
      ShipmentDate: "",
    },
    {
      id: 2,
      OrderType: "SD",
      OrderNbr: "SO2109-0014",
      OrderDesc: "",
      CustomerOrderNbr: "PO/ABC/21/09/13",
      StatusSO: "Open",
      StatusSOAddon: "",
      CustomerID: "CO0002",
      CustomerName: "PT ABC",
      LocationID: "MAIN",
      LocationName: "Kantor Pusat",
      TermsID: "30D",
      CuryPaymentTotal: "0.00",
      CuryUnpaidBalance: "200,000.00",
      CurrencyID: "IDR",
      OrderQty: "5,00",
      OrderTotal: "200,000.00",
      OrderDate: "09/09/2021",
      SchedShipDate: "09/09/2021",
      OwnerName: "Adadi",
      ShipmentNbr: "",
      StatusShipmentAddon: "",
      ShipmentDate: "",
    },
    {
      id: 3,
      OrderType: "SD",
      OrderNbr: "SO2109-0015",
      OrderDesc: "",
      CustomerOrderNbr: "AAA/2109/0004",
      StatusSO: "Open",
      StatusSOAddon: "",
      CustomerID: "CO0003",
      CustomerName: "PT AAA",
      LocationID: "Loc1",
      LocationName: "Cabang 1",
      TermsID: "30D",
      CuryPaymentTotal: "0.00",
      CuryUnpaidBalance: "180,000.00",
      CurrencyID: "IDR",
      OrderQty: "3,00",
      OrderTotal: "180,000.00",
      OrderDate: "10/09/2021",
      SchedShipDate: "10/09/2021",
      OwnerName: "Adadi",
      ShipmentNbr: "",
      StatusShipmentAddon: "",
      ShipmentDate: "",
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
