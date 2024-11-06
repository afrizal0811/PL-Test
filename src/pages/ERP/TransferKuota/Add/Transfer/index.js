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
import TransferPopup from "./TransferPopup";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTransferKuotaContext } from "../../../../../contexts/Modules/TransferKuota/TransferKuotaContext";

const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function TransferSection() {
  const {
    status,
    transferKuotaDetailSourceRep,
    setTransferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
  } = useTransferKuotaContext();

  const [openTransferKuota, setOpenTransferKuota] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const [widthrow, setwidthrow] = React.useState(420);

  // React.useEffect(() => {
  //   let leng = 1;
  //   GridTrans.map((ae) => {
  //     if (leng <= ae.Descr?.length) {
  //       leng = ae.Descr.length;
  //     }
  //     setwidthrow(leng * 8 + 30);
  //   });
  // }, [GridTrans]);

  const columnsAllocated = [
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
                onClick={(e) => {
                  const qty = params.row.Qty;
                  const newList1 = transferKuotaSourceDetailTransferRep.filter(
                    (item) =>
                      (item.id ?? item.TransferKuotaSourceDetailTransferID) !==
                      (params.value ??
                        params.row.TransferKuotaSourceDetailTransferID)
                  );
                  setTransferKuotaSourceDetailTransferRep(newList1);
                  setTransferKuotaDetailSourceRep(
                    transferKuotaDetailSourceRep.map((source) => {
                      if (
                        (source.id ?? source.DetailSourceID) ===
                        params.row.DetailSourceID
                      ) {
                        return {
                          ...source,
                          TransferQty: source.TransferQty + qty,
                        };
                      }
                      return source;
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
    {
      field: "ToBranchID",
      headerName: "Branch",
      width: 100,
      sortable: false,
    },
    {
      field: "ToWarehouseID",
      headerName: "Warehouse",
      width: 110,
      sortable: false,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 110,
      sortable: false,
      renderCell: (params) =>
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        ).length > 0 &&
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        )[0]?.QtyAfterTransfer < 0 ? (
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
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        ).length > 0 &&
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        )[0]?.QtyAfterTransfer < 0 ? (
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
      field: "Qty",
      headerName: "Destination Qty",
      width: 120,
      type: "number",
      sortable: false,
      renderCell: (params) =>
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        ).length > 0 &&
        transferKuotaDetailSourceRep.filter(
          (source) => source.InventoryID === params.row.InventoryID
        )[0]?.QtyAfterTransfer < 0 ? (
          <>
            <Tooltip title="Transfer Qty pada inventory ini melebihi batas">
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
      sortable: false,
    },
  ];

  const handleClickAddItem = () => {
    setOpenTransferKuota(true);
  };

  return (
    <Paper my={6}>
      <div style={{ display: "flex", margin: "10px" }}>
        <Typography variant="h4" style={{ marginRight: 20 }}>
          Transfer
        </Typography>
        <Button
          variant="contained"
          color="primary"
          disabled={
            transferKuotaDetailSourceRep.length < 1 ||
            status !== "On Hold" ||
            transferKuotaDetailSourceRep.every((data) => data.TransferQty === 0)
          }
          onClick={handleClickAddItem}
        >
          Add Item
        </Button>
      </div>
      <div style={{ width: "100%", padding: 10 }}>
        <DataGrid
          rowsPerPageOptions={[10, 25]}
          rows={transferKuotaSourceDetailTransferRep}
          pageSize={pageSize}
          disableColumnFilter
          getRowId={(row) => row?.id ?? row.TransferKuotaSourceDetailTransferID}
          disableColumnSelector
          density="compact"
          onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
          autoHeight
          columns={columnsAllocated}
          disableColumnMenu
        />
      </div>
      <TransferPopup
        openTransferKuota={openTransferKuota}
        setOpenTransferKuota={setOpenTransferKuota}
      />
    </Paper>
  );
}
