import React from "react";
import {
  Paper as MuiPaper,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header() {
  return (
    <Card mb={3}>
      <CardContent>
        <Grid container mb={8} spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel component="h1">Lingkup Data Dipindah:</FormLabel>
              <RadioGroup
                aria-label="jumlah-LHI"
                defaultValue="single"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="single"
                  control={<Radio />}
                  label="Terpilih"
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
              <FormLabel>Kolektor</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
