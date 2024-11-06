import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Grid,
  Checkbox,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Button as MuiButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CardContent,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function DialogAddItem(props) {
  const [Inventory, setInventory] = useState("");
  const [Warehouse, setWarehouse] = useState("");
  const [OnlyAvailable, setOnlyAvailable] = useState(false);

  const columns = [
    {
      field: "QtySelected",
      headerName: "Qty Selected",
      width: 150,
    },
    {
      field: "SiteID",
      headerName: "Warehouse",
      width: 150,
    },
    {
      field: "InventoryCD",
      headerName: "Inventory ID",
      width: 150,
    },
    {
      field: "Descr",
      headerName: "Description",
      width: 150,
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 150,
    },
    {
      field: "QtyAvail",
      headerName: "Qty Available",
      width: 150,
    },
    {
      field: "QtyOnHand",
      headerName: "Qty On Hand",
      width: 150,
    },
  ];

  const rows = [
    {
      id: 1,
      QtySelected: "100",
      SiteID: "Sidoarjo",
      InventoryCD: "KPK001",
      Descr: "Kerupuk Udang Klasik",
      UOM: "DUS",
      QtyAvail: "100.000",
      QtyOnHand: "100.000",
    },
    {
      id: 2,
      QtySelected: "0",
      SiteID: "Sidoarjo",
      InventoryCD: "KPK002",
      Descr: "Kerupuk Udang Nusantara",
      UOM: "DUS",
      QtyAvail: "101.000",
      QtyOnHand: "101.000",
    },
    {
      id: 3,
      QtySelected: "0",
      SiteID: "Sidoarjo",
      InventoryCD: "KPK003",
      Descr: "Kerupuk Bawang",
      UOM: "DUS",
      QtyAvail: "9.000",
      QtyOnHand: "9.000",
    },
    {
      id: 4,
      QtySelected: "0",
      SiteID: "Sidoarjo",
      InventoryCD: "KPK004",
      Descr: "Kerupuk Saladah",
      UOM: "DUS",
      QtyAvail: "1.000",
      QtyOnHand: "1.000",
    },
    {
      id: 5,
      QtySelected: "0",
      SiteID: "Sidoarjo",
      InventoryCD: "KPK005",
      Descr: "Kerupuk Bawal Putih",
      UOM: "DUS",
      QtyAvail: "2.000",
      QtyOnHand: "2.000",
    },
  ];

  const handleCheckOnlyAvailable = (event) => {
    setOnlyAvailable(event.target.checked);
  };

  return (
    <Dialog
      open={props.openAddItem}
      onClose={() => props.setOpenAddItem(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="xl"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        Add Item
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenAddItem(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card mb={3}>
          <CardContent>
            <Grid container spacing={12} style={{ width: "100%" }}>
              <Grid item md={3} style={{ width: "50%" }}>
                <Paper mt={3}>
                  <TextField
                    label="Inventory"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={Inventory}
                    onChange={(newValue) => {
                      setInventory(Inventory);
                    }}
                    fullWidth
                  />
                </Paper>
                <Paper mt={6}>
                  <Checkbox onChange={handleCheckOnlyAvailable} />
                  Show Available Items Only
                </Paper>
              </Grid>
              <Grid item md={3} style={{ width: "50%" }}>
                <Paper mt={3}>
                  <TextField
                    label="Warehouse"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={Warehouse}
                    onChange={(newValue) => {
                      setWarehouse(Warehouse);
                    }}
                    fullWidth
                  />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <Paper ml={6} mr={6}>
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid
            ml={6}
            mr={6}
            rows={rows}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Paper>
      {/* <Divider
        my={6}
        ml={6}
        mr={6}
        style={{
          height: "2px",
          border: "none",
          backgroundColor: "#bdbdbd",
        }}
      /> */}
      <DialogActions style={{ marginTop: 15, marginBottom: 15 }}>
        <Button color="primary" variant="contained">
          Add
        </Button>
        <Button color="primary" variant="contained">
          Add & Close
        </Button>
        <Button
          onClick={() => props.setOpenAddItem(false)}
          color="error"
          variant="contained"
          mr={3}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
