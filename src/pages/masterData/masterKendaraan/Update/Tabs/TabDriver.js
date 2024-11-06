import { spacing } from "@material-ui/system";
import AddIcon from "@mui/icons-material/Add";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TabPanel } from "@mui/lab";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import CbData from "../../../../../components/shared/dropdown";
import { getBrach } from "../../../../../utils/jwt";

const Paper = styled(MuiPaper)(spacing);

TabDriver.propTypes = {
  loading: PropTypes.bool,
  Driver: PropTypes.any,
  setDriver: PropTypes.func,
  isEditingDriver: PropTypes.bool,
  setisEditingDriver: PropTypes.any,
  StatusMilik: PropTypes.any,
};

export default function TabDriver(props) {
  const { loading, setLoading } = props;

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState("");

  const [pageSizeDriver, setPageSizeDriver] = useState(5);
  const [selectionDriver, setSelectionDriver] = useState(0);
  const [rowDriver, setrowDriver] = useState([]);
  const [reffdri, setreffdri] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsDriver = [
    {
      field: "employeeID",
      headerName: "ID Driver",
      width: 200,
      // editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "employeeName",
      headerName: "Nama Driver",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "contact",
      headerName: "Contact",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "id",
      sortable: false,
      disableColumnMenu: true,
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <div className="justify-center" style={{ alignItems: "center" }}>
            <IconButton
              aria-label="Delete"
              size="small"
              color="success"
              onClick={(e) => {
                setDataEdit(params.value);
                setOpenEdit(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={(e) => {
                const newList = rowDriver.filter(
                  (item) => item.id !== params.value
                );
                setrowDriver(newList);
                props.setDriver(newList);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </strong>
      ),
    },
  ];

  function CustomToolbar() {
    const [open, setOpen] = React.useState(false);
    const [contact, setContact] = React.useState("");
    const [kodeEmployee, setKodeEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    useEffect(() => {
      // getData();
      console.log("dataedit", dataEdit);
      if (dataEdit != "") {
        const newList = rowDriver.filter((item) => item.id === dataEdit);
        setContact(newList[0].contact);
        setKodeEmployee(newList[0].employeeID);
        setEmployeeName(newList[0].employeeName);
        setEmail(newList[0].email);
      }
    }, [dataEdit]);

    const UpdateRows = async () => {
      setrowDriver([
        ...rowDriver,
        {
          id:
            rowDriver.length !== 0
              ? rowDriver[rowDriver.length - 1].id + 1
              : rowDriver.length + 1,
          contact: contact,
          employeeID: kodeEmployee,
          employeeName: employeeName,
          email: email,
          // MasterApprovalRepTransaksiID: menuID.transaksiID,
        },
      ]);
      setContact("");
      props.setDriver([
        ...rowDriver,
        {
          id:
            rowDriver.length !== 0
              ? rowDriver[rowDriver.length - 1].id + 1
              : rowDriver.length + 1,
          contact: contact,
          employeeID: kodeEmployee,
          employeeName: employeeName,
          email: email,
          // MasterApprovalRepTransaksiID: menuID.transaksiID,
        },
      ]);
      setOpen(false);
    };

    const EditRows = async () => {
      const newdata = rowDriver.map((item, i) => {
        if (dataEdit === item.id) {
          item.contact = contact;
          item.employeeID = kodeEmployee;
          item.employeeName = employeeName;
          item.email = email;
          // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
        }
        return item;
      });
      setrowDriver(newdata);
      props.setDriver(newdata);
      setContact("");
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
          <DialogTitle id="form-dialog-title">Add Driver</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} md={12} mt={2}>
              {props.StatusMilik == "Milik" ? (
                <>
                  <Grid item md={6} xs={6} mt={2}>
                    <CbData
                      required
                      // multiple
                      source={`${
                        process.env.REACT_APP_DOMAIN_API
                      }/EmployeeReps/DropDown/EmployeeDriver?branch=${getBrach()}`}
                      label="Employee ID"
                      id="employeeID"
                      desc="employeeName"
                      all
                      value={kodeEmployee}
                      defaultValue={kodeEmployee}
                      onChange={(newValue) => {
                        setKodeEmployee(newValue[0].employeeID);
                        setEmployeeName(newValue[0].employeeName);
                        setContact(newValue[0].contact);
                        setEmail(newValue[0].email);
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6} xs={6}>
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="KodeDriver"
                      label="Kode Driver"
                      type="text"
                      value={kodeEmployee}
                      onChange={(e) => setKodeEmployee(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  value={email}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="Contact"
                  type="text"
                  value={contact}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setContact(e.target.value)}
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
                setContact("");
                setEmail("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={UpdateRows}
              color="primary"
              disabled={contact === "" || email === ""}
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
              {props.StatusMilik == "Milik" ? (
                <>
                  <Grid item md={6} xs={6} mt={2}>
                    <CbData
                      // multiple
                      required
                      source={`${
                        process.env.REACT_APP_DOMAIN_API
                      }/EmployeeReps/DropDown/EmployeeDriver?branch=${getBrach()}`}
                      label="Employee ID"
                      id="employeeID"
                      desc="employeeName"
                      all
                      value={kodeEmployee}
                      defaultValue={kodeEmployee}
                      onChange={(newValue) => {
                        setKodeEmployee(newValue[0].employeeID);
                        setEmployeeName(newValue[0].employeeName);
                        setContact(newValue[0].contact);
                        setEmail(newValue[0].email);
                      }}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item md={6} xs={6}>
                    <TextField
                      required
                      autoFocus
                      margin="dense"
                      id="KodeDriver"
                      label="Kode Driver"
                      type="text"
                      value={kodeEmployee}
                      onChange={(e) => setKodeEmployee(e.target.value)}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
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
                  id="email"
                  label="Email"
                  type="text"
                  value={email}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="contact"
                  label="Contact"
                  type="text"
                  value={contact}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setContact(e.target.value)}
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
            <Button onClick={EditRows} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </GridToolbarContainer>
    );
  }

  const refDriver = useRef(null);
  const columnsDrivers = useMemo(
    () =>
      columnsDriver.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refDriver.current = params.api;
          return null;
        },
      }),
    [columnsDriver]
  );

  // useEffect(() => {
  //   let rowdri = refDriver?.current?.getRowsCount();
  //   if (refDriver.current !== null && !reffdri) {
  //     setreffdri(true);
  //     console.log("set reff", refDriver.current);
  //   }
  //   if (
  //     refDriver.current !== null &&
  //     !reffdri &&
  //     rowdri > 0 &&
  //     !refDriver?.current?.getCellValue(rowdri, "employeeName")
  //   ) {
  //     refDriver?.current?.setRowMode(rowdri, "edit");
  //   }
  // }, [refDriver.current]);

  useEffect(() => {
    const newdata = props?.Driver?.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setrowDriver(newdata);
  }, [props.Driver]);

  return (
    <TabPanel value="2">
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Timer
              active={true}
              duration={null}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Timecode />
            </Timer>
          </Grid>
        </Grid>
      ) : (
        <Paper>
          <div style={{ height: 300, width: "100%", marginTop: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              editMode="row"
              // getRowId={(row) => row.employeeID}
              rows={rowDriver}
              hideFooter
              apiRef={refDriver}
              columns={columnsDrivers}
              pageSize={pageSizeDriver}
              onPageSizeChange={(newPageSize) => setPageSizeDriver(newPageSize)}
              selectionModel={selectionDriver}
              onSelectionModelChange={(selection) => {
                setSelectionDriver(selection);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              // onCellDoubleClick={(e) => {
              //   handleDoubleDriver(e);
              // }}
              componentsProps={{
                toolbar: { refDriver },
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
