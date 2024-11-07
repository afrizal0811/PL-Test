import {
  Grid,
  CardContent as MuiCardContent,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);

export default function Header(props) {
  const [header, setHeader] = useState({
    warehouseID: "...",
    description: "...",
    status: false,
  });
  const { id } = useParams();
  const [employeeID, setEmployeeID] = useState("");
  const [cbEmployee, setCbEmployee] = useState();

  const clearData = async () => {
    props.setEmployeeHistory([]);
    props.setEmployeeSetting({});
    props.setContactInfo({});
    props.setAddressInfo({});
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
          if (response.status === 200) {
            const resdata = response.data;
            // console.log(resdata);
            // axios
            //   .get(
            //     `${process.env.REACT_APP_DOMAIN_API}` +
            //       "/EmployeeReps/DropDown/Employee"
            //   )
            //   .then(function (responsedep) {
            //     Object.keys(responsedep.data).forEach(function (key) {
            //       if (employeeID === "") {
            //         if (
            //           responsedep.data[key].employeeID == resdata.EmployeeID
            //         ) {
            //           setEmployeeID({
            //             employeeID: responsedep.data[key].employeeID,
            //             employeeName: responsedep.data[key].employeeName,
            //           });
            //         }
            //       }
            //     });
            //     console.log("ini responsedep = ", responsedep);
            //     console.log("ini resdata = ", resdata);
            //   });
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

  useEffect(() => {
    getData(id);
    console.log("ini employeeID.employeeID", employeeID);
    // getCbEmployee();
  }, []);

  return (
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Header
      </Typography>
      <Typography variant="body2" gutterBottom mt={3}>
        Employee
      </Typography>
      <Grid container spacing={6} md={8} mt={3}>
        <Grid item md={6} xs={6}>
          {/* <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            value={employeeID}
            onChange={(event, newValue) => {
              setEmployeeID(newValue);
              // console.log(newValue);
            }}
            options={cbEmployee}
            getOptionLabel={(option) =>
              option.employeeID + " - " + option.employeeName
            }
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.employeeID} - {option.employeeName}
              </Box>
            )}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                label="Employee ID"
                fullWidth
                my={2}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          
          {console.log("ini di employeeID = ", employeeID)} */}
          <TextField
            name="Employee ID"
            label="Employee ID"
            value={header.employee}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={6}>
          <TextField
            name="status"
            label="Status"
            value={header.status}
            fullWidth
            variant="outlined"
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
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
            disabled={true}
            my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}
