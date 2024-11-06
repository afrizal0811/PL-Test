import { spacing } from "@material-ui/system";
import { Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

export default function DestinationTable() {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 150,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 150,
    },
    {
      field: "ToSiteID",
      headerName: "To Warehouse",
      width: 150,
    },
    {
      field: "ToLocation",
      headerName: "To Location",
      width: 150,
    },
    {
      field: "ToSubItem",
      headerName: "To Sub Item",
      width: 150,
    },
    {
      field: "ToQty",
      headerName: "To Qty",
      width: 150,
    },
    {
      field: "ToLotNbr",
      headerName: "To Lot Nbr",
      width: 150,
    },
    {
      field: "ToExpDate",
      headerName: "To Exp Date",
      width: 150,
    },
    {
      field: "ReasonCode",
      headerName: "Reason Code",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      InventoryID: "KPK001",
      Description: "Kerupuk Udang Klasik",
      ToSIteID: "Sidoarjo",
      ToLocation: "Rak 01",
      ToSubItem: "00",
      ToQty: "100",
      ToLotNbr: "2021-0001",
      ToExpDate: "31-01-2024",
      ReasonCode: "CHANGELTEX",
    },
  ];

  return (
    <Paper my={6}>
      <h3 style={{ marginLeft: 10, paddingTop: 15 }}>Destination</h3>
      <div style={{ height: 400, width: "100%", padding: 10 }}>
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
  );
}
