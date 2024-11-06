import { spacing } from "@material-ui/system";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header() {
  const [TTFChecked, setTTFChecked] = useState(false);
  const [PeriodeChecked, setPeriodeChecked] = useState(false);
  const [KolektorChecked, setKolektorChecked] = useState(false);
  const [AdminChecked, setAdminChecked] = useState(false);

  const handleTTFChecked = (event) => {
    setTTFChecked(event.target.checked);
  };
  const handlePeriodeChecked = (event) => {
    setPeriodeChecked(event.target.checked);
  };
  const handleKolektorChecked = (event) => {
    setKolektorChecked(event.target.checked);
  };
  const handleAdminChecked = (event) => {
    setAdminChecked(event.target.checked);
  };

  return (
    <Card mb={3}>
      <CardContent>
        <Grid container mb={8} spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <RadioGroup
                aria-label="jumlah-LHI"
                defaultValue="single"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="No. 'SO0004' saja"
                />
                <FormControlLabel
                  value="multiple"
                  control={<Radio />}
                  label="2 Faktur dari 'GREENSMART'"
                />
              </RadioGroup>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormControlLabel
                control={
                  <Checkbox checked={TTFChecked} onChange={handleTTFChecked} />
                }
                label="TTF"
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={PeriodeChecked}
                    onChange={handlePeriodeChecked}
                  />
                }
                label="Periode"
              />
            </Paper>
            <Paper mt={3} style={{ visibility: "hidden" }}>
              <FormControlLabel control={<Checkbox />} label="hiddenlabel" />
            </Paper>
            <Paper mt={3} style={{ visibility: "hidden" }}>
              <FormControlLabel control={<Checkbox />} label="hiddenlabel" />
            </Paper>
            <Paper mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={KolektorChecked}
                    onChange={handleKolektorChecked}
                  />
                }
                label="Kolektor"
              />
            </Paper>
            <Paper mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={AdminChecked}
                    onChange={handleAdminChecked}
                  />
                }
                label="Admin"
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField />
            </Paper>
            <Paper mt={3}>
              <TextField />
            </Paper>
            <Paper mt={3}>
              <TextField />
            </Paper>
            <Paper mt={3}>
              <TextField />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField />
            </Paper>
            <Paper mt={3}>
              <TextField />
            </Paper>
            <Paper mt={3}>
              <TextField />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
