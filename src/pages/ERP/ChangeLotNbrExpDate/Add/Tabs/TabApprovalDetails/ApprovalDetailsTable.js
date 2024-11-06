import React from "react";
import { Paper as MuiPaper } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Paper = styled(MuiPaper)(spacing);

export default function ApprovalDetailsTable() {
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "AssignAcctCD",
      headerName: "Assigned ID",
      width: 150,
    },
    {
      field: "AssignAcctName",
      headerName: "Assigned To",
      width: 150,
    },
    {
      field: "WorkgroupID",
      headerName: "Workgroup",
      width: 150,
    },
    {
      field: "AcctCD",
      headerName: "Approved By (ID)",
      width: 150,
    },
    {
      field: "AcctName",
      headerName: "Approved By",
      width: 150,
    },
    {
      field: "ApproveDate",
      headerName: "Date Approval",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "Reason",
      headerName: "Reason",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      AssignAcctCD: "2015030080",
      AssignAcctName: "Rully Hardian",
      WorkgroupID: "",
      AcctCD: "",
      AcctName: "",
      ApproveDate: "",
      Status: "",
      Reason: "",
    },
    {
      id: 2,
      AssignAcctCD: "2015030067",
      AssignAcctName: "Linda Tousya",
      WorkgroupID: "",
      AcctCD: "2015030067",
      AcctName: "Linda Tousya",
      ApproveDate: "25/09/2021",
      Status: "Approved",
      Reason: "-",
    },
    {
      id: 3,
      AssignAcctCD: "2015030078",
      AssignAcctName: "Feby Yuanita",
      WorkgroupID: "",
      AcctCD: "2015030078",
      AcctName: "Feby Yuanita",
      ApproveDate: "25/09/2021",
      Status: "Approved",
      Reason: "-",
    },
  ];

  return (
    <Paper my={6}>
      <div style={{ height: 400, width: "100%", padding: 10 }}>
        <DataGrid
          rowsPerPageOptions={[5, 10, 25]}
          rows={rows}
          columns={columns}
          pageSize={5}
          // checkboxSelection
          onCellCLick={handleCellClick}
          onRowCLick={handleRowClick}
        />
      </div>
    </Paper>
  );
}
