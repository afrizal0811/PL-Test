import { Clear } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { DesktopDatePicker } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { NotifyError } from "../../../../services/notification.service";
import KolektorPopup from "../../KolektorPopup";
import AdmPiutangPopup from "./AdminPiutangPopup";
import CustomerPopup from "./CustomerPopup";

const Button = styled(MuiButton)(spacing);

export default function OtomatisDialog(props) {
  const [TglPenagihan, setTglPenagihan] = useState(new Date());
  const [JnsTagihan, setJnsTagihan] = useState("");
  const [hariTagih, setHariTagih] = useState("");
  const [hariTT, setHariTT] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState(null);
  const [AdmPiutang, setAdmPiutang] = useState(props.AdminPiutang);
  const [CustomerID, setCustomerID] = useState("");
  const [dueDate, setdueDate] = useState(null);
  const [credit, setcredit] = useState("");
  const [PasarAllow, setPasarAllow] = useState(false);
  const [creditmemo, setcreditmemo] = useState(false);
  const [serahterima, setserahterima] = useState(false);
  const [mingguTagih, setmingguTagih] = useState("");
  const [ketPenagihan, setketPenagihan] = useState("");
  const [Kolektor, setKolektor] = useState("");
  const [openKolektor, setOpenKolektor] = useState(false);

  const [Loading, setLoading] = React.useState(false);
  const [openCust, setOpenCust] = React.useState(false);
  const [openAdm, setOpenAdm] = React.useState(false);

  useEffect(() => {
    setAdmPiutang(props.AdminPiutang);
    setJnsTagihan("");
    setHariTagih("");
    setCustomerID("");
    setdueDate(props.tanggalLHI);
    setKolektor("");
    setserahterima(false);
    setcreditmemo(false);
    setketPenagihan("");
  }, [props.openOtomatis, props.AdminPiutang, props.tanggalLHI]);

  const handleOtomatis = async () => {
    setLoading(true);

    try {
      // console.log(payload);
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/LaporanHarianInkasoReps/DataOtomatisLHI?jenisPenagihan=${JnsTagihan}${
              TglPenagihan
                ? `&invoiceDueDate=${moment(TglPenagihan).format("MM-DD-YYYY")}`
                : ""
            }&hariTagih=${hariTagih}&usrAdminPiutang=${
              AdmPiutang == "" ? "" : AdmPiutang?.employeeID
            }&customerID=${
              CustomerID == "" ? "" : CustomerID?.CustomerID
            }&customerName=${CustomerID == "" ? "" : CustomerID?.CustomerName}${
              dueDate == null
                ? ""
                : "&dueDate=" + moment(dueDate).format("MM-DD-YYYY")
            }${
              credit == "" ? "" : "&creditLimit=" + parseInt(credit)
            }&pasarAllow=${PasarAllow}&mingguTagih=${mingguTagih}&usrKolektor=${
              Kolektor == "" ? "" : Kolektor?.employeeID
            }&ketPenagihan=${ketPenagihan}&serahTerima=${serahterima}&creditmemo=${creditmemo}&hariTT=${hariTT}${
              tanggalKembali
                ? `&tanggalKembali=${moment(tanggalKembali).format(
                    "MM-DD-YYYY"
                  )}`
                : ""
            }`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            props.setDataTambah(
              response.data.filter((bo) =>
                props.Data.every((ao) => ao.referenceNbr != bo.referenceNbr)
              )
            );
            props.setOpenOtomatis(false);
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
      <Dialog
        open={props.openOtomatis}
        onClose={() => props.setOpenOtomatis(false)}
        sx={{ zIndex: 11 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          Membuat Daftar Tagihan
          <IconButton
            aria-label="close"
            onClick={() => props.setOpenOtomatis(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <Header /> */}
          <Card mb={3}>
            <CardContent>
              {Loading ? (
                <Grid
                  container
                  justifyContent="center"
                  spacing={1}
                  md={12}
                  xs={12}
                >
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <CircularProgress
                      disableShrink
                      style={{ textAlign: "center" }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                  >
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
                <Grid container spacing={4}>
                  <Grid item md={9}>
                    <Grid container spacing={3}>
                      <Grid item md={6}>
                        <FormControl
                          color={!JnsTagihan ? "warning" : ""}
                          style={{ width: "100%" }}
                        >
                          <InputLabel id="status-zona">
                            Jenis Tagihan *
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            color={!JnsTagihan ? "warning" : ""}
                            label="Jenis Tagihan"
                            value={JnsTagihan}
                            required
                            onChange={(e) => {
                              setHariTagih("");
                              setHariTT("");
                              setTanggalKembali(null);
                              setJnsTagihan(e.target.value);
                            }}
                            id="demo-simple-select"
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={"Tagih"}>Tagih</MenuItem>
                            <MenuItem value={"Tukar Faktur"}>
                              Tukar Faktur
                            </MenuItem>
                            <MenuItem value={"TT Nagih"}>TT Nagih</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item md={6}>
                        <DesktopDatePicker
                          label="Invoice Due Date"
                          value={dueDate}
                          inputFormat={"dd/MM/yyyy"}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              color={!dueDate ? "warning" : ""}
                              required
                            />
                          )}
                          onChange={(newValue) => {
                            console.log(newValue);
                            setdueDate(newValue);
                          }}
                        />
                      </Grid>

                      <Grid item md={6}>
                        <FormControl
                          style={{ width: "100%" }}
                          disabled={
                            JnsTagihan === "Tukar Faktur" || !JnsTagihan
                          }
                        >
                          <InputLabel id="status-zona">Hari Tagih</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            label="Hari Tagih"
                            value={hariTagih}
                            onChange={(e) => setHariTagih(e.target.value)}
                            id="demo-simple-select"
                            displayEmpty
                            disabled={
                              JnsTagihan === "Tukar Faktur" || !JnsTagihan
                            }
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={"Senin"}>Senin</MenuItem>
                            <MenuItem value={"Selasa"}>Selasa</MenuItem>
                            <MenuItem value={"Rabu"}>Rabu</MenuItem>
                            <MenuItem value={"Kamis"}>Kamis</MenuItem>
                            <MenuItem value={"Jumat"}>Jumat</MenuItem>
                            <MenuItem value={"Sabtu"}>Sabtu</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <FormControl
                          style={{ width: "100%" }}
                          disabled={
                            JnsTagihan !== "Tagih" && JnsTagihan !== "TT Nagih"
                          }
                        >
                          <DesktopDatePicker
                            label="Tanggal Kembali"
                            value={tanggalKembali}
                            inputFormat={"dd/MM/yyyy"}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth />
                            )}
                            disabled={
                              JnsTagihan !== "Tagih" &&
                              JnsTagihan !== "TT Nagih"
                            }
                            onChange={(newValue) => {
                              console.log(newValue);
                              setTanggalKembali(newValue);
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <FormControl
                          style={{ width: "100%" }}
                          disabled={JnsTagihan !== "Tukar Faktur"}
                        >
                          <InputLabel id="status-zona">Hari TT</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            label="Hari TT"
                            value={hariTT}
                            onChange={(e) => setHariTT(e.target.value)}
                            id="demo-simple-select"
                            displayEmpty
                            disabled={JnsTagihan !== "Tukar Faktur"}
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={"Senin"}>Senin</MenuItem>
                            <MenuItem value={"Selasa"}>Selasa</MenuItem>
                            <MenuItem value={"Rabu"}>Rabu</MenuItem>
                            <MenuItem value={"Kamis"}>Kamis</MenuItem>
                            <MenuItem value={"Jumat"}>Jumat</MenuItem>
                            <MenuItem value={"Sabtu"}>Sabtu</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          name="UsrAdminPiutang"
                          label="Admin Piutang"
                          required
                          style={{ width: "100%" }}
                          color={!AdmPiutang ? "warning" : ""}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                {AdmPiutang ? (
                                  <>
                                    <IconButton
                                      onClick={() => setAdmPiutang("")}
                                      // disabled={Loading}
                                    >
                                      <Clear />
                                    </IconButton>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      onClick={() => setOpenAdm(true)}
                                      // disabled={Loading}
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          value={
                            AdmPiutang
                              ? AdmPiutang?.employeeID +
                                " - " +
                                AdmPiutang?.employeeName
                              : ""
                          }
                          onClick={() => {
                            if (!AdmPiutang) {
                              setOpenAdm(true);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          name="CustomerID"
                          label="Nama Customer"
                          style={{ width: "100%" }}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                {CustomerID ? (
                                  <>
                                    <IconButton
                                      onClick={() => setCustomerID("")}
                                      // disabled={Loading}
                                    >
                                      <Clear />
                                    </IconButton>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      onClick={() => setOpenCust(true)}
                                      // disabled={Loading}
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          value={
                            CustomerID
                              ? CustomerID?.CustomerID +
                                " - " +
                                CustomerID?.CustomerName
                              : ""
                          }
                          onClick={() => {
                            if (!CustomerID) {
                              setOpenCust(true);
                            }
                          }}
                        />
                      </Grid>

                      <Grid item md={6}>
                        <TextField
                          label="Kolektor"
                          fullWidth
                          disabled={Loading}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                {Kolektor ? (
                                  <>
                                    <IconButton
                                      onClick={() => setKolektor("")}
                                      disabled={Loading}
                                    >
                                      <Clear />
                                    </IconButton>
                                  </>
                                ) : (
                                  <>
                                    <IconButton
                                      onClick={() => setOpenKolektor(true)}
                                      disabled={Loading}
                                    >
                                      <SearchIcon />
                                    </IconButton>
                                  </>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          value={Kolektor == "" ? "" : Kolektor?.employeeName}
                          onClick={() => {
                            if (!Kolektor) {
                              setOpenKolektor(true);
                            }
                          }}
                        />
                      </Grid>
                      <Grid item md={12}>
                        <TextField
                          name="KetPenagihan"
                          label="Ket. / Ship To"
                          // margin="dense"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={3}
                          value={ketPenagihan}
                          onChange={(e) => setketPenagihan(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={3}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={serahterima}
                          onChange={() => setserahterima(!serahterima)}
                        />
                      }
                      label="Serah terima"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={creditmemo}
                          onChange={() => setcreditmemo(!creditmemo)}
                        />
                      }
                      label="Credit memo"
                    />
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!JnsTagihan || !dueDate || !AdmPiutang}
            onClick={() => {
              handleOtomatis();
            }}
            color="primary"
            variant="contained"
          >
            OK
          </Button>
          <Button
            onClick={() => props.setOpenOtomatis(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <CustomerPopup
        openCust={openCust}
        setopenCust={(e) => {
          setOpenCust(e);
        }}
        TempCustomer={CustomerID}
        setTempCustomer={(e) => {
          setCustomerID(e);
          setAdmPiutang({
            employeeID: e.AdminPiutangEmployeeID,
            employeeName: e.AdminPiutangEmployeeName,
          });
          console.log("cus", e);
        }}
      />
      <AdmPiutangPopup
        openCust={openAdm}
        setopenCust={(e) => {
          setOpenAdm(e);
        }}
        TempCustomer={AdmPiutang}
        setTempCustomer={(e) => {
          setAdmPiutang(e);
          console.log("cus", e);
        }}
      />

      <KolektorPopup
        openCust={openKolektor}
        setopenCust={(e) => {
          setOpenKolektor(e);
        }}
        TempCustomer={Kolektor}
        setTempCustomer={(e) => {
          setKolektor(e);
          console.log("cus", e);
        }}
      />
    </>
  );
}
