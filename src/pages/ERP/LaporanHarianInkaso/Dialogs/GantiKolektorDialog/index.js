import React, { useState } from "react";
// import Header from "./Header";
import { Clear, Search } from "@material-ui/icons";
import CloseIcon from "@material-ui/icons/Close";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { NotifySuccess } from "../../../../services/notification.service";
import KolektorPopup from "../../KolektorPopup";

const Button = styled(MuiButton)(spacing);
const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function GantiKolektorDialog(props) {
  const [option, setoption] = useState("terpilih");
  const [Kolektor, setKolektor] = useState("");
  const [openKolektor, setOpenKolektor] = useState(false);
  const [Loading, setLoading] = useState(false);

  const gantiKolektor = async () => {
    setLoading(true);
    const isMultiple = props?.selectedLHI?.length > 1;
    const endpoint = isMultiple
      ? `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/UpdateKolektorLaporanHarianInkasoMulti`
      : `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/UpdateKolektorLaporanHarianInkaso?id=${props.selectedLHI[0]?.nomorLHI}&gridID=${props.selectedLHI[0]?.laporanHarianInkasoGridRepID}&select=${option}&kolektor=${Kolektor?.employeeID}`;

    const payload = isMultiple
      ? props?.selectedLHI?.map((item) => {
          return {
            id: item.nomorLHI,
            gridID: item.laporanHarianInkasoGridRepID,
            select: option,
            kolektor: Kolektor?.employeeID,
          };
        })
      : {};

    try {
      await axios
        .put(endpoint, payload, GetConfig())
        .then(function (response) {
          console.log("ini res", response);
          if (response.status == 200) {
            NotifySuccess("success", "Kolektor telah diganti");
            setTimeout(() => {
              window.location.reload();
            }, 800);
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

  return (
    <>
      <Dialog
        open={props.openGantiKolektor}
        onClose={() => props.setOpenGantiKolektor(false)}
        aria-labelledby="alert-dialog-title"
        sx={{ zIndex: 11 }}
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          GANTI KOLEKTOR
          <IconButton
            aria-label="close"
            onClick={() => props.setOpenGantiKolektor(false)}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
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
            <Card mb={3}>
              <CardContent>
                <Grid container mb={4} spacing={4}>
                  <Grid item md={12}>
                    <Paper mt={3}>
                      <FormLabel component="h1">
                        Lingkup Data Dipindah:
                      </FormLabel>
                      <RadioGroup
                        aria-label="jumlah-LHI"
                        defaultValue="terpilih"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          value="terpilih"
                          control={<Radio />}
                          onChange={(e) => {
                            console.log("option", e.target.value);
                            setoption(e.target.value);
                          }}
                          label="Terpilih"
                        />
                        <FormControlLabel
                          value="multiple"
                          control={<Radio />}
                          onChange={(e) => {
                            console.log("option", e.target.value);
                            setoption(e.target.value);
                          }}
                          disabled={props.selectedLHI?.length > 1}
                          label={`${
                            props.dataLHI.filter(
                              (ae) =>
                                ae.customerID ==
                                props.selectedLHI[0]?.customerID
                            ).length
                          } Faktur dari ${props.selectedLHI[0]?.customerName}`}
                        />
                      </RadioGroup>
                    </Paper>
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item md={3}>
                    <FormLabel>Kolektor</FormLabel>
                  </Grid>
                  <Grid item md={9}>
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
                                  <Search />
                                </IconButton>
                              </>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      value={Kolektor == "" ? "" : Kolektor.employeeName}
                      onClick={() => {
                        if (!Kolektor) {
                          setOpenKolektor(true);
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log(option);
              gantiKolektor();
            }}
            color="primary"
            disabled={Kolektor == ""}
            variant="contained"
          >
            Pindah
          </Button>
          <Button
            onClick={() => props.setOpenGantiKolektor(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

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
