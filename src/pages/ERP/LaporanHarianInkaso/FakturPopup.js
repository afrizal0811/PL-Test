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
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
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

export default function FakturPopup(props) {
  //state Customer ID
  const [openCust, setOpenCust] = React.useState(props.openCust);
  const [searchText, setSearchText] = React.useState("");
  // const [DataCust, setDataCust] = useState([]);
  // const [FilterCustomer, setFilterCustomer] = React.useState([]);
  const [Rows, setRows] = useState([]);
  const [SelectedCust, setSelectedCust] = React.useState([]);
  const [currentpage, setcurrentpage] = React.useState(1);
  const [totaldata, settotaldata] = useState(1);
  const columnsCust = [
    {
      field: "referenceNbr",
      headerName: "No.Faktur",
      sortable: false,
      width: 140,
    },
    {
      field: "customer",
      headerName: "Customer ID",
      sortable: false,
      width: 130,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      sortable: false,
      width: 120,
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : (
          <></>
        ),
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: false,
      type: "number",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              value={params.value}
              displayType={"text"}
            />
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 200,
    },
  ];

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    console.log(searchRegex);
    const filteredRows = props.dropdown.filter((row) => {
      return Object.keys(row).some((field) => {
        // console.log("row[field]", row[field]);
        // console.log("field", field);
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(props.dropdown);
    console.log("dropdown2", props.dropdown);
  }, [props.dropdown, props.openCust]);

  return (
    <React.Fragment>
      <Dialog
        open={props.openCust}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setopenCust(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Faktur</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Faktur List</DialogContentText>
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
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={Rows}
                getRowId={(row) => row.referenceNbr}
                columns={columnsCust}
                hideFooter={true}
                disableColumnFilter
                disableColumnMenu
                autoHeight
                // pageSize={5}
                density="compact"
                selectionModel={
                  SelectedCust !== "" ? SelectedCust?.referenceNbr : ""
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
                    Rows.filter((i) => i.referenceNbr == e.id)[0]
                  );
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    Rows.filter((i) => e.includes(i.referenceNbr))[0]
                    // Rows.filter((i) => i.id == e.id)[0]
                    // e
                  );
                  setSelectedCust(
                    Rows.filter((i) => e.includes(i.referenceNbr))[0]
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
              setSelectedCust([]);
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
