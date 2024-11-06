import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import CbBranch from "../../../components/shared/cbBranch";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);

NumberingTabel.propTypes = {
  numberingID: PropTypes.any,
  description: PropTypes.any,
  screenID: PropTypes.any,
};

export default function NumberingTabel(props) {
  const { numberingID, description, screenID } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState(props.Data);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    // getData();
    setData(props.Data);
  }, [props]);

  const deleteData = async (id) => {
    console.log(id);
    const newList = data.filter((item) => item.id !== id);
    props.setData(newList);
  };

  const handleClick = async (id) => {
    // console.log(id);
    setDataEdit(id);
    setOpenEdit(true);
  };

  const notifyConfirm = async (id) => {
    // console.log("ini rowNumber => " + this.rowNumber);
    // console.log("ini rowNumber => " + id);
    swal
      .fire({
        title: "Apakah Anda Yakin Ingin Menyimpan ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3062e3",
        cancelButtonColor: "#d33",
        confirmButtonText: "Simpan",
      })
      .then((result) => {
        if (result.value) {
          handleSave();
        }
      });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let arr = data.map(
        ({
          // numberingDetailID,
          branchID,
          startNumber,
          endNumber,
          // startDate,
          lastNumber,
          warningNumber,
          numberingStep,
        }) => ({
          // numberingDetailID: numberingDetailID.toString(),
          branchID: branchID.toString(),
          startNumber: startNumber.toString(),
          endNumber: endNumber.toString(),
          // startDate: startDate.toString(),
          lastNumber: lastNumber.toString(),
          warningNumber: warningNumber.toString(),
          numberingStep: numberingStep.toString(),
        })
      );
      const payload = {
        numberingID: numberingID,
        description: description,
        screenID: screenID,
        numberingSequenceDetailRep: arr,
      };
      console.log("ini datakuu", data);
      console.log(payload);

      await axios
        .post(
          `http://119.8.167.126:88/api/NumberingSequenceReps/CreateMasterNumberingSequence`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            setTimeout(() => {
              window.location.href = `/konfigurasi/numbering-sequences`;
            }, 800);
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

  const columns = [
    {
      field: "NumberingDetailID",
      headerName: "Numbering ID",
      width: 200,
    },
    {
      field: "BranchID",
      headerName: "Branch ID",
      width: 200,
    },
    {
      field: "StartNumber",
      headerName: "Start Number",
      width: 200,
    },
    {
      field: "EndNumber",
      headerName: "End Number",
      width: 200,
    },
    {
      field: "LastNumber",
      headerName: "Last Number",
      width: 200,
    },
    {
      field: "NumberingStep",
      headerName: "Numbering Step",
      width: 200,
    },
    {
      field: "id",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <div className="justify-center" style={{ alignItems: "center" }}>
            <IconButton
              aria-label="Edit"
              size="small"
              color="success"
              onClick={() => handleClick(params.value)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={() => deleteData(params.value)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </strong>
      ),
    },
  ];

  function CustomToolbar() {
    const [open, setOpen] = useState(false);
    const [numberingDetailID, setNumberingDetailID] = useState("");
    const [branchID, setbranchID] = useState("");
    const [startNumber, setStartNumber] = useState("");
    const [endNumber, setEndNumber] = useState("");
    // const [startDate, setStartDate] = useState("");
    const [lastNumber, setLastNumber] = useState("");
    // const [warningNumber, setWarningNumber] = useState("");
    const [numberingStep, setNumberingStep] = useState("");

    useEffect(() => {
      // getData();
      if (dataEdit != "") {
        const newList = data.filter((item) => item.id === dataEdit);
        setNumberingDetailID(newList[0].NumberingDetailID);
        setbranchID(newList[0].BranchID);
        setStartNumber(newList[0].StartNumber);
        setEndNumber(newList[0].EndNumber);
        // setStartDate(newList[0].startDate);
        setLastNumber(newList[0].LastNumber);
        // setWarningNumber(newList[0].warningNumber);
        setNumberingStep(newList[0].NumberingStep);
      }
    }, [dataEdit]);

    const getData = () => {
      setLoading(true);
      try {
        axios
          .get(
            `${process.env.REACT_APP_DOMAIN_API}` + "/NumberingSequenceReps/",
            GetConfig()
          )
          .then(function (response) {
            if (response.status == 200) {
              const resdata = response.data;
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };

    const UpdateRows = async () => {
      props.setData([
        ...data,
        {
          id:
            data.length !== 0 ? data[data.length - 1].id + 1 : data.length + 1,
          // NumberingDetailID: numberingDetailID,
          BranchID: branchID,
          StartNumber: startNumber,
          EndNumber: endNumber,
          // startDate: startDate,
          LastNumber: lastNumber,
          // warningNumber: warningNumber,
          NumberingStep: numberingStep,
        },
      ]);
      // setBranchID("");
      console.log("updatre", data);
      setOpen(false);
    };

    const EditRows = async () => {
      const newdata = data.map((item, i) => {
        if (dataEdit === item.id) {
          // item.NumberingDetailID = numberingDetailID;
          item.BranchID = branchID;
          item.StartNumber = startNumber;
          item.EndNumber = endNumber;
          // item.startDate = startDate;
          item.LastNumber = lastNumber;
          // item.warningNumber = warningNumber;
          item.NumberingStep = numberingStep;
        }
        return item;
      });
      props.setData(newdata);
      // setBranchID("");
      setDataEdit("");
      setOpenEdit(false);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" disableElevation onClick={() => setOpen(true)}>
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth={"md"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Tambah</DialogTitle>
          <DialogContent>
            <DialogContentText>Penambahan List Numbering</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              {/* <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="numberingDetailID"
                  label="Numbering ID"
                  type="text"
                  value={numberingDetailID}
                  onChange={(e) => setNumberingDetailID(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              <Grid item md={6} xs={6}>
                <CbBranch
                  required
                  value={branchID}
                  onChange={(newValue) => {
                    setbranchID(newValue);
                    // console.log(TransaksiID);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="startNumber"
                  label="Start Number"
                  type="text"
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="endNumber"
                  label="End Number"
                  type="text"
                  value={endNumber}
                  onChange={(e) => setEndNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              {/* <Grid item md={6} xs={6}>
                <Paper mt={3}>
                  <DatePicker
                    label="Start Date"
                    autoFocus
                    required
                    margin="dense"
                    id="startDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Paper>
              </Grid> */}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="lastNumber"
                  label="Last Number"
                  type="text"
                  value={lastNumber}
                  onChange={(e) => setLastNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              {/* <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="warningNumber"
                  label="Warning Number"
                  type="text"
                  value={warningNumber}
                  onChange={(e) => setWarningNumber(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="numberingStep"
                  label="Numbering Step"
                  type="text"
                  value={numberingStep}
                  onChange={(e) => setNumberingStep(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                // setNumberingDetailID("");
                // setBranchID("");
                setStartNumber("");
                setEndNumber("");
                // setStartDate("");
                setLastNumber("");
                // setWarningNumber("");
                setNumberingStep("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={UpdateRows}
              color="primary"
              // disabled={numberingDetailID === ""}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEdit}
          fullWidth={true}
          maxWidth={"md"}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>Update Data Numbering</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              {/* <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="numberingDetailID"
                  label="Numbering ID"
                  type="text"
                  value={numberingDetailID}
                  onChange={(e) => setNumberingDetailID(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              {/* <Grid item md={6} xs={6}>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="branchID"
                  label="Branch ID"
                  type="text"
                  value={branchID}
                  onChange={(e) => setBranchID(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              <Grid item md={6} xs={6}>
                <CbBranch
                  required
                  value={branchID}
                  onChange={(newValue) => {
                    setbranchID(newValue);
                    // console.log(TransaksiID);
                  }}
                />
                {/* <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="branchID"
                  label="Branch ID"
                  type="text"
                  value={branchID}
                  onChange={(e) => setbranchID(e.target.value)}
                  fullWidth
                /> */}
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="startNumber"
                  label="Start Number"
                  type="text"
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="endNumber"
                  label="End Number"
                  type="text"
                  value={endNumber}
                  onChange={(e) => setEndNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              {/* <Grid item md={6} xs={6}>
                <Paper mt={3}>
                  <DatePicker
                    label="Start Date"
                    autoFocus
                    required
                    margin="dense"
                    id="startDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Paper>
              </Grid> */}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="lastNumber"
                  label="Last Number"
                  type="text"
                  value={lastNumber}
                  onChange={(e) => setLastNumber(e.target.value)}
                  fullWidth
                />
              </Grid>
              {/* <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="warningNumber"
                  label="Warning Number"
                  type="text"
                  value={warningNumber}
                  onChange={(e) => setWarningNumber(e.target.value)}
                  fullWidth
                />
              </Grid> */}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="numberingStep"
                  label="Numbering Step"
                  type="text"
                  value={numberingStep}
                  onChange={(e) => setNumberingStep(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenEdit(false);
                setDataEdit("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={EditRows}
              color="primary"
              // disabled={numberingDetailID === ""}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <div style={{ margin: "10px", flexGrow: 1 }}>
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Paper>
        {/* <Grid
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
            disabled={numberingID === ""}
            onClick={notifyConfirm}
          >
            Save
          </Button>
        </Grid> */}
      </div>
    </Card>
  );
}
