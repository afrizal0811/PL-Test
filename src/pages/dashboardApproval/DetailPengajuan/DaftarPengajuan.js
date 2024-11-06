import { spacing } from "@material-ui/system";
import {
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import Loader from "../../../components/Loader";
import { GetConfig } from "../../../utils/ConfigHeader";
import CbBranch from "../../components/shared/cbBranch";
import { getBrach } from "../../utils/jwt";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const dataDummy = [
  {
    NoBatch: "540666",
    NoPengajuan: "87654321",
    JamPengajuan: "12:10",
    LevelApproval: "1",
    Approver: "Admin",
  },
  {
    NoBatch: "540555",
    NoPengajuan: "35465459",
    JamPengajuan: "12:30",
    LevelApproval: "1",
    Approver: "AdminShopee",
  },
];

const columns = [
  { field: "NoBatch", headerName: "No. Batch", width: 150 },
  {
    field: "NoPengajuan",
    headerName: "No. Pengajuan",
    width: 200,
    sortable: false,
  },
  {
    field: "TanggalSO",
    headerName: "Tanggal SO",
    width: 200,
    sortable: false,
  },
  {
    field: "JamPengajuan",
    headerName: "Jam Pengajuan",
    width: 150,
    sortable: false,
  },
  {
    field: "JamLastAction",
    headerName: "Jam Last Action",
    width: 150,
    sortable: false,
  },
  {
    field: "ApprovalStatus",
    headerName: "Approval Status",
    width: 150,
    sortable: false,
  },
  {
    field: "LevelApproval",
    headerName: "Level",
    width: 150,
    sortable: false,
  },
  {
    field: "Approver",
    headerName: "Oleh",
    width: 200,
    sortable: false,
  },
];

export default function DaftarPengajuan() {
  const [data, setData] = useState(dataDummy);
  const [Branch, setBranch] = useState(getBrach());
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // getData();
    // getCek(0);
  }, [page]);

  const getCek = async (page) => {
    setLoading(true);
    try {
      if (page === 0) {
        setData([]);
      } else {
        // getData();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ApprovalList?page=1&rowsCount=${pageSize}&startDate=2022-05-20&endDate=2022-06-01`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            console.log("ini didalam getData, resdata => ", resdata);
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                noBatch: resdata[key].NoBatch,
                noPengajuan: resdata[key].NoPengajuan,
                tanggalSO: resdata[key].TanggalSO,
                // jamPengajuan: moment().format("HH.mm"),
                jamPengajuan: resdata[key].JamPengajuan,
                jamLastAction: resdata[key].JamLastAction,
                approvalStatus: resdata[key].ApprovalStatus,
                levelApproval: resdata[key].LevelApproval,
                approver: resdata[key].Approver,
              });
            });
            setData(resdata);
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

  const [pageSize, setPageSize] = useState(15);

  return (
    <>
      <Typography variant="h3" mb={4} mt={4}>
        Daftar Pengajuan
      </Typography>
      <Card mb={6} mt={0}>
        <Grid container>
          <Grid item md={2}>
            <CbBranch
              required
              defaultValue={Branch}
              value={Branch}
              onChange={(newValue) => {
                setBranch(newValue);
                // console.log(ScreenID);
              }}
            />
          </Grid>
        </Grid>
        {loading ? (
          <Loader />
        ) : (
          <Paper>
            <div style={{ width: "100%", padding: "10px" }}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 15, 25]}
                rows={data}
                autoHeight
                columns={columns}
                getRowId={(ae) => ae.NoBatch}
                disableColumnFilter
                disableColumnMenu
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                // selectionModel={selection}
                // onSelectionModelChange={(selection) => {
                //   setSelection(selection);
                //   console.log(data[selection[0]]);
                // }}
                // components={{
                //   Toolbar: CustomToolbar,
                // }}
                // onCellClick={(params, event) => {
                //   console.log(params.row["customer"]);
                //   history(`/master-data/branch/${params.row["BranchID"]}`);
                // }}
              />
            </div>
          </Paper>
        )}
      </Card>
    </>
  );
}
