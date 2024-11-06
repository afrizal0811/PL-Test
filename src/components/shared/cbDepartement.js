import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  TextField,
  Autocomplete,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";
import axios from "axios";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { GetConfig } from "../../utils/ConfigHeader";

CbDepartment.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  all: PropTypes.bool,
};

function CbDepartment(props) {
  const { onChange, defaultValue, InputProps, value, required } = props;

  const [Department, setDepartment] = useState(defaultValue);
  const [cbDepartment, setCbDepartment] = useState([]);
  const [cbDepartmentID, setCbDepartmentID] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // setDepartment(defaultValue);
    setDepartment(value);
  }, [value]);

  const getData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/DepartmentsReps/DropDown/Department",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.status == 200 || response.status == 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push(resdata[key].DepartmentID);
          });
          setCbDepartmentID(newres);
          setCbDepartment(resdata);
        }
      });
  };

  return (
    <>
      <Autocomplete
        // freeSolo={!props.multiple}
        multiple={props.multiple}
        id="free-solo-2-demo"
        onChange={(event, newValue) => {
          if (props.all) {
            let op = cbDepartment.filter((item) =>
              newValue.includes(item.DepartmentID)
            );
            onChange(op);
          } else {
            onChange(newValue);
          }
          setDepartment(newValue);
          console.log("new value", newValue);
        }}
        options={cbDepartmentID}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbDepartment.filter((item) => item.DepartmentID == option);
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
                  {op[0].DepartmentID} - {op[0].Description}
                </li>
              </>
            );
          } else {
            return (
              <Box component="li" {...propss}>
                {op[0].DepartmentID} - {op[0].Description}
              </Box>
            );
          }
        }}
        disableCloseOnSelect={props.multiple}
        disableClearable={!props.multiple}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={required}
              color={
                (required && Department === undefined) ||
                (required && Department.length == 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && Department === undefined) ||
                (required && Department.length == 0)
                  ? true
                  : false
              }
              label="Department"
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
      {(required && Department === undefined) ||
        (required && Department.length == 0 && (
          <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
        ))}
    </>
  );
}

export default CbDepartment;
