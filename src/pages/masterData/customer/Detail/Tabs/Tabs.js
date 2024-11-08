import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Tab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import Financial from "./Financial";
import General from "./General";
import Location from "./Location";
import SalesPerson from "./SalesPerson";
import Shipping from "./Shipping";

export default function Tabs(props) {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ border: "1px solid #0078d2", margin: "14px" }}>
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
              style={{ color: value === 1 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Financial"
              value="2"
              style={{ color: value === 2 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Shipping"
              value="3"
              style={{ color: value === 3 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Salespersons"
              value="4"
              style={{ color: value === 4 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Location"
              value="5"
              style={{ color: value === 5 ? "white" : "#a7d2f0" }}
            />
          </TabList>
        </AppBar>
        <General
          general={props.general}
          primaryContact={props.primaryContact}
        />
        <Financial financial={props.financial} />
        <Shipping shipping={props.shipping} />
        <SalesPerson loading={props.loading} salesPerson={props.salesPerson} />
        <Location loading={props.loading} location={props.location} />
      </TabContext>
    </div>
  );
}
