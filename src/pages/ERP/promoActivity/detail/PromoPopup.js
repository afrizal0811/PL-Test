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
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";

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
  const [DataPromo, setDataPromo] = useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [Rows, setRows] = useState([]);
  const [FilterPromo, setFilterPromo] = React.useState([]);
  const [pageSize, setpageSize] = React.useState(5);
  const [currentpage, setcurrentpage] = React.useState(0);
  const [totaldata, settotaldata] = useState(1);
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
      field: "promoDescr",
      headerName: "Description",
      sortable: false,
      width: 200,
    },
    {
      field: "principal",
      headerName: "Principal",
      sortable: false,
      width: 190,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      sortable: false,
      width: 170,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      sortable: false,
      width: 170,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss a")}</p>
        </>
      ),
    },
    {
      field: "promoID",
      headerName: "Promo ID",
      sortable: false,
      width: 140,
    },
  ];

  // useEffect(() => {
  //   setOpenPromo(props.openPromo);
  // }, [props.openPromo]);

  useEffect(() => {
    if (props.openPromo) {
      getData(1);
    }
  }, [props.openPromo, pageSize, searchText]);

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

  const getData = async (page) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            `/Promo/Pagination2?page=${page}&rowsCount=${pageSize}&Active=true&principal=${searchText}&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
            settotaldata(resdata.totalCountData);
            setDataPromo(resdata.record);
            setRows(resdata.record);
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
        open={props.openPromo}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => {
          props.setOpenPromo(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Promotion</DialogTitle>
        <DialogContent>
          <Grid container md={12}>
            <Grid item md={6} xs={12}>
              <DialogContentText>Promotion List</DialogContentText>
            </Grid>
            <Grid item md={6} xs={12}>
              <QuickSearchToolbar
                sx={{ ml: "auto" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                clearSearch={() => setSearchText("")}
                // onChange={(event) => requestSearch(event.target.value)}
                // clearSearch={() => requestSearch("")}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ width: "100%" }}>
              <DataGrid
                rows={Rows}
                getRowId={(row) => row.promoID}
                columns={columnsPromo}
                autoHeight
                // hideFooter={true}
                density="compact"
                disableColumnFilter
                disableColumnMenu
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                selectionModel={SelectedPromo[0]?.promoID}
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                onRowDoubleClick={(e) => {
                  props.setOpenPromo(false);
                  props.setTempPromoID(
                    Rows.filter((i) => i.promoID == e.id)[0]
                  );
                }}
                onSelectionModelChange={(e) => {
                  setSelectedPromo(
                    Rows.filter((i) => e.includes(i.promoID))[0]
                  );
                  console.log("temppropo", props.TempPromoID);
                }}
                paginationMode="server"
                page={currentpage}
                pagination
                rowCount={totaldata}
                onPageChange={(page) => {
                  setcurrentpage(page);
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
              props.setOpenPromo(false);
              setSelectedPromo(props.TempPromoID);
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
