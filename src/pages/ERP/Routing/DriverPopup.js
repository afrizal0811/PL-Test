import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CbData from "../../../components/shared/dropdown";
import { getBrach } from "../../../utils/jwt";

export default function DriverPopup(props) {
  const [Data, setData] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [kodeEmployee, setKodeEmployee] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");

  // const [openEdit, props.setOpenEdit] = React.useState(false);
  // const [dataEdit, setDataEdit] = useState("");
  // const [rowDriver, setrowDriver] = useState([]);

  useEffect(() => {
    // getData();
    if (props.openEdit == true) {
      console.log("dataedit", props.dataEdit);
      if (props.dataEdit != "") {
        const newList = props.rowKend.filter(
          (item) => item.id === props.dataEdit
        );
        setData(newList[0]);
        setContact(newList[0].DriverContact);
        setKodeEmployee(newList[0].IDDriver);
        setEmployeeName(newList[0].DriverName);
        setEmail(newList[0].DriverEmail);
      }
    }
  }, [props.openEdit]);

  const EditRows = async () => {
    const newdata = props.rowKend.map((item, i) => {
      if (props.dataEdit === item.id) {
        item.DriverContact = contact;
        item.IDDriver = kodeEmployee;
        item.DriverName = employeeName;
        item.DriverEmail = email;
        // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
      }
      return item;
    });
    props.setrowKend(newdata);
    // props.setDriver(newdata);
    setContact("");
    props.setDataEdit("");
    props.setOpenEdit(false);
  };
  //state Customer ID
  // useEffect(() => {
  //   getData(1);
  // }, [searchText]);

  return (
    <React.Fragment>
      <Dialog
        open={props.openEdit}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => props.setOpenEdit(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Form Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Update Driver</DialogContentText>
          <Grid container spacing={3} md={12} mt={2}>
            {Data?.Kepemilikan == "Milik" ? (
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
                  readOnly: Data?.Kepemilikan == "Milik" ? true : false,
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
                value={email ? email : " "}
                InputProps={{
                  readOnly: Data?.Kepemilikan == "Milik" ? true : false,
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
                  readOnly: Data?.Kepemilikan == "Milik" ? true : false,
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
              props.setOpenEdit(false);
              props.setDataEdit("");
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
    </React.Fragment>
  );
}
