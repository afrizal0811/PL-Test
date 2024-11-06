import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { GetConfig } from "../../utils/ConfigHeader";
import Loader from "../Loader";

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

export default function ItemPopup(props) {
  //state Customer ID
  const [openCust, setopenCust] = React.useState(props.open);
  const [Loading, setLoading] = React.useState(false);
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
  const columnsCust = [
    {
      field: props.id,
      headerName: props.id,
      width: 200,
    },
    {
      field: props.desc,
      headerName: props.desc,
      width: 600,
    },
  ];

  React.useEffect(() => {
    setRows(DataCust);
  }, [DataCust]);

  useEffect(() => {
    setopenCust(props.open);
  }, [props.open]);

  useEffect(() => {
    if (searchText.length > 3) getData();
    if (searchText.length == 0) getData();
  }, [searchText]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(props.api + searchText, !props.config ? GetConfig() : props.config)
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
    setLoading(false);
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
        open={props.open}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setopen(false);
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
                // onChange={(event) => requestSearch(event.target.value)}
                // clearSearch={() => requestSearch("")}
                onChange={(event) => setSearchText(event.target.value)}
                clearSearch={() => setSearchText("")}
              />
            </Grid>
          </Grid>
          {Loading ? (
            <Loader />
          ) : (
            <Grid container spacing={3} md={12} mt={2}>
              <div style={{ height: 300, width: "100%" }}>
                <DataGrid
                  rows={Rows}
                  getRowId={(row) => row[props.id]}
                  columns={columnsCust}
                  hideFooter={true}
                  selectionModel={
                    SelectedCust[0] ? SelectedCust[0][props.id] : []
                  }
                  onRowDoubleClick={(e) => {
                    // console.log(
                    //   "doble",
                    //   // Rows.filter((i) => i.id == e.id)[0]
                    //   e
                    // );
                    props.setopen(false);
                    props.setTemp(Rows.filter((i) => e.id == i[props.id])[0]);
                  }}
                  onSelectionModelChange={(e) => {
                    console.log(
                      "change",
                      Rows.filter((i) => e.includes(i[props.id]))[0]
                      // Rows.filter((i) => i.id == e.id)[0]
                      // e
                    );
                    setSelectedCust(
                      Rows.filter((i) => e.includes(i[props.id]))[0]
                    );
                  }}
                />
              </div>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setopen(false);
              // setPrincipal("");
              // setSelectedCust(props.TempCustomer);
              setSelectedCust([]);
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
              console.log("sele", SelectedCust);
              props.setTemp(SelectedCust);
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
