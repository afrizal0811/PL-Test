import SearchIcon from "@mui/icons-material/Search";
import {
  CardContent,
  FormHelperText,
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
  const [BatchingRefNbr, setBatchingRefNbr] = useState("");

  return (
    <div>
      <Card mb={3}>
        <CardContent>
          <Button mr={2} variant="contained" color="primary">
            Save
          </Button>
          <Button mr={2} variant="contained" color="primary">
            Cancel
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Reset
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Set Qty
          </Button>
          <Button mr={2} variant="contained" color="error" disabled>
            Remove
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Unpick
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Unfull Pick
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Confirm Pick
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Unpack
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Unfull Pack
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Confirm Pack
          </Button>
          <Button mr={2} variant="contained" color="primary" disabled>
            Confirm Shipment
          </Button>
        </CardContent>
        <CardContent>
          <Grid container spacing={12}>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField id="outlined-helperText" label="Scan" fullWidth />
              </Paper>
              <Paper mt={3}>
                <TextField name="Status" label="Status" fullWidth disabled />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <TextField
                  label="Batching Ref Nbr"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={BatchingRefNbr}
                  onChange={(newValue) => {
                    setBatchingRefNbr(BatchingRefNbr);
                  }}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper mt={3}>
                <FormHelperText id="my-helper-text">
                  Pick Mode Is In Use
                </FormHelperText>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
