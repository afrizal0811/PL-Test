import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider as MuiDivider,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { GetConfig } from "../../utils/ConfigHeader";

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

export default function SelectPopup(props) {
  //state Customer ID
  const [open, setOpen] = React.useState(props.open);
  const [searchText, setSearchText] = React.useState("");
  const [DataCust, setDataCust] = useState([]);
  const [FilterCustomer, setFilterCustomer] = React.useState([]);
  const [Rows, setRows] = useState([]);
  const [SelectedCust, setSelectedCust] = React.useState([]);
  const columnsCust = [
    {
      field: props.id,
      headerName: props.id,
      width: props.widthFirstCol ? props.widthFirstCol : 200,
    },
    {
      field: props.desc,
      headerName: props.desc,
      width: props.widthSecondCol ? props.widthSecondCol : 200,
    },
  ];

  React.useEffect(() => {
    setRows(DataCust);
  }, [DataCust]);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    if (props.searchParam && searchText != "") {
      getDataSearch();
    }
  }, [searchText]);

  useEffect(() => {
    getData();
  }, [props.api]);

  const getData = async () => {
    try {
      const res = await axios
        .get(props.api, !props.config ? GetConfig() : props.config)
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
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

  const getDataSearch = async () => {
    try {
      const res = await axios
        .get(
          props.api + props.searchParam + searchText,
          !props.config ? GetConfig() : props.config
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
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
    if (props.searchParam) {
      return;
    }
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
        open={props.open}
        fullWidth={true}
        maxWidth={props.maxWidth ? props.maxWidth : "md"}
        onClose={() => {
          props.setopen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select {props.name}</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>{props.name} List</DialogContentText>
            </Grid>
            <Grid item md={6} xs={12}>
              <QuickSearchToolbar
                sx={{ ml: "auto" }}
                value={searchText}
                onChange={(event) => requestSearch(event.target.value)}
                clearSearch={() => requestSearch("")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={Rows}
                density="compact"
                getRowId={(row) => row[props.id]}
                columns={columnsCust}
                hideFooter={true}
                selectionModel={SelectedCust}
                // onRowDoubleClick={(e) => {
                //   props.setopen(false);
                //   // console.log("e", e);
                //   props.setTemp(e.id);
                // }}
                onSelectionModelChange={(e) => {
                  setSelectedCust(e);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setopen(false);
              // setPrincipal("");
              // setSelectedCust(props.TempCustomer);
              setSelectedCust(props.Temp);
              // setFilterCustomer(props.TempCustomer);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setopen(false);
              // props.setTemp(SelectedCust);
              if (props.all) {
                props.setTemp(
                  Rows.filter(
                    (ae) => ae[props.id] == SelectedCust.toString()
                  )[0]
                );
              } else {
                props.setTemp(SelectedCust.toString());
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
