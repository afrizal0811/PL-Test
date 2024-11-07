/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Clear, Delete, Search } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/lab";
import {
  Button,
  CardContent,
  Grid,
  IconButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import PopupImport from "./PopupImport";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

const QuickSearch = ({ value, onChange, onClear, placeholder = "" }) => {
  return (
    <TextField
      placeholder={`Search ${placeholder}…`}
      onChange={onChange}
      fullWidth
      value={value}
      InputProps={{
        startAdornment: <Search fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? "visible" : "hidden" }}
            onClick={onClear}
          >
            <Clear fontSize="small" />
          </IconButton>
        ),
      }}
      sx={{
        m: (theme) => theme.spacing(0),
        "& .MuiSvgIcon-root": {
          mr: 2,
        },
        "& .MuiInput-underline:before": {
          borderBottom: 1,
          borderColor: "divider",
        },
        float: "right",
      }}
    />
  );
};

QuickSearch.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  column: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default function TransferCabangTable({
  description,
  setDescription,
  setCurretPage,
  data,
  pageSize,
  setPageSize,
  loading,
  selectionTCById,
  setSelectionTCById,
  totalPage,
  refNbr,
  setRefNbr,
  curretPage,

  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const [openImport, setOpenImport] = React.useState(false);
  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
  const history = useNavigate();

  const HandleDeleteTransferCabang = async (id) => {
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/DeleteTransferCabangById`,
          [id],
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dihapus");
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
    } catch (error) {
      NotifyError("There was an error!", error.message);
    }
  };

  // // ini untuk pop up notifikasi
  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        console.log("ini di swal delete, result = ", result);
        console.log("ini di swal delete, id = ", id);
        HandleDeleteTransferCabang(id);
      }
    });
  };

  const columns = [
    {
      field: "RefNbr",
      sortable: false,
      headerName: "Ref. Nbr",
      width: 145,
    },
    {
      field: "Status",
      sortable: false,
      headerName: "Status",
      width: 95,
    },
    {
      field: "Date",
      headerName: "Created At",
      width: 110,
      sortable: false,
      tpye: "date",
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        </>
      ),
    },
    {
      field: "FrBranchID",
      headerName: "From Branch",
      sortable: false,
      width: 120,
    },
    {
      field: "ToBranchID",
      sortable: false,
      headerName: "To Branch",
      width: 120,
    },
    {
      field: "Descr",
      sortable: false,
      headerName: "Description",
      width: 300,
    },
    {
      field: "CreatedByID",
      headerName: "Created By",
      sortable: false,
      width: 105,
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => {
              history(`/transfer-cabang/detail/${params.row.RefNbr}`);
            }}
          >
            Detail
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            disabled={params.row.Status === "On Hold" ? false : true}
            startIcon={<Delete />}
            onClick={() => notifyConfirm(params.row.RefNbr)}
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => {
            // if (data.filter((ae) => ae.Status === "On Hold").length > 0) {
            //   NotifyError("Error!", "Terdapat transfer kuota yang belum rilis");
            // } else {
            history("add");
            // }
          }}
          disableElevation
        >
          <span>
            <Add style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        <Button
          color="primary"
          disableElevation
          onClick={() => setOpenImport(true)}
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Import
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
    <div>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={3} mt={3}>
              <DatePicker
                label="Start Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                inputFormat={"dd/MM/yyyy"}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={3} mt={3}>
              <DatePicker
                label="End Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                inputFormat={"dd/MM/yyyy"}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={3} mt={3}>
              <QuickSearch
                value={refNbr}
                placeholder="Ref. Nbr"
                onChange={(evt) => setRefNbr(evt.target.value)}
                onClear={() => setRefNbr("")}
              />
            </Grid>
            <Grid item md={3} mt={3}>
              <QuickSearch
                value={description}
                placeholder="Description"
                onChange={(evt) => setDescription(evt.target.value)}
                onClear={() => setDescription("")}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card mb={6}>
        {loading ? (
          <Loader />
        ) : (
          <Paper>
            <div style={{ width: "100%", padding: "10px" }}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 15, 25, 50]}
                rows={data}
                autoHeight
                rowCount={totalPage}
                getRowId={(r) => r.RefNbr}
                columns={columns}
                components={{
                  Toolbar: CustomToolbar,
                }}
                pageSize={pageSize}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                // checkboxSelection
                selectionModel={selectionTCById}
                paginationMode="server"
                pagination
                onCellDoubleClick={(params, event) => {
                  // console.log(params.row["customer"]);
                  history(`/transfer-cabang/detail/${params.row["RefNbr"]}`);
                }}
                page={curretPage - 1}
                onRowCLick={handleRowClick}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                onSelectionModelChange={(selection) => {
                  setSelectionTCById(selection);
                }}
                onPageChange={(page) => {
                  setCurretPage(page + 1);
                }}
              />
            </div>
          </Paper>
        )}
        <PopupImport open={openImport} setOpen={setOpenImport} />
      </Card>
    </div>
  );
}
