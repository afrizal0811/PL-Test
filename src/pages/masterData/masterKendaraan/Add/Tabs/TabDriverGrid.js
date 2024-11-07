import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { TabPanel } from "@mui/lab";
import {
  CircularProgress,
  FormControl,
  Grid,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import CbEmployee from "../../../../../components/shared/cbEmployee";

const Paper = styled(MuiPaper)(spacing);

TabDriver.propTypes = {
  loading: PropTypes.bool,
  Driver: PropTypes.any,
  setDriver: PropTypes.func,
  isEditingDriver: PropTypes.bool,
  setisEditingDriver: PropTypes.any,
};

export default function TabDriver(props) {
  const { loading, setLoading } = props;

  const [counterDriver, setcounterDriver] = useState(props.Driver.length + 1);
  const [isEditingDriver, setisEditingDriver] = useState(false);
  const [IsNewDriver, setIsNewDriver] = useState(true);
  const [DriverTemp, setDriverTemp] = useState([]);

  const [pageSizeDriver, setPageSizeDriver] = useState(5);
  const [selectionDriver, setSelectionDriver] = useState(0);
  const [rowDriver, setrowDriver] = useState([]);
  const [reffdri, setreffdri] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsDriver = [
    {
      field: "employeeID",
      headerName: "ID Driver",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        if (isInEditModeDriver) {
          return (
            <FormControl style={{ width: "100%" }}>
              <CbEmployee
                all
                onChange={(e) => {
                  params.api.updateRows([
                    {
                      id: params.id,
                      // EmployeeID: String(e[0].employeeID),
                      // employeeName: String(e[0].employeeName),
                      // email: String(e[0].email),
                      // contact: String(e[0].contact),
                    },
                  ]);
                  setDriverTemp(e[0]);
                  console.log("paramsrow", params.row);
                  console.log("drivertemp", DriverTemp);
                }}
                value={
                  params.api.getRowMode(params.id) === "edit"
                    ? DriverTemp.employeeID
                    : params.value.employeeID
                }
                InputProps={{
                  readOnly: params.api.getRowMode(params.id) === "view",
                }}
              />
            </FormControl>
          );
        } else {
          return <TextField style={{ width: "100%" }} value={params.value} />;
        }
      },
    },
    {
      field: "employeeName",
      headerName: "Nama Driver",
      editable: false,
      width: 200,
    },
    {
      field: "email",
      headerName: "Email",
      editable: false,
      width: 200,
    },
    {
      field: "contact",
      headerName: "Contact",
      editable: false,
      width: 200,
    },
    {
      field: "action",
      sortable: false,
      disableColumnMenu: true,
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        if (isInEditModeDriver || IsNewDriver) {
          return (
            <>
              <Button
                variant="text"
                color="primary"
                size="smaill"
                style={{ marginLeft: 8 }}
                startIcon={<SaveIcon />}
                onClick={(e) => {
                  console.log("ini params.row ", params.row);
                  if (
                    (params.row.employeeID && params.row.employeeName !== "") ||
                    DriverTemp !== []
                  ) {
                    setisEditingDriver(false);
                    setIsNewDriver(false);
                    params.api.updateRows([
                      {
                        id: params.id,
                        employeeID: String(DriverTemp.employeeID),
                        employeeName: String(DriverTemp.employeeName),
                        email: String(DriverTemp.email),
                        contact: String(DriverTemp.contact),
                      },
                    ]);
                    params.api.setRowMode(params.id, "view");
                    setDriverTemp([]);
                    props.setDriver(
                      [...refDriver.current.getRowModels()].map(
                        ([id, value]) => ({
                          employeeID: value.employeeID,
                          employeeName: value.employeeName,
                          email: value.email,
                          contact: value.contact,
                        })
                      )
                    );
                  }
                }}
                disabled={
                  DriverTemp?.employeeID === "" || !DriverTemp.employeeID
                    ? true
                    : false
                }
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
                  if (params.row.employeeID !== "") {
                    console.log("paramsrow", params.row);
                    params.api.setRowMode(params.id, "view");
                    // params.api.updateRows([
                    //   {
                    //     id: params.id,
                    //     employeeID: String(DriverTemp.employeeID),
                    //     employeeName: String(DriverTemp.employeeName),
                    //     email: String(DriverTemp.email),
                    //     contact: String(DriverTemp.contact),
                    //   },
                    // ]);
                  } else {
                    params.api.updateRows([
                      {
                        id: params.id,
                        _action: "delete",
                      },
                    ]);
                    setDriverTemp([]);
                  }
                  setisEditingDriver(false);
                  setIsNewDriver(false);
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
              disabled={isEditingDriver}
              onClick={(e) => {
                setisEditingDriver(true);
                setDriverTemp(params.row);
                params.api.setRowMode(params.id, "edit");
              }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              color="error"
              size="small"
              disabled={isEditingDriver}
              style={{ marginLeft: 8 }}
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                setisEditingDriver(false);
                setIsNewDriver(false);
                console.log("row", params);
                params.api.updateRows([{ id: params.id, _action: "delete" }]);
                props.setDriver(
                  [...refDriver.current.getRowModels()].map(([id, value]) => ({
                    employeeID: value.employeeID,
                    employeeName: value.employeeName,
                    email: value.email,
                    contact: value.contact,
                  }))
                );
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  const refDriver = useRef(null);
  const columnsDrivers = useMemo(
    () =>
      columnsDriver.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refDriver.current = params.api;
          return null;
        },
      }),
    [columnsDriver]
  );

  const handleAddDriver = () => {
    setisEditingDriver(true);
    let idd = counterDriver;
    setcounterDriver(counterDriver + 1);
    if (rowDriver.length > 0) {
      refDriver?.current?.updateRows([
        { id: idd, employeeID: "", isNew: true },
      ]);
      refDriver?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refDriver?.current?.scrollToIndexes({
          rowIndex: refDriver?.current?.getRowsCount() - 1,
        });

        refDriver?.current?.setCellFocus(idd, "employeeID");
      });
    } else {
      const detailDataDriver = {
        id: idd,
        employeeID: "",
        _new: true,
      };
      const currentDataDriver = Array.from(rowDriver);
      currentDataDriver.unshift(detailDataDriver);
      setrowDriver(currentDataDriver);
      refDriver?.current?.updateRows([
        { id: idd, employeeID: "", isNew: true },
      ]);
      refDriver?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refDriver?.current?.scrollToIndexes({
          rowIndex: refDriver?.current?.getRowsCount() - 1,
        });

        refDriver?.current?.setCellFocus(idd, "employeeID");
      });
    }
  };

  useEffect(() => {
    let rowdri = refDriver?.current?.getRowsCount();
    if (refDriver.current !== null && !reffdri) {
      setreffdri(true);
      console.log("set reff", refDriver.current);
    }
    if (
      refDriver.current !== null &&
      !reffdri &&
      rowdri > 0 &&
      !refDriver?.current?.getCellValue(rowdri, "employeeName")
    ) {
      setisEditingDriver(true);
      refDriver?.current?.setRowMode(rowdri, "edit");
    }
  }, [refDriver.current]);

  useEffect(() => {
    const newdata = props.Driver.map((item, i) => {
      item.id = i;
      return item;
    });
    setrowDriver(newdata);
    setcounterDriver(props.Driver.length + 1);
  }, [props.Driver]);

  return (
    <TabPanel value="2">
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
          <div style={{ height: 400, width: "100%", marginTop: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 25]}
              editMode="row"
              // getRowId={(row) => row.employeeID}
              rows={rowDriver}
              apiRef={refDriver}
              columns={columnsDrivers}
              pageSize={pageSizeDriver}
              onPageSizeChange={(newPageSize) => setPageSizeDriver(newPageSize)}
              selectionModel={selectionDriver}
              onSelectionModelChange={(selection) => {
                setSelectionDriver(selection);
              }}
              components={{
                Toolbar: () => {
                  return (
                    <GridToolbarContainer>
                      <Button
                        disabled={isEditingDriver}
                        color="primary"
                        onClick={() => handleAddDriver()}
                        disableElevation
                      >
                        <span>
                          <AddIcon
                            style={{
                              height: "16px",
                              verticalAlign: "sub",
                            }}
                          />
                        </span>
                        Add
                      </Button>
                      <Button
                        // disabled={isEditingDriver}
                        color="primary"
                        onClick={() => console.log("driver", props.Driver)}
                        disableElevation
                      >
                        <span>
                          <AddIcon
                            style={{
                              height: "16px",
                              verticalAlign: "sub",
                            }}
                          />
                        </span>
                        Add
                      </Button>
                    </GridToolbarContainer>
                  );
                },
              }}
              // onCellDoubleClick={(e) => {
              //   handleDoubleDriver(e);
              // }}
              componentsProps={{
                toolbar: { refDriver },
              }}
            />
          </div>
        </Paper>
      )}
    </TabPanel>
  );
}
