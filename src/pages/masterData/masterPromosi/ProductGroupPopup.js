import { Box, spacing } from "@material-ui/system";
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
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";

const TextField = styled(MuiTextField)(spacing);

const columnsProductGroup = [
  {
    field: "id",
    headerName: "Product Group ID",
    width: 130,
    sortable: false,
  },
  {
    field: "text",
    headerName: "Description",
    width: 200,
    sortable: false,
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

function ProductGroupPopup(props) {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [ProductGroupID, setProductGroupID] = useState("");
  // const [openModal, setOpenModal] = React.useState(false);

  //state function
  const [DataProductGroup, setDataProductGroup] = useState([]);
  const [Rows, setRows] = useState([]);
  const [TempProductGroup, setTempProductGroup] = React.useState([]);
  const [SelectedProductGroup, setSelectedProductGroup] = React.useState(() =>
    DataProductGroup.filter((el) => {
      ProductGroupID.includes(el.id);
    })
  );

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = DataProductGroup.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  React.useEffect(() => {
    setRows(DataProductGroup);
  }, [DataProductGroup]);

  useEffect(() => {
    getDataProductGroup();
  }, []);

  useEffect(() => {
    let arr = DataProductGroup.filter((i) => i.id == props.ProductGroupID);
    setTempProductGroup(arr);
    setSelectedProductGroup(
      arr.map((a) => {
        return a.id;
      })
    );
  }, [DataProductGroup, ProductGroupID]);

  const getDataProductGroup = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/master/ProductGroup",
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            setDataProductGroup(response.data);
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
      open={props.openModalPG}
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => props.setOpenModalPG(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Select Product Group</DialogTitle>
      <DialogContent>
        <Grid container md={12}>
          <Grid item md={6} xs={12}>
            <DialogContentText>Product Group List</DialogContentText>
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
              columns={columnsProductGroup}
              hideFooter={true}
              disableColumnFilter
              disableColumnMenu
              density="compact"
              onRowDoubleClick={() => {
                props.setOpenModalPG(false);
                props.setProductGroupID(SelectedProductGroup.toString());
              }}
              selectionModel={SelectedProductGroup}
              onSelectionModelChange={(e) => {
                setSelectedProductGroup(e);
                props.setPrincipalProdukEdit(true);
              }}
            />
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.setOpenModalPG(false);
            setSelectedProductGroup(
              TempProductGroup.map((a) => {
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
            props.setOpenModalPG(false);
            if (SelectedProductGroup.length > 0) {
              props.setProductGroupID(SelectedProductGroup.toString());
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

export default ProductGroupPopup;
