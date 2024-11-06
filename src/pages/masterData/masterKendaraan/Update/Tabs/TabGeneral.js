import { DatePicker, TabPanel } from "@mui/lab";
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Select,
} from "@mui/material";
import { spacing } from "@mui/system";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components/macro";
import CbData from "../../../../../components/shared/dropdown";

const Paper = styled(MuiPaper)(spacing);
const TextField = styled(MuiTextField)(spacing);

TabGeneral.propTypes = {
  BeratKendaraan: PropTypes.any,
  setBeratKendaraan: PropTypes.func,
  KapasitasWeight: PropTypes.any,
  setKapasitasWeight: PropTypes.func,
  KapasitasVolume: PropTypes.any,
  setKapasitasVolume: PropTypes.func,
  TanggalSTNK: PropTypes.any,
  setTanggalSTNK: PropTypes.func,
  TanggalKIR: PropTypes.any,
  setTanggalKIR: PropTypes.func,
  TanggalPembuatan: PropTypes.any,
  setTanggalPembuatan: PropTypes.func,
  TipeStorage: PropTypes.any,
  setTipeStorage: PropTypes.func,
  AssetID: PropTypes.any,
  setAssetID: PropTypes.func,
  Loading: PropTypes.bool,
};

export default function TabGeneral(props) {
  const {
    BeratKendaraan,
    setBeratKendaraan,
    KapasitasWeight,
    setKapasitasWeight,
    KapasitasVolume,
    setKapasitasVolume,
    TanggalKIR,
    setTanggalKIR,
    TanggalSTNK,
    setTanggalSTNK,
    TanggalPembuatan,
    setTanggalPembuatan,
    TipeStorage,
    setTipeStorage,
    AssetID,
    setAssetID,
  } = props;
  return (
    <TabPanel value="1">
      {props.Loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            Loading
          </Grid>
        </Grid>
      ) : (
        <Paper>
          {/* <div style={{ height: 300, width: "100%", marginTop: "10px" }}> */}
          <Grid container spacing={3} sm={12} my={2}>
            <Grid item md={4} xs={12}>
              <TextField
                name="BeratKendaraan"
                label="Berat Kendaraan (KG)"
                type="number"
                pattern="[0-9]*"
                value={BeratKendaraan}
                fullWidth
                variant="outlined"
                disabled={false}
                onChange={(e) => setBeratKendaraan(e.target.value)}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="KapasitasKendaraan"
                label="Kapasitas Kendaraan (Weight)"
                value={KapasitasWeight}
                type="number"
                fullWidth
                variant="outlined"
                disabled={false}
                onChange={(e) => setKapasitasWeight(e.target.value)}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="KapasitasKendaraan"
                label="Kapasitas Kendaraan (Volume)"
                type="number"
                value={KapasitasVolume}
                fullWidth
                variant="outlined"
                disabled={false}
                onChange={(e) => setKapasitasVolume(e.target.value)}
                my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Tanggal STNK"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={TanggalSTNK}
                onChange={(value) => {
                  setTanggalSTNK(value);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Tanggal KIR"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={TanggalKIR}
                onChange={(value) => {
                  setTanggalKIR(value);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Tanggal Pembuatan"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={TanggalPembuatan}
                onChange={(value) => {
                  setTanggalPembuatan(value);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%", marginTop: "7px" }}>
                <InputLabel id="status-kendaraan">Tipe Storage</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Tipe Storage"
                  defaultValue={TipeStorage}
                  value={!TipeStorage ? "loading" : TipeStorage}
                  onChange={(e) => setTipeStorage(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="Dry">Dry</MenuItem>
                  <MenuItem value="Frozen">Frozen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%", marginTop: "7px" }}>
                <CbData
                  // required
                  source={`${process.env.REACT_APP_DOMAIN_API}/FixedAssetReps/DropDown/FixedAsset`}
                  label="Asset ID"
                  id="AssetID"
                  defaultValue={AssetID}
                  desc="Description"
                  value={!AssetID ? "loading" : AssetID}
                  onChange={(newValue) => {
                    setAssetID(newValue);
                    // console.log(menuID);
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          {/* </div> */}
        </Paper>
      )}
    </TabPanel>
  );
}
