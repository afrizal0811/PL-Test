import React, { useEffect, useMemo, useRef, useState } from "react";
// import DestinationTable from "./DestinationTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { TabPanel } from "@mui/lab";
import { Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DialogAddItem from "./DialogAddItem";
// import { columnsSource } from "./ColumnSouce";
// import { columnsDestination } from "./ColumnDestination";
import moment from "moment";
// import columnsDestination from "./ColumnDestination";
import { Edit } from "@mui/icons-material";
import NumberFormat from "react-number-format";
import { NotifyError } from "../../../../../services/notification.service";
import DestinationEdit from "./DestinationPopup";
import SourceEdit from "./SourcePopup";

export default function TabDocumentDetails(props) {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [DataAdd, setDataAdd] = useState([]);

  const [selectionSource, setSelectionSource] = useState(0);
  const [selectionDesti, setSelectionDesti] = useState(0);

  const [rowSource, setrowSource] = useState([]);
  const [rowDesti, setrowDesti] = useState([]);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState("");

  const [openDesti, setOpenDesti] = React.useState(false);
  const [destiEdit, setDestiEdit] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsDestination = [
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
                aria-label="Edit"
                size="small"
                color="primary"
                onClick={(e) => {
                  setDestiEdit(params.value);
                  setOpenDesti(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div>
          </strong>
        ),
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 115,
      sortable: false,
      renderCell: (params) =>
        !params.row.ToLotNbr ||
        !params.row.ToExpDate ||
        params.row.ToExpDate == "" ||
        params.row.ToLotNbr == "" ? (
          <>
            <Tooltip title="Data Inventory ini belum lengkap">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "InventoryDesc",
      headerName: "Description",
      sortable: false,
      width: 150,
      renderCell: (params) =>
        !params.row.ToLotNbr ||
        !params.row.ToExpDate ||
        params.row.ToExpDate == "" ||
        params.row.ToLotNbr == "" ? (
          <>
            <Tooltip title="Data Inventory ini belum lengkap">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "ToSiteCD",
      headerName: "To Warehouse",
      sortable: false,
      width: 130,
      // editable: true,
    },
    {
      field: "ToLocationID",
      headerName: "To Location",
      sortable: false,
      width: 120,
      // editable: true,
    },
    {
      field: "ToUOM",
      headerName: "To UOM",
      sortable: false,
      width: 100,
      // editable: true,
    },
    {
      field: "ToQty",
      headerName: "To Qty",
      sortable: false,
      width: 100,
      type: "number",
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
      // editable: true,
    },
    {
      field: "ToLotNbr",
      headerName: "To Lot Nbr",
      sortable: false,
      width: 120,
      // editable: true,
    },
    {
      field: "ToExpDate",
      headerName: "To Exp Date",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <p>
          {params?.value?.length > 0 || params?.value !== "" ? (
            <>{moment(params.value).format("YYYY-MM-DD")}</>
          ) : (
            " "
          )}
        </p>
      ),
      // renderCell: (params) => <p>{moment(params.value).format("YYYY-MM-DD")}</p>,
      // type: "date",
      // editable: true,
    },
    {
      field: "ToReasonCode",
      headerName: "Reason Code",
      width: 120,
      filterable: false,
      sortable: false,
      // editable: true,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsSource = [
    {
      field: "id",
      headerName: " ",
      width: 80,
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
                onClick={(e) => {
                  const newList1 = rowSource.filter(
                    (item) => item.id !== params.value
                  );
                  const newList2 = rowDesti.filter(
                    (item) => item.id !== params.value
                  );
                  props.setDataSource(newList1);
                  props.setDataDest(newList2);
                  // props.setrowSource(newList);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Edit"
                size="small"
                color="primary"
                onClick={(e) => {
                  setDataEdit(params.value);
                  setOpenEdit(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </div>
          </strong>
        ),
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 115,
      filterable: false,
      editable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.SrcExpDate || params.row.SrcExpDate == "" ? (
          <>
            <Tooltip title="Data Inventory ini belum lengkap">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "InventoryDesc",
      headerName: "Description",
      width: 150,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        !params.row.SrcExpDate || params.row.SrcExpDate == "" ? (
          <>
            <Tooltip title="Data Inventory ini belum lengkap">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },
    {
      field: "SiteCD",
      headerName: "Source Warehouse",
      width: 150,
      filterable: false,
      sortable: false,
      editable: false,
    },
    {
      field: "LocationID",
      headerName: "Source Location",
      width: 150,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "UOM",
      headerName: "Source UOM",
      width: 120,
      filterable: false,
      sortable: false,
      editable: false,
    },
    {
      field: "Qty",
      headerName: "Source Qty",
      width: 120,
      filterable: false,
      sortable: false,
      editable: false,
      type: "number",
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
      field: "SrcLotNbr",
      headerName: "Source Lot Nbr",
      width: 170,
      filterable: false,
      sortable: false,
      editable: false,
    },
    {
      field: "SrcExpDate",
      headerName: "Source Exp Date",
      width: 150,
      filterable: false,
      sortable: false,
      editable: false,
      type: "date",
      renderCell: (params) => (
        <p>
          {params?.value?.length > 0 || params?.value !== "" ? (
            <>{moment(params.value).format("YYYY-MM-DD")}</>
          ) : (
            " "
          )}
        </p>
      ),
    },
    {
      field: "ReasonCode",
      headerName: "Reason Code",
      width: 150,
      filterable: false,
      sortable: false,
      editable: false,
    },
  ];

  const refsrc = useRef(null);
  const refdst = useRef(null);
  const columnsrc = useMemo(
    () =>
      columnsSource.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refsrc.current = params.api;
          return null;
        },
      }),
    [columnsSource]
  );
  const columndst = useMemo(
    () =>
      columnsDestination.concat({
        field: "__HIDDEN__",
        width: 0,
        renderCell: (params) => {
          refdst.current = params.api;
          return null;
        },
      }),
    [columnsDestination]
  );

  React.useEffect(() => {
    if (DataAdd.length > 0) {
      let merged = [];

      const result1 = props.DataSource.concat(
        DataAdd.filter((bo) => props.DataSource.every((ao) => ao.id !== bo.id))
      );
      const result2 = props.DataDest.concat(
        DataAdd.filter((bo) => props.DataDest.every((ao) => ao.id !== bo.id))
      );
      // console.log("arr3", arr3);
      // console.log("arr4", arr4);
      console.log("result1", result1);
      console.log("result2", result2);
      const newLocal = props.setDataSource(result1);
      const newLocal2 = props.setDataDest(result2);
    }
  }, [DataAdd]);

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current || props.Kirim == 0) {
      mounted.current = true;
      console.log("GADIKirim", props.Kirim);
      // getData();
    } else {
      console.log("mounted", mounted.current);
      // console.log("dst rowdst", refdst.current.getRowModels());
      console.log("datadst", props.DataDest);
      console.log("datadst", props.DataSource);
      console.log("refsrc", refsrc.current);
      // console.log("src rowsrc", refsrc.current.getRowModels());
      let merged;
      if (refsrc.current == null) {
        merged = {
          DataDesti: props.DataDest,
          DataSource: props.DataSource,
          Submit: false,
        };
        props.SaveHandler(merged);
      } else {
        merged = {
          DataDesti: [...refdst.current.getRowModels()].map(([id, value]) => ({
            InventoryDesc: value.InventoryDesc,
            id: value.id,
            InventoryID: value.InventoryID,
            QtyAvailable: value.QtyAvailable,
            Qty: value.ToQty,
            LocationID: value.ToLocationID,
            SiteCD: value.ToSiteCD,
            UOM: value.ToUOM,
            ToExpDate: value.ToExpDate,
            ToLotNbr: value.ToLotNbr,
            ReasonCode: "CHANGELTEXD",
          })),
          DataSource: [...refsrc.current.getRowModels()].map(([id, value]) => ({
            InventoryDesc: value.InventoryDesc,
            id: value.id,
            InventoryID: value.InventoryID,
            QtyAvailable: value.QtyAvailable,
            SrcExpDate: value.SrcExpDate,
            Qty: value.Qty,
            LocationID: value.LocationID,
            SiteCD: value.SiteCD,
            UOM: value.UOM,
            SrcLotNbr: value.SrcLotNbr,
            ReasonCode: value.ReasonCode,
          })),
          Submit: false,
        };
        if (
          merged.DataDesti.filter(
            (ao) =>
              ao.ToLotNbr == "" ||
              !ao.ToLotNbr ||
              ao.ToExpDate == "" ||
              !ao.ToExpDate
          ).length > 0 ||
          merged.DataSource.filter(
            (ao) => ao.SrcExpDate == "" || !ao.SrcExpDate
          ).length > 0
        ) {
          NotifyError("Error!", "Data tidak lengkap");
        } else {
          props.SaveHandler(merged);
        }
      }
      props.setKirim(0);
      props.setSubmit(0);
    }
  }, [props.Kirim]);

  useEffect(() => {
    console.log("submit", props.Submit);
    if (!mounted.current || props.Submit == 0) {
      mounted.current = true;
      // getData();
    } else {
      if (
        refsrc?.current?.constructor.toString().indexOf("Yi") > -1 &&
        refdst?.current?.constructor.toString().indexOf("Yi") > -1
      ) {
        console.log("dst rowdst", refdst.current.getRowModels());
        console.log("src rowsrc", refsrc.current.getRowModels());
        let merged = {
          DataDesti: [...refdst.current.getRowModels()].map(([id, value]) => ({
            InventoryDesc: value.InventoryDesc,
            id: value.id,
            InventoryID: value.InventoryID,
            QtyAvailable: value.QtyAvailable,
            Qty: value.ToQty,
            LocationID: value.ToLocationID,
            SiteCD: value.ToSiteCD,
            UOM: value.ToUOM,
            ToExpDate: value.ToExpDate,
            ToLotNbr: value.ToLotNbr,
            ReasonCode: "CHANGELTEXD",
          })),
          DataSource: [...refsrc.current.getRowModels()].map(([id, value]) => ({
            InventoryDesc: value.InventoryDesc,
            id: value.id,
            InventoryID: value.InventoryID,
            QtyAvailable: value.QtyAvailable,
            SrcExpDate: value.SrcExpDate,
            Qty: value.Qty,
            LocationID: value.LocationID,
            SiteCD: value.SiteCD,
            UOM: value.UOM,
            SrcLotNbr: value.SrcLotNbr,
            ReasonCode: value.ReasonCode,
          })),
          Submit: true,
        };
        props.SaveHandler(merged);
      } else {
        let merged = {
          DataDesti: props.DataDest,
          DataSource: props.DataSource,
          Submit: true,
        };
        props.SaveHandler(merged);
      }
      props.setKirim(0);
      props.setSubmit(0);
    }
  }, [props.Submit]);

  useEffect(() => {
    // untuk menambah id pada setiap row
    setrowSource(props.DataSource);
  }, [props.DataSource]);

  useEffect(() => {
    // untuk menambah id pada setiap row
    setrowDesti(props.DataDest);
  }, [props.DataDest]);

  return (
    <TabPanel value="1">
      <Paper my={4}>
        <Grid container md={12}>
          <Grid item md={1}>
            <h3 style={{ marginRight: 20 }}>Source</h3>
          </Grid>
          <Grid item md={11}>
            <SourceEdit
              dataEdit={dataEdit}
              Status={props.Status}
              rowSource={props.DataSource}
              openEdit={openEdit}
              setrowSource={(e) => {
                // setrowSource(e);
                // console.log("change rowsour", e);
                // setrowSource(e);
                props.setDataSource(e);
                // if (
                //   refsrc?.current?.constructor.toString().indexOf("Yi") > -1
                // ) {
                //   let arrsrc = [...refsrc.current.getRowModels()].map(
                //     ([id, value]) => ({
                //       InventoryDesc: value.InventoryDesc,
                //       id: value.id,
                //       InventoryID: value.InventoryID,
                //       QtyAvailable: value.QtyAvailable,
                //       SrcLotNbr: value.SrcLotNbr,
                //       Qty: value.Qty,
                //       LocationID: value.LocationID,
                //       SiteCD: value.SiteCD,
                //       SrcExpDate: value.SrcExpDate,
                //       ReasonCode: value.ReasonCode,
                //     })
                //   );
                //   // console.log("change rowsour", arrsrc);
                //   props.setDataSource(arrsrc);
                // }
              }}
              setDataEdit={(e) => setDataEdit(e)}
              setOpenEdit={(e) => setOpenEdit(e)}
              setOpenAddItem={(e) => setOpenAddItem(e)}
            />
            <DestinationEdit
              destiEdit={destiEdit}
              rowDesti={props.DataDest}
              rowSource={props.DataSource}
              openDesti={openDesti}
              setrowDesti={(e) => {
                // setrowDesti(e);
                // console.log("change e", e);
                props.setDataDest(e);
                // if (
                //   refdst?.current?.constructor.toString().indexOf("Yi") > -1
                // ) {
                //   let arrdst = [...refdst.current.getRowModels()].map(
                //     ([id, value]) => ({
                //       InventoryDesc: value.InventoryDesc,
                //       id: value.id,
                //       InventoryID: value.InventoryID,
                //       QtyAvailable: value.QtyAvailable,
                //       ToLotNbr: value.ToLotNbr,
                //       ToQty: value.ToQty,
                //       ToLocationID: value.ToLocationID,
                //       ToSiteCD: value.ToSiteCD,
                //       ToExpDate: value.ToExpDate,
                //       ReasonCode: value.ReasonCode,
                //     })
                //   );
                //   console.log("change rowsour", arrdst);
                //   props.setDataDest(arrdst);
                // }
              }}
              setDestiEdit={(e) => setDestiEdit(e)}
              setOpenDesti={(e) => setOpenDesti(e)}
            />
          </Grid>
        </Grid>
        {/* <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("rowdes", props.DataDest);
            console.log("rowsour", props.DataSource);
          }}
        >
          tes
        </Button> */}
        <div style={{ width: "100%", margin: 5 }}>
          <DataGrid
            editMode="row"
            // getRowId={(row) => row.employeeID}
            // rows={[{ id: 0, Qty: 1, SrcLotNbr: "", SrcExpDate: "" }]}
            rows={props.DataSource}
            hideFooter
            density="compact"
            disableColumnFilter
            disableColumnMenu
            pageSize={5}
            autoHeight
            apiRef={refsrc}
            columns={columnsrc}
            selectionModel={selectionSource}
            onSelectionModelChange={(selection) => {
              setSelectionSource(selection);
            }}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
            // onCellClick={(e) => {
            //   if (props.Status === "On Hold") {
            //     setDataEdit(e.row.id);
            //     setOpenEdit(true);
            //   }
            // }}
            componentsProps={{
              toolbar: { refsrc },
            }}
          />
        </div>
        <h3 style={{ marginLeft: 10, marginTop: 10 }}>Destination</h3>
        <div style={{ width: "100%", margin: 5 }}>
          <DataGrid
            editMode="row"
            // getRowId={(row) => row.employeeID}
            pageSize={5}
            autoHeight
            rows={props.DataDest}
            density="compact"
            disableColumnFilter
            disableColumnMenu
            hideFooter
            apiRef={refdst}
            columns={columndst}
            selectionModel={selectionDesti}
            onSelectionModelChange={(selection) => {
              setSelectionDesti(selection);
            }}
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
            // onCellClick={(e) => {
            //   if (props.Status === "On Hold") {
            //     // console.log("e", e);
            //     setDestiEdit(e.row.id);
            //     setOpenDesti(true);
            //   }
            // }}
            componentsProps={{
              toolbar: { refdst },
            }}
          />
        </div>
        <DialogAddItem
          setDataAdd={(e) => setDataAdd(e)}
          IDLength={props.DataSource.length}
          openAddItem={openAddItem}
          setOpenAddItem={(e) => setOpenAddItem(e)}
        />
      </Paper>
      {/* <SelectPopup
        open={OpenLotNbr}
        name={"Lot Nbr"}
        api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse`}
        id={"warehouseID"}
        desc={"description"}
        setopen={(e) => {
          setOpenLotNbr(e);
        }}
        Temp={SrcLotNbr}
        setTemp={(e) => {
          setSrcLotNbr(e);
          console.log("e", e);
        }}
      /> */}
      {/* <DestinationTable /> */}
    </TabPanel>
  );
}
