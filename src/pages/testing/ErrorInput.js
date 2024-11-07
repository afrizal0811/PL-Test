// import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ErrorInput() {
  // const [employee, setEmployee] = React.useState("");
  const employee = "";
  const [branch, setBranch] = React.useState("");
  const [branchName, setBranchName] = React.useState("");
  const [save, setSave] = React.useState(0);
  React.useEffect(() => {
    console.log(employee);
  }, [employee]);

  const onSumbitHandler = async () => {
    if (branch === "" || branchName === "") {
      setSave(1);
    } else {
      setSave(0);
    }
  };

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Master Data Branch
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6}>
            <TextField
              error={save === 1 && branch === ""}
              name="branch"
              label="Branch ID"
              helperText={
                save === 1 && branch === "" ? "Please fill out this field" : ""
              }
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              fullWidth
              variant="outlined"
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              error={save === 1 && branchName === ""}
              name="branchName"
              label="Branch Name"
              helperText={
                save === 1 && branch === "" ? "Please fill out this field" : ""
              }
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              fullWidth
              variant="outlined"
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              startIcon={<SaveIcon />}
              onClick={onSumbitHandler}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
// ];
