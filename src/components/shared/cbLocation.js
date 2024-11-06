import {
  Autocomplete,
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

CbLocation.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  all: PropTypes.bool,
  source: PropTypes.string,
  id: PropTypes.string,
  desc: PropTypes.string,
  label: PropTypes.string,
  config: PropTypes.object,
};

function CbLocation(props) {
  const { onChange, defaultValue, InputProps, value, required } = props;

  const [Data, setData] = useState(defaultValue);
  const [cbData, setCbData] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [cbDataID, setCbDataID] = useState([]);
  const [Loading, setLoading] = useState(false);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
  }, [props.customerID]);

  useEffect(() => {
    // setDepartment(defaultValue);
    setData(value);
  }, [value]);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}/CustomerReps/Locations?page=1&rowsCount=50&customerName=${props.customerID}`,
        !props.config ? GetConfig() : props.config
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status == 200 || response.status == 201) {
          const resdata = response.data[0]?.record[0]?.location;
          console.log("resdata", resdata);
          const newres = [];
          if (resdata) {
            Object.keys(resdata).forEach(function (key) {
              newres.push(resdata[key][props.id]);
            });
          }
          // console.log("newres", newres);
          setCbDataID(newres);
          setCbData(resdata);
        }
      });
    setLoading(false);
  };

  return (
    <>
      <Autocomplete
        freeSolo={!props.multiple}
        multiple={props.multiple}
        id="free-solo-2-demo"
        onChange={(event, newValue) => {
          if (props.all) {
            let op = cbData.filter((item) => newValue.includes(item[props.id]));
            onChange(op);
          } else {
            onChange(newValue);
          }
          setData(newValue);
          // console.log("new value", newValue);
        }}
        options={cbDataID}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbData.filter((item) => item[props.id] == option);
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
                  {op[0][props.id]}
                  {props.desc ? " - " + op[0][props.desc] : ""}
                </li>
              </>
            );
          } else {
            return (
              <li {...propss}>
                {op[0][props.id]}
                {props.desc ? " - " + op[0][props.desc] : ""}
              </li>
            );
          }
        }}
        disabled={props.disabled || Loading}
        disableCloseOnSelect={props.multiple}
        disableClearable={!props.multiple}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={required}
              color={
                (required && Data === undefined) ||
                (required && Data.length == 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && Data === undefined) ||
                (required && Data.length == 0)
                  ? true
                  : false
              }
              label={props.label}
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
      {(required && Data === undefined) ||
        (required && Data.length == 0 && (
          <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
        ))}
    </>
  );
}

export default CbLocation;
