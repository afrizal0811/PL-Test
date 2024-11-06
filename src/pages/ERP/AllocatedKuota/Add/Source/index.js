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
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../../utils/ConfigHeader";
import { NotifyError } from "../../../../services/notification.service";
import AllocatedTable from "../Allocated/index";
import SourceEdit from "./SourceEdit";
import SourcePopup from "./SourcePopup";

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

/*
const resdata = {
  Date: "2022-04-08T01:36:49.464Z",
  BranchID: "SIDOARJO",
  FromWarehouseID: "SDA-CT",
  AllocatedKuotaDetailSourceRep: [
    {
      id: "1",
      InventoryID: "10001",
      Descr: "Test Barang",
      SrcQty: 1000,
      UOM: "PAK",
      AlloKuota: 500,
      KeepKuota: 500,
      UnAlloKuota: 0,
      AllocatedKuotaSourceDetailAllocatedRep: [
        {
          InventoryID: "10001",
          Descr: "Test Barang",
          DstBranchID: "SIDOARJO",
          DstSiteID: "SDA-KA",
          DstAlloKuota: 500,
          UOM: "PAK",
        },
      ],
    },
  ],
  BrnchID: "SIDOARJO",
  CompanyID: "string",
  CreatedByID: "string",
  CreatedByScreenID: "string",
  CreatedDateTime: "2022-04-08T01:36:49.464Z",
  LastModifiedByScreenID: "string",
  LastModifiedDateTime: "2022-04-08T01:36:49.464Z",
  ScreenNo: "SAW300021",
};

*/

// const datasource = resdata.AllocatedKuotaDetailSourceRep.map((item, i) => {
//   item.id = i;
//   return item;
// });

