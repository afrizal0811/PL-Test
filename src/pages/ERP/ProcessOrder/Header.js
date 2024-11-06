import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import React, { useState } from "react";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header(props) {
  const [ProcessOrdNbr, setProcessOrdNbr] = useState("");
  const [ProcessOrdDate, setProcessOrdDate] = useState(new Date());
  const [FilterStartDate, setFilterStartDate] = useState(new Date());
  const [FilterEndDate, setFilterEndDate] = useState(new Date());
  const [ShipmentDate, setShipmentDate] = useState(new Date());
  const [Category, setCategory] = useState("");
  const [Customer, setCustomer] = useState("");
  const [GenerateDate, setGenerateDate] = useState(false);

  const handleGenerateDate = (event) => {
    setGenerateDate(event.target.checked);
  };

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Button mr={2} variant="contained" color="primary">
            Save
          </Button>
          <Button mr={2} variant="contained" color="primary">
            Add
          </Button>
          <Button mr={2} variant="contained" color="primary">
            Process
          </Button>
          <Button mr={2} variant="contained" color="primary">
            Process All
          </Button>
        </CardContent>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Reference Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={ProcessOrdNbr}
                  onChange={(newValue) => {
                    setProcessOrdNbr(ProcessOrdNbr);
                  }}
                  style={{ width: "70%" }}
                />
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={ProcessOrdDate}
                  onChange={(newValue) => {
                    setProcessOrdDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  name="BatchNbr"
                  label="Batch Nbr"
                  style={{ width: "70%" }}
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <DatePicker
                  label="Start Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={FilterStartDate}
                  onChange={(newValue) => {
                    setFilterStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="End Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={FilterEndDate}
                  onChange={(newValue) => {
                    setFilterEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <DatePicker
                  label="Shipment Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={ShipmentDate}
                  onChange={(newValue) => {
                    setShipmentDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  disabled
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  label="Category"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={Category}
                  onChange={(newValue) => {
                    setCategory(Category);
                  }}
                  style={{ width: "70%" }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  label="Customer"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={Customer}
                  onChange={(newValue) => {
                    setCustomer(Customer);
                  }}
                  style={{ width: "70%" }}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={GenerateDate}
                      onChange={handleGenerateDate}
                    />
                  }
                  label="Auto Generate Date"
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
