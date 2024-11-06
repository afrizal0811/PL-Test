import { spacing } from "@material-ui/system";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import React from "react";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header({ searchParams, setSearchParams }) {
  return (
    <div>
      <Card mb={3} mt={5}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item md={3}>
              <Paper mt={3}>
                <DatePicker
                  label="From Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={searchParams.fromDate}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(newValue) => {
                    setSearchParams({
                      ...searchParams,
                      fromDate: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <DatePicker
                  label="To Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={searchParams.toDate}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(newValue) => {
                    setSearchParams({
                      ...searchParams,
                      toDate: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
