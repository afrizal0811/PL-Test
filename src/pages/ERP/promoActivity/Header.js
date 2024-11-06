import { Box, spacing } from "@material-ui/system";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  TextField as MuiTextField,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import CustomerPopup from "./CustomerPopup";
import Detail from "./Detail";
import PromoPopup from "./PromoPopup";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);

const DummyLocation = [
  {
    description: "Jakarta Utara",
    LocationID: "JKT001",
  },
  {
    description: "Jakarta Selatan",
    LocationID: "JKT002",
  },
  {
    description: "Jakarta Timur",
    LocationID: "JKT003",
  },
  {
    description: "Jakarta Barat",
    LocationID: "JKT004",
  },
];

const DummyImage = [
  {
    photoID: "P001",
    nama: "pohon Utara",
    url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  },
  {
    photoID: "P002",
    nama: "pohon Selatan",
    url: "https://wallpaperaccess.com/full/3832032.jpg",
  },
];

function Header() {
  //state Data
  const [Data, setData] = useState([]);
  const [PromoActID, setPromoActID] = useState("");
  const [description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [Date, setDate] = useState(moment().format());
  const [Hasil, setHasil] = useState("belum berjalan");
  const [imgData, setImgData] = useState(DummyImage);
  const [TempProduct, setTempProduct] = React.useState([]);
  const { id } = useParams();

  //state Promo ID
  const [openPromo, setOpenPromo] = React.useState(false);
  const [TempPromoID, setTempPromoID] = React.useState([]);

  //state Customer ID
  const [openCust, setOpenCust] = React.useState(false);
  const [TempCustomer, setTempCustomer] = React.useState([]);

  const [cbLocation, setcbLocation] = useState(DummyLocation);

  useEffect(() => {
    // getDataPrincipal();
    if (id != undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/PromoActivity/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setTempCustomer(
              resdata.customerID ? resdata.customerID.split(",") : []
            );
            setDate(resdata.date);
            setDescription(resdata.description);
            setHasil(resdata.hasil ? resdata.hasil : "Belum berjalan");
            setTempPromoID(resdata.promoID ? resdata.promoID.split(",") : []);
            setPromoActID(resdata.promoActivityID);
            setLocation(resdata.location);
            setTempProduct(
              resdata.productGroupDescr
                ? resdata.productGroupDescr.split(",")
                : []
            );
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

  return (
    <>
      <Card mb={6}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Header
          </Typography>
          <Typography variant="body2" gutterBottom mt={3}>
            Promo Activity
          </Typography>
          <Grid container spacing={6} md={12} mt={3} mb={5}>
            <Grid item md={4} xs={12}>
              <TextField
                name="PromoActID"
                label="Promo Activity ID"
                value={PromoActID}
                color={PromoActID === "" ? "warning" : ""}
                focused={PromoActID === "" ? true : false}
                fullWidth
                required
                // onClick={() => setOpenPromo(true)}
                variant="outlined"
                disabled={false}
                onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {PromoActID === "" && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="PromoID"
                label="Promo Activity ID"
                value={TempPromoID.map((item) => item)}
                color={TempPromoID.length == 0 ? "warning" : ""}
                focused={TempPromoID.length == 0 ? true : false}
                fullWidth
                required
                onClick={() => setOpenPromo(true)}
                variant="outlined"
                disabled={false}
                // onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {TempPromoID.length == 0 && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={Date}
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
                value={TempCustomer.map((item) => item)}
                color={TempCustomer.length === 0 ? "warning" : ""}
                focused={TempCustomer.length === 0 ? true : false}
                fullWidth
                required
                onClick={() => {
                  setOpenCust(true);
                  console.log("opencust", openCust);
                }}
                variant="outlined"
                disabled={false}
                // onChange={(e) => setPromoActID(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {TempCustomer.length === 0 && (
                <FormHelperText style={{ color: "red" }}>
                  Required
                </FormHelperText>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                onChange={(event, newValue) => {
                  setLocation(newValue);
                  // console.log(menuID);
                }}
                options={cbLocation}
                getOptionLabel={(option) =>
                  option.LocationID + " - " + option.description
                }
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.LocationID} - {option.description}
                  </Box>
                )}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Location"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <FormControl style={{ width: "100%" }}>
                <InputLabel id="status-zona">Hasil</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  label="Hasil"
                  value={Hasil}
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
            PromoActID={PromoActID}
            imgData={imgData}
            description={description}
            TempProduct={TempProduct}
          />
        </CardContent>
        <PromoPopup
          openCust={openPromo}
          setOpenCust={(e) => {
            setOpenCust(e);
            console.log("ee", e);
          }}
          TempPromoID={TempPromoID}
          setTempPromoID={(e) => {
            setTempPromoID(e);
          }}
        />
        <CustomerPopup
          openCust={openCust}
          setOpenCust={(e) => {
            setOpenCust(e);
            console.log("ee", e);
          }}
          TempCustomer={TempCustomer}
          setTempCustomer={(e) => {
            setTempCustomer(e);
          }}
        />
      </Card>
    </>
  );
}

export default Header;
