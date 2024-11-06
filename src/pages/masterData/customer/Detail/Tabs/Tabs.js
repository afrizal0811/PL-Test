import React, { useState } from "react";
import General from "./General";
import Financial from "./Financial";
import Shipping from "./Shipping";
import SalesPerson from "./SalesPerson";
import Location from "./Location";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@material-ui/core";

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
              style={{ color: value == 1 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Financial"
              value="2"
              style={{ color: value == 2 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Shipping"
              value="3"
              style={{ color: value == 3 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Salespersons"
              value="4"
              style={{ color: value == 4 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Location"
              value="5"
              style={{ color: value == 5 ? "white" : "#a7d2f0" }}
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
