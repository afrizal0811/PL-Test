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
import moment from "moment";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { Box } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

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

export default function PromoPopup(props) {
  //state Promo ID
  const [openPromo, setOpenPromo] = React.useState(props.openPromo);
  const [DataPromo, setDataPromo] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [Rows, setRows] = useState([]);
  const [FilterPromo, setFilterPromo] = React.useState([]);
  const [SelectedPromo, setSelectedPromo] = React.useState(() =>
    DataPromo.filter((el) => {
      return FilterPromo.some((f) => {
        return (
          f.PromoName === el.PromoName &&
          f.PromoID === el.PromoID &&
          f.Address1 === el.Address1 &&
          f.Address2 === el.Address2
        );
      });
    })
  );
  const columnsPromo = [
    {
      field: "promoID",
      headerName: "Promo ID",
      width: 200,
    },
    {
      field: "principalID",
      headerName: "Principal ID",
      width: 200,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 200,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 200,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "promoDescr",
      headerName: "Description",
      width: 200,
    },
  ];

  useEffect(() => {
    setOpenPromo(props.openPromo);
  }, [props.openPromo]);

  useEffect(() => {
    getData();
  }, []);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = DataPromo.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  const getData = async () => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/Promo/active",
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setDataPromo(resdata);
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

  return (
    <React.Fragment>
      <Dialog
        open={openPromo}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenPromo(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Promo</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Promo List</DialogContentText>
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
                getRowId={(row) => row.promoID}
                columns={columnsPromo}
                hideFooter={true}
                density="compact"
                selectionModel={SelectedPromo}
                onRowDoubleClick={(e) => {
                  props.setOpenPromo(false);
                  props.setTempPromoID(e.id);
                }}
                onSelectionModelChange={(e) => {
                  setSelectedPromo(e);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenPromo(false);
              setSelectedPromo(props.TempPromo);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setOpenPromo(false);
              props.setTempPromoID(SelectedPromo);
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
