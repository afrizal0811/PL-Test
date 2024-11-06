import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { CircularProgress, Grid, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

TabDetail.propTypes = {
  loading: PropTypes.bool,
  isEditingZona: PropTypes.bool,
  setisEditingZona: PropTypes.any,
  Zona: PropTypes.array,
  setZona: PropTypes.func,
};

export default function TabDetail(props) {
  const { loading, setLoading } = props;

  const columnDetail = [
    {
      field: "Branch",
      headerName: "Branch",
      sortable: false,
      width: 150,
    },
    {
      field: "Shipment Nbr",
      headerName: "Shipment Nbr",
      sortable: false,
      width: 200,
    },
    {
      field: "InventoryID",
      sortable: false,
      headerName: "inventoryID",
      minWidth: 200,
      // renderCell: kotaCell,
    },
    {
      field: "subitem",
      headerName: "Sub item",
      sortable: false,
      // disableColumnMenu: true,
      width: 200,
    },
    {
      field: "TransactionDescription",
      sortable: false,
      headerName: "Transaction Description",
      type: "text",
      width: 200,
    },
    {
      field: "Warehouse",
      sortable: false,
      headerName: "Warehouse",
      type: "text",
      width: 200,
    },
    {
      field: "Location",
      sortable: false,
      headerName: "Location",
      type: "text",
      width: 200,
    },
    {
      field: "Qty",
      sortable: false,
      headerName: "Quantity",
      type: "text",
      width: 200,
    },
    {
      field: "Lot/Serial Nbr.",
      sortable: false,
      headerName: "Lot/Serial Nbr.",
      type: "text",
      width: 200,
    },
    {
      field: "ExpireDate",
      sortable: false,
      headerName: "ExpireDate Date",
      type: "text",
      width: 200,
    },
    {
      field: "UnitPrice",
      sortable: false,
      headerName: "Unit Price",
      type: "text",
      width: 200,
    },
    {
      field: "ManualPrice",
      sortable: false,
      headerName: "Manual Price",
      type: "text",
      width: 200,
    },
    {
      field: "ExtendedPrice",
      sortable: false,
      headerName: "Extended Price",
      type: "text",
      width: 200,
    },
    {
      field: "DiscountAmount",
      sortable: false,
      headerName: "Discount Amount",
      type: "text",
      width: 200,
    },
    {
      field: "DiscPct",
      sortable: false,
      headerName: "DiscPct",
      type: "text",
      width: 200,
    },
    {
      field: "ManualDisc",
      sortable: false,
      headerName: "ManualDisc",
      type: "text",
      width: 200,
    },
    {
      field: "DiscountID",
      sortable: false,
      headerName: "DiscountID",
      type: "text",
      width: 200,
    },
    {
      field: "Amount",
      sortable: false,
      headerName: "Amount",
      type: "text",
      width: 200,
    },
    {
      field: "Account",
      sortable: false,
      headerName: "account",
      type: "text",
      width: 200,
    },
    {
      field: "Account_desc",
      sortable: false,
      headerName: "Account_desc",
      type: "text",
      width: 200,
    },
    {
      field: "subaccount",
      sortable: false,
      headerName: "subaccount",
      type: "text",
      width: 200,
    },
    {
      field: "SalesPersonID",
      sortable: false,
      headerName: "SalesPersonID",
      type: "text",
      width: 200,
    },
    {
      field: "DeferredCode",
      sortable: false,
      headerName: "DeferredCode",
      type: "text",
      width: 200,
    },
    {
      field: "Term Start Date",
      sortable: false,
      headerName: "Term Start Date",
      type: "text",
      width: 200,
    },
    {
      field: "Term End Date",
      sortable: false,
      headerName: "Term End Date",
      type: "text",
      width: 200,
    },
    {
      field: "Original Deferral Schedule",
      sortable: false,
      headerName: "Original Deferral Schedule",
      type: "text",
      width: 200,
    },
    {
      field: "TaxCategoryID",
      sortable: false,
      headerName: "TaxCategoryID",
      type: "text",
      width: 200,
    },
    {
      field: "Commissionable",
      sortable: false,
      headerName: "Commissionable",
      type: "text",
      width: 200,
    },
    {
      field: "OrigInvoiceType",
      sortable: false,
      headerName: "OrigInvoiceType",
      type: "text",
      width: 200,
    },
    {
      field: "OrigInvoiceNbr",
      sortable: false,
      headerName: "OrigInvoiceNbr",
      type: "text",
      width: 200,
    },
    {
      field: "InvtDocType",
      sortable: false,
      headerName: "InvtDocType",
      type: "text",
      width: 200,
    },
    {
      field: "InvtRefNbr",
      sortable: false,
      headerName: "InvtRefNbr",
      type: "text",
      width: 200,
    },
  ];

  return (
    <TabPanel value="1">
      {loading ? (
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
          <div style={{ height: 300, width: "100%", marginTop: "10px" }}>
            <DataGrid
              // autoHeight
              getRowId={(row) => row.InvoiceDetailID}
              hideFooter
              rows={props.Data}
              columns={columnDetail}
              rowHeight={60}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
