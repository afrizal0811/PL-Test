import { spacing } from "@material-ui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  CircularProgress,
  Grid,
  IconButton,
  Button as MuiButton,
  Paper as MuiPaper,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useRef, useState } from "react";
import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifyWarning,
} from "../../../../services/notification.service";
import AllocatedPopup from "./AllocatedPopup";

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export default function SourceTable(props) {
  const [openAllocated, setOpenAllocated] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  // const [loading, setLoading] = useState(false);
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  const [selection, setSelection] = useState("");
  const [widthrow, setwidthrow] = useState(420);
  const [data, setData] = useState([]);

  const mounted = useRef();
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      // getData();
    } else {
      if (props.RefNbr !== undefined && props.Status == "On Hold") {
        // HandleSource();
      } else if (props.RefNbr == undefined && props.Status == "On Hold") {
        HandleCreate();
      }
    }
  }, [props.DataSource]);

  React.useEffect(() => {
    console.log("props.Descr", props.Descr);
  }, [props.Descr]);

  React.useEffect(() => {
    setData(props.dataAllo);
    if (props.dataAllo.filter((ae) => ae.Descr.length > 60).length > 0) {
      setwidthrow(790);
    } else {
      setwidthrow(420);
    }
  }, [props.dataAllo]);

  const HandleCreate = async () => {
    // setLoading(true);
    props.setLoading(false);
    if (props.Status !== "Released") {
      console.log("source");
      try {
        const arralo = props.DataSource.map((item, i) => {
          return {
            allocatedKuotaDetailSourceID: item.AllocatedKuotaDetailSourceID,
            // detailSourceID: item.DetailSourceID,
            DetailSourceID: item.DetailSourceID,
            inventoryID: item.InventoryID,
            descr: item.Descr,
            srcQty: item.SrcQty,
            uom: item.UOM,
            alloKuota: item.AlloKuota,
            keepKuota: item.KeepKuota,
            unAlloKuota: item.AllocatedKuotaDetailSourceID
              ? item.AlloKuota -
                data
                  .filter((ab) => ab.InventoryID == item.InventoryID)
                  .reduce((n, { DstAlloKuota }) => n + DstAlloKuota, 0)
              : item.UnAlloKuota,
            allocatedRefNbr: item.AllocatedRefNbr,
            allocatedKuotaSourceDetailAllocatedRep:
              item.AllocatedKuotaDetailSourceID
                ? data
                    .filter((ab) => ab.InventoryID == item.InventoryID)
                    .map((ao) => {
                      return ao;
                    })
                : [],
          };
        });
        const payload = {
          refNbr: props.RefNbr,
          date: props.Date,
          branchID: props.BranchID,
          fromWarehouseID: props.Warehouse,
          descr: props.Descr,
          allocatedKuotaDetailSourceRep: arralo,
          screenNo: "SAW300021",
          brnchID: props.BranchID,
        };
        console.log(payload);
        await axios
          .post(
            `${process.env.REACT_APP_DOMAIN_API}/CreateAllocatedKuota`,
            payload,
            GetConfig()
          )
          .then(function (response) {
            // handle success
            console.log(response);
            if (response.status == 200 || response.status == 204) {
              // NotifySuccess("success", "Data telah disimpan");
              window.location.replace(
                `/allocated-kuota/detail/${response.data.RefNbr}`
              );
              // props.DataSource.map((ae) => {
              //   return getData(ae.DetailSourceID);
              // });
            }
          })
          .catch(function (error) {
            // handle error
            NotifyError("There was an error!", error.response.data);
            console.log(error);
          });
        // setLoading(false);
        props.setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
      // setLoading(false);
      props.setLoading(false);
    }
  };

  const HandleSave = async (a) => {
    // setLoading(true);
    props.setLoading(false);
    try {
      console.log("save");
      const arralo = props.DataSource.map((item, i) => {
        return {
          AllocatedKuotaDetailSourceID: item.AllocatedKuotaDetailSourceID,
          DetailSourceID: item.DetailSourceID,
          InventoryID: item.InventoryID,
          Descr: item.Descr,
          SrcQty: item.SrcQty,
          UOM: item.UOM,
          AlloKuota: item.AlloKuota,
          KeepKuota: item.KeepKuota,
          UnAlloKuota:
            item.AlloKuota -
            a
              .filter((ab) => ab.InventoryID == item.InventoryID)
              .reduce((n, { DstAlloKuota }) => n + DstAlloKuota, 0),
          AllocatedRefNbr: item.AllocatedRefNbr,
          AllocatedKuotaSourceDetailAllocatedRep: a
            .filter((ab) => ab.InventoryID == item.InventoryID)
            .map((ao) => {
              return ao;
            }),
        };
      });

      const payload = {
        RefNbr: props.RefNbr,
        Date: props.Date,
        BranchID: props.BranchID,
        Descr: props.Descr,
        Status: props.Status,
        FromWarehouseID: props.Warehouse,
        AllocatedKuotaDetailSourceRep: arralo,
        ScreenNo: "SAW300021",
      };
      console.log(payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateAllocatedKuota`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status == 200 || response.status == 204) {
            // NotifySuccess("success", "Data telah disimpan");
            props.getDataSource();
            props.setDataAllo(a);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      // setLoading(false);
      props.setLoading(false);
    } catch (error) {
      console.log(error.message);
      // setLoading(false);
      props.setLoading(false);
    }
  };

  const columnsAllocated = [
    {
      field: "id",
      headerName: " ",
      width: 50,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        props.Status !== "On Hold" ? (
          <></>
        ) : (
          <strong>
            <div className="justify-center" style={{ alignItems: "center" }}>
              <IconButton
                aria-label="Delete"
                size="small"
                color="error"
                disabled={
                  props.DataSource.length < 1 ||
                  props.Status != "On Hold" ||
                  // loading ||
                  props.Loading
                }
                onClick={(e) => {
                  const newList1 = data.filter(
                    (item) => item.id !== params.value
                  );
                  var index = 0;
                  newList1.map((item) => {
                    item.id = index++;
                  });
                  setData(newList1);
                  HandleSave(newList1);
                  // props.setrowSource(newList);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </strong>
        ),
    },
    {
      field: "DstBranchID",
      headerName: "Branch",
      width: 140,
      sortable: false,
    },
    {
      field: "DstSiteID",
      headerName: "Warehouse",
      width: 150,
      sortable: false,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 120,
      sortable: false,
      renderCell: (params) =>
        props.DataSource.filter(
          (we) => we.InventoryID == params.row.InventoryID
        ).length > 0 &&
        props?.DataSource?.filter(
          (we) => we.InventoryID == params.row.InventoryID
        )[0]?.UnAlloKuota < 0 ? (
          <>
            <Tooltip title="Allocated Qty pada inventory ini melebihi batas">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "Descr",
      headerName: "Description",
      width: widthrow,
      sortable: false,
      renderCell: (params) =>
        props.DataSource.filter(
          (we) => we.InventoryID == params.row.InventoryID
        ).length > 0 &&
        props?.DataSource?.filter(
          (we) => we.InventoryID == params.row.InventoryID
        )[0]?.UnAlloKuota < 0 ? (
          <>
            <Tooltip title="Allocated Qty pada inventory ini melebihi batas">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "DstAlloKuota",
      headerName: "Qty",
      width: 90,
      type: "number",
      sortable: false,
      renderCell: (params) =>
        props.DataSource.filter(
          (we) => we.InventoryID == params.row.InventoryID
        ).length > 0 &&
        props?.DataSource?.filter(
          (we) => we.InventoryID == params.row.InventoryID
        )[0]?.UnAlloKuota < 0 ? (
          <>
            <Tooltip title="Allocated Qty pada inventory ini melebihi batas">
              <Typography sx={{ color: "red" }}>
                <NumberFormat
                  thousandSeparator={true}
                  // thousandsGroupStyle="wan"
                  value={params.value}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  displayType={"text"}
                />
              </Typography>
            </Tooltip>
          </>
        ) : (
          <>
            <NumberFormat
              thousandSeparator={true}
              // thousandsGroupStyle="wan"
              value={params.value}
              decimalScale={2}
              fixedDecimalScale={true}
              displayType={"text"}
            />
          </>
        ),
      // renderCell: (params) => {
      //   return (
      //     <>
      //       <NumberFormat
      //         thousandSeparator={true}
      //         // thousandsGroupStyle="wan"
      //         value={params.value}
      //         decimalScale={2}
      //         fixedDecimalScale={true}
      //         displayType={"text"}
      //       />
      //     </>
      //   );
      // },
    },
    {
      field: "UOM",
      headerName: "UOM",
      sortable: false,
    },
  ];

  return (
    <Paper my={6}>
      <div style={{ display: "flex", margin: "10px" }}>
        <Typography variant="h4" style={{ marginRight: 20 }}>
          Allocated
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={
            props.DataSource.length < 1 ||
            props.Status != "On Hold" ||
            // loading ||
            props.Loading
          }
          onClick={() => {
            setOpenAllocated(true);
            console.log(props.DataSource);
            // HandleSave(data);
          }}
        >
          Add Item
        </Button>
      </div>
      {props.loading ? (
        <Grid container justifyContent="center" DCacing={1} md={12} xs={12}>
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
        <div style={{ width: "100%", padding: 10 }}>
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={data}
            // getRowId={(e) => e.AllocatedKuotaSourceDetailAllocatedID}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
            autoHeight
            columns={columnsAllocated}
            components={{
              Toolbar: CustomToolbar,
            }}
            rowHeight={30}
          />
        </div>
      )}
      <AllocatedPopup
        openAllocated={openAllocated}
        setOpenAllocated={setOpenAllocated}
        DataSource={props.DataSource}
        Data={data}
        setData={(e) => {
          e.filter((info) =>
            info.isOverLimit
              ? NotifyWarning("Warning", "Qty Allocated melebihi Qty Source")
              : console.log("info", info.isOverLimit)
          );
          setData(data.concat(e));
          HandleSave(data.concat(e));
          // setData(
          //   data.concat(
          //     e.filter((bo) =>
          //       data.every(
          //         (ao) => ao.AllocatedKuotaSourceDetailAllocatedID != bo.id
          //       )
          //     )
          //   )
          // );
          // HandleSave(
          //   data.concat(
          //     e.filter((bo) =>
          //       data.every(
          //         (ao) => ao.AllocatedKuotaSourceDetailAllocatedID != bo.id
          //       )
          //     )
          //   )
          // );
        }}
      />
    </Paper>
  );
}
