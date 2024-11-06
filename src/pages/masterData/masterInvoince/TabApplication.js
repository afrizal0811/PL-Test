import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { TabPanel } from "@material-ui/lab";
import { CircularProgress, Grid, Paper as MuiPaper } from "@material-ui/core";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

TabApplication.propTypes = {
  loading: PropTypes.bool,
  isEditingZona: PropTypes.bool,
  setisEditingZona: PropTypes.any,
  Zona: PropTypes.array,
  setZona: PropTypes.func,
};

export default function TabApplication(props) {
  const { loading, setLoading } = props;

  const columnDetail = [
    {
      field: "Doc. Type",
      headerName: "Doc. Type",
      sortable: false,
      width: 150,
    },
    {
      field: "Reference Nbr",
      headerName: "Reference Nbr",
      sortable: false,
      width: 200,
    },
    {
      field: "Amount Paid",
      sortable: false,
      headerName: "Amount Paid",
      minWidth: 200,
      // renderCell: kotaCell,
    },
    {
      field: "Amount Paid",
      headerName: "Amount Paid",
      sortable: false,
      // disableColumnMenu: true,
      width: 200,
    },
    {
      field: "Write-off",
      sortable: false,
      headerName: "Write-off Amount",
      type: "text",
      width: 200,
    },
    {
      field: "Payment Date ",
      sortable: false,
      headerName: "Payment Date ",
      type: "text",
      width: 200,
    },
    {
      field: "Balance",
      sortable: false,
      headerName: "Balance",
      type: "text",
      width: 200,
    },
    {
      field: "Balance",
      sortable: false,
      headerName: "Balance",
      type: "text",
      width: 200,
    },
    {
      field: "Currency",
      sortable: false,
      headerName: "Currency",
      type: "text",
      width: 200,
    },
    {
      field: "Payment Period",
      sortable: false,
      headerName: "Payment Period",
      type: "text",
      width: 200,
    },
    {
      field: "Payment Ref",
      sortable: false,
      headerName: "Payment Ref ",
      type: "text",
      width: 200,
    },
    {
      field: "Customer",
      sortable: false,
      headerName: "Customer",
      type: "text",
      width: 200,
    },
    {
      field: "Status",
      sortable: false,
      headerName: "Status",
      type: "text",
      width: 200,
    },
    {
      field: "Proc. Status",
      sortable: false,
      headerName: "Proc. Status",
      type: "text",
      width: 200,
    },
  ];

  return (
    <TabPanel value="2">
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
