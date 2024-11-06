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
import { GetConfig } from "../../../../utils/ConfigHeader";
import axios from "axios";
import { Box } from "@material-ui/system";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CbData from "../../../../components/shared/dropdown";

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

export default function ProdukPopup(props) {
  //state Produk ID
  const [openProduk, setOpenProduk] = React.useState(props.openProduk);
  const [PG, setPG] = useState([{ id: "", text: "" }]);
  const [PP, setPP] = useState([{ id: "", text: "" }]);
  const [PK, setPK] = useState([{ id: "", text: "" }]);

  useEffect(() => {
    setOpenProduk(props.openProduk);
  }, [props.openProduk]);

  useEffect(() => {
    // getData();
  }, []);

  return (
    <React.Fragment>
      <Dialog
        open={openProduk}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenProduk(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Select Product by Group, Principal, Kelompok
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} md={12} mt={2}>
            <Grid item md={12} xs={12}>
              <CbData
                required
                config={GetConfig()}
                all
                value={PG[0].id}
                source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup`}
                id={"id"}
                desc={"text"}
                label="Product Group"
                onChange={(newValue) => {
                  setPG(newValue);
                  setPP([{ id: "", text: "" }]);
                  setPK([{ id: "", text: "" }]);
                  // console.log("newvalue", newValue);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <CbData
                required
                config={GetConfig()}
                all
                value={PP[0].text}
                source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup/Principal/${PG[0]?.id}`}
                id={"text"}
                desc={""}
                label="Product Principal"
                onChange={(newValue) => {
                  setPP(newValue);
                  setPK([{ id: "", text: "" }]);
                  // console.log("newvalue", newValue);
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <CbData
                required
                config={GetConfig()}
                all
                value={PK[0].text}
                source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/ProductGroup/Kelompok/${PP[0]?.id}`}
                id={"text"}
                desc={""}
                label="Product Kelompok"
                onChange={(newValue) => {
                  setPK(newValue);
                  // console.log("newvalue", newValue);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setopenProduk(false);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.setopenProduk(false);
              props.setTempProduct([PG[0].text, PP[0].text, PK[0].text]);
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
