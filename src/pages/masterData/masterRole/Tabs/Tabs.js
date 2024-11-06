import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@mui/material";
import React, { useState } from "react";
import AccessRights from "./AccessRights";
import Membership from "./Membership";

export default function Tabs({
  accessRights,
  handleCheckRow,
  checkedPermission,
}) {
  const [value, setValue] = useState("1");
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
              label="Membership"
              value="1"
              style={{ color: value === "1" ? "white" : "#a7d2f0" }}
            />
            <Tab
              label="Access Rights"
              value="2"
              style={{ color: value === "2" ? "white" : "#a7d2f0" }}
            />
          </TabList>
        </AppBar>
        <Membership />
        <AccessRights
          checkedPermission={checkedPermission}
          data={accessRights}
          handleCheckRow={handleCheckRow}
        />
      </TabContext>
    </div>
  );
}
