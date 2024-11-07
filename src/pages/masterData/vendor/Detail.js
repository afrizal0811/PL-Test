import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Autocomplete,
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Tab,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const columnsPayment = [
  {
    field: "DocType",
    headerName: "Doc Type",
    width: 200,
  },
  {
    field: "ReferenceNbr",
    headerName: "Reference Nbr",
    width: 200,
  },
  {
    field: "AppliedToOrder",
    headerName: "Aplied To Order",
    width: 200,
  },
];

const columnsLocation = [
  {
    field: "LocationID",
    headerName: "Location ID",
    width: 200,
  },
  {
    field: "Description",
    headerName: "Description",
    type: "text",
    width: 200,
  },
];

function Header() {
  const [location, setLocation] = useState([]);
  const [pageSizeLocation, setPageSizeLocation] = useState(5);
  const [selectionLocation, setSelectionLocation] = useState(0);
  const [accountAddress, setAccountAddress] = useState({});
  const [header, setHeader] = useState({
    warehouseID: "...",
    vendorName: "...",
    status: false,
  });
  const [financial, setFinancial] = useState({});
  const [purchase, setPurchase] = useState({});
  const [mainContact, setMainContact] = useState({});
  const [primaryContact, setPrimaryContact] = useState({});
  const [general, setGeneral] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [vendor, setVendor] = useState("");
  const [cbVendor, setCbVendor] = useState([]);

  useEffect(() => {
    if (vendor != "") {
      getData(vendor.vendorID);
    } else {
      getData(id);
    }
    getCbVendor();
  }, [vendor]);

  const getCbVendor = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` + "/Vendors/DropDown/Vendor",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status === 200 || response.status === 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push({
              vendorID: resdata[key].VendorID,
              vendorName: resdata[key].VendorName,
            });
          });
          setCbVendor(newres);
        }
      });
  };

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/Vendors/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            axios
              .get(
                `${process.env.REACT_APP_DOMAIN_API}` +
                  "/Vendors/DropDown/Vendor"
              )
              .then(function (responsedep) {
                Object.keys(responsedep.data).forEach(function (key) {
                  if (vendor === "") {
                    if (responsedep.data[key].VendorID == resdata.VendorID) {
                      setVendor({
                        vendorID: responsedep.data[key].VendorID,
                        vendorName: responsedep.data[key].VendorName,
                      });
                    }
                  }
                });
              });
            setFinancial({
              terms: "",
            });
            setPurchase({
              taxZone: "",
              taxRegistrationID: "",
            });
            setGeneral({
              accountName: "",
            });
            setAccountAddress({
              AddressLine1: "",
              AddressLine2: "",
              City: "",
              PostalCode: "",
              Country: "",
            });
            setMainContact({
              Phone1: "",
              Phone2: "",
              Fax: "",
              Email: "",
            });
            setPrimaryContact({
              NameContact: "",
              Phone1PC: "",
              Phone2PC: "",
              JobTitlePC: "",
              EmailPC: "",
            });
            // console.log(resdata);
            setHeader({
              vendor: resdata.VendorID,
              vendorName: resdata.VendorName,
              vendorClass: resdata.VendorClass,
              status: resdata.Status,
            });
            setFinancial({
              terms: resdata.Terms,
            });
            setPurchase({
              taxZone: resdata.TaxZone,
              taxRegistrationID: resdata.TaxRegistrationID,
            });
            setGeneral({
              accountName: resdata.VendorName,
            });
            if (resdata.MainContact != undefined) {
              setMainContact(resdata.MainContact);
            }
            if (resdata.MainContact.Address != undefined) {
              setAccountAddress(resdata.MainContact.Address);
            }
            console.log(resdata.MainContact);
            if (resdata.PrimaryContacts.length > 0) {
              setPrimaryContact(resdata.PrimaryContacts[0]);
            }
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
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Detail Vendor
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              value={vendor}
              onChange={(event, newValue) => {
                setVendor(newValue);
                // console.log(newValue);
              }}
              options={cbVendor}
              getOptionLabel={(option) =>
                option.vendorID + " - " + option.vendorName
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.vendorID} - {option.vendorName}
                </Box>
              )}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  my={2}
                  label="Vendor ID"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {/* <TextField
              name="vendor"
              label="Vendor ID"
              value={header.vendor}
              fullWidth
              variant="outlined"
              disabled={true}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="vendorName"
              label="Vendor Name"
              value={header.vendorName}
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
            <FormControlLabel
              control={<Checkbox checked={header.status} name="gilad" />}
              label="Active"
            />
          </Grid>
        </Grid>
      </CardContent>
      <div style={{ border: "1px solid #0078d2", margin: "14px", flexGrow: 1 }}>
        <TabContext value={value}>
          <AppBar
            position="static"
            style={{ background: "#0078d2", color: "white" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="simple tabs example"
              style={{ color: "white" }}
            >
              <Tab
                label="General"
                value="1"
                style={{ color: value == 1 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Financial"
                value="2"
                style={{ color: value == 2 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Purchasing Settings"
                value="3"
                style={{ color: value == 3 ? "white" : "#a7d2f0" }}
              />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <Grid container spacing={1} md={12}>
              <Grid item md={8}>
                <Grid container spacing={3} md={12}>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Account Info</h1>
                    </u>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="accountName"
                      label="Account Name"
                      value={general.accountName}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Account Address</h1>
                    </u>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="addressLine1"
                      label="Address Line 1"
                      value={accountAddress.AddressLine1}
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
                      name="addressLine2"
                      label="Address Line 2"
                      value={accountAddress.AddressLine2}
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
                      name="city"
                      label="City"
                      value={accountAddress.City}
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
                      name="postalCode"
                      label="Postal Code"
                      value={accountAddress.PostalCode}
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
                      name="country"
                      label="Country"
                      value={accountAddress.Country}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Additional Account Info</h1>
                    </u>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="phone1"
                      label="Phone1"
                      value={mainContact.Phone1}
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
                      name="phone2"
                      label="Phone2"
                      value={mainContact.Phone2}
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
                      name="phone3"
                      label="Phone3"
                      value={mainContact.Fax}
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
                      name="email"
                      label="Email"
                      value={mainContact.Email}
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
              </Grid>
              <Grid item md={4}>
                <Grid container spacing={3} md={12}>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Primary Contact</h1>
                    </u>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="name"
                      label="Name"
                      value={primaryContact.NameContact}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="jobTitle"
                      label="Job Title"
                      value={primaryContact.JobTitlePC}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="email"
                      label="Email"
                      value={primaryContact.EmailPC}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="phone1"
                      label="Phone1"
                      value={primaryContact.Phone1PC}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="phone2"
                      label="Phone2"
                      value={primaryContact.Phone2PC}
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
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3} md={8}>
              <Grid item md={12} xs={12}>
                <u>
                  <h1>Financial Setting</h1>
                </u>
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="term"
                  label="Terms"
                  value={financial.terms}
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  my={2}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={3} md={8}>
              <Grid item md={12} xs={12}>
                <u>
                  <h1>Tax Setting</h1>
                </u>
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="taxRegistrationID"
                  label="Tax Registration ID"
                  value={purchase.taxRegistrationID}
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  my={2}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  name="taxZone"
                  label="Tax Zone"
                  value={purchase.taxZone}
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  my={2}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </div>
    </Card>
  );
}

function DetailVendor() {
  return (
    <React.Fragment>
      <Helmet title="Detail Vendor" />
      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/vendor">
          Vendor
        </Link>
        <Typography>Detail Vendor</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Detail Vendor
      </Typography>

      <Grid container spacing={6} mt={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default DetailVendor;
