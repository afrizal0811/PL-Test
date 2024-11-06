import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { useNavigate, useParams } from "react-router-dom";
import {
  CardContent,
  Grid,
  TextField as MuiTextField,
  Paper as MuiPaper,
  Button as MuiButton,
  IconButton,
  Checkbox,
  InputAdornment,
  AppBar,
  Tab,
  FormControlLabel,
} from "@material-ui/core";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import { GetConfig } from "../../../../utils/ConfigHeader";
import swal from "sweetalert2";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { spacing } from "@material-ui/system";
import { Reply, Refresh, Add, Delete, Save } from "@material-ui/icons";
import ScreenIDPopup from "../ScreenIDPopup";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import InsertVariable from "../InsertVariable";
import dataInsert from "../DataInsert";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header() {
  const [loading, setLoading] = useState(false);
  const [NotificationID, setNotificationID] = useState("");
  const [tabpanel, settabpanel] = useState(1);
  const [Description, setDescription] = useState("");
  const [Subject, setSubject] = useState("");
  const [ScreenID, setScreenID] = useState("");
  const [CC, setCC] = useState("");
  const [BranchID, setBranchID] = useState("");
  const [Active, setActive] = useState(false);
  const [Message, setMessage] = useState("");
  const history = useNavigate();
  const [openRefnbr, setopenRefnbr] = useState(false);
  const { id } = useParams();
  const [openInsert, setopenInsert] = useState("");

  useEffect(() => {
    getData();
  }, []);

  // Ini untuk pengaturan alamat API
  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/NotificationTemplateReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log("ini data NotificationTemplateReps = ", response);
          if (response.status == 200) {
            const resdata = response.data;
            setNotificationID(resdata.NotificationID);
            setDescription(resdata.Description);
            setSubject(resdata.Subject);
            setScreenID(resdata.ScreenID);
            setCC(resdata.CC);
            setBranchID(resdata.BranchID);
            setActive(resdata.Active);
            setMessage(resdata.Message);
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

  const handleSave = async () => {
    try {
      const payload = {
        notificationID: NotificationID,
        description: Description,
        subject: Subject,
        screenID: ScreenID,
        cc: CC,
        branchID: BranchID,
        active: Active,
        message: Message,
      };
      console.log("ini didalam handleSave, isi dari payload", payload);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/NotificationTemplateReps/UpdateMasterNotificationTemplate`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Diubah");
            getData();
            // setTimeout(() => {
            //   history("/konfigurasi/notifikasi-template");
            // }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/NotificationTemplateReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            history("/konfigurasi/notifikasi-template");
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
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

  const columnScreenPopup = [
    {
      field: "ScreenID",
      headerName: "Screen ID",
      width: 150,
    },
    {
      field: "Description",
      width: 440,
      headerName: "Description",
    },
  ];

  return (
    <>
      <CardContent>
        <Grid container spacing={6} md={12} mt={1} pl={3} pb={2}>
          <IconButton
            component="span"
            onClick={() => history("/konfigurasi/notifikasi-template")}
          >
            <Reply />
          </IconButton>
          <IconButton
            component="span"
            onClick={() => {
              handleSave();
            }}
          >
            <Save />
          </IconButton>
          <IconButton component="span" onClick={() => window.location.reload()}>
            <Refresh />
          </IconButton>
          <IconButton
            component="span"
            onClick={() => {
              history("/konfigurasi/notifikasi-template/add");
              window.location.reload();
            }}
          >
            <Add />
          </IconButton>
          <IconButton
            component="span"
            onClick={() => notifyConfirm(NotificationID)}
          >
            <Delete />
          </IconButton>
        </Grid>
        <Grid container spacing={12}>
          <Grid item md={3}>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Notification ID"
                value={NotificationID}
                disabled
                onChange={(e) => {
                  setNotificationID(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Description"
                value={Description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="Subject"
                value={Subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <Paper mt={3}>
              {/* <TextField
                id="outlined-helperText"
                label="Screen ID"
                value={ScreenID}
                onChange={(e) => {
                  setScreenID(e.target.value);
                }}
                fullWidth
              /> */}
              <TextField
                label="Screen ID"
                value={ScreenID ? ScreenID : " "}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                // value={RefNbr}
                // onChange={(newValue) => {
                //   setRefNbr(RefNbr);
                // }}
                onClick={() => setopenRefnbr(true)}
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="CC"
                value={CC}
                onChange={(e) => {
                  setCC(e.target.value);
                }}
                fullWidth
              />
            </Paper>
            <Paper mt={3}>
              <TextField
                id="outlined-helperText"
                label="BranchID"
                value={BranchID}
                onChange={(e) => {
                  setBranchID(e.target.value);
                }}
                fullWidth
              />
            </Paper>
          </Grid>
          <Grid item md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Active}
                  onChange={(e) => setActive(e.target.checked)}
                  name="gilad"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
        {/* <Paper mt={3}>
          <TextField
            id="outlined-multiline-static"
            margin="dense"
            fullwidth={true}
            multiline
            label="Message"
            value={Message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            rows={3}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Paper> */}
        <Grid container md={12} mt={4}>
          <div
            style={{
              border: "1px solid #0078d2",
              // margin: "14px",
              flexGrow: 1,
            }}
          >
            <TabContext value={"1"}>
              <AppBar
                position="static"
                style={{ background: "#0078d2", color: "white" }}
              >
                <TabList
                  // onChange={handleChangeTab}
                  aria-label="simple tabs example"
                  style={{ color: "white" }}
                >
                  <Tab label="Message" value="1" style={{ color: "white" }} />
                </TabList>
              </AppBar>
              <TabPanel value="1">
                <Paper>
                  <Grid container>
                    <Grid item xs={3}>
                      <Button
                        onClick={() => setopenInsert(true)}
                        disableElevation
                      >
                        Insert
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-multiline-static"
                        margin="dense"
                        fullwidth={true}
                        multiline
                        // label="Message"
                        value={Message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        rows={9}
                        variant="outlined"
                        style={{ width: "100%" }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </TabPanel>
            </TabContext>
          </div>
        </Grid>
      </CardContent>
      <InsertVariable
        open={openInsert}
        setopen={(e) => {
          setopenInsert(e);
        }}
        label={"Variable"}
        setTemp={(e) => {
          console.log("insert variable =", e);
          setMessage(Message + e);
        }}
        id={"value"}
        data={dataInsert}
      />
      <ScreenIDPopup
        open={openRefnbr}
        setopen={(e) => {
          setopenRefnbr(e);
        }}
        href={"konfigurasi/notifikasi-template"}
        label={"Screen ID"}
        setTemp={(e) => setScreenID(e)}
        id={"ScreenID"}
        column={columnScreenPopup}
        api={`${process.env.REACT_APP_DOMAIN_API}/ScreenNoReps`}
      />
    </>
  );
}
