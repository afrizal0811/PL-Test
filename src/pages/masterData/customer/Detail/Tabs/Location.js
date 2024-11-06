import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import { CircularProgress, Grid, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

const columnsLocation = [
  {
    field: "LocationID",
    headerName: "Location ID",
    width: 200,
  },
  {
    field: "LocationName",
    headerName: "Location Name",
    type: "text",
    width: 200,
  },
  {
    field: "City",
    headerName: "City",
    width: 200,
  },
];

export default function Location(props) {
  const [selectionLocation, setSelectionLocation] = useState(0);
  const [pageSizeLocation, setPageSizeLocation] = useState(5);

  return (
    <TabPanel value="5">
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
              getRowId={(row) => row.LocationLineID}
              rows={props.location}
              columns={columnsLocation}
              pageSize={pageSizeLocation}
              onPageSizeChange={(newPageSize) =>
                setPageSizeLocation(newPageSize)
              }
              selectionModel={selectionLocation}
              onSelectionModelChange={(selection) => {
                setSelectionLocation(selection);
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
