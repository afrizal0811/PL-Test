import React, { useState } from "react";
import {
  Paper as MuiPaper,
  Card as MuiCard,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { DatePicker, LocalizationProvider, TimePicker } from "@material-ui/lab";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import moment from "moment";
import CbData from "../../../../../components/shared/dropdown";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header(props) {
  const [TglKembali, setTglKembali] = useState(new Date());
  const [TglResponKembali, setTglResponKembali] = useState(new Date());
  const [Jam, setJam] = useState(new Date());
  const [Respon, setRespon] = useState("");

  return (
    <Card mb={3}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <DatePicker
              value={props.TglKembali}
              label="Tanggal"
              inputFormat={"dd/MM/yyyy"}
              disabled={!props.isNew}
              onChange={(newValue) => {
                props.setTglKembali(moment(newValue).format());
                // console.log("newvalue", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Jam"
                value={props.Jam}
                disabled={!props.isNew}
                onChange={(newValue) => {
                  props.setJam(
                    moment(newValue).format("ddd MMM MM YYYY HH:mm:ss")
                  );
                  console.log(
                    "e = ",
                    newValue
                    // moment(newValue).format("ddd MMM MM YYYY HH:mm:ss")
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item md={6} xs={12}>
            <CbData
              required
              // all
              disabled={!props.isNew}
              source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/DropDown/Response`}
              id={"dropdownResponse"}
              config={GetConfig()}
              // id={"dropdownResponse"}
              // desc={"dropdownResponseID"}
              // desc={"dropdownResponse"}
              label="Respon"
              value={props.Respon}
              onChange={(newValue) => {
                props.setRespon(newValue);
                // console.log(TransaksiID);
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatePicker
              value={props.TglResponKembali}
              inputFormat={"dd/MM/yyyy"}
              disabled={!props.isNew}
              label="Date Respon Kembali"
              onChange={(newValue) => {
                props.setTglResponKembali(moment(newValue).format());
                // console.log("newvalue", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="subtitle1" gutterBottom mt={3}>
              Keterangan
            </Typography>
            <TextField
              id="outlined-multiline-static"
              disabled={!props.isNew}
              value={props.Keterangan}
              onChange={(e) => props.setKeterangan(e.target.value)}
              margin="dense"
              fullwidth={true}
              // required
              multiline
              rows={3}
              variant="outlined"
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
