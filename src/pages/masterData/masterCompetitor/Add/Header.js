import { Add, Delete, Refresh, Reply, Save } from "@material-ui/icons";
import QrCodeScannerIcon from "@material-ui/icons/QrCodeScanner";
import SearchIcon from "@material-ui/icons/Search";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

const columnsProductGroup = [
  {
    field: "id",
    headerName: "ProductGroupID",
    width: 200,
  },
  {
    field: "text",
    headerName: "Description",
    width: 200,
  },
];

const columnsProductPrincipal = [
  {
    field: "id",
    headerName: "ProductPrincipalID",
    width: 200,
  },
  {
    field: "text",
    headerName: "Description",
    width: 200,
  },
];

const columnsProductKelompok = [
  {
    field: "id",
    headerName: "ProductKelompokID",
    width: 200,
  },
  {
    field: "text",
    headerName: "Description",
    width: 200,
  },
];

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [NoBPOM, setNoBPOM] = useState("");
  const [CPItem, setCPItem] = useState("");
  const [CPBrand, setCPBrand] = useState("");
  const [JenisItem, setJenisItem] = useState("");
  const [BranchID, setBranchID] = useState("");
  const [DescBPOM, setDescBPOM] = useState("");

  const [TempTipe1Group, setTempTipe1Group] = useState([]);
  const [Tipe1Group, setTipe1Group] = useState([]);
  const [TempTipe2Principal, setTempTipe2Principal] = useState([]);
  const [Tipe2Principal, setTipe2Principal] = useState([]);
  const [TempTipe3Kelompok, setTempTipe3Kelompok] = useState([]);
  const [Tipe3Kelompok, setTipe3Kelompok] = useState([]);

  const [OpenProductGroup, setOpenProductGroup] = useState(false);
  const [OpenProductPrincipal, setOpenProductPrincipal] = useState(false);
  const [OpenProductKelompok, setOpenProductKelompok] = useState(false);

  const [DataProductGroup, setDataProductGroup] = useState([]);
  const [DataProductPrincipal, setDataProductPrincipal] = useState([]);
  const [DataProductKelompok, setDataProductKelompok] = useState([]);

  const [RowTipe1Group, setRowTipe1Group] = useState([]);
  const [RowTipe2Principal, setRowTipe2Principal] = useState([]);
  const [RowTipe3Kelompok, setRowTipe3Kelompok] = useState([]);

  const history = useNavigate();

  const handleSave = async () => {
    try {
      const payload = {
        noBPOM: NoBPOM,
        cpItem: CPItem,
        cpBrand: CPBrand,
        jenisItem: JenisItem,
        descBPOM: DescBPOM,
        branchID: BranchID,
        screenID: "SAC300003",
        type1Group: Tipe1Group,
        tipe2Principal: Tipe2Principal,
        tipe3Kelompok: Tipe3Kelompok,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Add`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              history(`/master-data/master-competitor/`);
            }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataProductGroup();
  }, []);

  useEffect(() => {
    getDataProductPrincipal();
  }, [Tipe1Group]);

  useEffect(() => {
    getDataProductKelompok();
  }, [Tipe2Principal]);

  const getDataProductGroup = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/master/ProductGroup",
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataProductGroup(response.data);
            setRowTipe1Group(response.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getDataProductPrincipal = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup/Principal/${Tipe1Group}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataProductPrincipal(response.data);
            setRowTipe2Principal(response.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getDataProductKelompok = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup/Kelompok/${Tipe2Principal}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataProductKelompok(response.data);
            setRowTipe3Kelompok(response.data);
          }
        })
        .catch(function (error) {
          // handle error
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
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Master Data Competitor
        </Typography>
        <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
          <IconButton
            component="span"
            onClick={() => history("/master-data/master-competitor")}
          >
            <Reply />
          </IconButton>
          <IconButton
            component="span"
            disabled={
              NoBPOM == "" ||
              CPItem == "" ||
              CPBrand == "" ||
              JenisItem == "" ||
              BranchID == "" ||
              Tipe1Group == "" ||
              Tipe2Principal == ""
            }
            onClick={handleSave}
          >
            <Save />
          </IconButton>
          <IconButton component="span" onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
          <IconButton component="span">
            <Add />
          </IconButton>
          <IconButton component="span">
            <Delete />
          </IconButton>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                name="NoBPOM"
                label="No BPOM"
                value={NoBPOM}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setNoBPOM(e.target.value);
                }}
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Nama Produk"
                value={CPItem}
                fullWidth
                required
                onChange={(e) => {
                  setCPItem(e.target.value);
                }}
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Brand"
                value={CPBrand}
                required
                onChange={(e) => {
                  setCPBrand(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Product Group"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={TempTipe1Group}
                onClick={() => {
                  setTipe1Group(TempTipe1Group);
                  setOpenProductGroup(true);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Product Principal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={TempTipe2Principal}
                onClick={() => {
                  setTipe2Principal(TempTipe2Principal);
                  setOpenProductPrincipal(true);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Product Kelompok"
                value={TempTipe3Kelompok}
                onClick={() => {
                  setTipe3Kelompok(TempTipe3Kelompok);
                  setOpenProductKelompok(true);
                }}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                label="Jenis"
                value={JenisItem}
                required
                onChange={(e) => {
                  setJenisItem(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                label="Branch"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={BranchID}
                onChange={(e) => {
                  setBranchID(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-multiline-static"
                margin="dense"
                fullwidth={true}
                multiline
                label="Description"
                value={DescBPOM}
                onChange={(e) => {
                  setDescBPOM(e.target.value);
                }}
                rows={3}
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
      <Dialog
        open={OpenProductGroup}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setOpenProductGroup(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select ProductGroup</DialogTitle>
        <DialogContent>
          <DialogContentText>ProductGroup List</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={RowTipe1Group}
                getRowId={(row) => row.CustID}
                columns={columnsProductGroup}
                pageSize={5}
                hideFooter={true}
                rowsPerPageOptions={[5]}
                selectionModel={Tipe1Group}
                disableMultipleSelection={true}
                onSelectionModelChange={(newSelection) => {
                  console.log(newSelection);
                  setTipe1Group(newSelection);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenProductGroup(false);
              setTipe1Group(TempTipe1Group);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenProductGroup(false);
              setTempTipe1Group(Tipe1Group);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={OpenProductPrincipal}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setOpenProductPrincipal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Select ProductPrincipal
        </DialogTitle>
        <DialogContent>
          <DialogContentText>ProductPrincipal List</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={RowTipe2Principal}
                getRowId={(row) => row.CustID}
                columns={columnsProductPrincipal}
                pageSize={5}
                hideFooter={true}
                rowsPerPageOptions={[5]}
                selectionModel={Tipe2Principal}
                disableMultipleSelection={true}
                onSelectionModelChange={(newSelection) => {
                  console.log(newSelection);
                  setTipe2Principal(newSelection);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenProductPrincipal(false);
              setTipe2Principal(TempTipe2Principal);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenProductPrincipal(false);
              setTempTipe2Principal(Tipe2Principal);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={OpenProductKelompok}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setOpenProductKelompok(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select ProductKelompok</DialogTitle>
        <DialogContent>
          <DialogContentText>ProductKelompok List</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={RowTipe3Kelompok}
                getRowId={(row) => row.CustID}
                columns={columnsProductKelompok}
                pageSize={5}
                hideFooter={true}
                rowsPerPageOptions={[5]}
                selectionModel={Tipe3Kelompok}
                disableMultipleSelection={true}
                onSelectionModelChange={(newSelection) => {
                  console.log(newSelection);
                  setTipe3Kelompok(newSelection);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenProductKelompok(false);
              setTipe3Kelompok(TempTipe3Kelompok);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenProductKelompok(false);
              setTempTipe3Kelompok(Tipe3Kelompok);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
