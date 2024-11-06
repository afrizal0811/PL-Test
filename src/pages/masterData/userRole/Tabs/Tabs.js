import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import React, { useState } from "react";
import Branch from "./Branch";

export default function Tabs({ data, handleChangeBranches }) {
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
              label="Branch"
              value="1"
              style={{ color: value === 1 ? "white" : "#a7d2f0" }}
            />
          </TabList>
        </AppBar>
        <Branch data={data} handleChangeBranches={handleChangeBranches} />
      </TabContext>
    </div>
  );
}
