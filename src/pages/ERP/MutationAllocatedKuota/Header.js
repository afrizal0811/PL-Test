import { Clear } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components/macro";
import CbData from "../../../components/shared/dropdown";
import ItemPopup from "../../../components/shared/ItemPopup";
import SelectPopup from "../../../components/shared/SelectPopup";
import { GetConfig } from "../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header({ searchParams, setSearchParams }) {
  const [openItem, setOpenItem] = React.useState(false);
  const [openAlloWH, setopenAlloWH] = useState(false);

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={4}>
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
              {/* <Paper mt={3}>
                <DatePicker
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={searchParams.date}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(newValue) => {
                    setSearchParams({
                      ...searchParams,
                      date: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Paper> */}
            </Grid>
            <Grid item md={3} mt={3}>
              <TextField
                label="Warehouse"
                value={
                  !!searchParams.warehouseID ? searchParams.warehouseID : "ALL"
                }
                // size="small"
                // disabled={Data.Status !== "On Hold" || !Data.FromWarehouseID}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {!!searchParams.warehouseID ? (
                        <>
                          <IconButton
                            onClick={() =>
                              setSearchParams({
                                ...searchParams,
                                warehouseID: "",
                              })
                            }
                            // disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => {
                              setopenAlloWH(true);
                            }}
                            // disabled={oading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                onClick={() => {
                  if (!searchParams.warehouseID) {
                    setopenAlloWH(true);
                  }
                }}
              />
              {/* <CbData
                freeSolo
                source={`${
                  process.env.REACT_APP_DOMAIN_API
                }/WarehouseReps/DropDown/Warehouse?warehouseID=${
                  searchParams.warehouseID.length < 5
                    ? searchParams.warehouseID
                    : ""
                }&branch=${searchParams.branchID}`}
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
              /> */}
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
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Inventory"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={() => {
                            setOpenItem(true);
                          }}
                        >
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
          </Grid>
        </CardContent>
      </Card>
      <ItemPopup
        open={openItem}
        setopen={(e) => {
          setOpenItem(e);
        }}
        Temp={searchParams.inventoryID}
        label={"Item"}
        id={"inventoryID"}
        desc={"description"}
        api={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=`}
        setTemp={(e) => {
          setSearchParams({
            ...searchParams,
            inventoryID: e.inventoryID,
          });
          console.log("cus", e);
        }}
      />
      <SelectPopup
        open={openAlloWH}
        name={"Warehouse"}
        all
        api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps`}
        config={GetConfig()}
        id={"WarehouseID"}
        desc={"Description"}
        setopen={(e) => {
          setopenAlloWH(e);
        }}
        Temp={searchParams.warehouseID}
        setTemp={(e) => {
          setSearchParams({
            ...searchParams,
            // branchID: e.Branch,
            warehouseID: e.WarehouseID,
          });
          console.log("e", e);
        }}
      />
    </div>
  );
}
