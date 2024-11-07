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

CbZona.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.any,
  value: PropTypes.any,
  InputProps: PropTypes.any,
  required: PropTypes.bool,
  multiple: PropTypes.bool,
  all: PropTypes.bool,
};

function CbZona(props) {
  const { onChange, defaultValue, InputProps, value, required } = props;

  const [zona, setzona] = useState(defaultValue);
  const [cbZona, setCbZona] = useState([]);
  const [cbZonaID, setCbZonaID] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // setDepartment(defaultValue);
    setzona(value);
  }, [value]);

  const getData = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/ShippingZoneSyncReps/DropDown/Zona",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.status === 200 || response.status == 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push(resdata[key].ZoneID);
          });
          setCbZonaID(newres);
          setCbZona(resdata);
        }
      });
  };

  return (
    <>
      <Autocomplete
        freeSolo={!props.multiple}
        multiple={props.multiple}
        id="free-solo-2-demo"
        onChange={(event, newValue) => {
          if (props.all) {
            let op = cbZona.filter((item) => newValue.includes(item.ZoneID));
            onChange(op);
          } else {
            onChange(newValue);
          }
          setzona(newValue);
          // console.log(menuID);
        }}
        options={cbZonaID}
        defaultValue={defaultValue}
        value={value}
        getOptionLabel={(option) => option}
        renderOption={(propss, option, { selected }) => {
          let op = cbZona.filter((item) => item.ZoneID == option);
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
                  {op[0].ZoneID} - {op[0].Description}
                </li>
              </>
            );
          } else {
            return (
              <Box component="li" {...propss}>
                {op[0].ZoneID} - {op[0].Description}
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
                (required && zona === null) || (required && zona.length == 0)
                  ? "warning"
                  : ""
              }
              focused={
                (required && zona === null) || (required && zona.length == 0)
                  ? true
                  : false
              }
              label="zona"
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
      {(required && zona === null) ||
        (required && zona.length == 0 && (
          <FormHelperText style={{ color: "red" }}>Required</FormHelperText>
        ))}
    </>
  );
}

export default CbZona;
