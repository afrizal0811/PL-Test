import React from "react";
import ApprovalDetailsTable from "./ApprovalDetailsTable";
import RefreshButton from "./RefreshButton";
import { TabPanel } from "@material-ui/lab";

export default function TabApprovalDetails() {
  return (
    <TabPanel value="2">
      <ApprovalDetailsTable />
      <RefreshButton />
    </TabPanel>
  );
}
