import CloseIcon from "@material-ui/icons/Close";
import { spacing } from "@material-ui/system";
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Download, Upload } from "react-feather";
import styled from "styled-components";
import Swal from "sweetalert2";
import { getBrach } from "../../../utils/jwt";
import { NotifySuccess } from "../../services/notification.service";

const Button = styled(MuiButton)(spacing);

const PopupImport = ({ open, setOpen }) => {
  const [file, setFile] = React.useState();
  const [buffer, setBuffer] = React.useState();

  const handleDoownloadTemplate = async () => {
    const token = window.localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/DownloadTemplateTransferCabang`,
        {
          responseType: "arraybuffer",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "TransferCabangTemplate.xlsx";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleUpload = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);
      const promises = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      });
      promises.then((res) => {
        setBuffer(res);
      });
    }
  };

  const handleUploadClick = async () => {
    if (!buffer) return;
    const formData = new FormData();
    formData.append("uploadedFile", file);
    const token = window.localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${
          process.env.REACT_APP_DOMAIN_API
        }/UploadTransferCabang?branch=${getBrach()}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        NotifySuccess("success", "Data Telah Ditambah").then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "There was an error!",
        html: error.response.data,
        customClass: "swal-height",
      });
      throw error;
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
      onClose={() => setOpen(false)}
    >
      <DialogTitle id="alert-dialog-title">
        Import
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Card mb={6} mt={0}>
          <Grid container spacing={2} md={12}>
            <Grid item md={12} xs={12}>
              <TextField
                value={"Download Template Excel"}
                fullWidth
                required
                onClick={handleDoownloadTemplate}
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <>
                        <IconButton>
                          <Download />
                        </IconButton>
                      </>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <label htmlFor="contained-button-file">
                <input
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  onChange={handleUpload}
                  type="file"
                />
                <TextField
                  value={!!file ? file.name : "Upload File"}
                  fullWidth
                  required
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        variant="contained"
                        id="contained-button-file"
                        // style={{ marginTop: "", height: "50px" }}
                        fullWidth
                        component="span"
                      >
                        <Upload />
                      </IconButton>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </label>
            </Grid>
          </Grid>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            handleUploadClick();
          }}
          color="primary"
          variant="contained"
        >
          Tutup & Simpan
        </Button>
        <Button
          onClick={() => setOpen(false)}
          color="primary"
          variant="outlined"
        >
          Keluar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupImport;
