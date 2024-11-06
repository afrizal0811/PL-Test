import AddIcon from "@mui/icons-material/Add";
import { TabPanel } from "@mui/lab";
import { Button, TextField as MuiTextField, Paper } from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

const TextField = styled(MuiTextField)(spacing);

export default function Membership(props) {
  const [data, setData] = useState(props.data);
  const [pageSize, setPageSize] = useState(5);
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props]);

  const columns = [
    {
      field: "username",
      headerName: "Username",
      width: 200,
    },
    {
      field: "displayName",
      headerName: "Display Name",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 200,
    },
    {
      field: "comment",
      headerName: "Comment",
      type: "date",
      width: 200,
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => console.log("add Membership")}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <TabPanel value="1">
      <Paper>
        <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            editMode="row"
            getRowId={(row) => row.username}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            selectionModel={selection}
            onSelectionModelChange={(selection) => {
              setSelection(selection);
            }}
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </Paper>
    </TabPanel>
  );
}
