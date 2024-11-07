import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { getBrach } from "../../../../../utils/jwt";
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box sx={{ bgcolor: "yellow" }}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          pr: 4,
          m: (theme) => theme.spacing(0),
          "& .MuiSvgIcon-root": {
            mr: 5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
          float: "right",
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function AdmPiutangPopup(props) {
  //state Customer ID
  const [openCust, setOpenCust] = React.useState(props.openCust);
  const [searchText, setSearchText] = React.useState("");
  const [DataCust, setDataCust] = useState([]);
  const [FilterCustomer, setFilterCustomer] = React.useState([]);
  const [Rows, setRows] = useState([]);
  const [SelectedCust, setSelectedCust] = React.useState(() =>
    DataCust.filter((el) => {
      return FilterCustomer.some((f) => {
        return (
          f.CustomerName === el.CustomerName &&
          f.CustID === el.CustID &&
          f.Address1 === el.Address1 &&
          f.Address2 === el.Address2
        );
      });
    })
  );
  const [currentpage, setcurrentpage] = React.useState(1);
  const [totaldata, settotaldata] = useState(1);
  const columnsCust = [
    {
      field: "employeeID",
      headerName: "Employee ID",
      width: 180,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 200,
    },
  ];

  useEffect(() => {
    setOpenCust(props.openCust);
    if (props.openCust) {
      getData();
    }
  }, [props.openCust]);

  // useEffect(() => {
  //   getData(1);
  // }, [searchText]);

  const getData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/EmployeeReps/DropDown/EmployeeIsAdminPiutang?branchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            // console.log("res", resdata);
            setDataCust(resdata);
            setRows(resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = DataCust.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openCust}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => {
          props.setopenCust(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Admin Piutang</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Admin Piutang List</DialogContentText>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="standard"
                value={searchText}
                onChange={(e) => requestSearch(e.target.value)}
                placeholder="Search…"
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" />,
                  endAdornment: (
                    <IconButton
                      title="Clear"
                      aria-label="Clear"
                      size="small"
                      style={{ visibility: props.value ? "visible" : "hidden" }}
                      onClick={() => requestSearch("")}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  width: {
                    xs: 1,
                    sm: "auto",
                  },
                  pr: 4,
                  m: (theme) => theme.spacing(0),
                  "& .MuiSvgIcon-root": {
                    mr: 5,
                  },
                  "& .MuiInput-underline:before": {
                    borderBottom: 1,
                    borderColor: "divider",
                  },
                  float: "right",
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 370, width: "100%" }}>
              <DataGrid
                rows={Rows}
                getRowId={(row) => row.employeeID}
                columns={columnsCust}
                hideFooter={true}
                // pageSize={5}
                selectionModel={
                  SelectedCust !== "" ? SelectedCust?.employeeID : ""
                }
                onRowDoubleClick={(e) => {
                  // console.log(
                  //   "doble",
                  //   Rows.filter((i) => i.id == e.id)[0]
                  //   // e
                  // );
                  console.log("e", e);
                  props.setopenCust(false);
                  props.setTempCustomer(
                    Rows.filter((i) => i.employeeID == e.id)[0]
                  );
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    Rows.filter((i) => e.includes(i.employeeID))[0]
                    // Rows.filter((i) => i.id == e.id)[0]
                    // e
                  );
                  setSelectedCust(
                    Rows.filter((i) => e.includes(i.employeeID))[0]
                  );
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setopenCust(false);
              // setPrincipal("");
              // setSelectedCust(props.TempCustomer);
              setSelectedCust(props.TempCustomer);
              // setFilterCustomer(props.TempCustomer);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setopenCust(false);
              // props.setTempCustomer(SelectedCust);
              // console.log("SelectedCust", SelectedCust);
              // props.setTempCustomer(SelectedCust);

              if (SelectedCust !== undefined) {
                props.setTempCustomer(SelectedCust);
              } else {
                props.setTempCustomer("");
              }
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
