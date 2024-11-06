import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Button as MuiButton,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "RefNbr",
    headerName: "Reference Nbr",
    sortable: false,
    width: 150,
  },
  {
    field: "Date",
    headerName: "Date",
    sortable: false,
    width: 150,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "Description",
    headerName: "Description",
    sortable: false,
    width: 150,
  },
  {
    field: "Status",
    headerName: "Status",
    sortable: false,
    width: 150,
  },
];

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

export default function DialogRefNbr(props) {
  const [Data, setData] = useState([]);
  const [Rows, setRows] = useState([]);
  const [loading, setloading] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [SelectedPromo, setSelectedPromo] = React.useState([]);
  // React.useEffect(() => {
  //   setRowsState((prevRowCountState) => {
  //   });
  // }, [rowsState, setRowsState]);

  React.useEffect(() => {
    if (props.openRefnbr == true) {
      getData();
    }
  }, [props.openRefnbr]);

  // React.useEffect(() => {
  //   setIDinc
  // }, [props.IDLength]);

  const getData = async () => {
    setloading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ChangeLotNbrExpDateReps/`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data ChangeLotNbrExpDateReps = ", response);
          if (response.status == 200) {
            const resdata = response.data;
            let sort = resdata.sort(
              (a, b) => parseFloat(b.RefNbr) - parseFloat(a.RefNbr)
            );
            setData(sort);
            setRows(sort);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setloading(false);
    } catch (error) {
      console.log(error.message);
      setloading(false);
    }
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    setSelectedPromo([]);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = Data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.openRefnbr}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setopenRefnbr(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Ref Nbr</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Ref Nbr List</DialogContentText>
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
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={Rows}
                pageSize={5}
                autoHeight
                getRowId={(row) => row.RefNbr}
                columns={columns}
                disableColumnMenu
                selectionModel={
                  SelectedPromo.length > 0 ? SelectedPromo[0]?.RefNbr : []
                }
                onRowDoubleClick={(e) => {
                  window.location.replace(
                    `/change-lot-nbr-exp-date/detail/${e.row["RefNbr"]}`
                  );
                }}
                onSelectionModelChange={(e) => {
                  setSelectedPromo(Rows.filter((i) => e.includes(i.RefNbr))[0]);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setopenRefnbr(false);
              // setSelectedPromo(props.TempPromo);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // props.setopenRefnbr(false);
              window.location.replace(
                `/change-lot-nbr-exp-date/detail/${SelectedPromo.RefNbr}`
              );
              // props.setTempPromoID(SelectedPromo);
            }}
            disabled={!SelectedPromo?.RefNbr}
            color="primary"
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
