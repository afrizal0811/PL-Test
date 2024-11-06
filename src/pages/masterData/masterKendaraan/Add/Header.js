import { spacing } from "@material-ui/system";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  TextField as MuiTextField,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import Tabs from "./Tabs/index";

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [StatusKendaraan, setStatusKendaraan] = useState("Active");
  const [StatusMilik, setStatusMilik] = useState("Milik");
  const [branch, setBranch] = useState(getBrach());
  const [IDKendaraan, setIDKendaraan] = useState("");
  const [NamaKendaraan, setNamaKendaraan] = useState("");
  const [NoPolisi, setNoPolisi] = useState("");
  const history = useNavigate();

  //general
  const [TanggalKIR, setTanggalKIR] = useState("");
  const [BeratKendaraan, setBeratKendaraan] = useState(0);
  const [KapasitasWeight, setKapasitasWeight] = useState(0);
  const [KapasitasVolume, setKapasitasVolume] = useState(0);
  const [TanggalSTNK, setTanggalSTNK] = useState("");
  const [TanggalPembuatan, setTanggalPembuatan] = useState("");
  const [TipeStorage, setTipeStorage] = useState("");
  const [AssetID, setAssetID] = useState("");

  const [Driver, setDriver] = useState([]);
  const [Zona, setZona] = useState([]);

  const handleChangeStatus = (event) => {
    setStatusKendaraan(event.target.value);
  };

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const arrGeneral = [
        {
          beratKendaraan: BeratKendaraan,
          kapasitasWeight: KapasitasWeight,
          kapasitasVolume: KapasitasVolume,
          tanggalKIR: TanggalKIR,
          tanggalSTNK: TanggalSTNK,
          tahunPembuatan: TanggalPembuatan,
          tipeStorage: TipeStorage,
          assetID: AssetID,
        },
      ];
      let arrDriver = [];
      arrDriver = Driver.map((value) => {
        return {
          idDriver: value.employeeID,
          namaDriver: value.employeeName,
          email: value.email,
          contact: value.contact,
        };
      });
      let arrZona = [];
      arrZona = Zona.map((value) => {
        return {
          zoneID: value.zoneID,
          description: value.description,
          branch: value.branch,
        };
      });
      const payload = {
        // idKendaraan: IDKendaraan,
        screenNo: "SAW300008",
        namaKendaraan: NamaKendaraan,
        noPolisi: NoPolisi,
        kepemilikan: StatusMilik,
        branchID: branch,
        statusKendaraan: StatusKendaraan,
        kendaraanGeneralLineRep: arrGeneral,
        kendaraanDriverLineRep: arrDriver,
        kendaraanZonaLineRep: arrZona,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);
      console.log("ini didalam handleSave, isi dari Driver", Driver);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/KendaraanReps/CreateMasterKendaraan",
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              window.location.href = `/master-data/master-kendaraan`;
            }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/master-kendaraan")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => handleSave()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/add-kendaraan")}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          // onClick={onSumbitHandler}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Kendaraan
          </Typography>
          <Grid container spacing={3} md={8} mt={3}>
            <Grid item md={6} xs={12}>
              <TextField
                name="IDKendaraan"
                label="ID Kendaraan"
                value={IDKendaraan}
                required
                // color={IDKendaraan === "" ? "warning" : ""}
                // focused={IDKendaraan === "" ? true : false}
                fullWidth
                m={2}
                variant="outlined"
                disabled
                onChange={(e) => setIDKendaraan(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* {IDKendaraan === "" && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )} */}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="NamaKendaraan"
                label="Nama Kendaraan"
                value={NamaKendaraan}
                fullWidth
                m={2}
                variant="outlined"
                disabled={false}
                onChange={(e) => setNamaKendaraan(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="NoPolisi"
                label="No Polisi"
                value={NoPolisi}
                fullWidth
                m={2}
                variant="outlined"
                disabled={false}
                onChange={(e) => setNoPolisi(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl style={{ width: "100%", margin: "7px" }}>
                <InputLabel id="status-kendaraan">Status Kendaraan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Status Kendaraan"
                  value={StatusKendaraan}
                  onChange={handleChangeStatus}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl style={{ width: "100%", margin: "7px" }}>
                <InputLabel id="status-kendaraan">
                  Status Kepemilikan
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Status Kepemilikan"
                  value={StatusMilik}
                  onChange={(e) => setStatusMilik(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Milik"}>Milik</MenuItem>
                  <MenuItem value={"Sewa"}>Sewa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              {/* <FormControl style={{ width: "100%", margin: "7px" }}>
                <CbBranch
                  // required
                  defaultValue={branch}
                  value={branch}
                  onChange={(newValue) => {
                    setBranch(newValue);
                    // console.log(menuID);
                  }}
                />
              </FormControl> */}
              <TextField
                name="Branch"
                label="Branch"
                value={branch}
                fullWidth
                m={2}
                variant="outlined"
                // disabled={false}
                // onChange={(e) => setNoPolisi(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Tabs
          NoPolisi={NoPolisi}
          StatusMilik={StatusMilik}
          StatusKendaraan={StatusKendaraan}
          NamaKendaraan={NamaKendaraan}
          IDKendaraan={IDKendaraan}
          setDriver={(e) => setDriver(e)}
          setZona={(e) => setZona(e)}
          setAssetID={(e) => setAssetID(e)}
          setTipeStorage={(e) => setTipeStorage(e)}
          setTanggalPembuatan={(e) => setTanggalPembuatan(e)}
          setTanggalSTNK={(e) => setTanggalSTNK(e)}
          setKapasitasVolume={(e) => setKapasitasVolume(e)}
          setKapasitasWeight={(e) => setKapasitasWeight(e)}
          setBeratKendaraan={(e) => setBeratKendaraan(e)}
          setTanggalKIR={(e) => setTanggalKIR(e)}
          TanggalKIR={TanggalKIR}
          AssetID={AssetID}
          TipeStorage={TipeStorage}
          TanggalPembuatan={TanggalPembuatan}
          TanggalSTNK={TanggalSTNK}
          KapasitasVolume={KapasitasVolume}
          KapasitasWeight={KapasitasWeight}
          BeratKendaraan={BeratKendaraan}
        />
      </Card>
    </>
  );
}

export default Header;
