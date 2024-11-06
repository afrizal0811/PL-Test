import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TabPanel } from "@mui/lab";
import {
  Checkbox,
  Collapse,
  IconButton,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, spacing } from "@mui/system";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);
const INITIAL_GROUPING_COLUMN_MODEL = ["company", "director"];

const columns = [
  {
    field: "Screen",
    headerName: "Screen",
    type: "boolean",
    width: 200,
  },
  {
    field: "Allowed",
    headerName: "Allowed To",
    width: 200,
  },
];
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ width: "25px", padding: 0, margin: 0 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          sx={{ width: "370px", fontWeight: "bold" }}
          component="th"
          scope="row"
        >
          {row.screen}
        </TableCell>
        <TableCell align="right"> </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0, margin: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.detail.map((accessRow, key) => (
                    <TableRow key={key}>
                      <TableCell
                        sx={{ width: "70px", padding: 0, margin: 0 }}
                      ></TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "350px" }}
                      >
                        {accessRow.namaAccess}
                      </TableCell>
                      <TableCell>
                        <Checkbox defaultChecked={accessRow.Access} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AccessRights(props) {
  const [data, setData] = useState(props.data);
  const [pageSize, setPageSize] = useState(5);
  const [selection, setSelection] = useState(0);

  useEffect(() => {
    setData(props.data);
  }, [props]);

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
          <Table aria-label="collapsible table">
            <TableHead sx={{ pt: 0, mt: 0 }}>
              <TableRow sx={{ pt: 0, mt: 0 }}>
                <TableCell />
                <TableCell>Screen</TableCell>
                <TableCell>Access</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((row) => <Row key={row.screen} row={row} />)
                : " "}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </TabPanel>
  );
}
