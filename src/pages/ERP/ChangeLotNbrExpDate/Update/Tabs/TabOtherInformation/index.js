import { TabPanel } from "@mui/lab";
import React from "react";
import InputFields from "./InputFields";
import RefreshButton from "./RefreshButton";

export default function TabOtherInformation() {
  return (
    <TabPanel value="3">
      <InputFields />
      <RefreshButton />
    </TabPanel>
  );
}
