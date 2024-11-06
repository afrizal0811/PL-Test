import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import * as React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function MultipleDropdown() {
  const [employee, setEmployee] = React.useState("");
  React.useEffect(() => {
    console.log(employee);
  }, [employee]);
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onChange={(event, newValue) => {
        Object.keys(newValue).forEach(function (key) {
          setEmployee(employee + newValue[key].title + "; ");
        });
        console.log(newValue);
      }}
      options={top100Films}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title + " - " + option.year}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title} - {option.year}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Employee" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
];
