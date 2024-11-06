import { TabPanel } from "@mui/lab";
import React from "react";
import ApprovalDetailsTable from "./ApprovalDetailsTable";
import RefreshButton from "./RefreshButton";

export default function TabApprovalDetails() {
  return (
    <TabPanel value="2">
      <ApprovalDetailsTable />
      <RefreshButton />
    </TabPanel>
  );
}
