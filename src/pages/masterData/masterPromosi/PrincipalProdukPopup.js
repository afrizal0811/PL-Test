import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import axios from "axios";
import { GetConfig } from "../../../utils/ConfigHeader";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import {
  Grid,
  TextField as MuiTextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import moment from "moment";
import { Box, spacing } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const TextField = styled(MuiTextField)(spacing);

const columnsPrincipal = [
  // {
  //   field: "id",
  //   headerName: "Product Principal ID",
  //   width: 200,
  // },
  {
    field: "text",
    headerName: "Description",
    width: 200,
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

function PrincipalProdukPopup(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [principalID, setprincipalID] = useState("");
  // const [openModal, setOpenModal] = React.useState(false);

  //state function
  const [DataPincipal, setDataPincipal] = useState([]);
  const [Rows, setRows] = useState([]);
  const [TempPincipal, setTempPincipal] = React.useState([]);
  const [SelectedPrincipal, setSelectedPrincipal] = React.useState(() =>
    DataPincipal.filter((el) => {
      props.ProductPrincipalID.includes(el.id);
    })
  );

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = DataPincipal.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(DataPincipal);
  }, [DataPincipal]);

  useEffect(() => {
    getDataPrincipal();
    props.setProductPrincipalID({ id: "", text: "" });
  }, [props.ProductGroupID]);

  useEffect(() => {
    let arr = DataPincipal.filter((i) =>
      props.ProductPrincipalID.includes(i.id)
    );
    setTempPincipal(arr);
    // setSelectedPrincipal(
    //   arr.map((a) => {
    //     return a.id;
    //   })
    // );
    setSelectedPrincipal(arr);
  }, [DataPincipal, props.ProductPrincipalID]);

  const getDataPrincipal = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/master/ProductGroup/Principal/" +
            props.ProductGroupID,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataPincipal(response.data);
            setRows(response.data);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={props.openModalPP}
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => props.setOpenModalPP(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Select Product Principal</DialogTitle>
      <DialogContent>
        <Grid container md={12}>
          <Grid item md={6} xs={12}>
            <DialogContentText>Product Principal List</DialogContentText>
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
              columns={columnsPrincipal}
              hideFooter={true}
              // onRowDoubleClick={() => {
              //   props.setOpenModalPP(false);
              //   props.setProductPrincipalID(SelectedPrincipal[0]);
              // }}
              disableColumnFilter
              disableColumnMenu
              density="compact"
              selectionModel={SelectedPrincipal}
              onSelectionModelChange={(e) => {
                setSelectedPrincipal(e);
                props.setPrincipalProdukEdit(true);
                console.log("produk principal", e);
              }}
            />
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpenModalPP(false);
            setSelectedPrincipal(
              TempPincipal.map((a) => {
                return a.id;
              })
            );
          }}
          color="warning"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.setOpenModalPP(false);
            console.log("SelectedPrincipal", SelectedPrincipal);
            if (SelectedPrincipal.length > 0) {
              props.setProductPrincipalID(
                DataPincipal.filter((ae) => ae.id == SelectedPrincipal[0])[0]
              );
            }
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PrincipalProdukPopup;
