import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
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
        placeholder="Search RefNbr…"
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
  column: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default function RefnbrPopup(props) {
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [totalPage, settotalPage] = React.useState(1);
  const [currentpage, setcurrentpage] = React.useState(1);
  const [dataCust, setDataCust] = useState([]);
  const [filterCustomer, setFilterCustomer] = React.useState([]);
  const [rows, setRows] = useState([]);
  const [selectedCust, setSelectedCust] = React.useState(() =>
    dataCust.filter((el) => {
      return filterCustomer.some((f) => {
        return (
          f.CustomerName === el.CustomerName &&
          f.CustID === el.CustID &&
          f.Address1 === el.Address1 &&
          f.Address2 === el.Address2
        );
      });
    })
  );

  const columnRefnbr = [
    {
      field: "RefNbr",
      headerName: "Ref Nbr.",
      width: 200,
    },
    {
      field: "BrnchID",
      width: 200,
      headerName: "Branch",
    },
    {
      field: "Status",
      width: 200,
      headerName: "Status",
    },
    {
      field: "Date",
      width: 200,
      headerName: "Date",
    },
  ];

  React.useEffect(() => {
    setRows(dataCust);
  }, [dataCust]);

  useEffect(() => {
    if (props.open) {
      if (searchText.length > 3) getData(1);
      if (searchText.length == 0) getData(1);
    }
  }, [props.open, searchText]);

  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          props.api +
            `page=${page}&rowsCount=5${
              searchText.length > 0 ? "&refNbr=" + searchText : ""
            }`,
          !props.config ? GetConfig() : props.config
        )
        .then(function (response) {
          if (response.status === 200) {
            // const resdata = response.data;
            // setDataCust(resdata);
            // setRows(resdata);
            const resdata = response.data[0];
            console.log("res", resdata);
            setDataCust(resdata.record);
            setRows(resdata.record);
            settotalPage(resdata.totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = dataCust.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenRefNbr(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select {props.label}</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>{props.label} List</DialogContentText>
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
          {loading ? (
            <Grid container justifyContent="center" DCacing={1} md={12} xs={12}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress
                  disableShrink
                  style={{ textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <h1 style={{ textAlign: "center" }}>Loading</h1>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} md={12} mt={2}>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  getRowId={(row) => row[props.id]}
                  columns={columnRefnbr}
                  density="compact"
                  hideFooter={true}
                  selectionModel={
                    selectedCust[0] ? selectedCust[0][props.id] : []
                  }
                  onRowDoubleClick={(params, event) => {
                    window.location.replace(
                      `/transfer-kuota/detail/${params.row[props.id]}`
                    );
                  }}
                  onSelectionModelChange={(e) => {
                    console.log(
                      "change",
                      rows.filter((i) => e.includes(i[props.id]))[0]
                    );
                    setSelectedCust(
                      rows.filter((i) => e.includes(i[props.id]))[0]
                    );
                  }}
                  rowCount={totalPage}
                  page={currentpage - 1}
                  paginationMode="server"
                  pagination
                  onPageChange={(page) => {
                    setcurrentpage(page + 1);
                    getData(page + 1);
                  }}
                />
              </div>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenRefNbr(false);
              setSelectedCust([]);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            disabled={!selectedCust.RefNbr}
            onClick={() => {
              props.setOpenRefNbr(false);
              window.location.replace(
                `/transfer-kuota/detail/${selectedCust.RefNbr}`
              );
            }}
            color="primary"
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
