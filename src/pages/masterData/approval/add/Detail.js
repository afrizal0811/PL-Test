import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { spacing } from "@material-ui/system";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Select,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import CbBranch from "../../../../components/shared/cbBranch.js";
import CbEmployee from "../../../../components/shared/cbEmployee.js";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader.js";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);

DetailApproval.propTypes = {
  ScreenID: PropTypes.any,
  description: PropTypes.any,
  departement: PropTypes.any,
  branch: PropTypes.any,
  status: PropTypes.any,
  data: PropTypes.any,
  setData: PropTypes.any,
};

export default function DetailApproval(props) {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const deleteData = async (id) => {
    console.log(id);
    const newList = data.filter((item) => item.id !== id);
    // setData(newList);
    props.setData(newList);
  };

  useEffect(() => {
    // getData();
    setData(props.data);
  }, [props]);

  const handleClick = async (id) => {
    // console.log(id);
    setDataEdit(id);
    setOpenEdit(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Actions",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <strong>
          <div className="justify-center" style={{ alignItems: "center" }}>
            <IconButton
              aria-label="Edit"
              size="small"
              color="success"
              onClick={() => handleClick(params.value)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={() => deleteData(params.value)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </strong>
      ),
    },
    {
      field: "levelling",
      headerName: "Leveling",
      sortable: false,
      width: 95,
    },
    {
      field: "employeeID",
      headerName: "Employee ID",
      sortable: false,
      width: 115,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      sortable: false,
      width: 175,
    },
    {
      field: "salespersonID",
      headerName: "Salesperson ID",
      sortable: false,
      width: 130,
    },
    {
      field: "tipe1",
      headerName: "Tipe 1",
      sortable: false,
      width: 105,
    },
    {
      field: "actionList",
      headerName: "Action",
      sortable: false,
      width: 105,
    },
    {
      field: "operatorLimit",
      headerName: "Operator Limit",
      sortable: false,
      width: 130,
    },
    {
      field: "limit1",
      headerName: "Limit 1",
      sortable: false,
      width: 105,
    },
    {
      field: "limit2",
      headerName: "Limit 2",
      sortable: false,
      width: 105,
    },
    {
      field: "operatorTOP",
      headerName: "Operator TOP",
      sortable: false,
      width: 120,
    },
    {
      field: "toP1",
      headerName: "TOP 1",
      sortable: false,
      width: 100,
    },
    {
      field: "toP2",
      headerName: "TOP 2",
      sortable: false,
      width: 100,
    },
  ];

  function CustomToolbar() {
    const [valueEmployee, setValueEmployee] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState();
    const [EmployeeID, setEmployeeID] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const [nominal, setNominal] = useState("");
    const [salespersonID, setsalespersonID] = useState("");
    const [tipe1, settipe1] = useState("");
    const [actionList, setactionList] = useState("");
    const [operatorLimit, setoperatorLimit] = useState("Equals");
    const [limit1, setlimit1] = useState("");
    const [limit2, setlimit2] = useState("");
    const [operatorTOP, setoperatorTOP] = useState("Equals");
    const [toP1, settoP1] = useState("");
    const [toP2, settoP2] = useState("");
    const [departement, setDeparatement] = useState("");
    const [branch, setBranch] = useState("");

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    useEffect(() => {
      // getData();
      if (dataEdit != "") {
        const newList = data.filter((item) => item.id === dataEdit);
        setName(newList[0].levelling);
        // const dataEmployee = newList[0]?.employeeID?.split(",");
        setValueEmployee(newList[0].valueEmployee);
        setEmployeeID(newList[0].employeeID.toString().split(","));
        setEmployeeName(newList[0].employeeName.toString().split(","));
        setsalespersonID(newList[0].salespersonID);
        settipe1(newList[0].tipe1);
        setactionList(newList[0].actionList);
        setoperatorLimit(newList[0].operatorLimit);
        setlimit1(newList[0].limit1);
        setlimit2(newList[0].limit2);
        setoperatorTOP(newList[0].operatorTOP);
        settoP1(newList[0].toP1);
        settoP2(newList[0].toP2);
      }
    }, [dataEdit]);

    const UpdateRows = async () => {
      props.setData([
        ...data,
        {
          id:
            data.length !== 0 ? data[data.length - 1].id + 1 : data.length + 1,
          levelling: name,
          employeeID: EmployeeID,
          employeeName: employeeName,
          salespersonID: salespersonID,
          valueEmployee: valueEmployee,
          nominal: nominal,
          tipe1: tipe1,
          actionList: actionList,
          operatorLimit: operatorLimit,
          limit1: limit1,
          limit2: limit2,
          operatorTOP: operatorTOP,
          toP1: toP1,
          toP2: toP2,
        },
      ]);
      setName("");
      setOpen(false);
    };

    const EditRows = async () => {
      const newdata = data.map((item, i) => {
        if (dataEdit === item.id) {
          item.levelling = name;
          item.employeeID = EmployeeID;
          item.employeeName = employeeName;
          item.salespersonID = salespersonID;
          item.tipe1 = tipe1;
          item.actionList = actionList;
          item.operatorLimit = operatorLimit;
          item.limit1 = limit1;
          item.limit2 = limit2;
          item.operatorTOP = operatorTOP;
          item.toP1 = toP1;
          item.toP2 = toP2;
          item.valueEmployee = valueEmployee;
        }
        return item;
      });
      props.setData(newdata);
      setName("");
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
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth={"md"}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Form Tambah</DialogTitle>
          <DialogContent>
            <DialogContentText mb={4}>
              Penambahan List Approval
            </DialogContentText>
            <Grid container spacing={3} md={12}>
              <Grid item md={12} xs={4}>
                <Grid container spacing={3} md={12}>
                  <Grid item md={4} xs={4}>
                    <CbData
                      value={
                        props.departement == ""
                          ? " "
                          : `${props.departement[0].DepartmentID}`
                      }
                      defaultValue={
                        props.departement == ""
                          ? " "
                          : `${props.departement[0].DepartmentID}`
                      }
                      required
                      config={GetConfig()}
                      // disabled={Loading}
                      label="Departement"
                      all
                      source={`${process.env.REACT_APP_DOMAIN_API}/DepartmentsReps/DropDown/Department`}
                      id="DepartmentID"
                      desc="Description"
                      onChange={(e) => {
                        props.setDeparatement(e);
                        // console.log("e", e);
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={4}>
                    <CbBranch
                      required
                      defaultValue={props.branch}
                      value={props.branch}
                      config={GetConfig()}
                      onChange={(newValue) => {
                        props.setBranch(newValue);
                        // console.log(menuID);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Leveling"
                  value={name}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setName(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <CbEmployee
                  multiple
                  all
                  defaultValue={EmployeeID}
                  value={EmployeeID}
                  onChange={(newValue) => {
                    setValueEmployee(newValue);
                    if (newValue.length === 0) {
                      setEmployeeID([]);
                      setEmployeeName([]);
                    } else {
                      setEmployeeID(
                        newValue.map(({ EmployeeID }) => EmployeeID)
                      );
                      setEmployeeName(
                        newValue.map(({ EmployeeName }) => EmployeeName)
                      );
                    }
                    console.log("value", newValue);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  value={employeeName.toString().split(",")}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/ListSalesPerson`}
                  id={"salesPersonID"}
                  desc={"name"}
                  label="Sales Person ID"
                  onChange={(newValue) => {
                    setsalespersonID(newValue);
                    // console.log(ScreenID);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/MasterKategoriReps/kategori/Customer`}
                  id={"type1"}
                  desc={""}
                  value={tipe1}
                  label="Tipe 1"
                  onChange={(newValue) => {
                    settipe1(newValue);
                    // console.log(ScreenID);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Action List</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Action List"
                    value={actionList}
                    onChange={(e) => setactionList(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Approve, Reject"}>
                      Approve, Reject
                    </MenuItem>
                    <MenuItem value={"Reject Forward/Pending"}>
                      Reject Forward/Pending
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Operator Limit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Operator Limit"
                    value={operatorLimit}
                    onChange={(e) => setoperatorLimit(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Equals"}>Equals</MenuItem>
                    <MenuItem value={"Does not Equals"}>
                      Does not Equals
                    </MenuItem>
                    <MenuItem value={"Greater than"}>Greater than</MenuItem>
                    <MenuItem value={"Less than"}>Less than</MenuItem>
                    <MenuItem value={"Between "}>Between </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Limit 1"
                  value={limit1}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setlimit1(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Limit 2"
                  value={limit2}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setlimit2(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Operator TOP</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Operator TOP"
                    value={operatorTOP}
                    onChange={(e) => setoperatorTOP(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Equals"}>Equals</MenuItem>
                    <MenuItem value={"Does not Equals"}>
                      Does not Equals
                    </MenuItem>
                    <MenuItem value={"Greater than"}>Greater than</MenuItem>
                    <MenuItem value={"Less than"}>Less than</MenuItem>
                    <MenuItem value={"Between "}>Between </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="TOP 1"
                  value={toP1}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => settoP1(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="TOP 2"
                  value={toP2}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => settoP2(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                setEmployeeName([]);
                setEmployeeID([]);
                setValueEmployee([]);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={UpdateRows}
              color="primary"
              disabled={
                name === "" ||
                employeeName.length == 0 ||
                toP1 == "" ||
                toP2 == "" ||
                limit2 == "" ||
                limit1 == ""
              }
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
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Leveling"
                  value={name}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setName(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <CbEmployee
                  multiple
                  all
                  defaultValue={EmployeeID}
                  onChange={(newValue) => {
                    setValueEmployee(newValue);
                    if (newValue.length === 0) {
                      setEmployeeID([]);
                      setEmployeeName([]);
                    } else {
                      setEmployeeID(
                        newValue.map(({ EmployeeID }) => EmployeeID)
                      );
                      setEmployeeName(
                        newValue.map(({ EmployeeName }) => EmployeeName)
                      );
                    }
                    console.log("value", newValue);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="employeeName"
                  label="Employee Name"
                  type="text"
                  value={employeeName.toString().split(",")}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/ListSalesPerson`}
                  id={"salesPersonID"}
                  desc={"name"}
                  label="Sales Person ID"
                  onChange={(newValue) => {
                    setsalespersonID(newValue);
                    // console.log(ScreenID);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <CbData
                  // required
                  // all
                  source={`${process.env.REACT_APP_DOMAIN_API}/MasterKategoriReps/kategori/Customer`}
                  id={"type1"}
                  desc={""}
                  label="Tipe 1"
                  value={tipe1}
                  onChange={(newValue) => {
                    settipe1(newValue);
                    // console.log(ScreenID);
                  }}
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Action List</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Action List"
                    value={actionList}
                    onChange={(e) => setactionList(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Approve, Reject"}>
                      Approve, Reject
                    </MenuItem>
                    <MenuItem value={"Reject Forward/Pending"}>
                      Reject Forward/Pending
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Operator Limit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Operator Limit"
                    value={operatorLimit}
                    onChange={(e) => setoperatorLimit(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Equals"}>Equals</MenuItem>
                    <MenuItem value={"Does not Equals"}>
                      Does not Equals
                    </MenuItem>
                    <MenuItem value={"Greater than"}>Greater than</MenuItem>
                    <MenuItem value={"Less than"}>Less than</MenuItem>
                    <MenuItem value={"Between "}>Between </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Limit 1"
                  value={limit1}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setlimit1(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="Limit 2"
                  value={limit2}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => setlimit2(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4} mt={2}>
                <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-kendaraan">Operator TOP</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Operator TOP"
                    value={operatorTOP}
                    onChange={(e) => setoperatorTOP(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Equals"}>Equals</MenuItem>
                    <MenuItem value={"Does not Equals"}>
                      Does not Equals
                    </MenuItem>
                    <MenuItem value={"Greater than"}>Greater than</MenuItem>
                    <MenuItem value={"Less than"}>Less than</MenuItem>
                    <MenuItem value={"Between "}>Between </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="TOP 1"
                  value={toP1}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => settoP1(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={4} xs={4}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  required
                  label="TOP 2"
                  value={toP2}
                  decimalScale={2}
                  // fixedDecimalScale={true}
                  decimalSeparator="."
                  customInput={TextField}
                  onChange={(e) => settoP2(e.target.value)}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
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
            <Button
              onClick={EditRows}
              color="primary"
              disabled={
                name === "" ||
                employeeName.length == 0 ||
                toP1 == "" ||
                toP2 == "" ||
                limit2 == "" ||
                limit1 == ""
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      <div style={{ margin: "10px", flexGrow: 1 }}>
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              density="compact"
              disableColumnFilter
              disableColumnMenu
              rows={data}
              columns={columns}
              pageSize={pageSize}
              onRowDoubleClick={(e) => {
                console.log("id", e);
                handleClick(e.id);
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          </div>
        </Paper>
      </div>
    </Card>
  );
}
