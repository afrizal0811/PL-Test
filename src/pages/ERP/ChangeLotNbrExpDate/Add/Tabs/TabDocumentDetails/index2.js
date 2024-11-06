import React, { useMemo, useRef, useState } from "react";
// import DestinationTable from "./DestinationTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { TabPanel } from "@mui/lab";
import { Button, FormControl, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DialogAddItem from "./DialogAddItem";
// import { columnsSource } from "./ColumnSouce";
// import { columnsDestination } from "./ColumnDestination";
import moment from "moment";
import CbData from "../../../../../../components/shared/dropdown";
import CbDataPG from "../../../../../../components/shared/dropdownPG";

export default function TabDocumentDetails(props) {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [DataAdd, setDataAdd] = useState([]);
  const [dstlotnbr, setdstlotnbr] = useState("");
  const [dstqty, setdstqty] = useState(0);
  const [dstwarehouse, setdstwarehouse] = useState("");
  const [dstexpdate, setdstexpdate] = useState(new Date());
  const [dstlocation, setdstlocation] = useState("");
  const [selectsrc, setselectsrc] = useState({});
  const [selectdst, setselectdst] = useState({});

  const [OpenLotNbr, setOpenLotNbr] = useState(false);
  const [SrcLotNbr, setSrcLotNbr] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columnsDestination = [
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 150,
    },
    {
      field: "InventoryDesc",
      headerName: "Description",
      width: 150,
    },
    {
      field: "SiteCD",
      headerName: "To Warehouse",
      width: 150,
      // editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          return (
            <FormControl style={{ width: "100%" }}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse`}
                id={"warehouseID"}
                desc={"description"}
                label="Warehouse"
                onChange={(e) => {
                  setdstwarehouse(e);
                  params.api.updateRows([
                    {
                      id: params.id,
                      SiteCD: e,
                    },
                  ]);
                }}
                value={
                  params.api.getRowMode(params.id, "siteCD") === "edit"
                    ? dstwarehouse
                    : params.value
                }
                InputProps={{
                  readOnly:
                    params.api.getRowMode(params.id, "siteCD") === "view",
                }}
              />
            </FormControl>
          );
        } else {
          return <p>{params.value}</p>;
        }
      },
    },
    {
      field: "LocationID",
      headerName: "To Location",
      width: 150,
      // editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          return (
            <FormControl style={{ width: "100%" }}>
              <CbDataPG
                source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Location?page=1&rowsCount=50&warehouseID=${params.row.SiteCD}`}
                id={"locationID"}
                desc={""}
                label="LocationID"
                onChange={(e) => {
                  setdstlocation(e);
                  params.api.updateRows([
                    {
                      id: params.id,
                      LocationID: e,
                    },
                  ]);
                }}
                defaultValue={dstlocation}
                value={
                  params.api.getRowMode(params.id, "locationID") === "edit"
                    ? dstlocation
                    : params.value
                }
                InputProps={{
                  readOnly:
                    params.api.getRowMode(params.id, "locationID") === "view",
                }}
              />
            </FormControl>
          );
        } else {
          return <p>{params.value}</p>;
        }
      },
    },
    {
      field: "Qty",
      headerName: "To Qty",
      width: 150,
      // editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          setdstqty(params.value);
          return (
            <FormControl style={{ width: "100%" }}>
              <input
                type={"number"}
                style={{
                  padding: 15,
                }}
                min={0}
                max={params.row.qtyAvailable}
                value={params.value}
                onChange={(e) => {
                  // setdstqty(e.target.value);
                  params.api.updateRows([
                    {
                      id: params.id,
                      Qty: e.target.value,
                    },
                  ]);
                }}
                onBlur={(e) => {
                  params.api.updateRows([
                    {
                      id: params.id,
                      Qty: e.target.value,
                    },
                  ]);
                }}
              ></input>
            </FormControl>
          );
        } else {
          return <p>{params.value}</p>;
        }
      },
    },
    {
      field: "ToLotNbr",
      headerName: "To Lot Nbr",
      width: 150,
      // editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          return (
            <FormControl style={{ width: "100%" }}>
              <input
                value={params.value}
                style={{
                  padding: 15,
                }}
                type="text"
                onChange={(e) => {
                  // setdstlotnbr("");
                  console.log("echange", e);
                  params.api.updateRows([
                    {
                      id: params.id,
                      ToLotNbr: e.target.value,
                    },
                  ]);
                }}
                onBlur={(e) => {
                  params.api.updateRows([
                    {
                      id: params.id,
                      ToLotNbr: e.target.value,
                    },
                  ]);
                  setdstlotnbr("");
                }}
              ></input>
            </FormControl>
          );
        } else {
          return <p>{params.value}</p>;
        }
      },
    },
    {
      field: "ToExpDate",
      headerName: "To Exp Date",
      width: 150,
      // type: "date",
      // editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          setdstexpdate(moment(params.value).format("YYYY-MM-DD"));
          return (
            <FormControl style={{ width: "100%" }}>
              <input
                value={dstexpdate}
                style={{
                  padding: 15,
                }}
                type="date"
                onChange={(e) => {
                  setdstexpdate(e.target.value);
                  console.log("echange", e);
                  params.api.updateRows([
                    {
                      id: params.id,
                      ToExpDate: e.target.value,
                    },
                  ]);
                }}
                onBlur={(e) => {
                  params.api.updateRows([
                    {
                      id: params.id,
                      ToExpDate: dstexpdate,
                    },
                  ]);
                  setdstexpdate(moment().format("YYYY-MM-DD"));
                }}
              ></input>
            </FormControl>
          );
        } else {
          return <p>{moment(params.value).format("YYYY-MM-DD")}</p>;
        }
      },
    },
    {
      field: "ReasonCode",
      headerName: "Reason Code",
      width: 150,
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
      width: 50,
      filterable: false,
      sortable: false,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            startIcon={<DeleteIcon />}
            onClick={() => {
              if (refdst.current.getSelectedRows().size > 0) {
                refdst.current.selectRow(params.id, false, true);
              }
              if (refsrc.current.getSelectedRows().size > 0) {
                refsrc.current.selectRow(params.id, false, true);
              }
              const newList1 = props.DataSource.filter(
                (item) => item.id !== params.row.id
              );
              const newList2 = props.DataDest.filter(
                (item) => item.id !== params.row.id
              );
              props.setDataSource(newList1);
              props.setDataDest(newList2);
            }}
          ></Button>
        </strong>
      ),
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 120,
      filterable: false,
      editable: false,
      sortable: false,
    },
    {
      field: "InventoryDesc",
      headerName: "Description",
      width: 150,
      filterable: false,
      sortable: false,
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
      field: "Qty",
      headerName: "Source Qty",
      width: 120,
      filterable: false,
      sortable: false,
      editable: true,
      type: "number",
    },
    {
      field: "SrcLotNbr",
      headerName: "Source Lot Nbr",
      width: 170,
      filterable: false,
      sortable: false,
      editable: true,
      renderCell: (params) => {
        // const isInEditModeDriver = params.api.getRowMode(params.id) === "edit";
        let filter = [...params.api.getSelectedRows()].map(([id, value]) => ({
          id: value?.id,
        }));
        const isInEditModeZona =
          filter.filter((row) => row.id == params.id).length > 0;
        if (isInEditModeZona) {
          return (
            <FormControl style={{ width: "100%" }}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemLotNbr?inventoryID=${params.row.inventoryID}&warehouseID=${params.row.siteCD}`}
                id={"lotSerialNbr"}
                desc={""}
                all
                label=""
                onChange={(e) => {
                  // console.log("lotnbr", e);
                  setSrcLotNbr(e[0]?.lotSerialNbr);
                  params.api.updateRows([
                    {
                      id: params.id,
                      SrcLotNbr: e[0]?.lotSerialNbr,
                      SrcExpDate: e[0]?.expiryDate,
                    },
                  ]);
                }}
                value={
                  params.api.getRowMode(params.id, "srcLotNbr") === "edit"
                    ? SrcLotNbr
                    : params.value
                }
                InputProps={{
                  readOnly:
                    params.api.getRowMode(params.id, "srcLotNbr") === "view",
                }}
              />
            </FormControl>
          );
        } else {
          return <p>{params.value}</p>;
        }
      },
    },
    {
      field: "SrcExpDate",
      headerName: "Source Exp Date",
      width: 150,
      filterable: false,
      sortable: false,
      editable: true,
      type: "date",
      renderCell: (params) => (
        <p>{moment(params.value).format("YYYY-MM-DD")}</p>
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

      let arr3 = props.DataSource.map((item, i) =>
        Object.assign({}, item, DataAdd[i])
      );

      let arr4 = props.DataDest.map((item, i) =>
        Object.assign({}, item, DataAdd[i])
      );

      const result1 = props.DataSource.concat(
        DataAdd.filter((bo) => props.DataSource.every((ao) => ao.id != bo.id))
      );
      const result2 = props.DataDest.concat(
        DataAdd.filter((bo) => props.DataDest.every((ao) => ao.id != bo.id))
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

  return (
    <TabPanel value="1">
      <Paper my={6}>
        <div style={{ display: "flex", marginLeft: 10, paddingTop: 15 }}>
          <h3 style={{ marginRight: 20 }}>Source</h3>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenAddItem(true);
            }}
          >
            Add Item
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // setOpenAddItem(true);
              console.log(
                "src",
                refsrc.current.constructor
                  .toString()
                  .indexOf("HTMLDivElement") <= -1
              );
              console.log("dst", refsrc.current.constructor);
              let merged = [];
              let payload = {
                brnchID: "PRODWHOLE",
                changeLotNbrExpDateOtherInformationDetailRep: [],
                changeLotNbrExpDateApprovalDetailRep: [],
                changeLotNbrExpDateDetailDestinationRep: [],
                changeLotNbrExpDateDetailResourceRep: [],
              };

              console.log("datades", props.DataDest);
              console.log(
                "refdst.current.getSelectedRows()",
                refdst.current.getSelectedRows()
              );
            }}
          >
            tes
          </Button>
        </div>
        <div style={{ height: 350, width: "100%", margin: 5 }}>
          <DataGrid
            // rowsPerPageOptions={[5, 10, 25]}
            hideFooter
            rows={props.DataSource}
            columns={columnsrc}
            disableSelectionOnClick={props.Status !== "On Hold"}
            ref={refsrc}
            pageSize={4}
            disableColumnMenu
            disableColumnFilter
            // selectionModel={selectsrc}
            // onSelectionModelChange={(e) => {
            //   setselectsrc(e);
            //   // console.log("selection", e);
            // }}
            // onCellDoubleClick={(e) => {
            //   console.log("row", e);
            //   refsrc.current.setCellMode(e.id, e.field, "edit");
            // }}
            onCellBlur={(e) => {
              // if (refsrc?.current?.constructor.toString().indexOf("Yi") > -1) {
              //   console.log("berubah src");
              //   refsrc.current.selectRow(
              //     refsrc.current.getSelectedRows()[0],
              //     true,
              //     true
              //   );
              //   refsrc.current.updateRows([
              //     {
              //       inventoryDesc: e.row.inventoryDesc,
              //       id: e.row.id,
              //       inventoryID: e.row.inventoryID,
              //       qtyAvailable: e.row.qtyAvailable,
              //       srcLotNbr: e.row.srcLotNbr,
              //       qty: e.row.qty,
              //       locationID: e.row.locationID,
              //       siteCD: e.row.siteCD,
              //       srcExpDate: e.row.srcExpDate,
              //       reasonCode: e.row.reasonCode,
              //       uom: e.row.uom,
              //     },
              //   ]);
              //   let arrsrc = [...refsrc.current.getRowModels()].map(
              //     ([id, value]) => ({
              //       inventoryDesc: value.inventoryDesc,
              //       id: value.id,
              //       inventoryID: value.inventoryID,
              //       qtyAvailable: value.qtyAvailable,
              //       srcLotNbr: value.srcLotNbr,
              //       qty: value.qty,
              //       locationID: value.locationID,
              //       siteCD: value.siteCD,
              //       srcExpDate: value.srcExpDate,
              //       reasonCode: value.reasonCode,
              //       uom: value.uom,
              //     })
              //   );
              //   refsrc.current.setRowMode(e.id, "view");
              //   props.setDataSource(arrsrc);
              // }
              if (refsrc?.current?.constructor.toString().indexOf("Yi") > -1) {
                let arrsrc = [...refsrc.current.getRowModels()].map(
                  ([id, value]) => ({
                    InventoryDesc: value.InventoryDesc,
                    id: value.id,
                    InventoryID: value.InventoryID,
                    QtyAvailable: value.QtyAvailable,
                    SrcLotNbr: value.SrcLotNbr,
                    Qty: value.Qty,
                    LocationID: value.LocationID,
                    SiteCD: value.SiteCD,
                    SrcExpDate: value.SrcExpDate,
                    ReasonCode: value.ReasonCode,
                    Uom: value.uom,
                  })
                );
                props.setDataSource(arrsrc);
                // props.setDataSource(arrsrc);
              }
            }}
            onCellCLick={handleCellClick}
            onRowCLick={handleRowClick}
            editMode="row"
          />
        </div>
        <h3 style={{ marginLeft: 10, marginTop: 10 }}>Destination</h3>
        <div style={{ height: 350, width: "100%", margin: 5 }}>
          <DataGrid
            // rowsPerPageOptions={[5, 10, 25]}
            hideFooter
            rows={props.DataDest}
            columns={columndst}
            disableSelectionOnClick={props.Status !== "On Hold"}
            ref={refdst}
            disableColumnMenu
            disableColumnFilter
            onCellBlur={(e) => {
              if (refdst?.current?.constructor.toString().indexOf("Yi") > -1) {
                let arrdst = [...refdst.current.getRowModels()].map(
                  ([id, value]) => ({
                    InventoryDesc: value.InventoryDesc,
                    id: value.id,
                    InventoryID: value.InventoryID,
                    SiteCD: value.SiteCD,
                    LocationID: value.LocationID,
                    Qty: value.Qty,
                    ToLotNbr: value.ToLotNbr,
                    ToExpDate: value.ToExpDate,
                    ReasonCode: value.ReasonCode,
                  })
                );
                props.setDataDest(arrdst);
                // props.setDataSource(arrsrc);
              }
            }}
            pageSize={4}
            onCellCLick={handleCellClick}
            onRowCLick={handleRowClick}
            editMode="row"
          />
        </div>
        <DialogAddItem
          setDataAdd={(e) => setDataAdd(e)}
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
