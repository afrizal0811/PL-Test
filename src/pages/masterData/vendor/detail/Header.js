import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CardContent,
  Grid,
  TextField as MuiTextField,
  Typography,
  Tab,
  Card,
  AppBar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import TabGeneral from "./General";
import CbData from "../../../../components/shared/dropdown";
import TabFinancial from "./Financial";
import TabPurchasingSetting from "./PurchasingSetting";
import { GetConfig } from "../../../../utils/ConfigHeader";

const TextField = styled(MuiTextField)(spacing);

export default function Header() {
  const [Vendor, setVendor] = useState();
  const [data, setdata] = useState("");
  const [financial, setFinancial] = useState({});
  const [purchase, setPurchase] = useState({});
  const [mainContact, setMainContact] = useState({});
  const [primaryContact, setPrimaryContact] = useState({});
  const [general, setGeneral] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getData(id);
    setVendor(id);
  }, []);

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
          if (response.status == 200) {
            const resdata = response.data;
            setVendor([resdata.InventoryID]);
            setdata(resdata);
            setPrimaryContact(resdata.PrimaryContacts);
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
            <CbData
              label={"Vendor ID"}
              source={`${process.env.REACT_APP_DOMAIN_API}/Vendors/DropDown/Vendor`}
              id={"VendorID"}
              desc={"VendorName"}
              value={id}
              onChange={(newValue) => {
                window.location.replace(`/master-data/vendor/${newValue}`);
                setVendor(newValue);
                getData(newValue);
                // console.log(newValue);
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="vendorName"
              label="Vendor Name"
              value={
                !data?.VendorName || data?.VendorName == ""
                  ? " "
                  : data?.VendorName
              }
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!data?.Status ? false : data.Status}
                  name="gilad"
                />
              }
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
              {/* <Tab
                label="Financial"
                value="2"
                style={{ color: value == 2 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Purchasing Settings"
                value="3"
                style={{ color: value == 3 ? "white" : "#a7d2f0" }}
              /> */}
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <TabGeneral data={data} primaryContact={primaryContact} />
          </TabPanel>
          {/* <TabPanel value="2">
            <TabFinancial data={data} />
          </TabPanel>
          <TabPanel value="3">
            <TabPurchasingSetting data={data} />
          </TabPanel> */}
        </TabContext>
      </div>
    </Card>
  );
}
