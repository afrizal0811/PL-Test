import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  CardContent as MuiCardContent,
  Grid,
  TextField as MuiTextField,
  Typography,
} from "@material-ui/core";
import { GetConfig } from "../../../../utils/ConfigHeader";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Header(props) {
  const [header, SetHeader] = useState({
    customer: "",
    customerName: "",
    customerClass: "",
    customerStatus: "",
  });
  const { id } = useParams();
  const [customer, setCustomer] = useState("");
  const [cbCustomer, setCbCustomer] = useState([]);

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    props.setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/CustomerReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            SetHeader({
              adminPiutang: "",
            });
            // props.setGeneral({
            //   accountName: "",
            //   mainAddress: "",
            //   mainContact: "",
            //   country: "",
            // });
            // props.setFinancial({
            //   term: "",
            // });
            // props.setShipping({
            //   taxRegistrationID: "",
            //   taxZone: "",
            // });
            // props.setPrimaryContact({
            //   EmailPC: "",
            //   NamePC: "",
            //   Phone1PC: "",
            // });
            // console.log(resdata.MainContact.Address);
            SetHeader({
              customer: resdata.CustomerID,
              customerName: resdata.CustomerName,
              customerClass: resdata.CustomerClass,
              customerStatus: resdata.Status,
              adminPiutang: resdata.AdminPiutangEmployeeName,
            });
            props.setGeneral({
              accountName: resdata.CustomerName,
              mainAddress:
                resdata.CustomerMainContact[0].Contact.Address.AddressLine1,
              mainContact:
                resdata.CustomerMainContact[0].Contact.Phone1 == undefined
                  ? " "
                  : resdata.CustomerMainContact[0].Contact.Phone1,
              country: resdata.Location[0].Country,
            });
            props.setFinancial({
              term: resdata.Terms,
            });
            props.setShipping({
              taxRegistrationID: resdata.TaxRegistrationID,
              taxZone: resdata.TaxZone,
            });
            // const newdatalocation = resdata.Location.map((item, i) => {
            //   item.id = i;
            //   return item;
            // });
            props.setPrimaryContact({
              EmailPC: resdata.PrimaryContact.EmailPC,
              NamePC: resdata.PrimaryContact.NameContact,
              Phone1PC: resdata.PrimaryContact.Phone1PC,
            });
            props.setLocation(resdata.Location);
            // const newres = [];
            // Object.keys(resdata.Salespersons).forEach(function (key) {
            //   newres.push({
            //     id: key,
            //     commission: resdata.Salespersons[key].Commission,
            //     default: resdata.Salespersons[key].Default,
            //     locationID: resdata.Salespersons[key].LocationID,
            //     name: resdata.Salespersons[key].Name,
            //     salespersonID: resdata.Salespersons[key].SalespersonID,
            //   });
            // });
            props.setSalesPerson(resdata.Salespersons);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      props.setLoading(false);
    } catch (error) {
      console.log(error.message);
      props.setLoading(false);
    }
  };
  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Header
      </Typography>
      <Typography variant="body2" gutterBottom mt={3}>
        Customer
      </Typography>
      <Grid container spacing={6} md={8} mt={3}>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerName"
            label="Customer ID"
            value={header.customerName}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerName"
            label="Customer Name"
            value={header.customerName}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="adminPiutang"
            label="Admin Piutang"
            value={header.adminPiutang}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerClass"
            label="Customer Class"
            value={header.customerClass}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerStatus"
            label="Customer Status"
            value={header.customerStatus}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}
