import React from "react";
import PropTypes from "prop-types";
import { TabPanel, DatePicker } from "@material-ui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper as MuiPaper,
  Select,
  TextField as MuiTextField,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import CbBranch from "../../../../../components/shared/cbBranch";
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
      <Paper>
        {/* <div style={{ height: 400, width: "100%", marginTop: "10px" }}> */}
        <Grid container spacing={3} sm={12} my={2}>
          <Grid item md={4} xs={12}>
            <TextField
              name="BeratKendaraan"
              label="Berat Kendaraan (KG)"
              value={BeratKendaraan}
              type="number"
              fullWidth
              variant="outlined"
              disabled={false}
              onChange={(e) => setBeratKendaraan(e.target.value)}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
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
              value={TanggalSTNK}
              inputFormat={"dd/MM/yyyy"}
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
                value={TipeStorage}
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
                value={AssetID}
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
    </TabPanel>
  );
}
