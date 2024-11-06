import { spacing } from "@material-ui/system";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
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

export default function Header() {
  const [CustomerID, setCustomerID] = useState("");
  const [TglPenagihan, setTglPenagihan] = useState(new Date());
  const [PasarAllow, setPasarAllow] = useState(false);

  const handlePasarAllow = (event) => {
    setPasarAllow(event.target.checked);
  };

  return (
    <Card mb={3}>
      <CardContent>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField name="JenisPenagihan" label="Jenis Tagihan" />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <DatePicker
                label="Tanggal Penagihan"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={TglPenagihan}
                renderInput={(params) => <TextField {...params} />}
                disabled
              />
            </Paper>
            <Paper mt={3}>
              <TextField name="HariTagih" label="Hari" />
            </Paper>
            <Paper mt={3}>
              <TextField name="UsrAdminPiutang" label="Admin Piutang" />
            </Paper>
            <Paper mt={3}>
              <TextField
                name="CustomerID"
                label="Nama Customer"
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={CustomerID}
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormControlLabel
                control={
                  <Checkbox checked={PasarAllow} onChange={handlePasarAllow} />
                }
                label="Pasar (Semua Jatuh Tempo)"
              />
            </Paper>
            <Paper mt={3}>
              <TextField name="MingguTagih" label="Minggu" />
            </Paper>
            <Paper mt={3}>
              <TextField name="UsrKolektor" label="Kolektor" />
            </Paper>
            <Paper mt={3}>
              <TextField
                name="KetPenagihan"
                label="Ket. / Ship To"
                margin="dense"
                fullwidth={true}
                multiline
                rows={3}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
