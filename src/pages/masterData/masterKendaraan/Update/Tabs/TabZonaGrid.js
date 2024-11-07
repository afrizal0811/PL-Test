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
import CbZona from "../../../../../components/shared/cbZona";

const Paper = styled(MuiPaper)(spacing);

TabZona.propTypes = {
  loading: PropTypes.bool,
  isEditingZona: PropTypes.bool,
  setisEditingZona: PropTypes.any,
  Zona: PropTypes.any,
  setZona: PropTypes.func,
};

export default function TabZona(props) {
  const { loading, setLoading } = props;

  const [counterZona, setcounterZona] = useState(props?.Zona?.length + 1);
  const [isEditingZona, setisEditingZona] = useState(false);
  const [IsNewZona, setIsNewZona] = useState(true);
  const [ZonaTemp, setZonaTemp] = useState([]);

  const [pageSizeZona, setPageSizeZona] = useState(5);
  const [selectionZona, setSelectionZona] = useState(0);
  const [rowZona, setrowZona] = useState([]);
  const [reffzon, setreffzon] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsZona = [
    {
      field: "zoneID",
      headerName: "ID Zona",
      width: 220,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isInEditModeZona = params.api.getRowMode(params.id) === "edit";
        if (isInEditModeZona) {
          return (
            <FormControl style={{ width: "100%" }}>
              <CbZona
                all
                onChange={(e) => {
                  params.api.updateRows([
                    {
                      id: params.id,
                      // zoneID: String(e[0].zoneID),
                      // description: String(e[0].description),
                      // NamaKota: String(e[0].namaKota),
                    },
                  ]);
                  setZonaTemp(e[0]);
                  // console.log("ini e.target.value", e.target.value);
                }}
                value={
                  params.api.getRowMode(params.id) === "edit"
                    ? ZonaTemp.zoneID
                    : params.value.zoneID
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
      field: "description",
      headerName: "description",
      editable: false,
      width: 220,
    },
    {
      field: "branch",
      headerName: "branch",
      editable: false,
      width: 220,
    },
    {
      field: "action",
      sortable: false,
      disableColumnMenu: true,
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const isInEditModeZona = params.api.getRowMode(params.id) === "edit";
        if (isInEditModeZona || IsNewZona) {
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
                    (params.row.zoneID && params.row.description !== "") ||
                    ZonaTemp !== []
                  ) {
                    setisEditingZona(false);
                    setIsNewZona(false);
                    params.api.updateRows([
                      {
                        id: params.id,
                        zoneID: String(ZonaTemp.zoneID),
                        description: String(ZonaTemp.description),
                        branch: String(ZonaTemp.branch),
                        // NamaKota: String(ZonaTemp.NamaKota),
                      },
                    ]);
                    params.api.setRowMode(params.id, "view");
                    setZonaTemp([]);
                    props.setZona(
                      [...refZona.current.getRowModels()].map(
                        ([id, value]) => ({
                          zoneID: value.zoneID,
                          description: value.description,
                          branch: value.branch,
                          // NamaKota: value.NamaKota,
                        })
                      )
                    );
                  }
                }}
                disabled={
                  ZonaTemp?.zoneID === "" || !ZonaTemp.zoneID ? true : false
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
                  if (params.row.zoneID !== "") {
                    params.api.setRowMode(params.id, "view");
                    // params.api.updateRows([
                    //   {
                    //     id: params.id,
                    //     zoneID: String(ZonaTemp.zoneID),
                    //     description: String(ZonaTemp.description),
                    //     NamaKota: String(ZonaTemp.namaKota),
                    //   },
                    // ]);
                  } else {
                    params.api.updateRows([
                      {
                        id: params.id,
                        _action: "delete",
                      },
                    ]);
                    setZonaTemp([]);
                  }
                  setisEditingZona(false);
                  setIsNewZona(false);
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
              disabled={isEditingZona}
              onClick={(e) => {
                setisEditingZona(true);
                setZonaTemp(params.row);
                params.api.setRowMode(params.id, "edit");
              }}
            >
              Edit
            </Button>
            <Button
              variant="text"
              color="error"
              size="small"
              disabled={isEditingZona}
              style={{ marginLeft: 8 }}
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                setisEditingZona(false);
                setIsNewZona(false);
                console.log("row", params);
                if (!reffzon) {
                  console.log("tidak ada refzon");
                } else {
                  params.api.updateRows([{ id: params.id, _action: "delete" }]);
                  props.setZona(
                    [...refZona.current.getRowModels()].map(([id, value]) => ({
                      zoneID: value.zoneID,
                      description: value.description,
                      branch: value.branch,
                      // NamaKota: value.NamaKota,
                    }))
                  );
                }
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

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

  const handleAddZona = () => {
    setisEditingZona(true);
    let idd = counterZona;
    setcounterZona(counterZona + 1);
    if (rowZona.length > 0) {
      refZona?.current?.updateRows([{ id: idd, zoneID: "", isNew: true }]);
      refZona?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refZona?.current?.scrollToIndexes({
          rowIndex: refZona.current.getRowsCount() - 1,
        });

        refZona?.current?.setCellFocus(idd, "zoneID");
      });
    } else {
      const detailDataZona = {
        id: idd,
        zoneID: "",
        _new: true,
      };
      const currentDataZona = Array.from(rowZona);
      currentDataZona.unshift(detailDataZona);
      setrowZona(currentDataZona);
      refZona?.current?.updateRows([{ id: idd, zoneID: "", isNew: true }]);
      refZona?.current?.setRowMode(idd, "edit");
      setTimeout(() => {
        refZona?.current?.scrollToIndexes({
          rowIndex: refZona.current.getRowsCount() - 1,
        });

        refZona?.current?.setCellFocus(idd, "zoneID");
      });
    }
  };

  useEffect(() => {
    let rowzon = refZona?.current?.getRowsCount();
    if (refZona.current !== null && !reffzon) {
      setreffzon(true);
      console.log("set reff", refZona.current);
    }
    if (
      refZona.current !== null &&
      !reffzon &&
      rowzon > 0 &&
      !refZona?.current?.getCellValue(rowzon, "description")
    ) {
      setisEditingZona(true);
      refZona?.current?.setRowMode(rowzon, "edit");
    }
  }, [refZona.current]);

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
  }, [props.Zona]);

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
              editMode="row"
              rows={rowZona}
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
                        onClick={() => handleAddZona()}
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
                        onClick={() => console.log(props.Zona)}
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
    </TabPanel>
  );
}
