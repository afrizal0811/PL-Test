import {
  Autocomplete,
  Box,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../utils/ConfigHeader";

CbEmployee.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  all: PropTypes.bool,
};

function CbEmployee(props) {
  const { onChange, defaultValue, InputProps, value, required } = props;

  const [employee, setemployee] = useState(defaultValue);
  const [cbEmployee, setCbEmployee] = useState([]);
  const [cbEmployeeID, setCbEmployeeID] = useState([]);
  const [Loading, setLoading] = useState(false);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // setDepartment(defaultValue);
    setemployee(value);
  }, [value]);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/EmployeeReps?page=1&rowsCount=800",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.status == 200 || response.status == 201) {
          const resdata = response.data[0].record;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push(resdata[key].EmployeeID);
          });
          setCbEmployeeID(newres);
          setCbEmployee(resdata);
        }
      });
    setLoading(false);
  };

  const filterOptions = (options, state) => {
    let newOptions = [];
    cbEmployee.forEach(({ EmployeeID, EmployeeName }) => {
      if (
        EmployeeName.toLowerCase().includes(state.inputValue.toLowerCase()) ||
        EmployeeID.toLowerCase().includes(state.inputValue.toLowerCase())
      )
        newOptions.push(EmployeeID);
    });

    return state.inputValue ? newOptions : options;
  };

  return (
    <>
      <Autocomplete
        freeSolo={!props.multiple}
        multiple={props.multiple}
        filterOptions={filterOptions}
        id="free-solo-2-demo"
        onChange={(event, newValue) => {
          if (props.all) {
            let op = cbEmployee.filter((item) =>
              newValue.includes(item.EmployeeID)
            );
            console.log("new all", newValue);
            onChange(op);
          } else {
            onChange(newValue);
            console.log("new", newValue);
          }
          setemployee(newValue);
        }}
        options={cbEmployeeID}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbEmployee.filter((item) => item.EmployeeID == option);
          if (props.multiple) {
            return (
              <>
                <li {...propss}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {op[0].EmployeeID} - {op[0].EmployeeName}
                </li>
              </>
            );
          } else {
            return (
              <Box component="li" {...propss}>
                {op[0].EmployeeID} - {op[0].EmployeeName}
              </Box>
            );
          }
        }}
        disableCloseOnSelect={props.multiple}
        disableClearable={!props.multiple}
        disabled={props.disabled || Loading}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={required}
              color={
                (required && employee === null) ||
                (required && employee.length == 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && employee === null) ||
                (required && employee.length == 0)
                  ? true
                  : false
              }
              label="Employee"
              InputProps={{
                ...params.InputProps,
                ...InputProps,
                type: "search",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          );
        }}
      />
      {(required && employee === null) ||
        (required && employee.length == 0 && (
          <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
        ))}
    </>
  );
}

export default CbEmployee;
