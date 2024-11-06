import { Box } from "@material-ui/system";
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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../utils/ConfigHeader";

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

export default function SalesPersonPopup(props) {
  //state Customer ID
  const [openSP, setOpenSP] = React.useState(props.openSP);
  const [searchText, setSearchText] = React.useState("");
  const [pageSize, setpageSize] = useState(5);
  const [currentpage, setcurrentpage] = React.useState(1);
  const [totaldata, settotaldata] = useState(1);
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
  const columnsCust = [
    {
      field: "SalespersonID",
      headerName: "Sales Person ID",
      width: 180,
    },
    {
      field: "Name",
      headerName: "Sales Person Name",
      width: 350,
    },
  ];

  React.useEffect(() => {
    setRows(DataCust);
  }, [DataCust]);

  useEffect(() => {
    setOpenSP(props.openSP);
  }, [props.openSP]);

  useEffect(() => {
    getData(1);
  }, [searchText]);

  const getData = async (page) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/SalesPersonSync?page=${page}&rowsCount=${pageSize}&id=${searchText}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
            settotaldata(resdata.totalCountData);
            if (resdata.salesperson !== null) {
              setDataCust(resdata.salesperson);
              setRows(resdata.salesperson);
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
        open={openSP}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => {
          props.setOpenSP(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Sales Person</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Sales Person List</DialogContentText>
            </Grid>
            <Grid item md={6} xs={12}>
              <QuickSearchToolbar
                sx={{ ml: "auto" }}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                clearSearch={() => setSearchText("")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={Rows}
                getRowId={(row) => row.SalespersonID}
                columns={columnsCust}
                // hideFooter={true}
                autoHeight
                density="compact"
                pageSize={pageSize}
                selectionModel={SelectedCust[0]?.SalespersonID}
                onRowDoubleClick={(e) => {
                  // console.log(
                  //   "doble",
                  //   Rows.filter((i) => i.SalespersonID == e.id)[0]
                  //   // e
                  // );
                  props.setOpenSP(false);
                  props.setSalesPerson(
                    Rows.filter((i) => i.SalespersonID == e.id)[0]
                  );
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    Rows.filter((i) => e.includes(i.SalespersonID))[0]
                    // Rows.filter((i) => i.SalespersonID == e.id)[0]
                    // e
                  );
                  setSelectedCust(
                    Rows.filter((i) => e.includes(i.SalespersonID))[0]
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
              props.setOpenSP(false);
              // setPrincipal("");
              // setSelectedCust(props.SalesPerson);
              setSelectedCust([]);
              // setFilterCustomer(props.SalesPerson);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setOpenSP(false);
              // props.setSalesPerson(SelectedCust);
              console.log("sele", SelectedCust);
              props.setSalesPerson(SelectedCust);
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
