import React, { useState } from "react";
// import FakturTabel from "./FakturTabel";
// import DetailFakturTabel from "./DetailFakturTabel";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CloseIcon from "@material-ui/icons/Close";
// import CbData from "../../../../../components/shared/dropdown";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import { GetConfig } from "../../../../utils/ConfigHeader";

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

export default function RejectPopup(props) {
  const [Loading, setLoading] = useState(false);

  const sendCekReject = async () => {
    try {
      setLoading(true);
      let payload = props.selectedSO.map((ae) => ae.IDListSOOtorisasi);
      console.log(props.selectedSO.map((ae) => ae.IDListSOOtorisasi));
      // let payload = { IDListSOOto: props.selectedSO[0].CustomerID };
      const res = await axios
        .post(
          // `${process.env.REACT_APP_DOMAIN_API}` +
          //   `/ListSOOtorisasi/BtnCekReject?CustomerID=${props.selectedSO.map(
          //     (i) => i.CustomerID
          //   )}`
          `${process.env.REACT_APP_DOMAIN_API}` + `/ListSOOtorisasi/BtnBatal`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200 || response.status == 204) {
            const resdata = response.data;
            console.log("res", resdata);
            props.setopenReject(false);
            NotifySuccess("success", "Data Telah Diperbarui");
            props.getData();
            // setData(resdata.record);
            // settotaldata(resdata.totalCountData);
            // props.setData(rowsdummy);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          props.setopenReject(false);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Dialog
      open={props.openReject}
      onClose={() => props.setopenReject(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="alert-dialog-title">
        {/* {"1" + " Dari 1 Customer Reject"} */}
        {`${props.selectedSO.length} dari ${props.totalSO} Customer Reject`}
        <IconButton
          aria-label="close"
          onClick={() => props.setopenReject(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {props.selectedSO.map((obj) => {
          return (
            <DialogContentText
              id="alert-dialog-description"
              variant="subtitle2"
              color="inherit"
            >
              {obj.IDListSOOtorisasi + "-" + obj.CustomerID_desc}
            </DialogContentText>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => sendCekReject()}
          // onClick={() => props.setopenOtorisasi(false)}
          color="primary"
          variant="contained"
        >
          OK
        </Button>
        <Button
          onClick={() => props.setopenReject(false)}
          color="inherit"
          variant="contained"
        >
          Batal
        </Button>
      </DialogActions>
    </Dialog>
  );
}
