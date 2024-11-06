import React, { useEffect, useState } from "react";
// import Header from "./Header";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/lab";
import {
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../../services/notification.service";

const Button = styled(MuiButton)(spacing);

export default function StatusTTDialog(props) {
  const [Loading, setLoading] = useState(false);
  const [TglTT, setTglTT] = useState();
  const [TglKembali, setTglKembali] = useState(
    moment(props.selectedLHI[0]?.tglKembali).format()
  );
  const [cashAccount, setCashAccount] = useState({
    id: "1102401",
    desc: "Piutang Giro Lokal",
  });
  const [entryType, setEntryType] = useState({
    id: "IN",
    desc: "Receipt",
  });
  const [UangDiterima, setUangDiterima] = useState();
  const [Docref, setDocref] = useState(props.selectedLHI[0]?.referenceNbr);
  const [keterangan, setketerangan] = useState(
    props.selectedLHI[0]?.keterangan
  );
  const [DetKet, setDetKet] = useState(props.selectedLHI[0]?.ketKembali);

  useEffect(() => {
    console.log("selected", props.selectedLHI[0]);
    setTglKembali(props.selectedLHI[0]?.tglKembali);
    setDetKet(props.selectedLHI[0]?.ketKembali);
    setTglTT(props.selectedLHI[0]?.tanggalTT);
    setketerangan(props.selectedLHI[0]?.keterangan);
  }, [props?.openStatusTT]);

  const updateStatus = async () => {
    setLoading(true);
    const payload = props?.selectedLHI?.map((item) => {
      return {
        laporanHarianInkasoGridRepID: item.laporanHarianInkasoGridRepID,
        nomerLHI: item.nomorLHI,
        tglKembali: TglKembali,
        tanggalTT: TglTT,
        ketStatusKembali: keterangan,
        ketKembali: DetKet,
        cashAccountID: cashAccount?.id === undefined ? "" : cashAccount?.id,
        entryTypeID: entryType?.id === undefined ? "" : entryType?.id,
        nomorFaktur: item.referenceNbr,
        tunaiDiterima:
          UangDiterima == null || UangDiterima === "" ? 0 : UangDiterima,
      };
    });
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/UpdateStatusTT`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 204
          ) {
            NotifySuccess("success", "Data telah diupdate");
            setTimeout(() => {
              window.location.reload();
            }, 800);
            props.setOpenStatusTT(false);
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
    <Dialog
      open={props.openStatusTT}
      sx={{ zIndex: 11 }}
      onClose={() => props.setOpenStatusTT(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="auto"
    >
      <DialogTitle id="alert-dialog-title">
        STATUS TT - {props.selectedLHI[0]?.referenceNbr}
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenStatusTT(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* <Header /> */}
        <Card mb={3}>
          {Loading ? (
            <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress
                  disableShrink
                  style={{ textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <h1 style={{ textAlign: "center" }}>Loading</h1>
              </Grid>
              <Grid
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
              ></Grid>
            </Grid>
          ) : (
            <CardContent>
              <Grid container mb={3} spacing={3}>
                <Grid item md={6}>
                  <Paper mt={3}>
                    <DatePicker
                      value={!!TglKembali ? TglKembali : null}
                      label="Tanggal Kembali"
                      inputFormat={"dd/MM/yyyy"}
                      onChange={(newValue) => {
                        setTglKembali(newValue);
                        console.log("date", newValue);
                      }}
                      readOnly={
                        keterangan == "Bayar Lunas" ||
                        keterangan == "Gagal Tagih" ||
                        keterangan == "Tidak dikunjungi"
                          ? true
                          : false
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Paper>
                </Grid>
                {/* <Grid item md={3}>
                <Paper mt={6}>
                  <FormLabel>Tanggal TT</FormLabel>
                </Paper>
              </Grid> */}
                <Grid item md={6}>
                  <Paper mt={3}>
                    <DatePicker
                      value={!!TglTT ? TglTT : null}
                      label="Tanggal TT"
                      inputFormat={"dd/MM/yyyy"}
                      onChange={(e) => {
                        console.log(e);
                        console.log("tgl kemabli", TglKembali);
                        setTglTT(e);
                      }}
                      maxDate={new Date(moment(TglKembali).format())}
                      readOnly={
                        keterangan == "TT Transfer" ||
                        keterangan == "TT Giro" ||
                        keterangan == "TT Nagih"
                          ? false
                          : true
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container mb={3} spacing={3}>
                <Grid item md={6}>
                  <Paper mt={3}>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="status-zona">Keterangan</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        label="Keterangan"
                        value={keterangan}
                        defaultValue={props.selectedLHI[0]?.keterangan}
                        onChange={(e) => {
                          if (e.target.value == "Bayar Lunas") {
                            setUangDiterima(
                              props.selectedLHI?.reduce(
                                (acc, item) => acc + item.balance,
                                0
                              )
                            );
                          } else if (e.target.value == "Bayar Sebagian") {
                            setUangDiterima(props.selectedLHI[0]?.balance / 2);
                          }
                          if (
                            e.target.value == "TT Nagih" ||
                            e.target.value == "TT Giro" ||
                            e.target.value == "TT Transfer"
                          ) {
                            setTglTT(new Date());
                          } else {
                            setTglTT(null);
                          }
                          if (
                            e.target.value == "Bayar Lunas" ||
                            e.target.value == "Gagal Tagih" ||
                            e.target.value == "Tidak dikunjungi"
                          ) {
                            setTglKembali(null);
                          } else {
                            setTglKembali(new Date());
                          }
                          setketerangan(e.target.value);
                          console.log(e);
                        }}
                        id="demo-simple-select"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem
                          value={"TT Transfer"}
                          disabled={props.selectedLHI.some((lhi) => !lhi.ttf)}
                        >
                          TT Transfer
                        </MenuItem>
                        <MenuItem
                          value={"TT Giro"}
                          disabled={props.selectedLHI.some((lhi) => !lhi.ttf)}
                        >
                          TT Giro
                        </MenuItem>
                        <MenuItem
                          value={"TT Nagih"}
                          disabled={props.selectedLHI.some((lhi) => !lhi.ttf)}
                        >
                          TT Nagih
                        </MenuItem>
                        <MenuItem value={"Transfer"}>Transfer</MenuItem>
                        <MenuItem value={"Giro"}>Giro</MenuItem>
                        <MenuItem value={"Bayar Lunas"}>Bayar Lunas</MenuItem>
                        <MenuItem
                          value={"Bayar Sebagian"}
                          disabled={props.selectedLHI.length > 1}
                        >
                          Bayar Sebagian
                        </MenuItem>
                        <MenuItem value={"Gagal Tagih"}>Gagal Tagih</MenuItem>
                        <MenuItem value={"Tidak dikunjungi"}>
                          Tidak dikunjungi
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container mb={3} spacing={3}>
                {/* <Grid item md={3}>
                <Paper mt={6}>
                  <FormLabel>Detil Keterangan</FormLabel>
                </Paper>
              </Grid> */}
                <Grid item md={6}>
                  <Paper mt={3}>
                    {keterangan == "Tgl. Terbit TT" ? (
                      <>
                        <DatePicker
                          value={DetKet}
                          label="Detil Keterangan"
                          inputFormat={"dd/MM/yyyy"}
                          onChange={(e) => {
                            setDetKet(e);
                          }}
                          // disabled
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </>
                    ) : (
                      <>
                        <TextField
                          type="text"
                          // disabled
                          label="Detil Keterangan"
                          value={DetKet}
                          onChange={(e) => {
                            setDetKet(e.target.value);
                          }}
                          fullWidth
                        />
                      </>
                    )}
                  </Paper>
                </Grid>
              </Grid>
              <Grid container mb={3} spacing={3}>
                {/* <Grid item md={3}>
                <Paper mt={6}>
                  <FormLabel>Cash Account</FormLabel>
                </Paper>
              </Grid> */}
                <Grid item md={6}>
                  <Paper mt={3}>
                    <TextField
                      fullWidth
                      value={
                        cashAccount == ""
                          ? " "
                          : cashAccount.id + " - " + cashAccount.desc
                      }
                      // disabled={Loading}
                      label="Cash Account"
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment>
                      //       {cashAccount ? (
                      //         <>
                      //           <IconButton
                      //             onClick={() => setCashAccount("")}
                      //             // disabled={Loading}
                      //           >
                      //             <Clear />
                      //           </IconButton>
                      //         </>
                      //       ) : (
                      //         <>
                      //           <IconButton
                      //           // onClick={() => setOpenAP(true)}
                      //           // disabled={Loading}
                      //           >
                      //             <Search />
                      //           </IconButton>
                      //         </>
                      //       )}
                      //     </InputAdornment>
                      //   ),
                      // }}
                    />
                  </Paper>
                </Grid>
                {keterangan == "Bayar Lunas" ||
                keterangan == "Bayar Sebagian" ? (
                  <>
                    {/* <Grid item md={6}>
                    <Paper mt={6}>
                      <FormLabel>Uang Diterima</FormLabel>
                    </Paper>
                  </Grid> */}
                    <Grid item md={6}>
                      <Paper mt={3}>
                        <NumberFormat
                          disabled={
                            props.selectedLHI.length > 1 &&
                            keterangan === "Bayar Lunas"
                          }
                          thousandsGroupStyle="thousand"
                          fullWidth
                          label="Uang Diterima"
                          required
                          inputProps={{
                            readOnly: keterangan == "Bayar" ? true : false,
                          }}
                          value={
                            UangDiterima == null ||
                            UangDiterima == "" ||
                            !UangDiterima
                              ? 0
                              : UangDiterima
                          }
                          decimalScale={2}
                          fixedDecimalScale={true}
                          decimalSeparator="."
                          customInput={TextField}
                          onValueChange={(e) => {
                            setUangDiterima(e.floatValue);
                          }}
                          displayType="input"
                          type="text"
                          thousandSeparator={true}
                          allowNegative={false}
                        />
                      </Paper>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
              </Grid>
              {props.selectedLHI[0]?.keterangan == "Closed" &&
              cashAccount.desc == "Piutang Giro Lokal" ? (
                <>
                  <Grid container mb={3} spacing={3}>
                    {/* <Grid item md={3}>
                    <Paper mt={3}>
                      <FormLabel>Entry Type</FormLabel>
                    </Paper>
                  </Grid> */}
                    <Grid item md={6}>
                      <Paper mt={3}>
                        <TextField
                          fullWidth
                          label="Entry Type"
                          value={
                            entryType?.id == undefined
                              ? ""
                              : entryType?.id + " - " + entryType?.desc
                          }
                          disabled
                        />
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <></>
              )}
              <Grid container mb={3} spacing={3}>
                {/* <Grid item md={3}>
                <Paper mt={6}>
                  <FormLabel>Document Ref.</FormLabel>
                </Paper>
              </Grid> */}
                <Grid item md={6}>
                  <Paper mt={3}>
                    <TextField
                      // type="text"
                      disabled
                      label="Document Ref."
                      value={
                        " "
                        // props.selectedLHI[0]?.ReferenceNbr == "" ||
                        // props.selectedLHI[0]?.ReferenceNbr == null ||
                        // props.selectedLHI[0]?.ReferenceNbr == undefined
                        //   ? " "
                        //   : props.selectedLHI[0]?.ReferenceNbr
                      }
                      // onChange={(e) => {
                      //   setBranch(e.target.value);
                      // }}
                      fullWidth
                    />
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button
          // disabled={TglKembali == null}
          onClick={() => {
            updateStatus();
          }}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
        <Button
          onClick={() => props.setOpenStatusTT(false)}
          color="primary"
          variant="outlined"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
