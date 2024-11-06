import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  Typography,
  IconButton,
  TextField,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import MobileTable from "../../../components/shared/MobileTable";
import { getEmployee, getRoleName } from "../../../utils/jwt";
import { DesktopDatePicker } from "@material-ui/lab";
import QuickSearch from "../../components/QuickSearch";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Paper = styled(MuiPaper)(spacing);

const datadummy = [
  {
    id: 1,
    NoBPOM: "555",
    StockItem: "Tom Yum",
    BrandItem: "Rosebrand",
    JenisItem: "Food",
    DescBPOM: "Tom Yum Rosebrand 2kg",
  },
  {
    id: 2,
    NoBPOM: "222",
    StockItem: "Kerupuk Udang",
    BrandItem: "Rosebrand",
    JenisItem: "Food",
    DescBPOM: "Kerupuk Udang Rosebrand 2kg",
  },
];

export default function TableCompetitor() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [produk, setproduk] = useState("");
  const [brand, setbrand] = useState("");
  const [start, setstart] = useState(null);
  const [end, setend] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);

  useEffect(() => {
    setcurretPage(1);
    getData(1);
  }, [pageSize, start, end, brand, produk]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "noBPOM",
      headerName: "No. BPOM",
      sortable: false,
      width: 200,
    },
    {
      field: "cpItem",
      headerName: "Nama Produk",
      sortable: false,
      width: 200,
    },
    {
      field: "cpBrand",
      headerName: "Brand",
      sortable: false,
      width: 110,
    },
    {
      field: "jenisItem",
      headerName: "Jenis",
      sortable: false,
      width: 150,
    },
    {
      field: "descBPOM",
      headerName: "Description",
      sortable: false,
      width: 200,
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 110,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              history(`/master-data/update-competitor/${params.row.noBPOM}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.noBPOM)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/api/Competitor/Pagination2?page=${page}&rowsCount=${pageSize}&userId=${
            getRoleName() == "CRM Admin" ? "" : getEmployee()
          }${
            !!start ? "&startDate=" + moment(start).format("MM-DD-YYYY") : ""
          }${
            !!end ? "&endDate=" + moment(end).format("MM-DD-YYYY") : ""
          }&cPItem=${produk}&cPBrand=${brand}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data CompetitorReps = ", response);
          if (response.status == 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
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

  const deleteData = async (id) => {
    setLoading(true);
    console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Delete/${id}/screenId`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            setTimeout(() => {
              window.location.reload();
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // ini untuk pop up notifikasi
  const notifyConfirm = async (id) => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Hapus Data ini?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
      })
      .then((result) => {
        if (result.value) {
          console.log("ini di swal delete, result = ", result);
          console.log("ini di swal delete, id = ", id);
          deleteData(id);
        }
      });
  };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => history("/master-data/add-competitor")}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  }

  CustomToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <Card mb={6}>
      <Grid container spacing={2} mb={1} px={2} mt={3}>
        <Grid item md={3}>
          <DesktopDatePicker
            disabled={loading}
            label="Start Date"
            inputFormat={"dd/MM/yyyy"}
            maxDate={new Date(moment(end).format())}
            value={start}
            onChange={(newValue) => {
              setstart(newValue);
              console.log("date", newValue);
            }}
            cancelText
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <DesktopDatePicker
            disabled={loading}
            label="End Date"
            inputFormat={"dd/MM/yyyy"}
            value={end}
            onChange={(newValue) => {
              setend(newValue);
              console.log("date", newValue);
            }}
            cancelText
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </Grid>
        <Grid item md={3}>
          <QuickSearch
            value={produk}
            placeholder="Nama Produk"
            onChange={(evt) => setproduk(evt.target.value)}
            onClear={() => setproduk("")}
          />
        </Grid>
        <Grid item md={3}>
          <QuickSearch
            value={brand}
            placeholder="Nama Brand"
            onChange={(evt) => setbrand(evt.target.value)}
            onClear={() => setbrand("")}
          />
        </Grid>
      </Grid>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Timer
              active={true}
              duration={null}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Timecode />
            </Timer>
          </Grid>
        </Grid>
      ) : (
        <>
          <Paper sx={{ display: { xs: "block", sm: "none" } }}>
            <Button
              color="primary"
              onClick={() => history("/master-data/add-competitor")}
              // disableElevation
            >
              <span>
                <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
              </span>
              Add
            </Button>
            <MobileTable
              data={data}
              rowDetail={columns}
              // label={"Expiry Date"}
              id={"noBPOM"}
              totaldata={totalPage}
              page={curretPage}
              onCellDoubleClick={(e) => {
                history(`/master-data/update-competitor/${e}`);
              }}
              onPageChange={(e, page) => {
                setcurretPage(page);
                getData(page + 1);
                console.log("page = ", page);
              }}
            />
          </Paper>

          <Paper sx={{ display: { sm: "block", xs: "none" } }}>
            <div style={{ width: "100%", padding: "10px" }}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                autoHeight
                getRowId={(ea) => ea.noBPOM}
                rows={data}
                columns={columns}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                selectionModel={selection}
                onSelectionModelChange={(selection) => {
                  setSelection(selection);
                  console.log(data[selection[0]]);
                }}
                components={{
                  Toolbar: CustomToolbar,
                }}
                onCellDoubleClick={(params, event) => {
                  // console.log(params.row["customer"]);
                  history(
                    `/master-data/update-competitor/${params.row["noBPOM"]}`
                  );
                }}
                rowCount={totalPage}
                page={curretPage - 1}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  getData(page + 1);
                  setcurretPage(page + 1);
                  console.log("page = ", page);
                }}
              />
            </div>
          </Paper>
        </>
      )}
    </Card>
  );
}
