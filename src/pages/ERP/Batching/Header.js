import React, { useState } from "react";
import styled from "styled-components/macro";
import {
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import { DatePicker } from "@material-ui/lab";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [RoutingNbr, setRoutingNbr] = useState("");
  const [BTRefNbr, setBTRefNbr] = useState("");
  const [BTDate, setBTDate] = useState(new Date());
  const [Type, setType] = useState("");

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Batching Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={BTRefNbr}
                  onChange={(newValue) => {
                    setBTRefNbr(BTRefNbr);
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
                  value={BTDate}
                  onChange={(newValue) => {
                    setBTDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Routing Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={RoutingNbr}
                  onChange={(newValue) => {
                    setRoutingNbr(RoutingNbr);
                  }}
                  style={{ width: "70%" }}
                />
              </Paper>
              <Paper mt={3}>
                <FormControl style={{ width: "70%" }}>
                  <InputLabel id="demo-simple-select-autowidth-label">
                    Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={Type}
                    onChange={handleType}
                    label="Type"
                  >
                    <MenuItem value="Dry">Dry</MenuItem>
                    <MenuItem value="Frozen">Frozen</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
