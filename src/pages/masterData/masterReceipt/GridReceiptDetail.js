import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";

const Paper = styled(MuiPaper)(spacing);

GridReceiptDetail.propTypes = {
  loading: PropTypes.bool,
  Data: PropTypes.any,
  setData: PropTypes.func,
  isEditingData: PropTypes.bool,
  setisEditingData: PropTypes.any,
  StatusMilik: PropTypes.any,
};

export default function GridReceiptDetail(props) {
  const { loading, setLoading } = props;

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState("");

  const [pageSizeData, setPageSizeData] = useState(5);
  const [selectionData, setSelectionData] = useState(0);
  const [row, setrow] = useState([]);
  const [reffdri, setreffdri] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsData = [
    {
      field: "costCode",
      headerName: "costCode",
      width: 200,
      // editable: false,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "documentType",
      headerName: "documentType",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "expirationDate",
      headerName: "expirationDate",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "inventoryID",
      headerName: "inventoryID",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "location",
      headerName: "location",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "lotSerialNbr",
      headerName: "lotSerialNbr",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "poReceiptNbr",
      headerName: "poReceiptNbr",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "project",
      headerName: "project",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "quantity",
      headerName: "quantity",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "reasonCode",
      headerName: "reasonCode",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "referenceNbr",
      headerName: "referenceNbr",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "warehouse",
      headerName: "warehouse",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "subitem",
      headerName: "subitem",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "projectTask",
      headerName: "projectTask",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "description",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "unitCost",
      headerName: "unitCost",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "uom",
      headerName: "uom",
      // editable: false,
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "receiptDetailGuid",
      sortable: false,
      disableColumnMenu: true,
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <strong>
          <div className="justify-center" style={{ alignItems: "center" }}>
            <IconButton
              aria-label="Delete"
              size="small"
              color="success"
              onClick={(e) => {
                setDataEdit(params.value);
                setOpenEdit(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={(e) => {
                const newList = row.filter(
                  (item) => item.receiptDetailGuid !== params.value
                );
                setrow(newList);
                props.setData(newList);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </strong>
      ),
    },
  ];

  const refData = useRef(null);
  const columnsDatas = useMemo(
    () =>
      columnsData.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refData.current = params.api;
          return null;
        },
      }),
    [columnsData]
  );

  function CustomToolbar() {
    const [open, setOpen] = React.useState(false);
    const [contact, setContact] = React.useState("");
    const [kodeEmployee, setKodeEmployee] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [email, setEmail] = useState("");
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    useEffect(() => {
      // getData();
      console.log("dataedit", dataEdit);
      if (dataEdit != "") {
        const newList = row.filter((item) => item.id === dataEdit);
        setContact(newList[0].contact);
        setKodeEmployee(newList[0].employeeID);
        setEmployeeName(newList[0].employeeName);
        setEmail(newList[0].email);
      }
    }, [dataEdit]);

    const UpdateRows = async () => {
      setrow([
        ...row,
        {
          id: row.length !== 0 ? row[row.length - 1].id + 1 : row.length + 1,
          contact: contact,
          employeeID: kodeEmployee,
          employeeName: employeeName,
          email: email,
          // MasterApprovalRepTransaksiID: menuID.transaksiID,
        },
      ]);
      setContact("");
      props.setDriver([
        ...row,
        {
          id: row.length !== 0 ? row[row.length - 1].id + 1 : row.length + 1,
          contact: contact,
          employeeID: kodeEmployee,
          employeeName: employeeName,
          email: email,
          // MasterApprovalRepTransaksiID: menuID.transaksiID,
        },
      ]);
      setOpen(false);
    };

    const EditRows = async () => {
      const newdata = row.map((item, i) => {
        if (dataEdit === item.id) {
          item.contact = contact;
          item.employeeID = kodeEmployee;
          item.employeeName = employeeName;
          item.email = email;
          // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
        }
        return item;
      });
      setrow(newdata);
      props.setDriver(newdata);
      setContact("");
      setDataEdit("");
      setOpenEdit(false);
    };

    return (
      <GridToolbarContainer>
        <Button color="primary" disableElevation onClick={() => setOpen(true)}>
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        <Dialog
          open={open}
          fullWidth={true}
          maxWidth={"md"}
          onClose={() => setOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Tambah</DialogTitle>
          <DialogContent>
            <DialogContentText>Penambahan List Approval</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  required
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  value={email}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  label="Contact"
                  type="text"
                  value={contact}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setContact(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setEmployeeName("");
                setKodeEmployee("");
                setContact("");
                setEmail("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={UpdateRows}
              color="primary"
              disabled={contact === "" || email === ""}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openEdit}
          fullWidth={true}
          maxWidth={"md"}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>Update Data Approval</DialogContentText>
            <Grid container spacing={3} md={12} mt={2}>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="text"
                  value={email}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={6} xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="contact"
                  label="Contact"
                  type="text"
                  value={contact}
                  InputProps={{
                    readOnly: props.StatusMilik == "Milik" ? true : false,
                  }}
                  onChange={(e) => setContact(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenEdit(false);
                setDataEdit("");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={EditRows} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </GridToolbarContainer>
    );
  }

  useEffect(() => {
    const newdata = props?.Data?.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setrow(newdata);
  }, [props.Data]);

  return (
    <>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Timer
              active={true}
              duration={null}
              style={{ textAlign: "center", marginBottom: 20 }}
            >
              <Timecode />
            </Timer>
          </Grid>
        </Grid>
      ) : (
        <Paper>
          <div style={{ height: 300, width: "100%", marginTop: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              editMode="row"
              // getRowId={(row) => row.employeeID}
              rows={row}
              hideFooter
              apiRef={refData}
              columns={columnsDatas}
              pageSize={pageSizeData}
              onPageSizeChange={(newPageSize) => setPageSizeData(newPageSize)}
              selectionModel={selectionData}
              onSelectionModelChange={(selection) => {
                setSelectionData(selection);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              // onCellDoubleClick={(e) => {
              //   handleDoubleData(e);
              // }}
              componentsProps={{
                toolbar: { refData },
              }}
            />
          </div>
        </Paper>
      )}
    </>
  );
}
