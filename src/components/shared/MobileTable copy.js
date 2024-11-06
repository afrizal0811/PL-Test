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
import { Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

MobileTable.propTypes = {
  rowDetail: PropTypes.array,
  data: PropTypes.array,
  label: PropTypes.string,
  id: PropTypes.string,
};

export default function MobileTable(props) {
  useEffect(() => {
    console.log("data", props.data);
  }, [props.data]);
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography variant="h6" align="center" gutterBottom display="inline">
          {props.label}
        </Typography>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            {/* <TableHead variant="head">
              <TableRow variant="head">
                <TableCell align="center" variant="head">
                  {props.label}
                </TableCell>
              </TableRow>
            </TableHead> */}
            <TableBody>
              {props.data?.length > 0
                ? props.data?.map((row) => {
                    return (
                      <>
                        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                          <TableCell
                            sx={{ width: "25px", padding: 0, margin: 0 }}
                          >
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpen(!open)}
                            >
                              {open ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                          <TableCell
                            onDoubleClick={() =>
                              props.onCellDoubleClick(row[props.id])
                            }
                            sx={{ fontWeight: "bold" }}
                          >
                            {row[props.id]}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ padding: 0, margin: 0 }}
                            colSpan={6}
                          >
                            <Collapse in={open && } timeout="auto" unmountOnExit>
                              <Box>
                                {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                                {props.rowDetail.map((col) => {
                                  return (
                                    <Table size="small">
                                      <TableBody>
                                        <TableRow
                                          align="left"
                                          sx={{ p: 0, m: 0 }}
                                        >
                                          <TableCell>
                                            {col.headerName}
                                          </TableCell>
                                          <TableCell
                                            align="left"
                                            style={{ overflow: "hidden" }}
                                          >
                                            {row[col.field]}
                                          </TableCell>
                                        </TableRow>
                                      </TableBody>
                                    </Table>
                                  );
                                })}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                    //
                  })
                : " No Items"}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={props.totaldata}
          rowsPerPage={5}
          page={props.page}
          onPageChange={props.onPageChange}
        />
      </Paper>
    </React.Fragment>
  );
}
