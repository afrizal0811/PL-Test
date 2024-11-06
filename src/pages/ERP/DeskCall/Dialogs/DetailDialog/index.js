import { spacing } from "@material-ui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Button as MuiButton,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import CbData from "../../../../../components/shared/dropdown";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { getBrach } from "../../../../../utils/jwt";
import DetailFakturTabel from "./DetailFakturTabel";
import FakturTabel from "./FakturTabel";

const Button = styled(MuiButton)(spacing);

export default function DetailDialog(props) {
  const [StatusLHI, setStatusLHI] = useState("All");
  const [jumlahJT, setjumlahJT] = useState("");
  const [totalNominalJT, settotalNominalJT] = useState("");
  const [jumlahBelumJT, setjumlahBelumJT] = useState("");
  const [totalNominalBelumJT, settotalNominalBelumJT] = useState("");
  const [Detail, setDetail] = useState([]);
  const [DetailFaktur, setDetailFaktur] = useState([]);
  const [Faktur, setFaktur] = useState({});
  const [Loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (props.CustomerID && props.CustomerID !== null && props.openDetail) {
      getDataDetail(props.CustomerID);
      getDataSummary(props.CustomerID);
    }
  }, [props.CustomerID, StatusLHI, props.openDetail]);

  React.useEffect(() => {
    if (Faktur && Faktur.refNbr !== null && props.openDetail) {
      getDataDetailFaktur(Faktur.refNbr);
    } else {
      setDetailFaktur([]);
    }
  }, [Faktur, Detail]);

  const getDataDetail = async (id) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/DeskcallReps/getDetailDeskcall/" +
            id +
            `?filterStatusLHI=${
              StatusLHI == null ? "All" : StatusLHI
            }&BranchId=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setDetail(resdata);
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

  const getDataSummary = async (id) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/DeskcallReps/getSummaryDetailDeskcall/" +
            id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            setjumlahJT(resdata.jumlahJT);
            settotalNominalJT(resdata.totalNominalJT);
            setjumlahBelumJT(resdata.jumlahBelumJT);
            settotalNominalBelumJT(resdata.totalNominalBelumJT);
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

  const getDataDetailFaktur = async (id) => {
    try {
      setLoading(true);
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/DeskcallReps/getDetailsDetailDeskcall/" +
            id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            const newdata = resdata.map((item, i) => {
              item.id = i;
              return item;
            });
            setDetailFaktur(newdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      open={props.openDetail}
      onClose={() => props.setOpenDetail(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        DETAIL [{props.CustomerName} - {props.CustomerID}]
        <IconButton
          aria-label="close"
          onClick={() => props.setOpenDetail(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid md={4} mb={1} mt={2}>
            <CbData
              // required
              // all
              source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/DropDown/StatusLHI`}
              id={"dropdownStatusLHI"}
              // desc={"dropdownStatusLHI"}
              label="Status LHI"
              value={StatusLHI}
              defaultValue={StatusLHI}
              onChange={(newValue) => {
                setStatusLHI(newValue);
                // console.log(TransaksiID);
              }}
            />
          </Grid>
          <Grid xs={12} mb={1} mt={2}>
            <FakturTabel
              DataFaktur={Detail}
              Faktur={Faktur}
              setFaktur={(e) => {
                setFaktur(e);
                console.log("selected faktur", Faktur);
              }}
            />
          </Grid>
          <Grid xs={12} mb={1} mt={2}>
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
                <Grid item xs={12} justifyContent="center" alignItems="center">
                  <h1 style={{ textAlign: "center" }}>Loading</h1>
                </Grid>
              </Grid>
            ) : (
              <DetailFakturTabel DataFaktur={DetailFaktur} />
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "flex-start" }}>
        <p style={{ marginLeft: 15, marginTop: 0 }}>
          JT: {jumlahJT} Faktur (Rp{" "}
          {
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={totalNominalJT}
            />
          }
          ) / Belum JT:
          {jumlahBelumJT} Faktur (Rp{" "}
          {
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={totalNominalBelumJT}
            />
          }
          )
        </p>
      </DialogActions>
    </Dialog>
  );
}
