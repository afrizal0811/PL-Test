import { TabContext, TabList } from "@mui/lab";
import {
  AppBar,
  CardContent,
  CircularProgress,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  TextField as MuiTextField,
  Tab,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import TabApplication from "./TabApplication";
import TabDetail from "./TabDetail";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

function Header() {
  const [tabPanel, setTabPanel] = useState("1");
  const [loading, setLoading] = useState(false);
  const [Desc, setDesc] = useState("Invoice");
  const [invdate, setinvdate] = useState("");
  const [duedate, setduedate] = useState("");
  const [customer, setcustomer] = useState("");
  const [amount, setamount] = useState("");
  const [Data, setData] = useState([]);
  const [DataApp, setDataApp] = useState([]);
  const [refnbr, setrefnbr] = useState("");
  const [IDZona, setIDZona] = useState("");
  const [status, setstatus] = useState("");
  const history = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (idd) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/InvoiceReps/" + idd,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200) {
            const res = response.data;
            setDesc(res.Type);
            setinvdate(res.Date);
            setduedate(res.DueDate);
            setstatus(res.Status);
            setrefnbr(res.ReferenceNbr);
            setcustomer(res.Customer);
            setamount(res.Amount);
            setData(res.Details);
            setDataApp(res.ApplicationsDefault);
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

  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  return (
    <Card mb={6}>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Timer
              active={true}
              duration={null}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Timecode />
            </Timer>
          </Grid>
        </Grid>
      ) : (
        <>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Header
            </Typography>
            <Typography variant="body2" gutterBottom mt={2}>
              Invoice
            </Typography>
            <Grid container spacing={6} md={12} mt={3}>
              <Grid item md={4} xs={12}>
                <TextField
                  name="InvoiceType"
                  label="Invoice Type"
                  value={Desc}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Invoice Ref Nbr"
                  label="Invoice Ref Nbr"
                  value={!refnbr || refnbr == "" ? " " : refnbr}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Date"
                  label="Date"
                  value={
                    !invdate || invdate == ""
                      ? " "
                      : moment(invdate).format("DD/MM/YYYY")
                  }
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Due Date"
                  label="Due Date"
                  value={
                    !duedate || duedate == ""
                      ? " "
                      : moment(duedate).format("DD/MM/YYYY")
                  }
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Invoice Status"
                  label="Invoice Status"
                  value={!status || status == "" ? " " : status}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Customer"
                  label="Customer"
                  value={!customer || customer == "" ? " " : customer}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="Amount"
                  label="Amount"
                  value={!amount || amount == "" ? " " : amount}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container md={12} mt={4}>
              <div
                style={{
                  border: "1px solid #0078d2",
                  // margin: "14px",
                  flexGrow: 1,
                }}
              >
                <TabContext value={tabPanel}>
                  <AppBar
                    position="static"
                    style={{ background: "#0078d2", color: "white" }}
                  >
                    <TabList
                      onChange={handleChangeTab}
                      aria-label="simple tabs example"
                      style={{ color: "white" }}
                    >
                      <Tab
                        label="Details"
                        value="1"
                        style={{ color: tabPanel == 1 ? "white" : "#a7d2f0" }}
                      />
                      <Tab
                        label="Applications"
                        value="2"
                        style={{ color: tabPanel == 2 ? "white" : "#a7d2f0" }}
                      />
                    </TabList>
                  </AppBar>
                  <TabDetail Data={Data} />
                  <TabApplication Data={DataApp} />
                </TabContext>
              </div>
            </Grid>
          </CardContent>
        </>
      )}
    </Card>
  );
}

function DetailInvoice() {
  return (
    <React.Fragment>
      <Helmet title="Detail Invoice" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Invoice
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/invoice">
          Master Invoice
        </Link>
        <Typography>Detail Invoice</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailInvoice;
