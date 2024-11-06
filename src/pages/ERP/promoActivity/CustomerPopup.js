import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider as MuiDivider,
  Grid,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

const DummyCust = [
  {
    CustomerName: "Mr. HUT",
    CustID: "C0001",
    Address1: "Majalengka",
    Address2: "Surabaya",
  },
  {
    CustomerName: "Mr. Weekend",
    CustID: "C0002",
    Address1: "Majalengka",
    Address2: "Surabaya",
  },
  {
    CustomerName: "Mr. Lebaran",
    CustID: "C0003",
    Address1: "Majalengka",
    Address2: "Surabaya",
  },
  {
    CustomerName: "Mr. Akhir Tahun",
    CustID: "C0004",
    Address1: "Majalengka",
    Address2: "Surabaya",
  },
];

export default function CustomerPopup(props) {
  //state Customer ID
  const [openCust, setOpenCust] = React.useState(props.openCust);
  const [DataCust, setDataCust] = useState(DummyCust);
  const [FilterCustomer, setFilterCustomer] = React.useState([]);
  const [SelectedCust, setSelectedCust] = React.useState(() =>
    DataCust.filter((el) => {
      return FilterCustomer.some((f) => {
        return (
          f.CustomerName === el.CustomerName &&
          f.CustID === el.CustID &&
          f.Address1 === el.Address1 &&
          f.Address2 === el.Address2
        );
      });
    })
  );
  const columnsCust = [
    {
      field: "CustID",
      headerName: "Customer ID",
      width: 110,
      sortable: false,
    },
    {
      field: "CustomerName",
      headerName: "Customer Name",
      sortable: false,
      width: 200,
    },
    {
      field: "Address1",
      headerName: "Address 1",
      sortable: false,
      width: 200,
    },
    {
      field: "Address2",
      headerName: "Address 2",
      sortable: false,
      width: 200,
    },
  ];

  useEffect(() => {
    setOpenCust(props.openCust);
  }, [props.openCust]);

  return (
    <React.Fragment>
      <Dialog
        open={openCust}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenCust(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Customer List</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={DataCust}
                getRowId={(row) => row.CustID}
                columns={columnsCust}
                pageSize={5}
                hideFooter={true}
                rowsPerPageOptions={[5]}
                density="compact"
                disableColumnFilter
                disableColumnMenu
                checkboxSelection
                disableSelectionOnClick
                selectionModel={SelectedCust}
                onSelectionModelChange={(e) => {
                  setSelectedCust(e);
                  const selectedIDs = new Set(e);
                  const selectedRows = DataCust.filter((r) =>
                    selectedIDs.has(r.id)
                  );
                  setFilterCustomer(selectedRows);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenCust(false);
              // setPrincipal("");
              setSelectedCust(props.TempCustomer);
              setFilterCustomer(props.TempCustomer);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setOpenCust(false);
              props.setTempCustomer(SelectedCust);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
