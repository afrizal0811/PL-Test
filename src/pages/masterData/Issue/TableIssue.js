import SyncIcon from "@material-ui/icons/Sync";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "referenceNbr",
    headerName: "Ref. Number",
    width: 200,
  },
  {
    field: "controlAmount",
    headerName: "Control Amount",
    width: 200,
  },
  {
    field: "controlQty",
    headerName: "Qty",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
  {
    field: "totalAmount",
    headerName: "Total Amount",
    width: 200,
  },
  {
    field: "totalCost",
    headerName: "Total Cost",
    width: 200,
  },
  {
    field: "totalQty",
    headerName: "Total Qty",
    width: 200,
  },
];

export default function TableIssue() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${process.env.REACT_APP_DOMAIN_API}/IssueReps`, GetConfig())
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            const newres = [];
            Object.keys(resdata).forEach(function (key) {
              newres.push({
                id: key,
                referenceNbr: resdata[key].referenceNbr,
                controlAmount: resdata[key].controlAmount,
                controlQty: resdata[key].controlQty,
                status: resdata[key].status,
                totalAmount: resdata[key].totalAmount,
                totalCost: resdata[key].totalCost,
                totalQty: resdata[key].totalQty,
              });
            });
            setData(newres);
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

  const Sync = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/IssueReps/Sync`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            NotifySuccess("success", "Data Telah DiSinkronisasi");
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

  const notifyConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Syncronisasi?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Sync",
      })
      .then((result) => {
        if (result.value) {
          Sync();
        }
      });
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="success"
          onClick={notifyConfirm}
          disableElevation
          style={{ marginLeft: "auto" }}
        >
          <span>
            <SyncIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Sync
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Master Data Issue
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
      </CardContent>
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
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              rows={data}
              columns={columns}
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
              onCellClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/issue/${params.row.referenceNbr}`);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}
