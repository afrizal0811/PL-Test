import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { DesktopDatePicker } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import MobileTable from "../../../components/shared/MobileTable";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach, getEmployee, getRoleName } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Paper = styled(MuiPaper)(spacing);

const datadummy = [
  {
    id: 1,
    ProductGroupID: "Popcorn",
    BranchID: "",
    CPBrand: "Oishi",
    CPItem: "Popcorn Caramel",
    CPPrice: "15.000,00",
    CPDesc: "Popcorn Caramel",
    CPDate: "16/12/2021",
    NoBPOM: "MD273216107058",
    ImageComp: "[file]",
  },
  {
    id: 2,
    ProductGroupID: "Saos",
    BranchID: "",
    CPBrand: "Raja Rasa",
    CPItem: "Saos Daging Ayam",
    CPPrice: "25.000,00",
    CPDesc: "Saos Daging Ayam",
    CPDate: "16/12/2021",
    NoBPOM: "MD239522101007",
    ImageComp: "[file]",
  },
];

export default function CompetitorPriceInfoTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [start, setstart] = useState(null);
  const [end, setend] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  useEffect(() => {
    getData(1);
  }, [pageSize, start, end]);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "refNbr",
      headerName: "Ref Nbr",
      sortable: false,
      width: 145,
    },
    {
      field: "productBy",
      headerName: "Product Group",
      sortable: false,
      width: 195,
    },
    {
      field: "branchID",
      headerName: "Branch ID",
      sortable: false,
      width: 195,
    },
    {
      field: "docDate",
      headerName: "Date",
      sortable: false,
      type: "date",
      renderCell: (params) =>
        params.value ? (
          <p>{moment(params.value).format("DD-MM-YYYY")}</p>
        ) : (
          <></>
        ),
      width: 105,
    },
    {
      field: "cpBrand",
      headerName: "Competitor Brand",
      sortable: false,
      width: 150,
    },
    {
      field: "cpItem",
      headerName: "Competitor Item",
      sortable: false,
      width: 150,
    },
    {
      field: "cpPrice",
      headerName: "Competitor Price",
      sortable: false,
      type: "number",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              value={params.value}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType={"text"}
            />
          </>
        );
      },
    },
    {
      field: "noBPOM",
      headerName: "Barcode",
      sortable: false,
      width: 140,
    },
    {
      field: "cpDesc",
      headerName: "Description",
      sortable: false,
      width: 150,
    },
    {
      field: "imageBase64",
      headerName: "Image",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.value == "undefined" || params.value == null ? (
              "No Image"
            ) : (
              <>✓</>
            )}
          </>
        );
      },
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
              history(`detail/${params.row.refNbr}`);
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
            onClick={() => notifyConfirm(params.row.refNbr)}
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
          }/api/CompetitorPriceInfo/Pagination2?page=${page}&rowsCount=${pageSize}&userId=${
            getRoleName() == "CRM Admin" ? "" : getEmployee()
          }${!!start ? "&sDate=" + moment(start).format("MM-DD-YYYY") : ""}${
            !!end ? "&eDate=" + moment(end).format("MM-DD-YYYY") : ""
          }&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data CompetitorPriceReps = ", response);
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
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/Delete/${id}/screenId`,
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
        <Button color="primary" onClick={() => history("add")} disableElevation>
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
            renderInput={(params) => <TextField {...params} fullWidth />}
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
            renderInput={(params) => <TextField {...params} fullWidth />}
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
              onClick={() => history("add")}
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
              id={"refNbr"}
              totaldata={totalPage}
              page={curretPage}
              onCellDoubleClick={(e) => {
                history(`detail/${e}`);
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
                rowsPerPageOptions={[5, 15, 25, 50, 100]}
                getRowId={(ae) => ae.refNbr}
                autoHeight
                rows={data}
                columns={columns}
                density="compact"
                disableColumnFilter
                disableColumnMenu
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
                  history(`detail/${params.row.refNbr}`);
                }}
                rowCount={totalPage}
                page={curretPage}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  setcurretPage(page);
                  getData(page + 1);
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
