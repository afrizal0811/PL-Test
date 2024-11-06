import AppBar from "@material-ui/core/AppBar";
import { TabPanel } from "@material-ui/lab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@mui/material";
import React, { useState } from "react";
import Employment from "./Employment";
import General from "./General";

export const TabListEnum = {
  GENERAL_INFO: "GENERAL_INFO",
  EMPLOYMENT_HISTORY: "EMPLOYMENT_HISTORY",
};

export default function Tabs(props) {
  const [value, setValue] = useState(TabListEnum.GENERAL_INFO);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
              label="General Info"
              value={TabListEnum.GENERAL_INFO}
              style={{
                color: value === TabListEnum.GENERAL_INFO ? "white" : "#a7d2f0",
              }}
            />
            <Tab
              label="Employment History"
              value={TabListEnum.EMPLOYMENT_HISTORY}
              style={{
                color:
                  value === TabListEnum.EMPLOYMENT_HISTORY
                    ? "white"
                    : "#a7d2f0",
              }}
            />
          </TabList>
        </AppBar>
        <TabPanel value={TabListEnum.GENERAL_INFO}>
          <General
            contactInfo={props.contactInfo}
            addressInfo={props.addressInfo}
            employeeSetting={props.employeeSetting}
          />
        </TabPanel>
        <TabPanel value={TabListEnum.EMPLOYMENT_HISTORY}>
          <Employment
            loading={props.loading}
            employeeHistory={props.employeeHistory}
          />
        </TabPanel>
      </TabContext>
    </div>
  );
}
