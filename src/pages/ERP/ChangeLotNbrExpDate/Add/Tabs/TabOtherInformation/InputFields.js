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
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function InputFields() {
  const [ReceiptNbr, setReceiptNbr] = useState("");
  const [IssueNbr, setIssueNbr] = useState("");

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Receipt Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={ReceiptNbr}
                  onChange={(newValue) => {
                    setReceiptNbr(ReceiptNbr);
                  }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  label="Issue Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={IssueNbr}
                  onChange={(newValue) => {
                    setIssueNbr(IssueNbr);
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
