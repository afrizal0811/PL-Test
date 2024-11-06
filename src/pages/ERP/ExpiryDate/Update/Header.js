import React, { useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  CardContent,
  Grid,
  TextField as MuiTextField,
  Paper as MuiPaper,
  Button as MuiButton,
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import { DatePicker } from "@material-ui/lab";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";

import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Refresh from "@material-ui/icons/Refresh";
import Reply from "@material-ui/icons/Reply";
import SaveIcon from "@material-ui/icons/Save";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

const Dummy = {
  id: 1,
  ExpiryDate: "01/01/2022",
  Customer: "Indomart",
  Date: "01/01/2022",
  Qty: "5",
  Location: "Manyar",
  UOM: "KG",
  Desc: "Desc Indo Manyar",
  Item: "[file]",
};

export default function Header() {
  const [ExpiryDate, setExpiryDate] = useState(Dummy.ExpiryDate);
  const [Qty, setQty] = useState(Dummy.Qty);
  const [Location, setLocation] = useState(Dummy.Location);
  const [UOM, setUOM] = useState(Dummy.UOM);
  const [Item, setItem] = useState(Dummy.Item);
  const [Description, setDescription] = useState(Dummy.Desc);

  //state Customer ID
  const [openCust, setOpenCust] = React.useState(false);
  const [DataCust, setDataCust] = useState();
  const [TempCustomer, setTempCustomer] = React.useState(Dummy.Customer);
  const history = useNavigate();
  const [SelectedCust, setSelectedCust] = React.useState([]);

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/expiry-date")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          // onClick={() => onSumbitHandler()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/expiry-date/add")}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          // onClick={onSumbitHandler}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Typography sx={{ m: 2 }} variant="h4" gutterBottom>
            Expiry Date
          </Typography>
          <Grid container spacing={5} sx={{ my: 2 }}>
            <Grid item md={4} xs={12}>
              <TextField
                name="Customer"
                label="Customer"
                value={TempCustomer}
                color={TempCustomer.length == 0 ? "warning" : ""}
                focused={TempCustomer.length == 0 ? true : false}
                fullWidth
                disabled
                // onClick={() => {
                //   setSelectedCust(TempCustomer);
                //   setOpenCust(true);
                // }}
                variant="outlined"
                // onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {TempCustomer.length === 0 && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Expiry Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={ExpiryDate}
                onChange={(value) => {
                  setExpiryDate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
              {/* {ExpiryDate.length === 0 && (
              <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
            )} */}
            </Grid>
          </Grid>
          <Grid container spacing={5} my={2}>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={ExpiryDate}
                onChange={(value) => {
                  setExpiryDate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Qty"
                type="number"
                value={Qty}
                onChange={(e) => {
                  setQty(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={5} my={2}>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Location"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Manyar"}>Manyar</MenuItem>
                  <MenuItem value={"Darmo"}>Darmo</MenuItem>
                  <MenuItem value={"Seno"}>Seno</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">UOM</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="UOM"
                  value={UOM}
                  onChange={(e) => setUOM(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"KG"}>KG</MenuItem>
                  <MenuItem value={"CM"}>CM</MenuItem>
                  <MenuItem value={"Liter"}>Liter</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={5} my={2}>
            <Grid item md={4} xs={12}>
              <TextField
                label="Item"
                value={Item}
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={8} xs={12}>
              <TextField
                label="Description"
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                style={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Grid container spacing={6} md={12} mt={3} ml={4} paddingBottom={5}>
          <Button mr={2} variant="outlined" color="success">
            Save
          </Button>
          <Button mr={2} variant="outlined" color="error">
            Delete
          </Button>
          <Button mr={2} variant="outlined" color="primary">
            Refresh
          </Button>
        </Grid>
      </Card>
    </>
  );
}
