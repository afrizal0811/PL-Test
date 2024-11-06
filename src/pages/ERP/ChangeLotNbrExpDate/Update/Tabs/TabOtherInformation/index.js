import React from "react";
import InputFields from "./InputFields";
import RefreshButton from "./RefreshButton";
import { TabPanel } from "@material-ui/lab";

export default function TabOtherInformation() {
  return (
    <TabPanel value="3">
      <InputFields />
      <RefreshButton />
    </TabPanel>
  );
}
