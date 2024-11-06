import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { TabPanel } from "@material-ui/lab";
import { spacing } from "@material-ui/system";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper as MuiPaper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { getBrach } from "../../../../../utils/jwt";

const Paper = styled(MuiPaper)(spacing);

TabZona.propTypes = {
  loading: PropTypes.bool,
  isEditingZona: PropTypes.bool,
  setisEditingZona: PropTypes.any,
  Zona: PropTypes.array,
  setZona: PropTypes.func,
};

export default function TabZona(props) {
  const { loading, setLoading } = props;

  const [counterZona, setcounterZona] = useState(props?.Zona?.length + 1);
  const [isEditingZona, setisEditingZona] = useState(false);
  const [IsNewZona, setIsNewZona] = useState(true);
  const [ZonaTemp, setZonaTemp] = useState([]);

  const [openZona, setOpenZona] = React.useState(false);
  const [DDZona, setDDZona] = useState([]);
  const [TempZona, setTempZona] = React.useState([]);
  const [TempZonaID, setTempZonaID] = React.useState([]);
  const [FilterZona, setFilterZona] = React.useState(props?.Zona);
  const [SelectedZona, setSelectedZona] = React.useState(() =>
    DDZona.filter((el) => {
      return props?.Zona.some((f) => {
        return (
          f.zoneID === el.zoneID &&
          f.description === el.description &&
          f.branch === el.branch
        );
      });
    })
  );

  const [pageSizeZona, setPageSizeZona] = useState(5);
  const [selectionZona, setSelectionZona] = useState(0);
  const [rowZona, setrowZona] = useState([]);
  const [reffzon, setreffzon] = useState(false);

  const columnsPopup = [
    {
      field: "zoneID",
      headerName: "ID Zona",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "description",
      editable: false,
      width: 200,
    },
    {
      field: "branch",
      headerName: "branch",
      editable: false,
      width: 180,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsZona = [
    {
      field: "zoneID",
      headerName: "ID Zona",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "description",
      editable: false,
      width: 200,
    },
    {
      field: "branch",
      headerName: "branch",
      editable: false,
      width: 180,
    },
    {
      field: "Action",
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
                setOpenZona(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={(e) => {
                const newList = FilterZona.filter(
                  (item) => item.zoneID !== params.row.zoneID
                );
                setFilterZona(newList);
                props.setZona(newList);
                setZonaTemp(newList);
                setTempZonaID(
                  newList.map((ar) => {
                    return ar.Zone;
                  })
                );
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </strong>
      ),
    },
  ];

  const getDropDownZona = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/ShippingZoneSyncReps/DropDown/Zona?page=1&rowsCount=100&branchID=" +
          `${getBrach()}`,
        GetConfig()
      )
      .then(function (response) {
        // handle success
        console.log(response);
        if (response.status == 200 || response.status == 201) {
          const resdata = response.data;
          setDDZona(resdata);
        }
      });
  };

  const refZona = useRef(null);
  const columnsZonas = useMemo(
    () =>
      columnsZona.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refZona.current = params.api;
          return null;
        },
      }),
    [columnsZona]
  );

  useEffect(() => {
    const newdata = props?.Zona?.map((item, i) => {
      item.id = i + 1;
      return item;
    });
    setrowZona(newdata);
    setcounterZona(props?.Zona?.length + 1);
    if (props?.Zona?.length > 0) {
      setIsNewZona(false);
    }
    // setSelectedZona(
    //   DDZona.filter((el) => {
    //     return newdata.some((f) => {
    //       return f.zoneID === el.zoneID;
    //     });
    //   })
    // );
    const arr = DDZona.filter((el) => {
      return newdata?.some((f) => {
        return f.zoneID === el.zoneID;
      });
    });
    setTempZona(arr);
    setFilterZona(arr);
    setSelectedZona(
      arr.map((a) => {
        return a.zoneID;
      })
    );
    setTempZonaID(
      arr.map((a) => {
        return a.zoneID;
      })
    );
    console.log("props zona update newdata", newdata);
    console.log("props zona update ddzona", DDZona);
    console.log("props zona update arr", arr);
  }, [props.Zona, DDZona]);

  useEffect(() => {
    const arr = DDZona.filter((el) => {
      return FilterZona.some((f) => {
        return f.zoneID === el.zoneID;
      });
    });
    setTempZona(arr);
    setSelectedZona(
      arr.map((a) => {
        return a.zoneID;
      })
    );
    setTempZonaID(
      arr.map((a) => {
        return a.zoneID;
      })
    );
    console.log("props zona update ddzona", DDZona);
    console.log("props zona update selected", SelectedZona);
  }, [FilterZona]);

  useEffect(() => {
    getDropDownZona();
  }, []);

  return (
    <TabPanel value="3">
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
              getRowId={(row) => row.zoneID}
              editMode="row"
              rows={FilterZona}
              apiRef={refZona}
              columns={columnsZonas}
              hideFooter
              pageSize={pageSizeZona}
              onPageSizeChange={(newPageSize) => setPageSizeZona(newPageSize)}
              selectionModel={selectionZona}
              onSelectionModelChange={(selection) => {
                setSelectionZona(selection);
              }}
              components={{
                Toolbar: () => {
                  return (
                    <GridToolbarContainer>
                      <Button
                        disable={isEditingZona}
                        color="primary"
                        onClick={() => setOpenZona(true)}
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
                      {/* <Button
                        disable={isEditingZona}
                        color="primary"
                        onClick={() => console.log("selected", FilterZona)}
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
                        tes
                      </Button> */}
                    </GridToolbarContainer>
                  );
                },
              }}
              componentsProps={{
                toolbar: { refZona },
              }}
            />
          </div>
        </Paper>
      )}
      <Dialog
        open={openZona}
        fullWidth={true}
        maxWidth={"md"}
        onClose={() => setOpenZona(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Shipping Zone</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Shipping Zone List</DialogContentText> */}
          <Grid container spacing={3} md={12} mt={2}>
            <div style={{ height: 380, width: "100%" }}>
              <DataGrid
                rows={DDZona}
                getRowId={(row) => row.zoneID}
                columns={columnsPopup}
                pageSize={5}
                // hideFooter={true}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                selectionModel={SelectedZona}
                onSelectionModelChange={(e) => {
                  setSelectedZona(e);
                  const selectedIDs = new Array(e);
                  const selectedRows = DDZona.filter((r) =>
                    selectedIDs[0]?.includes(r.zoneID)
                  );
                  console.log("selectred", selectedRows);
                  console.log("select ids", selectedIDs);
                  setTempZona(selectedRows);
                }}
              />
            </div>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenZona(false);
              // setPrincipal("");
              setSelectedZona(TempZonaID);
              setTempZona(FilterZona);
              props.setZona(FilterZona);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // console.log("selectedprinc", selectionModel);
              setOpenZona(false);
              setTempZonaID(SelectedZona);
              setFilterZona(TempZona);
              props.setZona(TempZona);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TabPanel>
  );
}
