import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Grid,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
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

const datadummy = [
  {
    id: 1,
    NotificationID: "DummyNotifID",
    Description: "DummyDescription",
    ScreenID: "DummyScreenID",
    Subject: "DummySubject",
  },
];

export default function NumberingSequenceTable() {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState(datadummy);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "NumberingID",
      headerName: "Numbering ID",
      sortable: false,
      width: 150,
    },
    {
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 250,
    },
    {
      field: "ScreenID",
      headerName: "Screen ID",
      sortable: false,
      width: 150,
    },
    {
      field: "LastModifiedDateTime",
      headerName: "LastModifiedDateTime",
      sortable: false,
      width: 150,
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 150,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              history(`detail/${params.row.ScreenID}`);
            }}
          ></Button>
          <Button
            variant="text"
            color="error"
            size="small"
            // style={{ marginLeft: 8 }}
            startIcon={<DeleteIcon />}
            onClick={() => notifyConfirm(params.row.ScreenID)}
          ></Button>
        </strong>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/NumberingSequenceReps/`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data NumberingSequenceReps = ", response);
          if (response.status == 200) {
            const resdata = response.data;
            const newdata = [];
            Object.keys(resdata).forEach(function (key) {
              newdata.push({
                id: key,
                NumberingID: resdata[key].NumberingID,
                Description: resdata[key].Description,
                ScreenID: resdata[key].ScreenID,
                LastModifiedDateTime: resdata[key].LastModifiedDateTime,
                // Subject: resdata[key].cc, //ini cuma dummy, harusnya diganti resdata[key].subject juga
              });
            });
            setData(newdata);
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
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/NumberingSequenceReps/${id}`
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
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <Card mb={6}>
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
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history("detail/" + params.row["ScreenID"]);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}
