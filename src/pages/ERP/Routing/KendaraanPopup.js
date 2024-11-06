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

export default function KendaraanPopup(props) {
  //state Customer ID
  const [openCust, setOpenCust] = React.useState(props.openCust);
  const [searchText, setSearchText] = React.useState("");
  const [DataCust, setDataCust] = useState([]);
  const [TempCust, setTempCust] = React.useState([]);
  const [Rows, setRows] = useState([]);
  const [SelectedCust, setSelectedCust] = React.useState([]);
  const [currentpage, setcurrentpage] = React.useState(1);
  const [totaldata, settotaldata] = useState(1);
  const columnsCust = [
    {
      field: "IDKendaraan",
      headerName: "Vehicle ID",
      width: 95,
      sortable: false,
    },
    {
      field: "NamaKendaraan",
      headerName: "Vehicle Name",
      sortable: false,
      width: 130,
    },
    {
      field: "NoPolisi",
      headerName: "No Polisi",
      sortable: false,
      width: 100,
    },
    {
      field: "KendaraanDriverLineRep",
      headerName: "Driver Name",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <p>
          {!params.value[0]?.NamaDriver ? " " : params.value[0]?.NamaDriver}
        </p>
      ),
    },
    {
      field: "helper",
      headerName: "Helper Name",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <p>
          {!params.row.KendaraanDriverLineRep[1]?.NamaDriver
            ? " "
            : params.row.KendaraanDriverLineRep[1]?.NamaDriver}
        </p>
      ),
    },
    {
      field: "BranchID",
      sortable: false,
      headerName: "Branch",
      width: 100,
    },
    {
      field: "KendaraanZonaLineRep",
      headerName: "Shipping Zone",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <p>{!params.value[0]?.ZoneID ? " " : params.value[0]?.ZoneID}</p>
      ),
    },
    {
      field: "KendaraanGeneralLineRep2",
      headerName: "Storage Type",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <p>
          {!params.row.KendaraanGeneralLineRep[0]?.TipeStorage
            ? " "
            : params.row.KendaraanGeneralLineRep[0]?.TipeStorage}
        </p>
      ),
    },
    {
      field: "KendaraanGeneralLineRep3",
      headerName: "Weight",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <p>
          {!params.row.KendaraanGeneralLineRep[0]?.KapasitasWeight
            ? " "
            : params.row.KendaraanGeneralLineRep[0]?.KapasitasWeight}
        </p>
      ),
    },
    {
      field: "KendaraanGeneralLineRep",
      headerName: "Volume",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <p>
          {!params.value[0]?.KapasitasVolume
            ? " "
            : params.value[0]?.KapasitasVolume}
        </p>
      ),
    },
  ];

  useEffect(() => {
    setOpenCust(props.openCust);
    if (props.openCust) {
      getData();
      setSelectedCust([]);
    }
  }, [props.openCust]);

  // useEffect(() => {
  //   getData(1);
  // }, [searchText]);

  const getData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/KendaraanReps/",
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            // console.log("res", resdata);
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                ...resdata[key],
              });
            });
            console.log("a", newres);
            setDataCust(newres);
            setRows(newres);
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
    console.log(searchRegex);
    const filteredRows = DataCust.filter((row) => {
      return Object.keys(row).some((field) => {
        // console.log("row[field]", row[field]);
        // console.log("field", field);
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
          props.setopenCust(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Kendaraan</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Kendaraan List</DialogContentText>
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
                getRowId={(row) => row.IDKendaraan}
                columns={columnsCust}
                hideFooter={true}
                disableColumnFilter
                disableColumnMenu
                autoHeight
                // pageSize={5}
                density="compact"
                checkboxSelection
                disableSelectionOnClick
                selectionModel={SelectedCust}
                onSelectionModelChange={(e) => {
                  setSelectedCust(e);
                  const selectedIDs = new Array(e);
                  const selectedRows = Rows.filter((r) =>
                    selectedIDs[0]?.includes(r.IDKendaraan)
                  );
                  console.log("selectred", selectedRows);
                  console.log("select ids", selectedIDs);
                  setTempCust(selectedRows);
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
                props.setTempCustomer(TempCust);
              } else {
                props.setTempCustomer([]);
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
