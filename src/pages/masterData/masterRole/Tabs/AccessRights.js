import React, { useEffect, useState } from "react";

import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  Checkbox,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

function Row({ row, handleCheckRow, checkedPermission }) {
  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell
        sx={{ width: "450px", fontWeight: "bold" }}
        component="th"
        scope="row"
      >
        {row.ScreenName} - {row.Permission}
      </TableCell>
      <TableCell>
        <Checkbox
          checked={checkedPermission.includes(row.PermissionID)}
          onChange={() => handleCheckRow({ ...row, access: !row.access })}
        />
      </TableCell>
    </TableRow>
  );
}

export default function AccessRights({
  data,
  handleCheckRow,
  checkedPermission,
}) {
  const [dataTable, setData] = useState(data);

  useEffect(() => {
    setData(data);
  }, [data]);
  return (
    <TabPanel value="2">
      <Paper>
        <TableContainer
          style={{
            height: 400,
            width: "100%",
            marginTop: "0px",
            paddingTop: "0px",
          }}
        >
          <Table>
            <TableHead sx={{ pt: 0, mt: 0 }}>
              <TableRow sx={{ pt: 0, mt: 0 }}>
                <TableCell>Screen</TableCell>
                <TableCell>Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable &&
                dataTable.map((row) => (
                  <Row
                    handleCheckRow={handleCheckRow}
                    key={row.PermissionID}
                    row={row}
                    checkedPermission={checkedPermission}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TabPanel>
  );
}
