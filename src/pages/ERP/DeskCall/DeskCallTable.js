import { Card as MuiCard, Paper as MuiPaper, Tooltip } from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";
import DetailDialog from "./Dialogs/DetailDialog";
import ResponDialog from "./Dialogs/ResponDialog";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "DeskcallID",
    headerName: "Deskcall ID",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "CustomerID",
    headerName: "Customer",
    sortable: false,
    width: 300,
    renderCell: (params) => (
      <p>
        {params.value} - {params.row.CustomerName}
      </p>
    ),
  },
  {
    field: "Type1",
    headerName: "Tipe 1",
    sortable: false,
    width: 130,
    renderCell: (params) => (
      <>
        {params?.value?.length > 14 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "Type2",
    headerName: "Tipe 2",
    sortable: false,
    width: 130,
    renderCell: (params) => (
      <>
        {params?.value?.length > 14 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "UsrAdmPiutang",
    headerName: "Admin Piutang",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "SalesPersonID",
    headerName: "Salesperson",
    sortable: false,
    width: 110,
  },
  {
    field: "SalesPersonID_SalesPerson_descr",
    headerName: "Salesperson",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "Phone1",
    headerName: "Phone",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "PrimaryContactID",
    headerName: "Nama Contact",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "TopPrint",
    headerName: "TOP Print",
    sortable: false,
    width: 100,
  },
  {
    field: "DcJt30",
    headerName: "JT > 30",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            value={params.value}
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </>
      );
    },
  },
  {
    field: "DcJt730",
    headerName: "JT 7 - 30",
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            value={params.value}
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </>
      );
    },
  },
  {
    field: "DcJt06",
    headerName: "JT 0 - 6",
    sortable: false,
    width: 120,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            value={params.value}
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </>
      );
    },
  },
  {
    field: "DcNotJt",
    headerName: "Belum JT",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            displayType={"text"}
            value={params.value}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </>
      );
    },
  },
  {
    field: "DcRespon",
    headerName: "Respon",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "DcKet",
    headerName: "Keterangan",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        {params?.value?.length > 18 ? (
          <Tooltip title={params.value}>
            <p>{params.value}</p>
          </Tooltip>
        ) : (
          <>{params.value}</>
        )}
      </>
    ),
  },
  {
    field: "DcResponBack",
    headerName: "Date Respon Kembali",
    sortable: false,
    width: 150,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
];

export default function DeskCallTable(props) {
  console.log({ props });
  const {
    Data,
    DeskcallID,
    setData,
    openDetail,
    pageSize,
    onPageSizeChange,
    setOpenDetail,
    openRespon,
    setOpenRespon,
    SelectedDeskcall,
    setSelectedDeskCall,
    rowCount,
    page,
    paginationMode,
    pagination,
    generateData,
    getDataFilter,
    setcurretPage,
  } = props;

  return (
    <Card mb={6} mt={0}>
      <Paper>
        <div style={{ width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.CustomerID}
            rows={Data}
            columns={columns}
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            density="compact"
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            autoHeight
            pageSize={pageSize}
            onPageSizeChange={(e) => onPageSizeChange(e)}
            onSelectionModelChange={(e) => {
              setSelectedDeskCall(
                Data.filter((i) => e.includes(i.CustomerID))[0]
              );
            }}
            fullWidth
            rowCount={rowCount}
            page={page}
            paginationMode="server"
            pagination
            onPageChange={(page) => {
              setcurretPage(page);
              getDataFilter(page + 1);
              console.log("page = ", page);
            }}
          />
        </div>
      </Paper>
      <DetailDialog
        CustomerID={
          Data.filter((i) => i.CustomerID === SelectedDeskcall?.CustomerID)[0]
            ?.CustomerID
        }
        CustomerName={
          Data.filter((i) => i.CustomerID === SelectedDeskcall?.CustomerID)[0]
            ?.CustomerName
        }
        openDetail={openDetail}
        setOpenDetail={(e) => setOpenDetail(e)}
      />
      <ResponDialog
        CustomerID={
          Data.filter(
            (_data) => _data.CustomerID === SelectedDeskcall?.CustomerID
          )[0]?.CustomerID
        }
        Data={
          Data.filter(
            (_data) => _data.CustomerID === SelectedDeskcall?.CustomerID
          )[0]
        }
        openRespon={openRespon}
        // What this variable means ?
        generateData={() => generateData()}
        // ends
        setOpenRespon={(e) => setOpenRespon(e)}
      />
    </Card>
  );
}
