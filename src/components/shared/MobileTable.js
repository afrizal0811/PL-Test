import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

MobileTable.propTypes = {
  rowDetail: PropTypes.array,
  data: PropTypes.array,
  label: PropTypes.string,
  id: PropTypes.string,
};

const ExpandableTableRow = ({ children, expandComponent, ...otherProps }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
};

export default function MobileTable(props) {
  useEffect(() => {
    console.log("data", props.data);
  }, [props.data]);
  const [isExpanded, setIsExpanded] = React.useState(false);

  // ini untuk pop up notifikasi
  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        console.log("ini di swal delete, result = ", result);
        console.log("ini di swal delete, id = ", id);
        // deleteData(id);
      }
    });
  };

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
                ? props.data.map((row) => (
                    <ExpandableTableRow
                      key={row[props.id]}
                      isExpanded={isExpanded}
                      setIsExpanded={(e) => setIsExpanded(e)}
                      expandComponent={
                        <TableCell colSpan="5" sx={{ p: 0, m: 0 }}>
                          {props.rowDetail.map((col) => {
                            let val;
                            let header = col.headerName;
                            if (col.type === "date") {
                              val = moment(row[col.field]).format("DD/MM/YYYY");
                            } else if (col.type === "number") {
                              val = (
                                <NumberFormat
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  fixedDecimalScale={true}
                                  // thousandsGroupStyle="wan"
                                  value={row[col.field]}
                                  displayType={"text"}
                                />
                              );
                            } else if (col.renderCell !== undefined) {
                              const Obj = {
                                [props.id]: row[props.id],
                                [col.field]: row[col.field],
                              };
                              const RendereCell = () => {
                                return col.renderCell({
                                  value: row[col.field],
                                  row: Obj,
                                });
                              };
                              val = <RendereCell />;
                            } else {
                              val = row[col.field];
                            }
                            return (
                              <Table size="small">
                                <TableBody>
                                  <TableRow align="left" sx={{ p: 0, m: 0 }}>
                                    <TableCell>{header}</TableCell>
                                    <TableCell align="right">{val}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            );
                          })}
                        </TableCell>
                      }
                    >
                      <TableCell
                        onDoubleClick={() =>
                          props.onCellDoubleClick(row[props.id])
                        }
                        sx={{ fontWeight: "bold" }}
                      >
                        {row[props.id]}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => props.onCellDoubleClick(row[props.id])}
                        >
                          Detail
                        </Button>
                      </TableCell>
                    </ExpandableTableRow>
                  ))
                : " No Items"}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={props.totaldata}
          rowsPerPage={
            props?.rowsPerPage !== undefined ? props?.rowsPerPage : 5
          }
          page={props.page}
          onPageChange={props.onPageChange}
        />
      </Paper>
    </React.Fragment>
  );
}
