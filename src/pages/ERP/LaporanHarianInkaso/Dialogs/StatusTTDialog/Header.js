import { Clear } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { DatePicker } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  Paper as MuiPaper,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header() {
  const [TglKembali, setTglKembali] = useState(new Date());
  const [cashAccount, setCashAccount] = useState({
    id: "1102401",
    desc: "Piutang Giro Lokal",
  });
  const [entryType, setEntryType] = useState("CEK/GIRO");
  const [uangDiterima, setUangDiterima] = useState("Rp. 150.000");
  const [keterangan, setketerangan] = useState("");
  const [DetKet, setDetKet] = useState("");

  return (
    <Card mb={3}>
      <CardContent>
        <Grid container spacing={6}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Tanggal Kembali</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <DatePicker
                inputFormat={"dd/MM/yyyy"}
                value={TglKembali}
                renderInput={(params) => <TextField {...params} />}
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Tanggal TT</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <DatePicker
                inputFormat={"dd/MM/yyyy"}
                value={TglKembali}
                renderInput={(params) => <TextField {...params} />}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Keterangan</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              {/* <Select
                fullWidth
                labelId="demo-simple-select-label"
                label="Keterangan"
                id="demo-simple-select"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={"SO"}>SO</MenuItem>
                <MenuItem value={"SE"}>SE</MenuItem>
                <MenuItem value={"SS"}>SS</MenuItem>
              </Select> */}
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Minggu"
                  value={keterangan}
                  onChange={(e) => setketerangan(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Draft"}>Draft</MenuItem>
                  <MenuItem value={"On Progress"}>On Progress</MenuItem>
                  <MenuItem value={"Open"}>Open</MenuItem>
                  <MenuItem value={"TT"}>TT</MenuItem>
                  <MenuItem value={"TT Transfer"}>TT Transfer</MenuItem>
                  <MenuItem value={"Transfer"}>Transfer</MenuItem>
                  <MenuItem value={"Giro"}>Giro</MenuItem>
                  <MenuItem value={"TT Nagih"}>TT Nagih</MenuItem>
                  <MenuItem value={"Tgl. Terbit TT"}>Tgl. Terbit TT</MenuItem>
                  <MenuItem value={"Ket/No. TT"}>Ket/No. TT</MenuItem>
                  <MenuItem value={"Belum Tertagih"}>Belum Tertagih</MenuItem>
                  <MenuItem value={"Tidak Bayar"}>Tidak Bayar</MenuItem>
                  <MenuItem value={"Bayar"}>Bayar</MenuItem>
                  <MenuItem value={"Sebagian"}>Sebagian</MenuItem>
                  <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Detil Keterangan</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              {keterangan == "Tgl. Terbit TT" ? (
                <>
                  <DatePicker
                    inputFormat={"dd/MM/yyyy"}
                    value={DetKet}
                    onChange={(e) => {
                      setDetKet(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </>
              ) : (
                <>
                  <TextField
                    type="text"
                    disabled
                    value={DetKet}
                    onChange={(e) => {
                      setDetKet(e.target.value);
                    }}
                    fullWidth
                  />
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Cash Account</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                fullWidth
                value={
                  cashAccount == ""
                    ? " "
                    : cashAccount?.id + " - " + cashAccount?.desc
                }
                // disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {cashAccount ? (
                        <>
                          <IconButton
                            onClick={() => setCashAccount("")}
                            // disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                          // onClick={() => setOpenAP(true)}
                          // disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Uang Diterima</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                value={uangDiterima}
                type="text"
                disabled
                // onChange={(e) => {
                //   setBranch(e.target.value);
                // }}
                fullWidth
              />
            </Paper>
          </Grid>
        </Grid>
        {keterangan == "Closed" && cashAccount.desc == "Piutang Giro Lokal" ? (
          <>
            <Grid container spacing={6}>
              <Grid item md={3}>
                <Paper mt={3}>
                  <FormLabel>Entry Type</FormLabel>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper mt={3}>
                  <TextField
                    fullWidth
                    value={entryType}
                    // disabled={Loading}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}

        <Grid container spacing={6}>
          <Grid item md={3}>
            <Paper mt={3}>
              <FormLabel>Document Ref.</FormLabel>
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                type="text"
                disabled
                // onChange={(e) => {
                //   setBranch(e.target.value);
                // }}
                fullWidth
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
