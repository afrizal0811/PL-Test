import Header from "./Header";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import {
  NotifyError,
  NotifySuccess,
} from "../../../../services/notification.service";
import moment from "moment";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const Button = styled(MuiButton)(spacing);

export default function ResponDialog(props) {
  console.log({ props });
  const { CustomerID, Data, openRespon, generateData, setOpenRespon } = props;
  const [TglKembali, setTglKembali] = useState(new Date());
  const [TglResponKembali, setTglResponKembali] = useState(new Date());
  const [Jam, setJam] = useState(TglKembali);
  const [Respon, setRespon] = useState("");
  const [Keterangan, setKeterangan] = useState("");
  const [Loading, setLoading] = useState(false);
  const [isNew, setisNew] = useState(true);

  React.useEffect(() => {
    setTglKembali(Data?.DcDate);
    setTglResponKembali(Data?.DcResponBack);
    setJam(Data?.DcTime);
    setKeterangan(Data?.DcKet);
    setRespon(Data?.DcRespon);
    console.log(Data?.DeskcallID);
    if (Data?.DeskcallID === undefined) {
      setisNew(true);
    } else {
      setisNew(false);
    }
  }, [Data, openRespon]);

  const createData = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/DeskcallReps/UpdateDeskcallAddResponse/" +
            `${CustomerID}&` +
            `${moment(TglKembali).format("YYYY-MM-DD")}&` +
            `${moment(TglKembali).format("YYYY-MM-DD")}${moment(Jam).format(
              " HH:mm:ss.X"
            )}&` +
            `${encodeURIComponent(Respon)}&` +
            `${moment(TglResponKembali).format("YYYY-MM-DD")}` +
            `?keterangan=${Keterangan === undefined ? "" : Keterangan}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            setOpenRespon(false);
            NotifySuccess("success", "Data Telah Disimpan");
            generateData();
            setOpenRespon(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          setOpenRespon(false);
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
      open={openRespon}
      onClose={() => setOpenRespon(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        RESPON
        <IconButton
          aria-label="close"
          onClick={() => setOpenRespon(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Header
          TglKembali={TglKembali}
          setTglKembali={(e) => setTglKembali(e)}
          TglResponKembali={TglResponKembali}
          setTglResponKembali={(e) => setTglResponKembali(e)}
          Jam={Jam}
          isNew={isNew}
          setJam={(e) => setJam(e)}
          Respon={Respon}
          setRespon={(e) => {
            setRespon(e);
            console.log(Respon);
          }}
          Keterangan={Keterangan}
          setKeterangan={(e) => setKeterangan(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setisNew(true);
            setTglKembali(new Date());
            setTglResponKembali(new Date());
            setJam(new Date());
          }}
          disabled={isNew}
          color="primary"
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          onClick={() => createData()}
          disabled={!Respon || !CustomerID || isNew === false}
          color="primary"
          variant="contained"
        >
          Simpan
        </Button>
        <Button
          onClick={() => {
            setOpenRespon(false);
          }}
          color="primary"
          variant="outlined"
        >
          Keluar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
