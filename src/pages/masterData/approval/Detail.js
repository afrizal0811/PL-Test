import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import CbBranch from "../../../components/shared/cbBranch";
import CbDepartment from "../../../components/shared/cbDepartement";
import CbEmployee from "../../../components/shared/cbEmployee";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Paper = styled(MuiPaper)(spacing);

function Header() {
  const [selection, setSelection] = useState(0);
  const [menuID, setMenuID] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const [transaksiID, settransaksiID] = useState("");
  const [departement, setDeparatement] = useState("");
  const [branch, setBranch] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const mounted = useRef();

  const handleSave = async () => {
    setLoading(true);
    try {
      let arr = data.map(
        ({
          MasterApprovalRepTransaksiID,
          employeeID,
          employeeName,
          levelling,
          nominal,
        }) => ({
          MasterApprovalRepTransaksiID,
          employeeID: employeeID.toString(),
          employeeName: employeeName.toString(),
          levelling,
          nominal,
        })
      );
      const payload = {
        transaksiID: transaksiID,
        departmentID: departement,
        branchID: branch,
        status: status,
        description: description,
        masterApprovalLineRep: arr,
      };
      console.log(payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/MasterApproval/" +
            "UpdateMasterApproval",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (
            response.status == 200 ||
            response.status == 201 ||
            response.status == 204
          ) {
            NotifySuccess("success", "Data Telah DiUbah");
            getData();
            setTimeout(() => {
              history(`/master-data/approval/${id}`);
              window.location.reload();
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

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getData();
    }
  }, [id]);

  const getData = () => {
    setLoading(true);
    try {
      axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/MasterApproval/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data;
            settransaksiID(resdata.TransaksiID);
            setBranch(resdata.BranchID);
            setDeparatement(resdata.DepartmentID);
            setDescription(resdata.Description);
            setStatus(resdata.Status);
            const newres = [];
            Object.keys(resdata.MasterApprovalLineRep).forEach(function (key) {
              newres.push({
                id: key,
                levelling: resdata.MasterApprovalLineRep[key].Levelling,
                employeeID: resdata.MasterApprovalLineRep[key].EmployeeID,
                employeeName: resdata.MasterApprovalLineRep[key].EmployeeName,
                nominal: resdata.MasterApprovalLineRep[key].Nominal,
                MasterApprovalRepTransaksiID:
                  resdata.MasterApprovalLineRep[key]
                    .MasterApprovalRepTransaksiID,
              });
            });
            setData(newres);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      console.log("getdata");
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "levelling",
      headerName: "Leveling",
      width: 150,
    },
    {
      field: "employeeID",
      headerName: "Kode Employee",
      width: 325,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 325,
    },
    {
      field: "nominal",
      headerName: "Nominal",
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
              aria-label="Delete"
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

  const deleteData = async (id) => {
    // console.log(id);
    console.log(id);
    const newList = data.filter((item) => item.id !== id);
    setData(newList);
  };

  const handleClick = async (id) => {
    // console.log(id);
    setDataEdit(id);
    setOpenEdit(true);
  };

  function CustomToolbar() {
    const [valueEmployee, setValueEmployee] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [kodeEmployee, setKodeEmployee] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const [nominal, setNominal] = useState("");
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const mounted = useRef();

    useEffect(() => {
      // console.log(dataEdit);
      // getData();
      if (dataEdit != "") {
        const newList = data.filter((item) => item.id === dataEdit);
        setName(newList[0].levelling);
        setValueEmployee(newList[0]);
        setKodeEmployee(newList[0].employeeID.toString().split(","));
        setEmployeeName(newList[0].employeeName.toString().split(","));
        setNominal(newList[0].nominal);
      }
    }, [dataEdit]);

    const UpdateRows = async () => {
      setData([
        ...data,
        {
          id:
            data.length !== 0 ? data[data.length - 1].id + 1 : data.length + 1,
          levelling: name,
          employeeID: kodeEmployee,
          employeeName: employeeName,
          nominal: nominal,
          MasterApprovalRepTransaksiID: id,
        },
      ]);
      setName("");
      setOpen(false);
    };

    const EditRows = async () => {
      const newdata = data.map((item, i) => {
        if (dataEdit === item.id) {
          item.levelling = name;
          item.employeeID = kodeEmployee;
          item.employeeName = employeeName;
          item.nominal = nominal;
          item.MasterApprovalRepTransaksiID = id;
        }
        return item;
      });
      setData(newdata);
      setName("");
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
          fullWidth={true}
          maxWidth={"md"}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Tambah</DialogTitle>
          <DialogContent>
            <DialogContentText>Penambahan List Approval</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="Leveling"
                  type="number"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6} mt={2}>
                <CbEmployee
                  multiple
                  all
                  defaultValue={kodeEmployee}
                  onChange={(newValue) => {
                    setValueEmployee(newValue);
                    if (newValue.length === 0) {
                      setKodeEmployee([]);
                      setEmployeeName([]);
                    } else {
                      setKodeEmployee(
                        newValue.map(({ employeeID }) => employeeID)
                      );
                      setEmployeeName(
                        newValue.map(({ employeeName }) => employeeName)
                      );
                    }
                    console.log("value", newValue);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={employeeName}
                  // disabled={true}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="nominal"
                  label="Nominal"
                  type="number"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setEmployeeName("");
                setKodeEmployee("");
                setValueEmployee([]);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={UpdateRows}
              color="primary"
              disabled={name === "" || nominal === ""}
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
            <DialogContentText>Update Data Approval</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Leveling"
                  type="number"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6} mt={2}>
                <CbEmployee
                  multiple
                  all
                  defaultValue={kodeEmployee}
                  onChange={(newValue) => {
                    setValueEmployee(newValue);
                    if (newValue.length === 0) {
                      setKodeEmployee("");
                      setEmployeeName("");
                    } else {
                      setKodeEmployee(
                        newValue.map(({ employeeID }) => employeeID)
                      );
                      setEmployeeName(
                        newValue.map(({ employeeName }) => employeeName)
                      );
                    }
                    console.log("value", newValue);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="nominal"
                  label="Nominal"
                  type="number"
                  value={nominal}
                  onChange={(e) => setNominal(e.target.value)}
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
              disabled={name === "" || nominal === ""}
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
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Approval
        </Typography>
        <Grid container spacing={6} md={12} mt={3}>
          <Grid item md={3} xs={6}>
            <TextField
              name="Transaksi"
              label="Transaksi ID"
              value={transaksiID}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <CbDepartment
              required
              defaultValue={departement}
              value={departement}
              onChange={(newValue) => {
                setDeparatement(newValue);
                // console.log(menuID);
              }}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <TextField
              name="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              // my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={3} xs={6}>
            <CbBranch
              required
              defaultValue={branch}
              value={branch}
              onChange={(newValue) => {
                setBranch(newValue);
                // console.log(menuID);
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
        <Paper>
          <div style={{ height: 400, width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
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
            onClick={handleSave}
            disabled={transaksiID === "" || branch === "" || departement === ""}
          >
            Save
          </Button>
        </Grid>
      </div>
    </Card>
  );
}

function DetailApproval() {
  return (
    <React.Fragment>
      <Helmet title="Detail Approval" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Approval
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/approval">
          Sistem Approval
        </Link>
        <Typography>Detail Approval</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailApproval;
