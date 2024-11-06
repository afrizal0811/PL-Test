import { spacing } from "@material-ui/system";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import {
  Grid,
  IconButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import NumberingTabel from "./NumberingTabel";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [numberingID, setNumberingID] = useState("");
  const [description, setDescription] = useState("");
  const [screenID, setScreenID] = useState("");
  const [Data, setData] = useState([]);
  const history = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(id);
    if (id != undefined) {
      getData();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/NumberingSequenceReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(
            "ini data NumberingSequenceReps = ",
            response.data.NumberingSequenceDetailRep
          );
          if (response.status == 200) {
            const resdata = response.data;
            console.log("res", response.data);
            const newdata = [];
            setDescription(response.data.Description);
            setNumberingID(response.data.NumberingID);
            setScreenID(response.data.ScreenID);

            const newres = [];
            Object.keys(resdata.NumberingSequenceDetailRep).forEach(function (
              key
            ) {
              newres.push({
                id: key,
                NumberingDetailID:
                  resdata.NumberingSequenceDetailRep[key].NumberingDetailID,
                NumberingStep:
                  resdata.NumberingSequenceDetailRep[key].NumberingStep,
                LastNumber: resdata.NumberingSequenceDetailRep[key].LastNumber,
                LastModifiedDateTime:
                  resdata.NumberingSequenceDetailRep[key].LastModifiedDateTime,
                EndNumber: resdata.NumberingSequenceDetailRep[key].EndNumber,
                StartNumber:
                  resdata.NumberingSequenceDetailRep[key].StartNumber,
                BranchID: resdata.NumberingSequenceDetailRep[key].BranchID,
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

  const createData = async () => {
    setLoading(true);
    try {
      const payload = {
        numberingID: numberingID,
        description: description,
        screenID: screenID,
        numberingSequenceDetailRep: Data,
      };
      console.log("payload create", payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/NumberingSequenceReps/CreateMasterNumberingSequence",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/numbering-sequences/detail/${screenID}`;
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

  const editData = async () => {
    setLoading(true);
    try {
      const payload = {
        numberingID: numberingID,
        description: description,
        screenID: screenID,
        numberingSequenceDetailRep: Data,
      };
      console.log("payload edit", payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/NumberingSequenceReps/UpdateMasterNumberingSequence",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/numbering-sequences/detail/${id}`;
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

  const onSumbitHandler = async () => {
    if (id == undefined) {
      createData();
    } else {
      editData();
    }
  };

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
        deleteData(id);
      }
    });
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

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => history("/konfigurasi/numbering-sequences")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => onSumbitHandler()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => {
            setNumberingID("");
            setDescription("");
            setScreenID("");
            setData([]);
            history("/konfigurasi/numbering-sequences/add");
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          onClick={(e) => notifyConfirm(id)}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <Paper>
          <div style={{ paddingBottom: 15, width: "100%" }}>
            <Grid container spacing={6} md={8} sx={{ margin: "10px" }}>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Numbering ID
                </Typography>
                <TextField
                  name="numberingID"
                  value={numberingID}
                  type="text"
                  fullWidth
                  variant="outlined"
                  my={2}
                  onChange={(e) => setNumberingID(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <TextField
                  name="SenderEmail"
                  value={description}
                  type="text"
                  fullWidth
                  variant="outlined"
                  my={2}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  ScreenID
                </Typography>
                <TextField
                  name="screenID"
                  value={screenID}
                  type={"text"}
                  fullWidth
                  variant="outlined"
                  my={2}
                  // disabled={id != undefined}
                  onChange={(e) => setScreenID(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <NumberingTabel
          numberingID={numberingID}
          description={description}
          screenID={screenID}
          Data={Data}
          setData={(e) => setData(e)}
        />
      </Card>
    </>
  );
}
