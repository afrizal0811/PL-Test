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

CbData.propTypes = {
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

function CbData(props) {
  const {
    onChange,
    defaultValue,
    InputProps,
    value,
    required,
    source: urlSource,
    id: keyValue,
  } = props;

  const [cbData, setCbData] = useState([]);
  const [cbDataKeyValue, setCbDataKeyValue] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log({ cbDataKeyValue, cbData });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSource]);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(props.source, !props.config ? GetConfig() : props.config)
      .then(function (response) {
        if (response.status === 200 || response.status === 201) {
          const resData = response.data;
          const arrkeyValue = [];
          resData.forEach((item) => {
            arrkeyValue.push(item[keyValue]);
          });
          setCbDataKeyValue(arrkeyValue);
          setCbData(resData);
        }
      });
    setLoading(false);
  };

  return (
    <>
      <Autocomplete
        multiple={props.multiple}
        size={props.size}
        onBlur={props.onBlur}
        id="free-solo-2-demo"
        getOptionDisabled={(option) => option === props.disabledId}
        onChange={(event, newValue) => {
          if (props.all && newValue !== null) {
            let op = cbData.filter((item) => newValue.includes(item[keyValue]));
            onChange(op);
          } else {
            onChange(newValue);
          }
        }}
        options={cbDataKeyValue}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbData.filter((item) => item[keyValue] === option);
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
                  {op[0][keyValue]}
                  {props.desc ? " - " + op[0][props.desc] : ""}
                </li>
              </>
            );
          } else {
            return (
              <li {...propss}>
                {op[0][keyValue]}
                {props.desc ? " - " + op[0][props.desc] : ""}
              </li>
            );
          }
        }}
        disabled={props.disabled || loading}
        disableCloseOnSelect={props.multiple}
        disableClearable={props.required}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              required={required}
              color={
                (required && value === undefined) ||
                (required && value === null) ||
                (required && value?.length === 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && value === undefined) ||
                (required && value === null) ||
                (required && value?.length === 0)
                  ? true
                  : false
              }
              label={props.label}
              InputProps={{
                ...params.InputProps,
                ...InputProps,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          );
        }}
      />
      {((required && value === undefined) ||
        (required && value === null) ||
        (required && value?.length === 0)) && (
        <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
      )}
    </>
  );
}

export default CbData;
