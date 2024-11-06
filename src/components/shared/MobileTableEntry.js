import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

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
