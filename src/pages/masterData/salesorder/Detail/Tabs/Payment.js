import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { CircularProgress, Grid, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

const columnsPayment = [
  {
    field: "DocType",
    headerName: "Doc Type",
    width: 200,
  },
  {
    field: "ReferenceNbr",
    headerName: "Reference Nbr",
    width: 200,
  },
  {
    field: "AppliedToOrder",
    headerName: "Aplied To Order",
    width: 200,
  },
];

export default function Payment(props) {
  const [selectionPayment, setSelectionPayment] = useState(0);
  const [pageSizePayment, setPageSizePayment] = useState(5);

  return (
    <TabPanel value="2">
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
              rows={props.payment}
              columns={columnsPayment}
              pageSize={pageSizePayment}
              onPageSizeChange={(newPageSize) =>
                setPageSizePayment(newPageSize)
              }
              selectionModel={selectionPayment}
              onSelectionModelChange={(selection) => {
                setSelectionPayment(selection);
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
