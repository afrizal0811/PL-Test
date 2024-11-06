import React, { useState } from "react";
// import FakturTabel from "./FakturTabel";
// import DetailFakturTabel from "./DetailFakturTabel";
import { spacing } from "@material-ui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Button as MuiButton,
} from "@mui/material";
import styled from "styled-components/macro";
// import CbData from "../../../../../components/shared/dropdown";
import axios from "axios";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";

const Button = styled(MuiButton)(spacing);

const columnsKeterangan = [
  // { field: "Customer", headerName: "Customer Name", width: 200 },
  {
    field: "Level",
    headerName: "Level",
    width: 100,
    editable: false,
  },
  {
    field: "Nama Approver",
    headerName: "Nama Approver",
    width: 200,
    editable: false,
  },
  {
    field: "Action Approver",
    headerName: "Action",
    width: 200,
    editable: false,
  },
  {
    field: "Date Approval",
    headerName: "Tanggal & Jam",
    width: 200,
    editable: false,
  },
  {
    field: "ReasonApproval",
    headerName: "Reason",
    width: 200,
    editable: false,
  },
];

export default function OtorisasiPopup(props) {
  const [StatusUrgen, setStatusUrgen] = useState(false);
  const [Status, setStatus] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [ReasonBatal, setReasonBatal] = useState("");
  const [Detail, setDetail] = useState([]);
  const [openFaktur, setopenFaktur] = useState(false);
  const [Loading, setLoading] = useState(false);

  // React.useEffect(() => {
  //   if (Faktur && Faktur.refNbr !== null) {
  //     getDataDetailFaktur(Faktur.refNbr);
  //   }
  // }, [Faktur]);
  const rejectOtorisasi = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/BtnReject?IDListSOOto=${props.selectedSO[0].IDListSOOtorisasi}`,
        {},
        GetConfig()
      )
      .then(function (response) {
        if (response.status == 200 || response.status == 204) {
          const resdata = response.data;
          console.log("res", resdata);
          NotifySuccess("success", "Data Telah Diperbarui");
          props.setopenOtorisasi(false);
          props.getData();
          // setData(resdata.record);
          // settotaldata(resdata.totalCountData);
          // props.setData(rowsdummy);
        }
      })
      .catch(function (error) {
        NotifyError("There was an error!", error);
        props.setopenOtorisasi(false);
        console.log(error);
      });
    setLoading(false);
  };

  const sendOtorisasi = async () => {
    try {
      setLoading(true);
      const res = await axios
        .post(
          // `${process.env.REACT_APP_DOMAIN_API}` +
          //   `/ListSOOtorisasi/BtnOtorisasi?IDListSOOtorisasi=${props.selectedSO.map(
          //     (i) => i.IDListSOOtorisasi
          //   )}`
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/ListSOOtorisasi/BtnOtorisasi?IDListSOOto=${props.selectedSO[0].IDListSOOtorisasi}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200 || response.status == 204) {
            const resdata = response.data;
            console.log("res", resdata);
            NotifySuccess("success", "Data Telah Diperbarui");
            props.setopenOtorisasi(false);
            props.getData();
            // setData(resdata.record);
            // settotaldata(resdata.totalCountData);
            // props.setData(rowsdummy);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          props.setopenOtorisasi(false);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      open={props.openOtorisasi}
      onClose={() => props.setopenOtorisasi(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        {"Konfirmasi Otorisasi"}
        <IconButton
          aria-label="close"
          onClick={() => props.setopenOtorisasi(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          variant="subtitle2"
          color="inherit"
        >
          Apakah saudara/i {"Admin"} akan mengotorisasi:
          {props.selectedSO.map((obj) => {
            return (
              <div>
                <ListItem margin="dense" color="inherit">
                  <ListItemText
                    style={{ position: "absolute", left: "0px", top: "2px" }}
                    variant="subtitle2"
                    margin="dense"
                    primary={"Kd. Cust: " + obj.CustomerID + ","}
                  />
                </ListItem>
                <ListItem margin="dense" color="inherit">
                  <ListItemText
                    style={{ position: "absolute", left: "0px", top: "2px" }}
                    variant="subtitle2"
                    margin="dense"
                    primary={"Nm. Cust: " + obj.CustomerID_desc + ","}
                  />
                </ListItem>
                <ListItem margin="dense" color="inherit">
                  <ListItemText
                    style={{ position: "absolute", left: "0px", top: "2px" }}
                    variant="subtitle2"
                    margin="dense"
                    primary={"No. Faktur: " + obj.NomorSO + ","}
                  />
                </ListItem>
                <ListItem margin="dense" color="inherit">
                  <ListItemText
                    style={{ position: "absolute", left: "0px", top: "2px" }}
                    variant="subtitle2"
                    margin="dense"
                    primary={"Tgl. Faktur: " + obj.OrderDate}
                  />
                </ListItem>
                <br />
              </div>
            );
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          // onClick={() => rejectOtorisasi()}
          onClick={() => props.setopenOtorisasi(false)}
          color="inherit"
          variant="contained"
        >
          No
        </Button>
        <Button
          onClick={() => sendOtorisasi()}
          // onClick={() => props.setopenOtorisasi(false)}
          color="primary"
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
