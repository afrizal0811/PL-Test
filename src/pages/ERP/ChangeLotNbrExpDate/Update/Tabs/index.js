import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@material-ui/core";
import TabDocumentDetails from "./TabDocumentDetails";
import TabApprovalDetails from "./TabApprovalDetails";
import TabOtherInformation from "./TabOtherInformation";

export default function Tabs(props) {
  const [tabPanel, setTabPanel] = useState("1");
  const handleChangeTab = (event, newValue) => {
    setTabPanel(newValue);
  };

  return (
    <div style={{ border: "1px solid #0078d2", margin: "14px", flexGrow: 1 }}>
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
              label="Document Details"
              value="1"
              style={{ color: tabPanel == 1 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Approval Details"
              value="2"
              style={{ color: tabPanel == 2 ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Other Information"
              value="3"
              style={{ color: tabPanel == 3 ? "white" : "#a7d2f0" }}
            />
          </TabList>
        </AppBar>
        <TabDocumentDetails />
        <TabApprovalDetails />
        <TabOtherInformation />
      </TabContext>
    </div>
  );
}
