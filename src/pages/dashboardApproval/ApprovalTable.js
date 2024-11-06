import { DatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
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
import { GetConfig } from "../../utils/ConfigHeader";
import { getEmployeeName } from "../../utils/jwt";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "DatePosting",
    headerName: "Tanggal Posting",
    width: 140,
    sortable: false,
    renderCell: (params) => <>{moment(params.value).format("DD-MM-YYYY")}</>,
  },
  {
    field: "noPengajuan",
    headerName: "No. Pengajuan",
    width: 140,
    sortable: false,
  },
  {
    field: "tanggalSO",
    headerName: "Tanggal SO",
    width: 130,
    sortable: false,
    renderCell: (params) => <>{moment(params.value).format("DD-MM-YYYY")}</>,
  },
  {
    field: "jamPengajuan",
    headerName: "Jam Pengajuan",
    width: 130,
    sortable: false,
  },
  {
    field: "jamLastAction",
    headerName: "Jam Last Action",
    width: 150,
    sortable: false,
  },
  {
    field: "approvalStatus",
    headerName: "Approval Status",
    width: 140,
    sortable: false,
  },
  {
    field: "level",
    headerName: "Level",
    width: 100,
    sortable: false,
    renderCell: (params) => <>{params.value}</>,
  },
  {
    field: "oleh",
    headerName: "Oleh",
    width: 200,
    sortable: false,
  },
];

export default function Detail(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();

  useEffect(() => {
    getData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const autoPosting = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/ApprovalList/AutoPosting`,
          {},
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200 || response.status === 201) {
            const resdata = response.data;
            console.log("ini didalam getData, resdata => ", resdata);
            window.location.reload();
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

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/ApprovalList?page=${page}&rowsCount=${pageSize}${
            startDate !== null
              ? "&startDate=" + moment(startDate).format("MM-DD-YYYY")
              : ""
          }${
            endDate !== null
              ? "&endDate=" + moment(endDate).format("MM-DD-YYYY")
              : ""
          }&employeeName=${getEmployeeName()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            console.log("res", resdata);
            setData(resdata.record);
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

  return (
    <>
      <Typography variant="h3" mb={8} mt={4}>
        Dashboard Approval
      </Typography>
      <Card mb={6} mt={0} p={4}>
        <Stack spacing={4}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                autoPosting();
              }}
            >
              Auto Posting
            </Button>
          </Box>
          <Grid container columnGap={2}>
            <Grid item md={3}>
              <DatePicker
                label="Start Date"
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
            <Grid item md={3}>
              <DatePicker
                label="End Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
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
                  getRowId={(ae) => ae.noPengajuan}
                  disableColumnFilter
                  density="compact"
                  disableColumnMenu
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  onCellDoubleClick={(params, event) => {
                    history(`detail/${params.row["noPengajuan"]}`);
                    let datas = data.filter(
                      (ae) => ae.noPengajuan === params.row.noPengajuan
                    );
                    props.setDetail({ ...datas[0], submit: true });
                  }}
                  pagination
                />
              </div>
            </Paper>
          )}
        </Stack>
      </Card>
    </>
  );
}
