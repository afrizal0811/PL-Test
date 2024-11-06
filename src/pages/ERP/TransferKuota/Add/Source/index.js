import React, { useState } from "react";
import {
  Button as MuiButton,
  IconButton,
  Paper as MuiPaper,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import SourcePopup from "./SourcePopup";
import DeleteIcon from "@material-ui/icons/Delete";
import SourceEdit from "./SourceEdit";
import { useTransferKuotaContext } from "../../../../../contexts/Modules/TransferKuota/TransferKuotaContext";

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function SourceSection() {
  const {
    status,
    allocatedWarehouseID,
    transferKuotaDetailSourceRep,
    setTransferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
    allocatedBranchID,
    fromWarehouseID,
    sourceBranchID,
  } = useTransferKuotaContext();

  const [openSource, setOpenSource] = useState(false);
  const [widthrow, setwidthrow] = useState(420);
  const [pageSize, setpageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [dataAllo, setdataAllo] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  // React.useEffect(() => {
  //   let leng = 1;
  //   props.gridSource.forEach((ae) => {
  //     if (leng <= ae.Descr.length) {
  //       leng = ae.Descr.length;
  //     }
  //     setwidthrow(leng * 8 + 30);
  //   });
  // }, [props.gridSource]);

  const columnsSource = [
    {
      field: "id",
      headerName: " ",
      width: 50,
      filterable: false,
      sortable: false,
      renderCell: (params) =>
        status !== "On Hold" ? (
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
                  const newSource = transferKuotaDetailSourceRep.filter(
                    (item) =>
                      (item.id ?? item.TransferKuotaDetailSourceID) !==
                      (params.value ?? params.id)
                  );
                  const newTrans = transferKuotaSourceDetailTransferRep.filter(
                    (item) => item.DetailSourceID !== params.row.DetailSourceID
                  );
                  setTransferKuotaDetailSourceRep(newSource);
                  setTransferKuotaSourceDetailTransferRep(newTrans);
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </strong>
        ),
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
      renderCell: (params) =>
        parseFloat(params.row.TransferQty) !== 0 ? (
          <>
            <Tooltip title="Check kembali Transfer Qty pada inventory ini">
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
        parseFloat(params.row.TransferQty) !== 0 ? (
          <>
            <Tooltip title="Check kembali Transfer Qty pada inventory ini">
              <Typography sx={{ color: "red" }}>{params.value}</Typography>
            </Tooltip>
          </>
        ) : (
          <>{params.value}</>
        ),
    },

    {
      field: "UOM",
      headerName: "UOM",
      width: 80,
      sortable: false,
    },
    {
      field: "TransferQty",
      type: "number",
      headerName: "Transfer Qty",
      width: 120,
      sortable: false,
    },
    {
      field: "QtyBeforeTransfer",
      headerName: "Qty Before Tranfer",
      type: "number",
      width: 125,
      sortable: false,
    },
    {
      field: "QtyAfterTransfer",
      type: "number",
      headerName: "Qty After Tranfer",
      width: 125,
      sortable: false,
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
            disabled={!allocatedWarehouseID || loading || status !== "On Hold"}
            onClick={() => setOpenSource(true)}
          >
            Add Item
          </Button>
        </div>
        <div style={{ width: "100%", padding: "0 10 0 10" }}>
          <DataGrid
            getRowId={(row) => row?.id ?? row.TransferKuotaDetailSourceID}
            rows={transferKuotaDetailSourceRep}
            // rows={props.gridSource}
            rowsPerPageOptions={[5, 10, 25]}
            pageSize={pageSize}
            disableColumnMenu
            disableColumnFilter
            density="compact"
            onRowDoubleClick={(e) => {
              if (status === "On Hold") {
                setDataEdit(e.row.id ?? e.row.TransferKuotaDetailSourceID);
                setOpenEdit(true);
              }
            }}
            onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
            autoHeight
            columns={columnsSource}
          />
        </div>
        <SourcePopup
          Warehouse={allocatedWarehouseID}
          Branch={allocatedBranchID}
          SrcWarehouse={fromWarehouseID}
          SrcBranch={sourceBranchID}
          openSource={openSource}
          Data={transferKuotaDetailSourceRep}
          setOpenSource={setOpenSource}
          setData={(newData) => {
            setTransferKuotaDetailSourceRep(
              transferKuotaDetailSourceRep.concat(
                newData.filter((data) =>
                  transferKuotaDetailSourceRep.every(
                    (dataSource) =>
                      dataSource.DetailSourceID !== data.DetailSourceID
                  )
                )
              )
            );
          }}
        />
        <SourceEdit
          dataEdit={dataEdit}
          Status={status}
          DataAllo={dataAllo}
          rowSource={transferKuotaDetailSourceRep}
          openEdit={openEdit}
          setrowSource={(newData) => {
            setTransferKuotaDetailSourceRep(newData);
          }}
          setDataEdit={(e) => setDataEdit(e)}
          setOpenEdit={(e) => setOpenEdit(e)}
        />
      </Paper>
    </>
  );
}
