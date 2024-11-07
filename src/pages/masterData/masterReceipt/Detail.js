import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Grid,
  IconButton,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
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
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import GridReceiptDetail from "./GridReceiptDetail";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

function Header() {
  const [loading, setLoading] = useState(false);
  const [DataDetail, setDataDetail] = useState([]);
  const [Data, setData] = useState([]);
  const [referenceNbr, setreferenceNbr] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [externalRef, setexternalRef] = useState("");
  const [postPeriod, setpostPeriod] = useState("");
  const [transferNbr, settransferNbr] = useState("");
  const [controlCost, setcontrolCost] = useState(0);
  const [controlQty, setcontrolQty] = useState(0);
  const [lastSync, setlastSync] = useState(0);
  const [date, setdate] = useState(moment().format());
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    // console.log(id);
    if (id !== undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ReceiptReps/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setDataDetail(resdata.receiptDetails);
            setreferenceNbr(resdata.referenceNbr);
            setdescription(resdata.description);
            setstatus(resdata.status);
            setpostPeriod(resdata.postPeriod);
            setdate(resdata.date);
            settransferNbr(resdata.transferNbr);
            setexternalRef(resdata.externalRef);
            setcontrolCost(resdata.controlCost);
            setcontrolQty(resdata.controlQty);
            setlastSync(resdata.lastSync);
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
        referenceNbr: referenceNbr,
        branch: getBrach(),
        controlCost: controlCost,
        controlQty: controlQty,
        externalRef: externalRef,
        postPeriod: postPeriod,
        status: status,
        totalCost: controlCost,
        totalQty: controlQty,
        date: date,
        description: description,
        transferNbr: transferNbr,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ReceiptReps",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/master-data/receipt/detail/${Data.referenceNbr}`;
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

  const editData = async () => {
    setLoading(true);
    try {
      const payload = {
        ...Data,
      };
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ReceiptReps/" + id,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/master-data/receipt/detail/${Data.referenceNbr}`;
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

  return (
    <>
      <Grid container md={12} mt={1} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/master-data/receipt")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
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
          onClick={() => history("/master-data/receipt/add")}
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
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6} md={12} mt={0}>
            <Grid item md={3} xs={3}>
              <TextField
                name="setReference"
                label="Reference Number"
                value={referenceNbr}
                type={"text"}
                fullWidth
                variant="outlined"
                // mt={1}
                disabled={id !== undefined}
                onChange={(e) => setreferenceNbr(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="Desc"
                label="Description"
                value={description}
                type="text"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="Status"
                label="Status"
                value={status}
                type="text"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setstatus(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="transferNbr"
                label="transferNbr"
                value={transferNbr}
                type="text"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => settransferNbr(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="externalRef"
                label="externalRef"
                value={externalRef}
                type="text"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setexternalRef(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="postPeriod"
                label="postPeriod"
                value={postPeriod}
                type="text"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setpostPeriod(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <DatePicker
                label="Due Date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={date}
                onChange={(value) => {
                  setdate(value);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="lastSync"
                label="lastSync"
                value={lastSync}
                type="text"
                disabled
                fullWidth
                variant="outlined"
                // mt={1}
                // onChange={(e) => setlastSync(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="controlCost"
                label="controlCost"
                value={controlCost}
                type="number"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setcontrolCost(e.target.value)}
              />
            </Grid>
            <Grid item md={3} xs={3}>
              <TextField
                name="controlQty"
                label="controlQty"
                value={controlQty}
                type="number"
                fullWidth
                variant="outlined"
                // mt={1}
                onChange={(e) => setcontrolQty(e.target.value)}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <GridReceiptDetail
                Data={[]}
                loading={false}
                setData={(e) => e}
                isEditingData={false}
                setisEditingData={[]}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function DetailReceipt() {
  return (
    <React.Fragment>
      <Helmet title="Detail Receipt" />
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/receipt">
          Master Receipt
        </Link>
        <Typography>Detail Receipt</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Receipt Detail
      </Typography>

      <Divider mt={3} />
      <Header />
    </React.Fragment>
  );
}

export default DetailReceipt;
