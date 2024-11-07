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
  const columnsCust = [
    {
      field: "id",
      headerName: "Customer ID",
      width: 200,
    },
    {
      field: "text",
      headerName: "Customer Name",
      width: 200,
    },
  ];

  React.useEffect(() => {
    setRows(DataCust);
  }, [DataCust]);

  useEffect(() => {
    setOpenCust(props.openCust);
  }, [props.openCust]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/master/Customer",
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
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
                getRowId={(row) => row.id}
                columns={columnsCust}
                hideFooter={true}
                density="compact"
                selectionModel={SelectedCust[0]?.id}
                onRowDoubleClick={(e) => {
                  // console.log(
                  //   "doble",
                  //   Rows.filter((i) => i.id == e.id)[0]
                  //   // e
                  // // );
                  props.setOpenCust(false);
                  props.setTempCustomer(Rows.filter((i) => i.id == e.id)[0]);
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    Rows.filter((i) => e.includes(i.id))[0]
                    // Rows.filter((i) => i.id == e.id)[0]
                    // e
                  );
                  setSelectedCust(Rows.filter((i) => e.includes(i.id))[0]);
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
              setSelectedCust([]);
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
              console.log("sele", SelectedCust);
              props.setTempCustomer(SelectedCust);
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
