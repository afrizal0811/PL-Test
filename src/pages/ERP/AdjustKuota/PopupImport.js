import React, { useState } from "react";
// import Header from "./Header";
// import TambahManualTable from "./TambahManualTable";
import CloseIcon from "@mui/icons-material/Close";
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
import { spacing } from "@mui/system";
import axios from "axios";
import { Download, Upload } from "react-feather";
import styled from "styled-components/macro";
import { getBrach } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Button = styled(MuiButton)(spacing);

export default function PopupImport(props) {
  // const [Data, setData] = useState([]);
  const [file, setFile] = useState();
  const [buffer, setBuffer] = useState();

  React.useEffect(() => {
    if (props.openImport) {
      //   getData(1);
      // generateData();
    }
  }, [props.openImport]);

  const handleDownload = async () => {
    console.log("download");
    let token = window.localStorage.getItem("accessToken");
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/DownloadTemplateKuotaAdjustment`,
          {
            responseType: "arraybuffer",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            console.log(response);
            var blob = new Blob([response.data], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // FileSaver.saveAs(blob, "excel.xlsx");
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "AdjustmentKuotaTemplate.xlsx";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpload = async (e) => {
    console.log("upload");
    if (e.target.files) {
      let file = e.target.files[0];
      console.log("file", e.target.files);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // console.log("reader", reader);
      setFile(e.target.files[0]);
      // setFileUpload(reader.readAsArrayBuffer(file));
      const promises = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        // reader.readAsBinaryString(file);
        reader.onload = (e) => {
          resolve(e.target.result);
          // console.log("e", e);
          // console.log("re", reader.result);
          // resolve(Buffer(reader.result));
        };
      });
      promises.then(
        (res) => {
          setBuffer(res);
          console.log("res", res);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleUploadClick = async () => {
    if (!buffer) {
      return;
    }
    let formData = new FormData();
    formData.append("uploadedFile", file);
    let token = window.localStorage.getItem("accessToken");

    // self.on("sending", function(file, xhr, formData) {
    //   var _send = xhr.send;
    //   xhr.send = function() {
    //     _send.call(xhr, file);
    //   }
    // });

    await axios
      .post(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/KuotaAdjustment/UploadKuotaAdjustmentData" +
          "?branch=" +
          getBrach(),
        // "https://httpbin.org/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then(function (response) {
        // handle success
        console.log("ress", response);
        if (response.status === 200 || response.status === 201) {
          NotifySuccess("success", "Data Telah Ditambah");
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      })
      .catch(function (error) {
        // handle error
        NotifyError("There was an error!", error.response.data);
        console.log("catch", error);
      });
  };

  return (
    <>
      <Dialog
        open={props.openImport}
        onClose={() => props.setopenImport(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Import
          <IconButton
            aria-label="close"
            onClick={() => props.setopenImport(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <TambahManualTable /> */}
          <Card mb={6} mt={0}>
            <Grid container spacing={2} md={12}>
              <Grid item md={12} xs={12}>
                <TextField
                  //   label="Item"
                  // value={Item.description}
                  value={"Download Template Excel"}
                  //   disabled={Loading}
                  fullWidth
                  required
                  onClick={() => {
                    handleDownload();
                  }}
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <>
                          <IconButton
                          // onClick={() => setOpenItem(true)}
                          // disabled={Loading}
                          >
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
                    //   label="Item"
                    // value={Item.description}
                    value={!!file ? file.name : "Upload File"}
                    //   disabled={Loading}
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
              props.setopenImport(false);
              handleUploadClick();
              //   props.setDataTambah(
              //     selectedLHI.map((ae) => {
              //       return {
              //         ...ae,
              //         UsrAdminPiutang: CustomerID?.AdminPiutangEmployeeID,
              //         NamaAdminPiutang: CustomerID?.AdminPiutangEmployeeName,
              //         AddressLine1: CustomerID?.AddressLine1,
              //       };
              //     })
              //   );
            }}
            // disabled={selectedLHI.length <= 0 ? true : false}
            color="primary"
            variant="contained"
          >
            Tutup & Simpan
          </Button>
          <Button
            onClick={() => props.setopenImport(false)}
            color="primary"
            variant="outlined"
          >
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
