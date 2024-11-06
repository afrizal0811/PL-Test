import AppBar from "@material-ui/core/AppBar";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import { Tab } from "@mui/material";
import React from "react";
import Location from "./Location";

export default function Tabs(props) {
  const [value, setValue] = React.useState("1");
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
              label="Location"
              value="1"
              style={{ color: value == 1 ? "white" : "#a7d2f0" }}
            />
          </TabList>
        </AppBar>
        <Location location={props.location} loading={props.loading} />
      </TabContext>
    </div>
  );
}
