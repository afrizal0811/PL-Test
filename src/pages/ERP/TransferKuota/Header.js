import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import styled from "styled-components/macro";
import CbData from "../../../components/shared/dropdown";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header({ searchParams, setSearchParams }) {
  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3} mt={3}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
                id={"BranchID"}
                desc={"BranchName"}
                label="Branch"
                value={
                  searchParams.branchID == "" ? "ALL" : searchParams.branchID
                }
                onChange={(newValue) => {
                  if (newValue) {
                    setSearchParams({
                      ...searchParams,
                      branchID: newValue,
                    });
                  } else {
                    setSearchParams({ ...searchParams, branchID: "" });
                  }
                }}
              />
              <Paper mt={3}>
                <DatePicker
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={searchParams.date}
                  onChange={(newValue) => {
                    setSearchParams({
                      ...searchParams,
                      date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3} mt={3}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse`}
                id={"warehouseID"}
                desc={"description"}
                label="Warehouse"
                value={
                  searchParams.warehouseID == ""
                    ? "ALL"
                    : searchParams.warehouseID
                }
                onChange={(newValue) => {
                  if (newValue) {
                    setSearchParams({
                      ...searchParams,
                      warehouseID: newValue,
                    });
                  } else {
                    setSearchParams({ ...searchParams, warehouseID: "" });
                  }
                }}
              />
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
                  value={searchParams.inventoryID}
                  onChange={(newValue) => {
                    setSearchParams({
                      ...searchParams,
                      inventoryID: newValue.target.value,
                    });
                  }}
                />
              </Paper>
            </Grid>
            <Grid item md={3} mt={3}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/MutasiKuota/Dropdown/ListKelompok`}
                id={"kelompokMutasiKuota"}
                label="Kelompok Barang"
                value={
                  searchParams.kelompok == "" ? "ALL" : searchParams.kelompok
                }
                onChange={(newValue) => {
                  if (newValue) {
                    setSearchParams({
                      ...searchParams,
                      kelompok: newValue,
                    });
                  } else {
                    setSearchParams({ ...searchParams, kelompok: "" });
                  }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
