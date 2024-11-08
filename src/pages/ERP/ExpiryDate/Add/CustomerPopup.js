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
import { GetConfig } from "../../../../utils/ConfigHeader";
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

export default function CustomerPopup(props) {
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
      field: "customerID",
      headerName: "Customer ID",
      sortable: false,
      width: 110,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      sortable: false,
      width: 300,
    },
    {
      field: "addressLine1",
      headerName: "Address Line 1",
      sortable: false,
      width: 350,
    },
    {
      field: "addressLine2",
      headerName: "Address Line 2",
      sortable: false,
      width: 310,
    },
  ];

  useEffect(() => {
    setOpenCust(props.openCust);
  }, [props.openCust]);

  useEffect(() => {
    getData(1);
  }, [searchText]);

  const getData = async (page) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/CustomerReps/PopUp/Customer?page=${page}&rowsCount=5&customerName=${searchText}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
            settotaldata(resdata.totalCountData);
            if (resdata.record !== null) {
              setDataCust(resdata.record);
              setRows(resdata.record);
            } else {
              setDataCust([]);
              setRows([]);
            }
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

  // const requestSearch = (searchValue) => {
  //   setSearchText(searchValue);
  //   const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
  //   const filteredRows = DataCust.filter((row) => {
  //     return Object.keys(row).some((field) => {
  //       return searchRegex.test(row[field].toString());
  //     });
  //   });
  //   setRows(filteredRows);
  // };

  return (
    <React.Fragment>
      <Dialog
        open={openCust}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenCust(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Customer</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Customer List</DialogContentText>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="standard"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search…"
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" />,
                  endAdornment: (
                    <IconButton
                      title="Clear"
                      aria-label="Clear"
                      size="small"
                      style={{ visibility: props.value ? "visible" : "hidden" }}
                      onClick={() => setSearchText("")}
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
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={Rows}
                getRowId={(row) => row.customerID}
                columns={columnsCust}
                autoHeight
                // hideFooter={true}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                pageSize={5}
                selectionModel={
                  SelectedCust !== "" ? SelectedCust?.customerID : ""
                }
                onRowDoubleClick={(e) => {
                  // console.log(
                  //   "doble",
                  //   Rows.filter((i) => i.id === e.id)[0]
                  //   // e
                  // );
                  console.log("e", e);
                  props.setOpenCust(false);
                  props.setTempCustomer(
                    Rows.filter((i) => i.customerID === e.id)[0]
                  );
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    Rows.filter((i) => e.includes(i.customerID))[0]
                    // Rows.filter((i) => i.id === e.id)[0]
                    // e
                  );
                  setSelectedCust(
                    Rows.filter((i) => e.includes(i.customerID))[0]
                  );
                }}
                paginationMode="server"
                page={currentpage - 1}
                pagination
                rowCount={totaldata}
                onPageChange={(page) => {
                  setSelectedCust("");
                  setcurrentpage(page + 1);
                  getData(page + 1);
                  console.log("page = ", page);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenCust(false);
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
              props.setOpenCust(false);
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
