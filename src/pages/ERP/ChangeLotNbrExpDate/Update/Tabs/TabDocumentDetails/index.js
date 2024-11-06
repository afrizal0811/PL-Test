import React from "react";
import SourceTable from "./SourceTable";
import DestinationTable from "./DestinationTable";
import { TabPanel } from "@material-ui/lab";

export default function TabDocumentDetails() {
  return (
    <TabPanel value="1">
      <SourceTable />
      <DestinationTable />
    </TabPanel>
  );
}
