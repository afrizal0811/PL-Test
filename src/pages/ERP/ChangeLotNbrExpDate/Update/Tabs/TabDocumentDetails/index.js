import { TabPanel } from "@mui/lab";
import React from "react";
import DestinationTable from "./DestinationTable";
import SourceTable from "./SourceTable";

export default function TabDocumentDetails() {
  return (
    <TabPanel value="1">
      <SourceTable />
      <DestinationTable />
    </TabPanel>
  );
}
