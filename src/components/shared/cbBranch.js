import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormHelperText,
  TextField,
} from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { GetConfig } from "../../utils/ConfigHeader";

CbBranch.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  config: PropTypes.any,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  all: PropTypes.bool,
};

function CbBranch(props) {
  const { onChange, defaultValue, InputProps, value, required } = props;

  const [Branch, setBranch] = useState(defaultValue);
  const [cbBranch, setCbBranch] = useState([]);
  const [cbBranchID, setCbBranchID] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // setDepartment(defaultValue);
    setBranch(value);
  }, [value]);

  const getData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` + "/BranchReps/DropDown/Branch",
        !props.config ? GetConfig() : props.config
      )
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push(resdata[key].BranchID);
          });
          setCbBranchID(newres);
          setCbBranch(resdata);
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
            let op = cbBranch.filter((item) =>
              newValue.includes(item.BranchID)
            );
            onChange(op);
          } else {
            onChange(newValue);
          }
          setBranch(newValue);
          console.log("new value", newValue);
        }}
        options={cbBranchID}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbBranch.filter((item) => item.BranchID === option);
          // console.log("op", op);
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
                  {op[0].BranchID} - {op[0].BranchName}
                </li>
              </>
            );
          } else {
            return (
              <Box component="li" {...propss}>
                {op[0].BranchID} - {op[0].BranchName}
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
                (required && Branch === undefined) ||
                (required && Branch.length === 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && Branch === undefined) ||
                (required && Branch.length === 0)
                  ? true
                  : false
              }
              label="Branch"
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
      {(required && Branch === undefined) ||
        (required && Branch.length === 0 && (
          <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
        ))}
    </>
  );
}

export default CbBranch;
