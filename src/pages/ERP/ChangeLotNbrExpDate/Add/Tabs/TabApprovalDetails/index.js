import React from "react";
import ApprovalDetailsTable from "./ApprovalDetailsTable";
import RefreshButton from "./RefreshButton";
import moment from "moment";
import { TabPanel } from "@material-ui/lab";
import { Button, Paper } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

export default function TabApprovalDetails(props) {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "AssignedAcctCD",
      headerName: "Assigned ID",
      width: 150,
    },
    {
      field: "AssignedAcctName",
      headerName: "Assigned To",
      width: 150,
    },
    {
      field: "WorkgroupID",
      headerName: "Workgroup",
      width: 150,
    },
    {
      field: "ApprovedByAcctCD",
      headerName: "Approved By (ID)",
      width: 150,
    },
    {
      field: "ApprovedByAcctName",
      headerName: "Approved By",
      width: 150,
    },
    {
      field: "ApprovedDate",
      headerName: "Date Approval",
      width: 150,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("YYYY-MM-DD")}</p>
        ) : (
          <></>
        ),
    },
    {
      field: "ApprovedStatus",
      headerName: "Status",
      width: 150,
    },
    {
      field: "Reason",
      headerName: "Reason",
      width: 150,
    },
  ];
  return (
    <TabPanel value="2">
      <Paper my={6}>
        <div style={{ height: 400, width: "100%", padding: 10 }}>
          <DataGrid
            rows={props.DataApproval}
            columns={columns}
            pageSize={5}
            // checkboxSelection
            onCellCLick={handleCellClick}
            onRowCLick={handleRowClick}
          />
        </div>
      </Paper>
    </TabPanel>
  );
}
