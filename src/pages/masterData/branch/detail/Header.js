import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AppBar,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField as MuiTextField,
  Tab,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import CbBranch from "../../../../components/shared/cbBranch";
import { GetConfig } from "../../../../utils/ConfigHeader";
import TabBranchDetail from "./BranchDetail";
import TabDeliverySetting from "./DeliverySetting";

const TextField = styled(MuiTextField)(spacing);

export default function Header() {
  const [branchDetail, setBranchDetail] = useState([]);
  const [deliverySetting, setDeliverySetting] = useState([]);
  const [branchID, setBranchID] = useState("");
  const [BranchName, setBranchName] = useState("");
  const [status, setstatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/BranchReps/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            setBranchID([resdata.BranchID]);
            setstatus(resdata.Active);
            setBranchName(resdata.BranchName);
            setBranchDetail(resdata.BranchDetails);
            setDeliverySetting(resdata.DeliverySettings);
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
          Detail Branch
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} xs={6}>
            <CbBranch
              value={branchID}
              onChange={(newValue) => {
                setBranchID(newValue);
                getData(newValue);
                console.log("new valueeee", newValue);
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="branchName"
              label="Branch Name"
              value={!BranchName || BranchName == "" ? " " : BranchName}
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
                  checked={status}
                  InputLabelProps={{
                    readOnly: true,
                  }}
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
                label="Branch Detail"
                value="1"
                style={{ color: value == 1 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Delivery Settings"
                value="2"
                style={{ color: value == 2 ? "white" : "#a7d2f0" }}
              />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <TabBranchDetail
              AccountName={branchDetail?.AccountName}
              Email={branchDetail?.Email}
              Phone1={branchDetail?.Phone1}
              Phone2={branchDetail?.Phone2}
              AddressLine1={branchDetail?.AddressLine1}
              City={branchDetail?.City}
              AddressLine2={branchDetail?.AddressLine2}
              PostalCode={branchDetail?.PostalCode}
              LegalName={branchDetail?.LegalName}
              TaxRegistrationID={branchDetail?.TaxRegistrationID}
            />
          </TabPanel>
          <TabPanel value="2">
            <TabDeliverySetting TaxZone={deliverySetting.TaxZone} />
          </TabPanel>
        </TabContext>
      </div>
    </Card>
  );
}
