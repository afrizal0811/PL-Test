import { spacing } from "@material-ui/system";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  CircularProgress,
  FormHelperText,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function Header() {
  const [MailID, setMailID] = useState("");
  const [EMServer, setEMServer] = useState("");
  const [EMPort, setEMPort] = useState();
  const [SenderName, setSenderName] = useState("");
  const [SenderEmail, setSenderEmail] = useState("");
  const [EMPass, setEMPass] = useState("");
  const [data, setData] = useState([]);
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isButtonActive, setButtonActive] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(`${process.env.REACT_APP_DOMAIN_API}/SetupMail`, GetConfig())
        .then(function (response) {
          // handle success
          console.log("ini seberapa banyak datanya", response.data?.length);
          console.log("ini datanya", response.data);
          if (response.status == 200) {
            const resdata = response.data;
            const lastIndex = resdata?.length - 1;
            setMailID(resdata[lastIndex]?.MailID);
            setEMServer(resdata[lastIndex]?.EMServer);
            setEMPort(resdata[lastIndex]?.EMPort);
            setSenderName(resdata[lastIndex]?.SenderName);
            setSenderEmail(resdata[lastIndex]?.SenderEmail);
            setEMPass(resdata[lastIndex]?.Password);
            setData(resdata);
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

  const notifyConfirm = async (id) => {
    swal
      .fire({
        title: "Apakah Anda Yakin Menyimpan Konfigurasi ini?",
        // text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3062e3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Simpan",
      })
      .then((result) => {
        console.log("ini buat cek result.value => ", result.value);
        HandleUpdate();
        // if (result.value && MailID !== "") {
        //   HandleCreate();
        // } else if (result.value && MailID === "") {
        //   HandleUpdate();
        // }
      });
  };

  const HandleUpdate = async () => {
    setLoading(true);
    try {
      const payload = {
        mailID: MailID,
        emServer: EMServer,
        emPort: EMPort,
        senderName: SenderName,
        senderEmail: SenderEmail,
        emPass: EMPass,
      };
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/SetupMail/UpdateMail`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            setIsEdited(false);
            NotifySuccess("success", "Data Telah DiUbah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/set-server-email`;
            }, 1200);
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
  // const HandleCreate = async () => {
  //   setLoading(true);
  //   try {
  //     const payload = {
  //       emServer: EMServer,
  //       emPort: EMPort,
  //       senderName: SenderName,
  //       senderEmail: SenderEmail,
  //       emPass: EMPass,
  //     };
  //     console.log("ini isinya payload =", payload);
  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_DOMAIN_API}/SetupMail/CreateMail`,
  //         payload,
  //         GetConfig()
  //       )
  //       .then(function (response) {
  //         // handle success
  //         console.log(response);
  //         if (response.status == 200 || response.status == 201) {
  //           setIsEdited(false);
  //           NotifySuccess("success", "Data Telah DiUpdate");
  //           setTimeout(() => {
  //             window.location.href = `/konfigurasi/set-server-email`;
  //           }, 800);
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         NotifyError("There was an error!", error);
  //         console.log(error);
  //       });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <Card mb={6}>
      {/* <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
      </CardContent> */}
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
        </Grid>
      ) : (
        <Paper>
          <div style={{ height: 400, width: "100%" }}>
            <Grid container spacing={6} md={8} sx={{ margin: "10px" }}>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Server
                </Typography>
                <TextField
                  name="EMServer"
                  // label="Server"
                  value={EMServer}
                  type={"text"}
                  required
                  fullWidth
                  variant="outlined"
                  my={2}
                  disabled={isEdited === false}
                  onChange={(e) => setEMServer(e.target.value)}
                />
                {EMServer === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Sender Name
                </Typography>
                <TextField
                  name="SenderName"
                  // label="Sender Name"
                  value={SenderName}
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  my={2}
                  disabled={isEdited === false}
                  onChange={(e) => setSenderName(e.target.value)}
                />
                {SenderName === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Port
                </Typography>
                <TextField
                  name="EMPort"
                  // label="Port"
                  value={EMPort}
                  type="text"
                  required
                  fullWidth
                  variant="outlined"
                  my={2}
                  disabled={isEdited === false}
                  onChange={(e) => setEMPort(e.target.value)}
                />
                {EMPort === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={6}>
                <Typography variant="h6" gutterBottom>
                  Sender Email
                </Typography>
                <TextField
                  name="SenderEmail"
                  // label="Sender Email"
                  value={SenderEmail}
                  type="email"
                  required
                  fullWidth
                  variant="outlined"
                  my={2}
                  disabled={isEdited === false}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
                {SenderEmail === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={6} sx={{ marginLeft: "auto" }}>
                <Typography variant="h6" gutterBottom>
                  Password
                </Typography>
                <TextField
                  name="Password"
                  // label="Password"
                  value={EMPass}
                  type="password"
                  fullWidth
                  variant="outlined"
                  my={2}
                  disabled={isEdited === false}
                  onChange={(e) => setEMPass(e.target.value)}
                />
                {EMPass === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
                {EMPass?.length < 8 && (
                  <FormHelperText style={{ color: "red" }}>
                    Min. 8 Character Password
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={12} xs={12}>
                <Button
                  style={{ marginRight: "16px" }}
                  variant="contained"
                  color="primary"
                  size="medium"
                  disabled={
                    EMPass == null || EMPass === "" || EMPass?.length < 8
                      ? isButtonActive
                      : false
                  }
                  startIcon={<SaveIcon />}
                  // disabled={
                  //   // (EMServer === "" &&
                  //   //   EMPort === "" &&
                  //   //   SenderName === "" &&
                  //   //   SenderEmail === "" &&
                  //   //   EMPass === "") ||
                  //   isEdited === true
                  // }
                  onClick={notifyConfirm}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  startIcon={<EditIcon />}
                  disabled={isEdited}
                  onClick={() => {
                    setIsEdited(true);
                  }}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Paper>
      )}
    </Card>
  );
}

function SetServerEmail() {
  return (
    <React.Fragment>
      <Helmet title="Set Server Email" />
      <Typography variant="h3" gutterBottom display="inline">
        Setup Server Email
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfigurasi</Link>
        <Typography>Setup Server Email</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default SetServerEmail;
