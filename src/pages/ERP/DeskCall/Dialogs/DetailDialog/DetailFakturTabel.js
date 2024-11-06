import React from "react";
import styled from "styled-components/macro";
import { Card as MuiCard, Paper as MuiPaper } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";
import NumberFormat from "react-number-format";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function FakturTabel(props) {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "inventoryID",
      headerName: "Kode Barang",
      width: 120,
      sortable: false,
    },
    {
      field: "inventoryID_Descr",
      headerName: "Nama Barang",
      sortable: false,
      width: 330,
    },
    {
      field: "qty",
      headerName: "QTY",
      sortable: false,
      width: 105,
    },
    {
      field: "uom",
      headerName: "UOM",
      sortable: false,
      width: 105,
    },
    {
      field: "curyUnitPrice",
      headerName: "Harga Satuan",
      sortable: false,
      width: 150,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={params.value}
            />
          </>
        );
      },
    },
    {
      field: "DetailInfoJT",
      headerName: "Harga Total",
      sortable: false,
      type: "number",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={params.row.qty * params.row.curyUnitPrice}
            />
          </>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      InventoryID: "IK.4SU",
      TranDesc: "FF.STRAIGHT CUT (4SU) @2.267 KG X 6-PAK",
      Qty: "12",
      UOM: "PAK",
      CuryUnitPrice: "791.268",
      DetailInfoJT: "",
    },
  ];

  return (
    <Card mb={0} mt={0}>
      <Paper>
        <div style={{ width: "100%" }}>
          <DataGrid
            // rowsPerPageOptions={[5, 10, 25]}
            getRowId={(row) => row.id}
            autoHeight
            rows={props.DataFaktur}
            // rows={rows}
            columns={columns}
            hideFooter
            density="compact"
            disableColumnFilter
            disableColumnMenu
            // pageSize={5}
            // checkboxSelection
            // onCellCLick={handleCellClick}
            // onRowCLick={handleRowClick}
          />
        </div>
      </Paper>
    </Card>
  );
}
