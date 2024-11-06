import { Clear, Search } from "@mui/icons-material";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  Grid,
  IconButton,
  InputAdornment,
  Card as MuiCard,
  Paper as MuiPaper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "../../components/Loader";
import CbData from "../../components/shared/dropdown";
import { GetConfig } from "../../utils/ConfigHeader";
import CustomerPopup from "./CustomerPopup";
import opsiStatus from "./OpsiStatus";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

export default function DaftarPengajuan(props) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [statusOto, setstatusOto] = useState("");
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [countDataPerPage, setCountDataPerPage] = React.useState(0);
  const [curretPage, setCurretPage] = React.useState(0);
  const [openCust, setOpenCust] = React.useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();

  console.log({ selectedCustomer });

  useEffect(() => {
    getData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, startDate, endDate, statusOto, branch, selectedCustomer]);

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/ApprovalList/GetDaftarPengajuan?page=${page}&rowsCount=${pageSize}&branch=${
            branch == null ? "" : branch
          }&startDate=${moment(startDate).format(
            "MM-DD-YYYY"
          )}&endDate=${moment(endDate).format(
            "MM-DD-YYYY"
          )}&statusOtorisasi=${statusOto}&customer=${
            selectedCustomer?.customerID === undefined
              ? ""
              : selectedCustomer?.customerID
          }`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            setCountDataPerPage(resdata.totalCountData);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleOpenPengajuan = async (id) => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}/ApprovalList/${id}`,
        GetConfig()
      )
      .then(function (response) {
        if (response.status === 200) {
          const resdata = response.data;
          if (resdata.record.length > 0) {
            history(`detail/${id}`);
            let newdata = { ...resdata.record[0], submit: false };
            props.setDetail(newdata);
          } else {
            alert("Nomer pengajuan tidak ditemukan");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      field: "customerID",
      headerName: "Customer",
      minWidth: 450,
      sortable: false,
      renderCell: (params) => (
        <>
          {params.value} - {params.row.customerName}
        </>
      ),
    },
    {
      field: "orderNbr",
      headerName: "SO Nbr",
      width: 150,
      sortable: false,
    },
    {
      field: "salesperson",
      headerName: "Sales Admin",
      width: 150,
      sortable: false,
    },
    {
      field: "tanggalSO",
      headerName: "Tanggal SO",
      width: 150,
      sortable: false,
    },
    {
      field: "statusSO",
      headerName: "Progress",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>
          {params.value} - {params.row.statusOtorisasi}
        </>
      ),
    },
    {
      field: "totalLevelApproval",
      headerName: "Level",
      width: 120,
      sortable: false,
    },
    {
      field: "approver",
      headerName: "Otoritas",
      width: 200,
      sortable: false,
    },
    {
      field: "noPengajuan",
      headerName: "Link",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <Typography
            onClick={() => {
              handleOpenPengajuan(params.value);
            }}
            variant="body2"
            color={"primary"}
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            {params.value}
          </Typography>
        </>
      ),
    },
    {
      field: "ketOtorisasi",
      headerName: "Keterangan",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <>{params.value === "undefined" ? "" : params.value}</>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h3" mb={8} mt={4}>
        Daftar Pengajuan
      </Typography>
      <Card mb={6} mt={0} p={4}>
        <Stack spacing={4}>
          <Grid container gap={2}>
            <Grid item md={2}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
                id="BranchID"
                label="Branch"
                value={branch}
                onChange={(newValue) => {
                  setBranch(newValue);
                }}
              />
            </Grid>
            <Grid item md={2}>
              <DatePicker
                label="Post Start Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={2}>
              <DatePicker
                label="Post End Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={endDate}
                inputFormat={"dd/MM/yyyy"}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
            <Grid item md={2}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={opsiStatus}
                onChange={(e, value) => {
                  setstatusOto(value == null ? "" : value.id);
                  console.log("value", value);
                  setCurretPage(0);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Status Otorisasi" />
                )}
              />
            </Grid>
            <Grid item md={2}>
              <TextField
                name="CustomerID"
                label="Customer"
                style={{ width: "100%" }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {selectedCustomer ? (
                        <>
                          <IconButton onClick={() => setSelectedCustomer("")}>
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => setOpenCust(true)}>
                            <Search />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={
                  selectedCustomer
                    ? selectedCustomer?.customerID +
                      " - " +
                      selectedCustomer?.customerName
                    : " "
                }
                onClick={() => {
                  if (!selectedCustomer) {
                    setOpenCust(true);
                  }
                }}
              />
            </Grid>
          </Grid>
          {loading ? (
            <Loader />
          ) : (
            <Paper>
              <div style={{ width: "100%" }}>
                <DataGrid
                  rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
                  rows={data}
                  autoHeight
                  columns={columns}
                  getRowId={(ae) => ae.customerSubmissionID}
                  disableColumnFilter
                  density="compact"
                  disableColumnMenu
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowCount={countDataPerPage}
                  page={curretPage}
                  paginationMode="server"
                  pagination
                  onPageChange={(page) => {
                    setCurretPage(page);
                    getData(page + 1);
                    console.log("page = ", page);
                  }}
                />
              </div>
            </Paper>
          )}
        </Stack>
      </Card>
      <CustomerPopup
        openCust={openCust}
        setOpenCust={(e) => {
          setOpenCust(e);
        }}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
      />
    </>
  );
}
