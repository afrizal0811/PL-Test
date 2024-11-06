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
  TextField,
  Grid,
  CircularProgress,
  Typography,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Divider,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import CloseIcon from "@material-ui/icons/Close";
// import CbData from "../../../../../components/shared/dropdown";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import { NotifyError } from "../../../services/notification.service";
import { GetConfig } from "../../../../utils/ConfigHeader";
import moment from "moment";

const Button = styled(MuiButton)(spacing);

const columnsKeterangan = [
  // { field: "Customer", headerName: "Customer Name", width: 200 },
  {
    field: "level",
    headerName: "Level",
    sortable: false,
    width: 90,
    editable: false,
  },
  {
    field: "namaApprover",
    headerName: "Nama Approver",
    width: 350,
    sortable: false,
    editable: false,
  },
  {
    field: "action",
    headerName: "Action",
    width: 170,
    sortable: false,
    editable: false,
  },
  {
    field: "tgl",
    headerName: "Tanggal & Jam",
    width: 200,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      return (
        <>{!!params.value ? moment(params.value).format("DD-MM-YYYY") : ""}</>
      );
    },
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 200,
    sortable: false,
    editable: false,
  },
];

export default function HistApprovalPopup(props) {
  const [StatusUrgen, setStatusUrgen] = useState(false);
  const [Status, setStatus] = useState("");
  const [keterangan, setketerangan] = useState("");
  const [ReasonBatal, setReasonBatal] = useState("");
  // const [totalNominalJT, settotalNominalJT] = useState("");
  // const [jumlahBelumJT, setjumlahBelumJT] = useState("");
  // const [totalNominalBelumJT, settotalNominalBelumJT] = useState("");
  const [Detail, setDetail] = useState([]);
  const [openHistApproval, setopenHistApproval] = useState(false);
  // const [DetailFaktur, setDetailFaktur] = useState([]);
  // const [Faktur, setFaktur] = useState({});
  const [Loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (props.openHistApproval && props.SelectedSO.length == 1) {
      getHistory(props.SelectedSO[0].IDListSOOtorisasi);
    }
    // console.log("selectedso", props.SelectedSO);
  }, [props.openHistApproval]);

  const getHistory = async (id) => {
    try {
      setLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/ListSOOtorisasi/GetHistoryApproval?idListOtorisasi=${id}`,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            let resp = response.data;
            const newdata = resp.map((item, i) => {
              item.id = i;
              return item;
            });
            setDetail(newdata);
            // setDetailFBL(response.data.fakturBelumLunas);
            // setTimeout(() => {
            //   window.location.href = `/master-data/master-kendaraan`;
            // }, 1000);
          }
        })
        .catch(function (error) {
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
      open={props.openHistApproval}
      // sx={{ zIndex: 999, mt: 10 }}
      onClose={() => props.setopenHistApproval(false)}
      aria-labelledby="form-dialog-title"
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title" variant="h6">
        History Approval
        <IconButton
          aria-label="close"
          onClick={() => props.setopenHistApproval(false)}
          style={{ position: "absolute", right: "5px", top: "5px" }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container mb={3}>
          <Typography variant="subtitle1" gutterBottom mt={3}>
            {props?.SelectedSO[0]?.CustomerID} -{" "}
            {props?.SelectedSO[0]?.CustomerID_desc}
          </Typography>
        </Grid>
        <Grid container>
          <div style={{ width: "100%" }}>
            <DataGrid
              rows={Detail}
              columns={columnsKeterangan}
              disableSelectionOnClick
              autoHeight
              density="compact"
              hideFooter
              disableColumnFilter
              disableColumnMenu
              disableColumnSelector
              // rowsPerPageOptions={[]}
            />
          </div>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={lanjut}
              onChange={handleChangeLanjut}
              name="lanjut"
            />
          }
          label="Lanjut"
        /> */}
      </DialogActions>
    </Dialog>
  );
}
