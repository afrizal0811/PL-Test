import { Add, Delete, Refresh, Reply, Save } from "@mui/icons-material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SearchIcon from "@mui/icons-material/Search";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import QrBarcodeScanner from "../../../../components/QrBarcodeScanner";
import CbBranch from "../../../../components/shared/cbBranch";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import ProductGroupPopup from "./ProductGroupPopup";
import ProductKelompokPopup from "./ProductKelompokPopup";
import ProductPrincipalPopup from "./ProductPrincipalPopup";

const TextField = styled(MuiTextField)(spacing);

export default function Header() {
  const { id } = useParams();
  const [NoBPOM, setNoBPOM] = useState("");
  const [CPItem, setCPItem] = useState("");
  const [CPBrand, setCPBrand] = useState("");
  const [Tipe1Group, setTipe1Group] = useState("");
  const [Tipe2Principal, setTipe2Principal] = useState("");
  const [Tipe3Kelompok, setTipe3Kelompok] = useState("");
  const [JenisItem, setJenisItem] = useState("");
  const [BranchID, setBranchID] = useState("");
  const [DescBPOM, setDescBPOM] = useState("");
  const [Header, setHeader] = useState({});
  const [err, seterr] = useState(false);

  const [PrincipalProdukEdit, setPrincipalProdukEdit] = useState(false);

  const [openModalPG, setopenModalPG] = useState(false);
  const [openModalPP, setopenModalPP] = useState(false);
  const [openModalPK, setopenModalPK] = useState(false);
  const [openScanner, setOpenScanner] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/${id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setHeader(resdata);
            setNoBPOM(resdata.noBPOM);
            setCPItem(resdata.cpItem);
            setCPBrand(resdata.cpBrand);
            setJenisItem(resdata.jenisItem);
            setDescBPOM(resdata.descBPOM);
            setBranchID(resdata.branchID);
            setTipe1Group(resdata.type1Group);
            setTipe2Principal({
              id: resdata.tipe2Principal,
              text: resdata.tipe2Desc,
            });
            setTipe3Kelompok({
              id: resdata.tipe3Kelompok,
              text: resdata.tipe3Desc,
            });
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
      // setLoading(false);
    }
  };

  const createData = async () => {
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
        tipe2Principal: Tipe2Principal.id,
        tipe3Kelompok: Tipe3Kelompok.id,
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
              // history(`/master-data/master-competitor/`);
              history(`/master-data/update-competitor/${response.data.refNbr}`);
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          if (!!error.response.data.errorMessage) {
            Swal.fire({
              title: "There was an error!",
              text: error.response.data.errorMessage,
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, Restore",
            }).then((result) => {
              if (result.value) {
                console.log("ini di swal delete, result = ", result);
                console.log("ini di swal delete, id = ", id);
                restore(NoBPOM);
              }
            });
          } else {
            NotifyError("There was an error!", error);
          }
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const restore = async (id) => {
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Restore/${id}/screenId`,
          {},
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiRestore");
            setTimeout(() => {
              window.location.replace(`/master-data/update-competitor/${id}`);
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

  const editData = async () => {
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
        tipe2Principal: Tipe2Principal.id,
        tipe3Kelompok: Tipe3Kelompok.id,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Update/${id}`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiUbah");
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

  const onSumbitHandler = async () => {
    if (id === undefined) {
      createData();
    } else {
      editData();
    }
  };

  const deleteData = async (id) => {
    axios
      .delete(
        `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Delete/${id}/screenId`,
        GetConfig()
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status === 200 || response.status === 204) {
          NotifySuccess("success", "Data Telah DiHapus");
          setTimeout(() => {
            history("/master-data/master-competitor");
          }, 800);
        }
      })
      .catch(function (error) {
        // handle error
        NotifyError("There was an error!", error);
        console.log(error);
      });
  };

  const onSuccessScanner = (result) => {
    setNoBPOM(result);
  };

  // ini untuk pop up notifikasi
  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const validtext = new RegExp("^[a-zA-Z0-9+_.-]{1,100}$");

  return (
    <>
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
            NoBPOM === "" ||
            CPItem === "" ||
            CPBrand === "" ||
            JenisItem === "" ||
            BranchID === "" ||
            Tipe1Group === "" ||
            !Tipe2Principal.id ||
            !Tipe3Kelompok.id
          }
          onClick={() => onSumbitHandler()}
        >
          <Save />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          onClick={() => {
            history("/master-data/add-competitor");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          onClick={() => notifyConfirm(id)}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={4} md={8}>
            <Grid item md={6} xs={12}>
              <TextField
                name="NoBPOM"
                label="No BPOM"
                required
                color={!NoBPOM || err ? "warning" : ""}
                focused={!NoBPOM || err ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        onClick={() => {
                          if (id === undefined || !id)
                            setOpenScanner(!openScanner);
                        }}
                      >
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={NoBPOM}
                onChange={(e) => {
                  if (!validtext.test(e.target.value)) {
                    seterr(true);
                  } else {
                    seterr(false);
                  }
                  console.log("regex", validtext.test(e.target.value));
                  setNoBPOM(e.target.value);
                }}
                disabled={id !== undefined || id}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="namaproduk"
                label="Nama Produk"
                color={!CPItem ? "warning" : ""}
                focused={!CPItem ? true : false}
                required
                value={CPItem}
                onChange={(e) => {
                  setCPItem(e.target.value);
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-brand"
                label="Brand"
                color={!CPBrand ? "warning" : ""}
                focused={!CPBrand ? true : false}
                required
                value={CPBrand}
                onChange={(e) => {
                  setCPBrand(e.target.value);
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-group"
                label="Product Group"
                required
                value={Tipe1Group}
                onClick={() => setopenModalPG(true)}
                color={!Tipe1Group ? "warning" : ""}
                focused={!Tipe1Group ? true : false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="ProductPrincipal"
                label="Product Principal"
                required
                value={Tipe2Principal.text}
                onClick={() => setopenModalPP(true)}
                color={
                  Tipe2Principal.id === "" || !Tipe2Principal.id
                    ? "warning"
                    : ""
                }
                focused={
                  Tipe2Principal.id === "" || !Tipe2Principal.id ? true : false
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                disabled={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-kelompok"
                label="Product Kelompok"
                value={Tipe3Kelompok.text}
                onClick={() => setopenModalPK(true)}
                required
                color={
                  !Tipe3Kelompok.id || Tipe3Kelompok.id === "" ? "warning" : ""
                }
                focused={
                  !Tipe3Kelompok.id || Tipe3Kelompok.id === "" ? true : false
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                id="outlined-jenis"
                label="Jenis"
                color={JenisItem === "" ? "warning" : ""}
                focused={JenisItem === "" ? true : false}
                required
                value={JenisItem}
                onChange={(e) => {
                  setJenisItem(e.target.value);
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <CbBranch
                required
                defaultValue={BranchID}
                value={BranchID}
                onChange={(newValue) => {
                  setBranchID(newValue);
                }}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProductGroupPopup
        openModalPG={openModalPG}
        setOpenModalPG={(e) => setopenModalPG(e)}
        ProductGroupID={Tipe1Group}
        setPrincipalProdukEdit={(e) => setPrincipalProdukEdit(e)}
        setProductGroupID={(e) => setTipe1Group(e)}
      />
      <ProductPrincipalPopup
        ProductGroupID={Tipe1Group}
        openModalPP={openModalPP}
        setOpenModalPP={(e) => setopenModalPP(e)}
        ProductPrincipalID={Tipe2Principal?.id}
        setProductPrincipalID={(e) => {
          setTipe2Principal(e);
          // console.log("change", e);
        }}
        setPrincipalProdukEdit={(e) => setPrincipalProdukEdit(e)}
      />
      <ProductKelompokPopup
        ProductPrincipalID={Tipe2Principal.id}
        PrincipalProdukEdit={PrincipalProdukEdit}
        openModalPK={openModalPK}
        setOpenModalPK={(e) => setopenModalPK(e)}
        ProductKelompokID={Tipe3Kelompok?.id}
        Tipe1Group={Tipe1Group}
        setProductKelompokID={(e) => setTipe3Kelompok(e)}
      />
      <QrBarcodeScanner
        openScanner={openScanner}
        setOpenScanner={setOpenScanner}
        onSuccess={onSuccessScanner}
      />
    </>
  );
}
