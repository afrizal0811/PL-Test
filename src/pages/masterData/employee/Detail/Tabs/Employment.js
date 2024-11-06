import { TabPanel } from "@mui/lab";
import { CircularProgress, Grid, Paper as MuiPaper } from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "Active",
    headerName: "Active",
    type: "boolean",
    width: 200,
  },
  {
    field: "PositionID",
    headerName: "Position",
    width: 200,
  },
  {
    field: "StartDate",
    headerName: "Start Date",
    type: "text",
    width: 200,
  },
];

export default function Employment(props) {
  const [pageSize, setPageSize] = useState(5);
  const [selection, setSelection] = useState(0);

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
              rows={props.employeeHistory}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
