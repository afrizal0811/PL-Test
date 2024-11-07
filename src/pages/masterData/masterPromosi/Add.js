import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const DummyPrincipal = [
  { Description: "The Shawshank Redemption", PrincipalID: 1994 },
  { Description: "The Godfather", PrincipalID: 1972 },
  { Description: "The Godfather: Part II", PrincipalID: 1974 },
  { Description: "The Dark Knight", PrincipalID: 2008 },
];

function Header() {
  //state Data
  const [Data, setData] = useState([]);
  const [Principal, setPrincipal] = useState([]);
  const [PromoID, setPromoID] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setstartDate] = useState(moment().format());
  const [dueDate, setdueDate] = useState(moment().format());
  const [status, setStatus] = useState(false);

  //state function
  const [DataPincipal, setDataPincipal] = useState(DummyPrincipal);
  const [FilterPrincipal, setFilterPrincipal] = React.useState([]);
  const [TempPincipal, setTempPincipal] = React.useState([]);
  const [SelectedPrincipal, setSelectedPrincipal] = React.useState(() =>
    DataPincipal.filter((el) => {
      return FilterPrincipal.some((f) => {
        return (
          f.PrincipalID === el.PrincipalID && f.Description === el.Description
        );
      });
    })
  );
  const [Loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = React.useState(false);
  const [dataModal, setDataModal] = useState("");

  const { id } = useParams();

  //other variabel
  const columnsPrincipal = [
    {
      field: "PrincipalID",
      headerName: "Principal ID",
      width: 200,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 200,
    },
  ];

  useEffect(() => {
    // getData();
  }, []);

  //Function Button
  const handleOpen = async () => {
    // console.log(id);
    // setDataEdit(id);
    setOpenModal(true);
  };

  const handleRefresh = async () => {
    window.location.reload();
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        PromoID: PromoID,
        Description: description,
        StartDate: startDate,
        DueDate: dueDate,
        status: status,
        Principal: Principal,
      };
      console.log(payload);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/Promo",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status == 201) {
            NotifySuccess("success", "Data telah ditambah");
            // setTimeout(() => {
            //   window.location.href = `/master-data/approval/${menuID.transaksiID}`;
            // }, 800);
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
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Promo
        </Typography>
        <Grid container spacing={6} md={12} mt={3}>
          <Grid item md={6} xs={12}>
            <TextField
              name="PromoID"
              label="Promo ID"
              value={PromoID}
              color={PromoID === "" ? "warning" : ""}
              focused={PromoID === "" ? true : false}
              fullWidth
              required
              variant="outlined"
              disabled={false}
              onChange={(e) => setPromoID(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {PromoID === "" && (
              <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="description"
              label="Promo Description"
              value={description}
              fullWidth
              variant="outlined"
              disabled={false}
              style={{ width: "100%" }}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatePicker
              label="Start Date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={startDate}
              inputFormat={"dd/MM/yyyy"}
              onChange={(value) => {
                setstartDate(value);
              }}
              renderInput={(params) => (
                <TextField style={{ width: "100%" }} {...params} />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <DatePicker
              label="Due Date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputFormat={"dd/MM/yyyy"}
              value={dueDate}
              onChange={(value) => {
                setdueDate(value);
              }}
              renderInput={(params) => (
                <TextField style={{ width: "100%" }} {...params} />
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              name="Principal"
              label="Principal"
              value={TempPincipal.map((item) => item)}
              onClick={() => setOpenModal(true)}
              fullWidth
              required
              variant="outlined"
              disabled={false}
              // onChange={(e) => setPrincipal(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  name="gilad"
                />
              }
              label="Active"
            />
          </Grid>
        </Grid>
      </CardContent>
      <div style={{ margin: "10px", flexGrow: 1 }}>
        <Grid
          container
          spacing={6}
          md={12}
          mt={3}
          paddingLeft={8}
          paddingBottom={5}
        >
          <Button
            mr={2}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            disabled={PromoID === "" || Loading}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            style={{ marginLeft: 7 }}
            variant="contained"
            color="error"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Grid>
      </div>
      <Dialog
        open={openModal}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setOpenModal(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Principal</DialogTitle>
        <DialogContent>
          <DialogContentText>Principal List</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 300, width: "100%" }}>
              <DataGrid
                rows={DummyPrincipal}
                getRowId={(row) => row.PrincipalID}
                columns={columnsPrincipal}
                pageSize={5}
                hideFooter={true}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                SelectedPrincipal={SelectedPrincipal}
                onSelectedPrincipalChange={(e) => {
                  setSelectedPrincipal(e);
                  const selectedIDs = new Set(e);
                  const selectedRows = DataPincipal.filter((r) =>
                    selectedIDs.has(r.id)
                  );
                  setFilterPrincipal(selectedRows);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
              // setPrincipal("");
              setSelectedPrincipal(TempPincipal);
              setFilterPrincipal(TempPincipal);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // console.log("selectedprinc", SelectedPrincipal);
              setOpenModal(false);
              setTempPincipal(SelectedPrincipal);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

function AddPromo() {
  return (
    <React.Fragment>
      <Helmet title="Add Promo" />
      <Typography variant="h3" gutterBottom display="inline">
        Add Promo
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-promo">
          Promo
        </Link>
        <Typography>Add Promo</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default AddPromo;
