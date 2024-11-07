import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import BranchTab from "./BranchTab";
import PrincipalPopup from "./PrincipalPopup";
import PrincipalProdukPopup from "./PrincipalProdukPopup";
import ProductGroupPopup from "./ProductGroupPopup";
import ProdukKelompokPopup from "./ProdukKelompokPopup";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

const columnsPrincipal = [
  {
    field: "id",
    headerName: "Principal ID",
    width: 200,
  },
  {
    field: "text",
    headerName: "Description",
    width: 200,
  },
];

function Header() {
  const [loading, setLoading] = useState(false);
  const [PromoID, setPromoID] = useState("");
  const [principalID, setprincipalID] = useState("");
  const [ProductGroupID, setProductGroupID] = useState("");
  const [ProductPrincipalID, setProductPrincipalID] = useState("");
  const [ProductKelompokID, setProductKelompokID] = useState("");
  const [PrincipalProdukEdit, setPrincipalProdukEdit] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setstartDate] = useState(moment().format());
  const [dueDate, setdueDate] = useState(moment().format());
  const [status, setStatus] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalPG, setOpenModalPG] = React.useState(false);
  const [openModalPP, setOpenModalPP] = React.useState(false);
  const [openModalPK, setOpenModalPK] = React.useState(false);
  const [branch, setBranch] = useState("");
  const [lastbranch, setlastbranch] = useState("");

  useEffect(() => {
    if (id !== undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/Promo/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setPromoID(resdata.promoID);
            setDescription(resdata.promoDescr);
            setstartDate(resdata.startDate);
            setdueDate(resdata.dueDate);
            setStatus(resdata.active);
            setprincipalID(resdata.principalID.split(","));
            setProductGroupID(resdata.type1Group);
            setProductPrincipalID({
              id: resdata.tipe2Principal,
              text: resdata.tipe2Desc,
            });
            console.log("tipe3Kelompok", resdata.tipe3Kelompok);
            setProductKelompokID({
              id: resdata.tipe3Kelompok,
              text: resdata.tipe3Desc,
            });
            setBranch(resdata.promotionBranches);
            setlastbranch(resdata.promotionBranches);
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

  const createData = async () => {
    setLoading(true);
    try {
      const payload = {
        // PromoID: PromoID,
        promoDescr: description,
        startDate: startDate,
        dueDate: dueDate,
        active: status,
        principalID: principalID,
        type1Group: ProductGroupID,
        screenID: "SAC300001",
        tipe2Principal: ProductPrincipalID.id,
        tipe3Kelompok: ProductKelompokID.id,
        branchID: getBrach(),
        promotionBranches: branch,
      };
      console.log("branchget", getBrach());
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/Promo/Add",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data telah ditambah");
            setTimeout(() => {
              // window.location.href = `/master-data/master-promo`;
              window.location.href = `/master-data/master-promo/detail/${response.data.refNbr}`;
              // window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const editData = async () => {
    setLoading(true);
    try {
      const payload = {
        promoDescr: description,
        startDate: startDate,
        dueDate: dueDate,
        active: status,
        principalID: principalID.toString(),
        type1Group: ProductGroupID,
        screenID: "SAC300001",
        tipe2Principal: ProductPrincipalID.id,
        tipe3Kelompok: ProductKelompokID.id,
        branchID: getBrach(),
        promotionBranches: branch,
        // promotionBranches: branch.map((e) => {
        //   return { promoID: id, branchID: e, isLinked: true };
        // }),
      };
      console.log("payload", payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/Promo/Update/" + id,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data telah disimpan");
            setTimeout(() => {
              window.location.href = `/master-data/master-promo/detail/${id}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
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
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/Promo/Delete/" +
            id +
            "/screenID",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/master-data/master-promo`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

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

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/master-promo")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            ProductGroupID === "" ||
            principalID === "" ||
            branch?.toString() === "" ||
            ProductPrincipalID.id === "" ||
            ProductKelompokID.id === ""
          }
          onClick={() => onSumbitHandler()}
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
          onClick={() => {
            window.location.replace("/master-data/master-promo/add");
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
          <Grid container spacing={6} md={12} mt={3}>
            <Grid item md={6} xs={12}>
              <TextField
                name="PromoID"
                label="Promo ID"
                value={PromoID}
                // color={PromoID === "" ? "warning" : ""}
                // focused={PromoID === "" ? true : false}
                fullWidth
                required
                variant="outlined"
                // disabled={id !== undefined ? true : false}
                disabled
                onChange={(e) => setPromoID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* {PromoID === "" && (
              <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
            )} */}
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="description"
                label="Promo Description"
                value={description}
                fullWidth
                variant="outlined"
                disabled={false}
                style={{ width: "100%" }}
                onChange={(e) => setDescription(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="Principal"
                label="Principal"
                value={principalID}
                onClick={() => setOpenModal(true)}
                color={principalID === "" ? "warning" : ""}
                focused={principalID === "" ? true : false}
                fullWidth
                required
                variant="outlined"
                disabled={false}
                // onChange={(e) => setPrincipal(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="ProductGroup"
                label="Product Group"
                value={ProductGroupID}
                onClick={() => setOpenModalPG(true)}
                color={ProductGroupID === "" ? "warning" : ""}
                focused={ProductGroupID === "" ? true : false}
                fullWidth
                required
                variant="outlined"
                disabled={false}
                // onChange={(e) => setProductGroup(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="ProductPrincipal"
                label="Product Principal"
                value={ProductPrincipalID.text}
                onClick={() => setOpenModalPP(true)}
                color={ProductPrincipalID.id === "" ? "warning" : ""}
                focused={ProductPrincipalID.id === "" ? true : false}
                fullWidth
                required
                variant="outlined"
                disabled={false}
                // onChange={(e) => setProductGroup(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                name="ProductKelompok"
                label="Product Kelompok"
                value={ProductKelompokID.text}
                onClick={() => setOpenModalPK(true)}
                color={!!ProductKelompokID?.id ? "" : "warning"}
                focused={!!ProductKelompokID?.id ? false : true}
                fullWidth
                variant="outlined"
                disabled={false}
                // onChange={(e) => setProductGroup(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="Start Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={startDate}
                onChange={(value) => {
                  setstartDate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <DatePicker
                label="Due Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={dueDate}
                onChange={(value) => {
                  setdueDate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={status}
                    onChange={(e) => setStatus(e.target.checked)}
                    name="gilad"
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
          <BranchTab Branch={branch} setBranch={(e) => setBranch(e)} />
        </CardContent>
        <PrincipalPopup
          openModal={openModal}
          setOpenModal={(e) => setOpenModal(e)}
          principalID={principalID}
          setprincipalID={(e) => setprincipalID(e)}
        />
        <ProductGroupPopup
          openModalPG={openModalPG}
          setOpenModalPG={(e) => setOpenModalPG(e)}
          ProductGroupID={ProductGroupID}
          setPrincipalProdukEdit={(e) => setPrincipalProdukEdit(e)}
          setProductGroupID={(e) => setProductGroupID(e)}
        />
        <PrincipalProdukPopup
          ProductGroupID={ProductGroupID}
          openModalPP={openModalPP}
          setOpenModalPP={(e) => setOpenModalPP(e)}
          ProductPrincipalID={ProductPrincipalID.id}
          setProductPrincipalID={(e) => {
            setProductPrincipalID(e);
            // console.log("change", e);
          }}
          setPrincipalProdukEdit={(e) => setPrincipalProdukEdit(e)}
        />
        <ProdukKelompokPopup
          ProductGroupID={ProductGroupID}
          ProductPrincipalID={ProductPrincipalID.id}
          PrincipalProdukEdit={PrincipalProdukEdit}
          openModalPK={openModalPK}
          setOpenModalPK={(e) => setOpenModalPK(e)}
          ProductKelompokID={ProductKelompokID.id}
          setProductKelompokID={(e) => setProductKelompokID(e)}
        />
        {/* <ProductGroupPopup
          openModalPG={openModalPG}
          setOpenModalPG={(e) => setOpenModalPG(e)}
          ProductGroupID={ProductGroupID}
          setProductGroupID={(e) => setProductGroupID(e)}
        /> */}
      </Card>
    </>
  );
}

function DetailMasterPromosi() {
  return (
    <React.Fragment>
      <Helmet title="Detail Master Promosi" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-promo">
          Master Promotion
        </Link>
        <Typography>Detail Master Promotion</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Master Promotion
      </Typography>

      <Header />
    </React.Fragment>
  );
}

export default DetailMasterPromosi;
