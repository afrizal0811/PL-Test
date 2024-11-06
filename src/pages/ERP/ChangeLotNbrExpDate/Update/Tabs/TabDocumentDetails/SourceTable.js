import { spacing } from "@material-ui/system";
import { Button as MuiButton, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import styled from "styled-components/macro";
import DialogAddItem from "./DialogAddItem";

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function SourceTable() {
  const [openAddItem, setOpenAddItem] = useState(false);

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
      field: "SrcSiteID",
      headerName: "Source Warehouse",
      width: 150,
    },
    {
      field: "SrcLocationID",
      headerName: "Source Location",
      width: 150,
    },
    {
      field: "SrcSubItem",
      headerName: "Source Sub Item",
      width: 150,
    },
    {
      field: "SrcQty",
      headerName: "Source Qty",
      width: 150,
    },
    {
      field: "SrcLotNbr",
      headerName: "Source Lot Nbr",
      width: 150,
    },
    {
      field: "SrcExpDate",
      headerName: "Source Exp Date",
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
      SrcSIteID: "Sidoarjo",
      SrcLocationID: "Rak 01",
      SrcSubItem: "00",
      SrcQty: "100",
      SrcLotNbr: "2021-0001",
      SrcExpDate: "31-01-2021",
      ReasonCode: "CHANGELTEX",
    },
  ];

  return (
    <Paper my={6}>
      <div style={{ display: "flex", marginLeft: 10, paddingTop: 15 }}>
        <h3 style={{ marginRight: 20 }}>Source</h3>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenAddItem(true);
          }}
        >
          Add Item
        </Button>
      </div>
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
      <DialogAddItem
        openAddItem={openAddItem}
        setOpenAddItem={setOpenAddItem}
      />
    </Paper>
  );
}
