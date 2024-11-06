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
import { GetConfig } from "../../utils/ConfigHeader";

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
  const { openCust, setOpenCust, selectedCustomer, setSelectedCustomer } =
    props;

  const [searchText, setSearchText] = React.useState("");
  const [dataCust, setDataCust] = useState([]);

  const [currentpage, setCurrentPage] = React.useState(1);
  const [totalData, setTotalData] = useState(1);

  console.log({ dataCust, selectedCustomer });

  const columnsCust = [
    {
      field: "customerID",
      headerName: "Customer ID",
      width: 180,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
    },
    {
      field: "addressLine1",
      headerName: "Address Line 1",
      width: 200,
    },
    {
      field: "addressLine2",
      headerName: "Address Line 2",
      width: 200,
    },
  ];

  useEffect(() => {
    getData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const getData = (page) => {
    axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          `/CustomerReps/PopUp/Customer?page=${page}&rowsCount=5&customerName=${searchText}`,
        GetConfig()
      )
      .then(function (response) {
        if (response.status === 200) {
          const resData = response.data[0];
          setTotalData(resData.totalCountData);
          if (resData.record !== null) {
            setDataCust(resData.record);
          } else {
            setDataCust([]);
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={openCust}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          setOpenCust(false);
          setSelectedCustomer(null);
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
            <div style={{ height: 370, width: "100%" }}>
              <DataGrid
                rows={dataCust}
                getRowId={(row) => row.customerID}
                columns={columnsCust}
                pageSize={5}
                selectionModel={
                  selectedCustomer !== "" ? selectedCustomer?.customerID : ""
                }
                onRowDoubleClick={(e) => {
                  setOpenCust(false);
                }}
                onSelectionModelChange={(e) => {
                  console.log(
                    "change",
                    dataCust.filter((i) => e.includes(i.customerID))[0]
                  );
                  setSelectedCustomer(
                    dataCust.filter((i) => e.includes(i.customerID))[0]
                  );
                }}
                paginationMode="server"
                page={currentpage - 1}
                pagination
                rowCount={totalData}
                onPageChange={(page) => {
                  setSelectedCustomer("");
                  setCurrentPage(page + 1);
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
              setOpenCust(false);
              setSelectedCustomer(null);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenCust(false);
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
