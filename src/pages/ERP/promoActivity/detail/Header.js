import React, { useEffect, useState } from "react";
import Detail from "./Detail";
import styled from "styled-components/macro";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";
import CustomerPopup from "./CustomerPopup";
import axios from "axios";
import PromoPopup from "./PromoPopup";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader";
import Refresh from "@material-ui/icons/Refresh";
import Add from "@material-ui/icons/Add";
import Reply from "@material-ui/icons/Reply";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import Swal from "sweetalert2";
import { getBrach } from "../../../../utils/jwt";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);

function Header() {
  //state Data
  const [promoActID, setPromoActID] = useState("");
  const [branch, setBranch] = useState(getBrach());
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({
    id: "9CF578EC-9606-4F98-5492-08DA64B77856",
    text: "MAIN - Primary Location",
  });
  const [date, setDate] = useState(moment().format());
  const [hasil, setHasil] = useState("Belum berjalan");
  const [imgData, setImgData] = useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const { id } = useParams();
  const history = useNavigate();
  const [loading, setLoading] = useState(false);

  //state Promo ID
  const [openPromo, setOpenPromo] = React.useState(false);
  const [selectedPromo, setSelectedPromo] = React.useState("");

  //state Customer ID
  const [openCust, setOpenCust] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState("");

  useEffect(() => {
    if (id !== undefined) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/PromoActivity/Delete/" +
            id +
            "/SACSAC300002",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            setTimeout(() => {
              window.location.href = `/promo-activity`;
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

  const getData = async () => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/PromoActivity/${id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setSelectedCustomer({
              customerID: resdata.customerID,
              customerName: resdata.customerName,
            });
            setDate(resdata.date);
            setDescription(resdata.description);
            setHasil(resdata.hasil ? resdata.hasil : "Belum berjalan");
            setSelectedPromo({ promoID: resdata.promoID });
            setPromoActID(resdata.promoActivityID);
            setLocation({
              id: resdata.locationLineID,
              text: resdata.location,
            });
            setBranch(resdata.branchID);
            setSelectedProduct(resdata.productBy);
            // setImgData(resdata.filesVM);
            let arrimg = resdata.imageBase64.split(",data:image/");
            let filtered = arrimg.filter(function (el) {
              return el !== "";
            });
            let add = filtered.map((item) => "data:image/" + item);
            console.log("filtered image", filtered);
            setImgData(add);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createData = async (payload) => {
    setLoading(true);
    try {
      console.log(payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/PromoActivity/AddV2`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/promo-activity/detail/${response.data.refNbr}`;
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

  const editData = async (payload) => {
    setLoading(true);
    try {
      console.log(payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/PromoActivity/Update/" +
            id,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/promo-activity/detail/${id}`;
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
    let formData = new FormData();
    let arr = [];
    if (imgData.length > 0) {
      imgData.forEach((a) => {
        arr.push(a);
      });
    }
    formData.append("promoID", selectedPromo?.promoID);
    formData.append("description", description);
    formData.append("customerID", selectedCustomer?.customerID);
    formData.append("date", date);
    formData.append("hasil", hasil);
    formData.append("locationLineID", location?.id);
    formData.append("productGroupID", selectedProduct);
    formData.append("screenID", "SAC300002");
    formData.append("ImageBase64", arr.toString());

    const payload = {
      promoID: selectedPromo?.promoID,
      description: description,
      customerID: selectedCustomer?.customerID,
      date: date,
      hasil: hasil,
      locationLineID: location?.id,
      productBy: selectedProduct,
      files: imgData,
      screenID: "SAC300002",
    };

    if (id === undefined) {
      console.log(payload);
      createData(formData);
    } else {
      editData(formData);
    }
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/promo-activity")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            loading || !selectedPromo?.promoID || !selectedCustomer?.customerID
          }
          onClick={() => onSumbitHandler()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          onClick={() => {
            history("/promo-activity/add");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          onClick={() => notifyConfirm(id)}
          // onClick={onSumbitHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6} md={12} mt={3} mb={5}>
            <Grid item md={4} xs={12}>
              <TextField
                name="PromoActID"
                label="Promo Activity ID"
                value={promoActID}
                fullWidth
                required
                variant="outlined"
                disabled={true}
                onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="PromoID"
                label="Promo ID"
                // value={TempPromoID}
                value={selectedPromo ? selectedPromo?.promoID : " "}
                color={!selectedPromo?.promoID ? "warning" : ""}
                focused={!selectedPromo?.promoID ? true : false}
                fullWidth
                required
                onClick={() => setOpenPromo(true)}
                variant="outlined"
                disabled={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {selectedPromo?.promoID === 0 && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Date"
                disabled
                inputFormat={"dd/MM/yyyy"}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(value) => {
                  setDate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="Customer"
                label="Customer"
                value={
                  selectedCustomer
                    ? selectedCustomer?.customerID +
                      " - " +
                      selectedCustomer?.customerName
                    : " "
                }
                color={!selectedCustomer?.customerID ? "warning" : ""}
                focused={!selectedCustomer?.customerID ? true : false}
                fullWidth
                required
                onClick={() => {
                  setOpenCust(true);
                  console.log("opencust", openCust);
                }}
                variant="outlined"
                disabled={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {!selectedCustomer?.customerID && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <CbData
                required
                all
                source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/Location/${selectedCustomer?.customerID}`}
                config={GetConfig()}
                id={"text"}
                defaultValue={"MAIN - Primary Location"}
                value={location.text}
                label="Location ID"
                onChange={(newValue) => {
                  if (newValue !== null) {
                    console.log("newValue", newValue);
                    setLocation(newValue[0]);
                  } else {
                    setLocation({
                      id: "9CF578EC-9606-4F98-5492-08DA64B77856",
                      text: "MAIN - Primary Location",
                    });
                  }
                  console.log("locattion", newValue);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">Hasil</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Hasil"
                  value={hasil}
                  onChange={(e) => setHasil(e.target.value)}
                  id="demo-simple-select"
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={"Berjalan"}>Berjalan</MenuItem>
                  <MenuItem value={"Belum berjalan"}>Belum Berjalan</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Detail
            imgData={imgData}
            setImgData={setImgData}
            Branch={branch}
            TempProduct={selectedProduct}
            setTempProduct={setSelectedProduct}
            description={description}
            setDescription={setDescription}
            id={id}
          />
        </CardContent>
        <PromoPopup
          openPromo={openPromo}
          setOpenPromo={setOpenPromo}
          TempPromoID={selectedPromo}
          setTempPromoID={(e) => {
            setSelectedPromo(e);
            setSelectedProduct(`${e.type1Group} ${e.tipe2Desc} ${e.tipe3Desc}`);
            // setBranch(`${e.branchID}`);
            console.log("e", e);
          }}
        />
        <CustomerPopup
          openCust={openCust}
          setOpenCust={setOpenCust}
          TempCustomer={selectedCustomer}
          setTempCustomer={setSelectedCustomer}
        />
      </Card>
    </>
  );
}

export default Header;
