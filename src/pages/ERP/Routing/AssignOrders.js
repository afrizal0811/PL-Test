import { spacing } from "@material-ui/system";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import styled from "styled-components/macro";
import CbDataPG from "../../../components/shared/dropdownPG";
import { getBrach } from "../../../utils/jwt";
import columnSO from "./columnSO";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function AssignOrders(props) {
  const [Data, setData] = useState([]);
  const [selSO, setselSO] = useState([]);
  const [Branch, setBranch] = useState(getBrach());
  const [TipeStorage, setTipeStorage] = useState("Dry");
  const [Zona, setZona] = useState("");
  const [RoutingDate, setRoutingDate] = useState(new Date());
  const [NoSO, setNoSO] = useState("");
  const [SearchText, setSearchText] = useState("");
  const [Vehicle, setVehicle] = useState("");
  const [ScrDropship, setScrDropship] = useState(false);

  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer
          style={{ padding: 0, margin: 0, marginLeft: "5px" }}
        >
          <Button
            color="primary"
            onClick={() => {
              // history("/laporan-harian-inkaso/add");
              var c = props.selSO.filter(function (objFromA) {
                return !selSO.find(function (objFromB) {
                  return objFromA.NoSalesOrder === objFromB.NoSalesOrder;
                });
              });
              props.setselSO(c);
            }}
            mr={2}
            disableElevation
          >
            Remove
          </Button>
          {/* <GridToolbarExport /> */}
        </GridToolbarContainer>
      </>
    );
  }

  return (
    <>
      <CardContent>
        <Grid container md={12}>
          <Grid item md={8}>
            <Grid container md={12} spacing={4}>
              <Grid item md={6}>
                <TextField
                  label="Branch"
                  size="small"
                  fullWidth
                  value={Branch}
                  onChange={(newValue) => {
                    setBranch(Branch);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Storage Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    size="small"
                    label="Storage Type"
                    value={TipeStorage}
                    fullWidth
                    onChange={(e) => setTipeStorage(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="Dry">Dry</MenuItem>
                    <MenuItem value="Frozen">Frozen</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <DatePicker
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size="small"
                  inputFormat={"dd/MM/yyyy"}
                  fullWidth
                  value={RoutingDate}
                  onChange={(newValue) => {
                    setRoutingDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField size="small" fullWidth {...params} />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="Vehicle ID"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment>
                  //       <IconButton>
                  //         <SearchIcon />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  size="small"
                  fullWidth
                  value={Vehicle == "" ? " " : Vehicle}
                  onChange={(e) => {
                    setVehicle(e.target.value);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <CbDataPG
                  value={Zona == "" ? " " : `${Zona}`}
                  defaultValue={Zona == "" ? " " : `${Zona}`}
                  required
                  size="small"
                  // config={GetConfig()}
                  // disabled={Loading}
                  label="Shipping Zone"
                  desc={"description"}
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/ShippingZoneSyncReps?page=1&rowsCount=100`}
                  id="zoneID"
                  onChange={(e) => {
                    setZona(e);
                    console.log("e", e);
                  }}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  label="No Sales Order"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment>
                  //       <IconButton>
                  //         <SearchIcon />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  size="small"
                  fullWidth
                  value={NoSO == "" ? " " : NoSO}
                  onChange={(e) => {
                    setNoSO(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4}>
            <Grid container>
              <Grid item md={12}>
                <TextField
                  label="Search"
                  // InputProps={{
                  //   endAdornment: (
                  //     <InputAdornment>
                  //       <IconButton>
                  //         <SearchIcon />
                  //       </IconButton>
                  //     </InputAdornment>
                  //   ),
                  // }}
                  size="small"
                  fullWidth
                  value={SearchText == "" ? " " : SearchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ScrDropship}
                      onChange={() => setScrDropship(!ScrDropship)}
                    />
                  }
                  label="PO Source Dropship"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Paper>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={props.selSO}
            getRowId={(e) => e.NoSalesOrder}
            density="compact"
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            columns={columnSO}
            components={{
              Toolbar: CustomToolbar,
            }}
            pageSize={5}
            checkboxSelection
            selectionModel={selSO.map((a) => a.NoSalesOrder)}
            onSelectionModelChange={(e) => {
              setselSO(props.selSO.filter((i) => e.includes(i.NoSalesOrder)));
              console.log("leng", selSO.length);
              console.log("selken", props.selKendaraan);
              // setselKendaraan(
              //   e.map((a) => {
              //     Data.filter((aa) => aa.LaporanHarianInkasoGridRepID == a);
              //   })
              // );
            }}
          />
        </div>
      </Paper>
    </>
  );
}
