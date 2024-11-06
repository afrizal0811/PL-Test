import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { GetConfig } from "../../utils/ConfigHeader";
import { TextField, Typography } from "@material-ui/core";

MobileTableEntry.propTypes = {
  rowDetail: PropTypes.array,
  data: PropTypes.array,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default function MobileTableEntry(props, { children }) {
  const [data, setdata] = useState("");
  // useEffect(() => {
  //   setOpen(props.open);
  // }, [props.open]);

  useEffect(() => {
    // getData();
  }, []);

  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h6" align="center" gutterBottom display="inline">
          {props.label}
        </Typography>
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader>
            {/* <TableHead variant="head">
              <TableRow variant="head">
                <TableCell align="center" variant="head">
                  {props.label}
                </TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              <TableRow sx={{ p: 0, m: 0 }}>
                <TableCell sx={{ fontWeight: "bold" }}>{children}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[1]}
          component="div"
          count={props.totaldata}
          rowsPerPage={1}
          page={props.page}
          onPageChange={props.onPageChange}
        />
      </Paper>
    </React.Fragment>
  );
}
