import { IconButton, TextField } from "@material-ui/core";
import { Clear, Search } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function QuickSearch({
  value,
  size,
  onChange,
  onClear,
  placeholder = "",
}) {
  return (
    <TextField
      placeholder={`Search ${placeholder}…`}
      onChange={onChange}
      fullWidth
      value={value}
      size={!!size ? size : "small"}
      InputProps={{
        startAdornment: <Search fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? "visible" : "hidden" }}
            onClick={onClear}
          >
            <Clear fontSize="small" />
          </IconButton>
        ),
      }}
      sx={{
        m: (theme) => theme.spacing(0),
        "& .MuiSvgIcon-root": {
          mr: 2,
        },
        "& .MuiInput-underline:before": {
          borderBottom: 1,
          borderColor: "divider",
        },
        float: "right",
      }}
    />
  );
}

QuickSearch.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  column: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
