import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { CircularProgress, Grid, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

const columnsDetails = [
  {
    field: "InventoryID",
    headerName: "Inventory ID",
    width: 200,
  },
  {
    field: "LineDescription",
    headerName: "Line Description",
    width: 200,
  },
  {
    field: "WarehouseID",
    headerName: "Warehouse",
    width: 200,
  },
  {
    field: "UOM",
    headerName: "UOM",
    type: "text",
    width: 200,
  },
  {
    field: "OrderQty",
    headerName: "QTY",
    type: "text",
    width: 200,
  },
  {
    field: "UnitPrice",
    headerName: "Unit Price",
    type: "number",
    width: 200,
  },
  {
    field: "DiscountAmount",
    headerName: "Discount Amount",
    type: "number",
    width: 200,
  },
  {
    field: "Amount",
    headerName: "Amount",
    type: "number",
    width: 200,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            value={params.row.ExtendedPrice - params.row.DiscountAmount}
          />
        </>
      );
    },
  },
  {
    field: "SalespersonID",
    headerName: "Salesperson ID",
    type: "text",
    width: 200,
  },
  {
    field: "TaxCategory",
    headerName: "Tax Category",
    type: "text",
    width: 200,
  },
];

export default function Details(props) {
  const [selectionDetails, setSelectionDetails] = useState(0);
  const [pageSizeDetails, setPageSizeDetails] = useState(5);

  return (
    <TabPanel value="1">
      {props.loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
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
          <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              rows={props.details}
              columns={columnsDetails}
              pageSize={pageSizeDetails}
              onPageSizeChange={(newPageSize) =>
                setPageSizeDetails(newPageSize)
              }
              selectionModel={selectionDetails}
              onSelectionModelChange={(selection) => {
                setSelectionDetails(selection);
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
