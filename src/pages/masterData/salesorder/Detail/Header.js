import {
  Grid,
  CardContent as MuiCardContent,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Header(props) {
  const [header, setHeader] = useState({
    orderType: "empty",
    orderNbr: "empty",
    status: "empty",
    statusSO: "empty",
    statusOtorisasi: "empty",
    date: moment().format("DD/MM/YYYY, h:mm:ss a"),
    location: "empty",
    customer: "empty",
    customerOrderNbr: "empty",
    externalRefNbr: "empty",
  });
  const [salesOrder, setSalesOrder] = useState("");
  const [cbSalesOrder, setCbSalesOrder] = useState([]);
  const { id } = useParams();

  // const getCbSalesOrder = async () => {
  //   await axios
  //     .get(
  //       `${process.env.REACT_APP_DOMAIN_API}` +
  //         "/SalesOrderReps/DropDown/SalesOrder"
  //     )
  //     .then(function (response) {
  //       // handle success
  //       // console.log(response);
  //       if (response.status == 200 || response.status == 201) {
  //         const resdata = response.data;
  //         const newres = [];
  //         Object.keys(resdata).forEach(function (key) {
  //           newres.push({
  //             orderNbr: resdata[key].OrderNbr,
  //           });
  //         });
  //         setCbSalesOrder(newres);
  //       }
  //     });
  // };

  const getData = async (id) => {
    props.setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/SalesOrderReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            if (salesOrder === "") {
              setSalesOrder({
                orderNbr: resdata.OrderNbr,
              });
            }

            setHeader({
              customer: "",
              orderType: "",
              date: "",
              status: "",
              statusSO: "",
              statusOtorisasi: "",
              location: "",
              customerOrderNbr: "",
              externalRefNbr: "",
            });
            // console.log(resdata.MainContact.Address);
            setHeader({
              customer: resdata.CustomerID,
              orderType: resdata.OrderType,
              orderNbr: resdata.OrderNbr,
              date: moment(resdata.Date).format("DD/MM/YYYY, h:mm:ss a"),
              status: resdata.Status,
              location: resdata.LocationID,
              customerOrderNbr: resdata.CustomerOrder,
              externalRefNbr: resdata.ExternalRef,
              statusSO: resdata.StatusSO,
              statusOtorisasi: resdata.StatusOtorisasi,
            });
            const newdatapayment = resdata.Payments.map((item, i) => {
              item.id = i;
              return item;
            });
            const newdatadetail = resdata.Details.map((item, i) => {
              item.id = i;
              return item;
            });
            props.setPayment(newdatapayment);
            props.setDetails(newdatadetail);
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

  useEffect(() => {
    getData(id);
  }, []);

  // useEffect(() => {
  //   getCbSalesOrder();
  // }, []);

  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Header
      </Typography>
      <Typography variant="body2" gutterBottom mt={3}>
        Sales Order
      </Typography>
      <Grid container spacing={6} md={8} mt={3}>
        <Grid item md={6} xs={6}>
          <TextField
            name="orderType"
            label="Order Type"
            value={header.orderType}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="orderType"
            label="Order Type"
            value={salesOrder.orderNbr ? salesOrder.orderNbr : " "}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="date"
            label="Date"
            value={header.date}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerID"
            label="Customer"
            value={header.customer}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="status"
            label="Order Status"
            value={header.status}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="location"
            label="Location"
            value={header.location}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="customerOrderNbr"
            label="Customer Order Nbr"
            value={header.customerOrderNbr}
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
            name="externalRefNbr"
            label="External Reference Nbr"
            value={header.externalRefNbr}
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
            name="statusAddon"
            label="Status SO"
            value={header.statusSO}
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
            name="statusAddon"
            label="Status Otorisasi"
            value={header.statusOtorisasi}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}
