import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

export default function Table() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    // getData();
    console.log(rows.length);
  }, [rows]);

  const UpdateRows = async () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        name: name,
      },
    ]);
    setOpen(false);
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={UpdateRows} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <DataGrid editMode="row" rows={rows} columns={columns} />
    </div>
  );
}

const columns = [
  { field: "name", headerName: "Name", width: 180, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];
