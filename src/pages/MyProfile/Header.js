import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import swal from "sweetalert2";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import { useParams } from "react-router-dom";
import {
  Button as MuiButton,
  CardContent as MuiCardContent,
  TextField as MuiTextField,
  Divider as MuiDivider,
  Autocomplete,
  Box,
  IconButton,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@material-ui/icons";
import { GetConfig } from "../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header(props) {
  const [header, setHeader] = useState({
    warehouseID: "...",
    description: "...",
    status: "...",
  });

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const { id } = useParams();
  const [employeeID, setEmployeeID] = useState("");
  const [cbEmployee, setCbEmployee] = useState();

  const [openUbahPassword, setOpenUbahPassword] = useState(false);

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSimpanUbahPassword = () => {
    setOpenUbahPassword(false);
    swal.fire({
      position: "top-end",
      icon: "success",
      title: "Password anda telah berhasil diubah",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const clearData = async () => {
    props.setEmployeeHistory([]);
    props.setEmployeeSetting({});
    props.setContactInfo({});
    props.setAddressInfo({});
  };

  const handleOpenUbahPassword = () => {
    setOpenUbahPassword(true);
  };

  const getData = async (id) => {
    props.setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/EmployeeReps/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data;
            // console.log(resdata);
            setHeader({
              employee: resdata.EmployeeID,
              employeeName: resdata.EmployeeName,
              status: resdata.Status,
            });
            if (resdata.ContactInfo) {
              props.setContactInfo({
                firstName: resdata.ContactInfo.FirstName,
                lastName: resdata.ContactInfo.LastName,
                email: resdata.ContactInfo.Email,
                middleName: resdata.ContactInfo.MiddleName,
              });
              props.setAddressInfo(resdata.ContactInfo.Address);
            } else {
              props.setContactInfo({
                firstName: "",
                lastName: "",
                email: "",
                middleName: "",
              });
              props.setAddressInfo({
                Country: "",
              });
            }

            if (resdata.EmployeeSettings) {
              props.setEmployeeSetting(resdata.EmployeeSettings);
            } else {
              props.setEmployeeSetting({
                BranchID: "",
                DepartmentID: "",
                EmployeeClass: "",
                EmployeeLogin: "",
              });
            }
            console.log(resdata.EmploymentHistory.length);
            const newdatahistory = resdata.EmploymentHistory.map((item, i) => {
              item.id = i;
              item.StartDate = moment(item.StartDate).format("DD/MM/YYYY");
              return item;
            });
            props.setEmployeeHistory(newdatahistory);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      props.setLoading(false);
    } catch (error) {
      console.log(error.message);
      props.setLoading(false);
    }
  };

  const getCbEmployee = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/EmployeeReps/DropDown/Employee",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status == 200 || response.status == 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push({
              employeeID: resdata[key].EmployeeID,
              employeeName: resdata[key].EmployeeName,
            });
          });
          setCbEmployee(newres);
        }
      });
  };

  useEffect(() => {
    if (employeeID !== "") {
      clearData();
      getData(employeeID.employeeID);
    } else {
      getData(id);
    }
    console.log("ini employeeID.employeeID", employeeID);
    getCbEmployee();
  }, [employeeID]);

  return (
    <CardContent>
      <div>
        {/* <Button
          mr={2}
          variant="contained"
          onClick={handleOpenUbahPassword}
          color="primary"
        >
          Ubah Password
        </Button> */}
        <Dialog
          open={openUbahPassword}
          onClose={() => setOpenUbahPassword(false)}
          aria-labelledby="form-dialog-title"
          fullWidth="true"
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title" variant="h6">
            Ubah Password
            <IconButton
              aria-label="close"
              onClick={() => setOpenUbahPassword(false)}
              style={{ position: "absolute", right: "5px", top: "5px" }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={4} mb={3}>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password Sekarang
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    fullWidth
                    type={values.showCurrentPassword ? "text" : "password"}
                    value={values.currentPassword}
                    onChange={handleChange("currentPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password Baru
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={values.showNewPassword ? "text" : "password"}
                    fullWidth
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl sx={{ m: 1 }} variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Konfirmasi Password Baru
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={values.showConfirmNewPassword ? "text" : "password"}
                    fullWidth
                    value={values.confirmNewPassword}
                    onChange={handleChange("confirmNewPassword")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {values.showConfirmNewPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          {/* <Divider
            my={6}
            ml={6}
            mr={6}
            style={{
              height: "2px",
              border: "none",
              backgroundColor: "#bdbdbd",
            }}
          /> */}
          <DialogActions>
            <Button
              onClick={handleSimpanUbahPassword}
              color="primary"
              variant="contained"
            >
              Simpan
            </Button>
            <Button
              onClick={() => setOpenUbahPassword(false)}
              color="primary"
              variant="outlined"
              mr={3}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Grid container spacing={6} md={8} mt={3}>
        <Grid item md={6} xs={6}>
          <TextField
            name="Employee ID"
            label="Employee ID"
            value={header.employee}
            fullWidth
            variant="outlined"
            // disabled={true}
            my={2}
            InputLabelProps={{
              readOnly: true,
              shrink: true,
            }}
          />
          {console.log("ini di employeeID = ", employeeID)}
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="status"
            label="Status"
            value={header.status}
            fullWidth
            variant="outlined"
            // disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="employeeName"
            label="Employee Name"
            value={header.employeeName}
            fullWidth
            variant="outlined"
            // disabled={true}
            my={2}
            InputLabelProps={{
              readOnly: true,
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}