export default function SourceTable(props) {
  const [openSource, setOpenSource] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  // const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  const [widthrow, setwidthrow] = useState(420);
  const [data, setData] = useState([]);
  const [dataAllo, setdataAllo] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [openEdit, setOpenEdit] = React.useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetDetailSourceByPagination?page=1&rowsCount=${totalPage}&allocatedRefNbr=${props.RefNbr}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
            const newdata = resdata.record.map((item, i) => {
              item.id = i;
              item.DstAlloKuota = 0;
              return item;
            });
            setData(newdata);
            props.setDataSource(newdata);
            if (totalPage !== resdata.totalCountData) {
              settotalPage(resdata.totalCountData);
            }
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
        });
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  // const getDataAllo = async (id) => {
  //   setLoading(true);
  //   try {
  //     await axios
  //       .get(
  //         `${process.env.REACT_APP_DOMAIN_API}/GetSourceAllocatedByPagination?page=1&rowsCount=50&detailSourceID=${id}`,
  //         GetConfig()
  //       )
  //       .then(function (response) {
  //         // handle success
  //         if (response.status === 200) {
  //           const resdata = response.data[0];
  //           // console.log("res", resdata);
  //           const newdata = resdata.record.map((item, i) => {
  //             item.id = i;
  //             return item;
  //           });
  //           setdataAllo(
  //             dataAllo.concat(
  //               newdata.filter((bo) =>
  //                 dataAllo.every(
  //                   (ao) => ao.AllocatedKuotaSourceDetailAllocatedID != bo.id
  //                 )
  //               )
  //             )
  //           );
  //           props.setDataAllo(
  //             dataAllo.concat(
  //               newdata.filter((bo) =>
  //                 dataAllo.every(
  //                   (ao) => ao.AllocatedKuotaSourceDetailAllocatedID != bo.id
  //                 )
  //               )
  //             )
  //           );
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         // console.log(error);
  //       });
  //     setLoading(false);
  //   } catch (error) {
  //     // console.log(error.message);
  //     setLoading(false);
  //     NotifyError("There was an error!", error);
  //   }
  // };

  React.useEffect(() => {
    if (props.RefNbr) {
      getData();
    }
  }, [props.RefNbr, totalPage]);

  // React.useEffect(() => {
  //   props.setloading(loading);
  // }, [loading]);

  React.useEffect(() => {
    if (data.filter((ae) => ae.Descr.length > 60).length > 0) {
      setwidthrow(790);
    } else {
      setwidthrow(420);
    }
  }, [data]);

  React.useEffect(() => {
    setdataAllo(props.DataAllo);
  }, [props.DataAllo]);

  const columnsSource = [
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
                disabled={loading}
                onClick={(e) => {
                  const newList1 = data.filter(
                    (item) => item.id !== params.value
                  );
                  const newList2 = dataAllo.filter(
                    (item) => item.InventoryID !== params.row.InventoryID
                  );
                  setdataAllo(newList2);
                  props.setDataAllo(newList2);
                  props.setDataSource(newList1);
                  setData(newList1);
                  // props.setrowSource(newList);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </strong>
        ),
    },
    // {
    //   field: "SrcBranchID",
    //   headerName: "Branch",
    //   width: 150,
    // },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
      renderCell: (params) =>
        params.row.UnAlloKuota != 0 ? (
          <>
            <Tooltip title="Check kembali Allocated Qty pada inventory ini">
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
        params.row.UnAlloKuota != 0 ? (
          <>
            <Tooltip title="Check kembali Allocated Qty pada inventory ini">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    // {
    //   field: "SrcSiteID",
    //   headerName: "Warehouse",
    //   width: 150,
    // },
    {
      field: "SrcQty",
      headerName: "Qty",
      type: "number",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
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
        );
      },
    },
    {
      field: "UOM",
      headerName: "UOM",
      width: 80,
      sortable: false,
    },
    {
      field: "AlloKuota",
      type: "number",
      headerName: "Allocated Kuota",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
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
        );
      },
    },
    {
      field: "KeepKuota",
      type: "number",
      headerName: "Keep Kuota",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        if (props.Status === "Released") return "";
        return (
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
        );
      },
    },
    {
      field: "UnAlloKuota",
      type: "number",
      headerName: "Unallocated Qty",
      width: 140,
      sortable: false,
      renderCell: (params) => {
        return (
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
        );
      },
    },
  ];

  return (
    <>
      <Paper my={6}>
        <div style={{ display: "flex", margin: "10px" }}>
          <Typography variant="h4" style={{ marginRight: 20 }}>
            Source
          </Typography>
          <Button
            variant="contained"
            color="primary"
            disabled={
              !props?.Warehouse || loading || props.Status !== "On Hold"
            }
            onClick={() => {
              setOpenSource(true);
            }}
          >
            Add Item
          </Button>
        </div>
        {loading ? (
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
          <div style={{ width: "100%", padding: "0 10 0 10" }}>
            <DataGrid
              // rows={data}
              rows={data}
              rowsPerPageOptions={[5, 10, 25]}
              pageSize={pageSize}
              components={{
                Toolbar: CustomToolbar,
              }}
              onCellDoubleClick={(e) => {
                if (props.Status === "On Hold") {
                  setDataEdit(e.row.id);
                  setOpenEdit(true);
                }
              }}
              onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
              autoHeight
              columns={columnsSource}
              rowHeight={30}
            />
          </div>
        )}
        <SourcePopup
          Warehouse={props?.Warehouse}
          BranchID={props?.BranchID}
          openSource={openSource}
          Data={data}
          setOpenSource={(e) => setOpenSource(e)}
          setData={(e) => {
            // console.log("add", e);
            setData(
              data.concat(
                e.filter((bo) =>
                  data.every((ao) => ao.DetailSourceID != bo.DetailSourceID)
                )
              )
            );
            props.setDataSource(
              data.concat(
                e.filter((bo) =>
                  data.every((ao) => ao.DetailSourceID != bo.DetailSourceID)
                )
              )
            );
          }}
        />
        <SourceEdit
          dataEdit={dataEdit}
          Status={props.Status}
          DataAllo={props.DataAllo}
          rowSource={data}
          openEdit={openEdit}
          setrowSource={(e) => {
            setData(e);
            props.setAnyChanges(true);
            // HandleSave(e);
          }}
          setDataEdit={(e) => setDataEdit(e)}
          setOpenEdit={(e) => setOpenEdit(e)}
        />
      </Paper>
      <AllocatedTable
        Status={props.Status}
        getDataSource={() => {
          getData();
          // getDataAllo();
        }}
        setDataAllo={(e) => {
          setdataAllo(e);
          props.setDataAllo(e);
        }}
        dataAllo={dataAllo}
        DataSource={data}
        setLoading={(e) => setLoading(e)}
        Loading={loading}
        Warehouse={props.Warehouse}
        Descr={props.Descr}
        RefNbr={props.RefNbr}
        Date={props.Date}
        BranchID={props.BranchID}
      />
    </>
  );
}
