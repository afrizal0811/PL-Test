import React from "react";
import styled from "styled-components/macro";
import {
  Card as MuiCard,
  Paper as MuiPaper,
  Checkbox,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function SerahTerimaTable(props) {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "OrderNbr",
      headerName: "Order Nbr",
      width: 200,
    },
    {
      field: "ShipmentNbr",
      headerName: "Shipment Nbr",
      width: 200,
    },
    {
      field: "CustomerOrderNbr",
      headerName: "Customer Order Nbr",
      width: 200,
    },
    {
      field: "StatusSO",
      headerName: "Status SO",
      width: 200,
    },
    {
      field: "StatusShipment",
      headerName: "Status Shipment",
      width: 200,
    },
    {
      field: "SerahTerimaCheck",
      headerName: "Serah Terima",
      width: 200,
      renderCell: () => {
        return (
          <Checkbox
            onChange={props.handleCheckSerahTerima}
            disabled={props.StatusSTHistory === "Serah Terima" ? true : false}
          />
        );
      },
    },
    {
      field: "RoutingCheck",
      headerName: "Routing",
      width: 200,
      renderCell: () => {
        return <Checkbox onChange={props.handleCheckRouting} />;
      },
    },
    {
      field: "CustomerID",
      headerName: "Customer",
      width: 200,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "LocationID",
      headerName: "Location",
      width: 200,
    },
    {
      field: "LocationName",
      headerName: "Location Name",
      width: 200,
    },
    {
      field: "OwnerName",
      headerName: "Owner",
      width: 200,
    },
    {
      field: "RoutingNbr",
      headerName: "Routing Nbr",
      width: 200,
    },
  ];

  const rows = [
    {
      id: 1,
      OrderNbr: "SO2109-0013",
      ShipmentNbr: "SH2109-0023",
      CustomerOrderNbr: "CO-PO/2021/09",
      StatusSO: "Shipping",
      StatusShipment: "On Hold",
      SerahTerimaCheck: false,
      RoutingCheck: false,
      CustomerID: "CO0001",
      CustomerName: "PT NAA",
      LocationID: "Loc1",
      LocationName: "Cabang 1",
      OwnerName: "Adadi",
      RoutingNbr: "",
    },
    {
      id: 2,
      OrderNbr: "SO2109-0014",
      ShipmentNbr: "SH2109-0024",
      CustomerOrderNbr: "PO/ABC/21/09/13",
      StatusSO: "Shipping",
      StatusShipment: "On Hold",
      SerahTerimaCheck: false,
      RoutingCheck: false,
      CustomerID: "CO0002",
      CustomerName: "PT ABC",
      LocationID: "Main",
      LocationName: "Kantor Pusat",
      OwnerName: "Adadi",
      RoutingNbr: "",
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
