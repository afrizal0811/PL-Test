import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TextField as MuiTextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box, spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const TextField = styled(MuiTextField)(spacing);

const columnsPrincipal = [
  // {
  //   field: "id",
  //   headerName: "Product Kelompok ID",
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

function ProdukKelompokPopup(props) {
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
      props.ProductKelompokID.includes(el.id);
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
    if (props.PrincipalProdukEdit == true) {
      props.setProductKelompokID({ id: "", text: "" });
    }
  }, [props.ProductPrincipalID]);

  useEffect(() => {
    if (props.ProductKelompokID !== undefined) {
      let arr = DataPincipal.filter((i) =>
        props.ProductKelompokID.includes(i.id)
      );
      setTempPincipal(arr);
      setSelectedPrincipal(arr);
    }

    // setSelectedPrincipal(
    //   arr.map((a) => {
    //     return a.id;
    //   })
    // );
  }, [DataPincipal, props.ProductKelompokID]);

  const getDataPrincipal = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup/Kelompok/${props.ProductPrincipalID}/${props.Tipe1Group}`,
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
      open={props.openModalPK}
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => props.setOpenModalPK(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Select Product Kelompok</DialogTitle>
      <DialogContent>
        <Grid container md={12}>
          <Grid item md={6} xs={12}>
            <DialogContentText>Product Kelompok List</DialogContentText>
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
              onRowDoubleClick={() => {
                props.setOpenModalPK(false);
                props.setProductKelompokID(
                  DataPincipal.filter(
                    (i) => SelectedPrincipal.toString() == i.id
                  )[0]
                );
              }}
              selectionModel={SelectedPrincipal}
              onSelectionModelChange={(e) => {
                // setSelectedPrincipal(
                //   DataPincipal.filter((i) => e.includes(i.id))
                // );
                setSelectedPrincipal(e);
              }}
            />
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpenModalPK(false);
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
            props.setOpenModalPK(false);
            props.setProductKelompokID(
              SelectedPrincipal[0]
                ? DataPincipal.filter(
                    (i) => SelectedPrincipal.toString() == i.id
                  )[0]
                : ""
            );
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProdukKelompokPopup;
