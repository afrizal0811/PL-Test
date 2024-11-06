import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Select,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Paper = styled(MuiPaper)(spacing);

const datadummy = [
  {
    id: 1,
    NamaKota: "kota a",
  },
];

function Header() {
  const { id } = useParams();
  const [NamaZona, setNamaZona] = useState("");
  const [IDZona, setIDZona] = useState("");
  const [kotaTemp, setkotaTemp] = useState("");
  const [statusZona, setstatusZona] = useState("active");
  const [data, setdata] = useState([]);
  const [datafetch, setdatafetch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [IsNew, setIsNew] = useState(true);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [counter, setcounter] = React.useState(data.length + 1);

  // const { apiRef, columns } = useApiRef();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const column = [
    {
      field: "NamaKota",
      headerName: "Nama Kota",
      flex: 1,
      minWidth: 300,
      // editable: true,
      // disableClickEventBubbling: true,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <TextField
            style={{ width: "100%" }}
            value={
              params.api.getRowMode(params.id) === "edit"
                ? kotaTemp
                : params.value
            }
            InputProps={{
              readOnly: params.api.getRowMode(params.id) === "view",
            }}
            onChange={(e) => {
              // console.log("value event", e);
              // console.log("value isi", e.target.value);
              // params.api.updateRows([
              //   { id: params.id, NamaKota: e.target.value },
              // ]);
              setkotaTemp(e.target.value);
            }}
          />
        );
      },
    },
    {
      field: "action",
      sortable: false,
      disableColumnMenu: true,
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const isInEditMode = params.api.getRowMode(params.id) === "edit";
        // const isInEditMode2 = apiRef.current.getRowMode(params.id) === "edit";
        // console.log("params ", params);
        if (isInEditMode || IsNew) {
          return (
            <>
              <Button
                variant="text"
                color="primary"
                size="small"
                style={{ marginLeft: 8 }}
                startIcon={<SaveIcon />}
                onClick={(e) => {
                  if (
                    (params.row.NamaKota && params.row.NamaKota !== "") ||
                    kotaTemp !== ""
                  ) {
                    setisEditing(false);
                    setIsNew(false);
                    params.api.setRowMode(params.id, "view");
                    params.api.updateRows([
                      { id: params.id, NamaKota: kotaTemp },
                    ]);
                    setkotaTemp("");
                  }
                }}
              >
                Save
              </Button>
              <Button
                variant="text"
                color="error"
                size="small"
                style={{ marginLeft: 8 }}
                startIcon={<CancelIcon />}
                onClick={(e) => {
                  if (params.row.NamaKota && params.row.NamaKota !== "") {
                    setkotaTemp("");
                    params.api.setRowMode(params.id, "view");
                    params.api.updateRows([
                      { id: params.id, NamaKota: params.row.NamaKota },
                    ]);
                  } else {
                    params.api.updateRows([
                      { id: params.id, _action: "delete" },
                    ]);
                    setkotaTemp("");
                  }
                  setisEditing(false);
                  setIsNew(false);
                }}
              >
                Cancel
              </Button>
            </>
          );
        }

        return (
          <>
            <Button
              variant="text"
              color="primary"
              size="small"
              style={{ marginLeft: 8 }}
              startIcon={<EditIcon />}
              disabled={isEditing}
              onClick={(e) => {
                setisEditing(true);
                setkotaTemp(params.row.NamaKota);
                params.api.setRowMode(params.id, "edit");
              }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              color="error"
              size="small"
              disabled={isEditing}
              style={{ marginLeft: 8 }}
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                setisEditing(false);
                setIsNew(false);
                console.log("row", params);
                params.api.updateRows([{ id: params.id, _action: "delete" }]);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const apiRef = useRef(null);
  const columns = useMemo(
    () =>
      column.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          apiRef.current = params.api;
          return null;
        },
      }),
    [column]
  );

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    let row = apiRef?.current?.getRowsCount();
    if (row > 0 && !apiRef?.current?.getCellValue(row, "NamaKota")) {
      setisEditing(true);
      console.log("apiref", row);

      apiRef.current.setRowMode(row, "edit");
    }
  }, [apiRef.current]);

  const getData = async (idd) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ZonaReps/" + idd,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200) {
            const resdata = response.data.ZonaLineRep;
            setNamaZona(response.data.NamaZona);
            setIDZona(response.data.IDZona);
            setstatusZona(response.data.Status);
            if (resdata.length > 0) {
              setIsNew(false);
              const newdata = resdata.map((item, i) => {
                item.id = i;
                return item;
              });
              setdata(newdata);
              setdatafetch(newdata);
              console.log("new data", newdata);
              setcounter(resdata.length + 1);
            } else {
              setdata(resdata);
              setdatafetch(resdata);
            }
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

  const handleChangeStatus = (event) => {
    setstatusZona(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let resultbaru = [];
      if (apiRef.current !== null && apiRef.current.getRowsCount() > 0) {
        const arr = [...apiRef.current.getRowModels()].map(([id, value]) => ({
          id: value.id,
          MasterZonaLineID: value.MasterZonaLineID,
          NamaKota: value.NamaKota,
        }));
        const arraylama = arr.filter((el) => {
          return datafetch.some((f) => {
            return f.id === el.id;
          });
        });
        const arraybaru = arr.filter((el) => {
          return el.MasterZonaLineID === undefined;
        });
        resultbaru = arraybaru.map(({ id, MasterZonaLineID, ...rest }) => ({
          ...rest,
        }));
        const resultlama = arraylama.map(({ id, ...rest }) => ({
          ...rest,
        }));
        Array.prototype.push.apply(resultbaru, resultlama);
      }
      const payload = {
        IDZona: IDZona,
        NamaZona: NamaZona,
        Status: statusZona,
        ZonaLineRep: resultbaru,
      };
      console.log("result", payload);

      // const payload = {};
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ZonaReps/UpdateMasterZona",
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 201) {
            NotifySuccess("success", "Data Telah DiTambah");
            // .then
            // // window.location.href = `/master-data/update-zona/${menuID.transaksiID}`;
            // ();
            // getData(id);
            setTimeout(() => {
              window.location.href = `/master-data/update-zona/${id}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const toolBar = () => {
    return (
      <GridToolbarContainer style={{ marginBottom: "-5px" }}>
        <Button
          disabled={isEditing}
          color="primary"
          disableElevation
          onClick={handleClick}
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleClick = () => {
    setisEditing(true);
    let idd = counter;
    setcounter(counter + 1);
    if (data.length > 0) {
      apiRef?.current?.updateRows([{ id: idd, isNew: true }]);
      apiRef?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        apiRef?.current?.scrollToIndexes({
          rowIndex: apiRef?.current?.getRowsCount() - 1,
        });

        apiRef?.current?.setCellFocus(idd, "NamaKota");
      });
    } else {
      const detailData = {
        id: idd,
        _new: true,
      };
      const currentData = Array.from(data);
      currentData.unshift(detailData);
      setdata(currentData);
      // setdata([]);
      if (
        apiRef?.current?.getRowsCount() > 0 &&
        !apiRef?.current?.getCellValue("1", "NamaKota")
      ) {
        setisEditing(true);
        setIsNew(true);
        apiRef.current.setRowMode("1", "edit");
      }
    }
  };

  const handleDouble = (e) => {
    const row = apiRef.current.getRow(e.id);
    apiRef.current.updateRows([{ ...row, isNew: false }]);
  };

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellFocusOut = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  return (
    <Card mb={6}>
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
        <>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Header
            </Typography>
            <Typography variant="body2" gutterBottom mt={2}>
              Zona
            </Typography>
            <Grid container spacing={6} md={12} mt={3}>
              <Grid item md={4} xs={12}>
                <TextField
                  name="IDZona"
                  label="ID Zona"
                  value={IDZona}
                  color={IDZona === "" ? "warning" : ""}
                  focused={IDZona === "" ? true : false}
                  fullWidth
                  variant="outlined"
                  disabled={false}
                  onChange={(e) => setIDZona(e.target.value)}
                  my={2}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {IDZona === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  name="NamaZona"
                  label="Nama Zona"
                  value={NamaZona}
                  color={NamaZona === "" ? "warning" : ""}
                  focused={NamaZona === "" ? true : false}
                  fullWidth
                  variant="outlined"
                  disabled={false}
                  onChange={(e) => setNamaZona(e.target.value)}
                  my={2}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {NamaZona === "" && (
                  <FormHelperText style={{ color: "red" }}>
                    Required
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl style={{ width: "100%", marginTop: "6px" }}>
                  <InputLabel id="status-zona">Status Zona</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Status Faktur"
                    value={statusZona}
                    onChange={handleChangeStatus}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"active"}>Active</MenuItem>
                    <MenuItem value={"inactive"}>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <div style={{ margin: "10px", flexGrow: 1 }}>
            <Paper>
              <div style={{ height: 250, width: "100%", padding: "5px" }}>
                <DataGrid
                  rowsPerPageOptions={[5, 10, 25]}
                  on
                  rows={data}
                  apiRef={apiRef}
                  hideFooter={true}
                  columns={columns}
                  editMode="row"
                  selectionModel={selectionModel}
                  onSelectionModelChange={(e) => {
                    setSelectionModel(e);
                  }}
                  onRowEditStart={handleRowEditStart}
                  onRowEditStop={handleRowEditStop}
                  onCellFocusOut={handleCellFocusOut}
                  components={{
                    Toolbar: toolBar,
                  }}
                  componentsProps={{
                    toolbar: { apiRef },
                  }}
                />
              </div>
            </Paper>
            <Grid
              container
              spacing={6}
              md={12}
              mt={3}
              paddingLeft={8}
              paddingBottom={5}
            >
              <Button
                mr={2}
                variant="contained"
                color="primary"
                disabled={
                  IDZona === "" || NamaZona === "" || loading || isEditing
                }
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </div>
        </>
      )}
    </Card>
  );
}

function UpdateMasterZona() {
  return (
    <React.Fragment>
      <Helmet title="Add Approval" />
      <Typography variant="h3" gutterBottom display="inline">
        Update Master Zona
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/master-zona">
          Master Zona
        </Link>
        <Typography>Update Master Zona</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default UpdateMasterZona;
