import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import CbBranch from "../../../components/shared/cbBranch";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function TableUserReg() {
  const [selection, setSelection] = useState(0);
  const [selectionReg, setselectionReg] = useState(0);
  const [data, setData] = useState([]);
  const [dataReg, setdataReg] = useState([]);
  const [employee, setemployee] = useState("");
  const [branchreg, setbranchreg] = useState();
  const [add, setadd] = useState(false);
  const [branch, setbranch] = useState(getBrach());
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getData();
  }, [branch]);

  useEffect(() => {
    getDataReg();
  }, [branchreg, employee]);

  const columns = [
    {
      field: "employeeID",
      headerName: "EmployeeID",
      sortable: false,
      width: 120,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      sortable: false,
      width: 200,
    },
    {
      field: "userName",
      headerName: "User Login",
      sortable: false,
      width: 180,
    },
    {
      field: "branchID",
      headerName: "Branch",
      sortable: false,
      width: 150,
      // renderCell: (params) => (
      //   <strong>
      //     <Button
      //       variant="text"
      //       color="primary"
      //       size="small"
      //       style={{ marginLeft: 16 }}
      //       startIcon={<Add />}
      //       // onClick={() => notifyConfirm(params.value)}
      //     >
      //       Register
      //     </Button>
      //   </strong>
      // ),
    },
  ];

  const columnsReg = [
    {
      field: "employeeID",
      headerName: "EmployeeID",
      sortable: false,
      width: 120,
    },
    {
      field: "employeeName",
      headerName: "Employee Name",
      sortable: false,
      width: 200,
    },
    {
      field: "userLogin",
      headerName: "User Login",
      sortable: false,
      width: 180,
    },
  ];

  const handleReg = async (id) => {
    let payload = {
      Username: id?.userLogin,
      Password: "Demo1234!",
    };
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/Auth/Register",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "User Berhasil Didaftarkan");
            setTimeout(() => {
              window.location.reload();
            }, 800);
            setadd(false);
          } else {
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", "User Already Exist");
          // handle error
          console.log(error);
          // console.log(res);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // const notifyConfirm = async (id) => {
  //   swal
  //     .fire({
  //       title: "Apakah Anda yakin melakukan Hapus Data ini?",
  //       text: "Anda tidak akan bisa mengembalikan ini!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ya, Hapus",
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         deleteData(data[id].setupKey);
  //       }
  //     });
  // };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/Auth/UserList?branch=${branch}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data.map((item, i) => {
              item.id = i;
              return item;
            });
            setData(resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const getDataReg = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/EmployeeReps/DropDown/EmployeeListLogin?employee=${employee}&branch=${branch}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200) {
            const resdata = response.data.map((item, i) => {
              item.id = i;
              return item;
            });
            setdataReg(resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => {
            // history(`/user/create-set-key`);
            setadd(true);
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  }

  return (
    <Card mb={6}>
      {/* <CardContent pb={3}>
        <Typography variant="h6" gutterBottom>
          User Registration
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
      </CardContent> */}
      <Grid container spacing={2} mb={1} mt={2} px={2}>
        <Grid item md={3}>
          <CbBranch
            required
            defaultValue={branch}
            value={branch}
            onChange={(newValue) => {
              setbranch(newValue);
              // console.log(menuID);
            }}
          />
        </Grid>
        {/* <Grid item md={3}>
          <TextField
            name="Employee"
            label="Employee"
            value={employee}
            onChange={(e) => setemployee(e.target.value)}
            fullWidth
            variant="outlined"
            // my={2}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid> */}
      </Grid>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
          </Grid>
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <h1 style={{ textAlign: "center" }}>Loading</h1>
          </Grid>
        </Grid>
      ) : (
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              autoHeight
              rows={data}
              disableColumnFilter
              disableColumnMenu
              density="compact"
              columns={columns}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                // console.log(data[selection[0]]);
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/konfigurasi/set-key/${params.row["setupKey"]}`);
              }}
            />
          </div>
        </Paper>
      )}
      <Dialog open={add} onClose={(e) => setadd(false)} sx={{ zIndex: 1 }}>
        <DialogTitle>Add User Registration</DialogTitle>
        <DialogContent>
          <Grid
            container
            justifyContent="center"
            spacing={1}
            mt={2}
            md={12}
            xs={12}
          >
            <Grid item md={6}>
              <CbBranch
                required
                defaultValue={branchreg}
                value={branch}
                onChange={(newValue) => {
                  setbranch(newValue);
                  // console.log(menuID);
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name="Employee"
                label="Employee"
                value={employee}
                onChange={(e) => setemployee(e.target.value)}
                fullWidth
                variant="outlined"
                // my={2}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={12}>
              <DataGrid
                rowsPerPageOptions={[5, 10, 25]}
                autoHeight
                rows={dataReg}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                columns={columnsReg}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                selectionModel={selectionReg}
                onSelectionModelChange={(selection) => {
                  setselectionReg(selection);
                  console.log("sel", selection);
                }}
                // onCellDoubleClick={(params, event) => {
                //   // console.log(params.row["customer"]);
                //   history(`/konfigurasi/set-key/${params.row["setupKey"]}`);
                // }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={(e) => {
              setadd(false);
              // setaddreason("");
            }}
          >
            Batal
          </Button>
          <Button
            disabled={loading}
            onClick={(e) => {
              // if (rejectreason.trim().length > 50) {
              //   NotifyError("Panjang karakter melebihi batas");
              // } else {
              //   handleReject();
              //   setadd(false);
              // }
              let user = dataReg.filter((e) => e.id == selectionReg[0]);
              handleReg(user[0]);
              // setadd(false);
            }}
          >
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

function UserReg() {
  return (
    <React.Fragment>
      <Helmet title="User Registration" />
      <Typography variant="h3" gutterBottom display="inline">
        User Registration
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Konfiguration</Link>
        <Typography>User Registration</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <TableUserReg />
    </React.Fragment>
  );
}

export default UserReg;
