import { spacing } from "@material-ui/system";
import SearchIcon from "@mui/icons-material/Search";
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
