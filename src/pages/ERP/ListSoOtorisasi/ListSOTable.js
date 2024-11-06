import React, { useState } from "react";
// import DetailDialog from "./Dialogs/DetailDialog";
// import ResponDialog from "./Dialogs/ResponDialog";
import styled from "styled-components/macro";
import {
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  CardContent,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { spacing } from "@material-ui/system";
import axios from "axios";
import { set } from "date-fns";
import moment from "moment";
import { getBrach } from "../../../utils/jwt";
import NumberFormat from "react-number-format";
import { GetConfig } from "../../../utils/ConfigHeader";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

const columns = [
  {
    field: "TipeSO",
    headerName: "Tipe SO",
    width: 90,
    sortable: false,
    filterable: false,
  },
  {
    field: "CustomerID",
    headerName: "CustomerID",
    width: 110,
    sortable: false,
    filterable: false,
  },
  {
    field: "CustomerID_desc",
    headerName: "Nama Customer",
    width: 240,
    sortable: false,
    filterable: false,
  },
  {
    field: "LastOtorisasi",
    headerName: "Otorisasi Akhir",
    width: 140,
    sortable: false,
    filterable: false,
  },
  {
    field: "JumlahSO",
    headerName: "FT",
    width: 70,
    sortable: false,
    filterable: false,
  },
  {
    field: "OrderDate",
    headerName: "Tanggal SO",
    width: 110,
    sortable: false,
    filterable: false,
    renderCell: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  {
    field: "NilaiSO",
    headerName: "Nilai SO",
    width: 150,
    type: "number",
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "RencanaPiutang",
    headerName: "Rencana Piutang",
    type: "number",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            displayType={"text"}
            decimalScale={2}
            fixedDecimalScale={true}
            value={params.value}
          />
        </>
      );
    },
  },
  {
    field: "Overdue",
    headerName: "Overdue",
    type: "number",
    width: 90,
    sortable: false,
    filterable: false,
  },
  {
    field: "LevelApproval",
    headerName: "Level Approval",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "StatusSO",
    headerName: "Status SO",
    width: 130,
    sortable: false,
    filterable: false,
  },
  {
    field: "UsrAdminPiutang",
    headerName: "Admin Piutang",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "StatusOtorisasi",
    headerName: "Status Otorisasi",
    width: 150,
    sortable: false,
    filterable: false,
  },
  {
    field: "KetOtorisasi",
    headerName: "Ket. Otorisasi",
    sortable: false,
    filterable: false,
    width: 200,
    renderCell: (params) => {
      return <>{params.value == "undefined" ? " " : params.value}</>;
    },
  },
  {
    field: "NoPengajuan",
    headerName: "ID Oto",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "TglPengajuan",
    headerName: "Tgl Pengajuan",
    sortable: false,
    filterable: false,
    width: 110,
    renderCell: (params) => {
      return (
        <>{!!params.value ? moment(params.value).format("DD-MM-YYYY") : ""}</>
      );
    },
  },
  {
    field: "TglDijawab",
    headerName: "Tgl Dijawab",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "DaftarFaktur",
    headerName: "Daftar SO",
    sortable: false,
    filterable: false,
    width: 240,
    renderCell: (params) => (
      <>
        {!!params.value && params.value.length > 26 ? (
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
    field: "TglTT",
    headerName: "Tgl TT",
    sortable: false,
    filterable: false,
    width: 150,
  },
  {
    field: "PernahReject",
    headerName: "Pernah Reject",
    sortable: false,
    filterable: false,
    width: 130,
  },
  {
    field: "Storage",
    headerName: "Storage",
    width: 90,
    sortable: false,
    filterable: false,
  },
  // {
  //   field: "lastSync",
  //   headerName: "Last Sync",
  //   width: 200,
  // },
];

export default function ListSOTable(props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [SelectedSO, setSelectedSO] = useState({});
  const [Data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [totaldata, settotaldata] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  // const [SelectedRows, setSelectedRows] = useState([]);

  const getData = async (page) => {
    try {
      setLoading(true);
      const res = await axios
        //filter branch masih kosong
        .get(
          // `${process.env.REACT_APP_DOMAIN_API}` +
          //   `/ListSOOtorisasi?page=${page}&rowsCount=5&start=${moment(
          //     props.StartDate
          //   ).format("YYYY-MM-DD")}&end=${moment(props.EndDate).format(
          //     "YYYY-MM-DD"
          //   )}&adminPiutang=${props.AdminPiutang}&statusApproval=${
          //     props.StatusSO == "Semua" || props.StatusSO == null
          //       ? ""
          //       : props.StatusSO
          //   }&statusFaktur=${
          //     props.StatusOto == null ? "" : props.StatusOto
          //   }&termasuk0=${props.Termasuk0}&pernahReject=${props.PernahReject}`
          `${
            process.env.REACT_APP_DOMAIN_API
          }/ListSOOtorisasi?page=${page}&rowsCount=${pageSize}&customerID=${
            props.CustomerID
          }&start=${moment(props.StartDate).format("YYYY-MM-DD")}&end=${moment(
            props.EndDate
          ).format("YYYY-MM-DD")}&adminPiutang=${
            props.AdminPiutang
          }&statusApproval=${
            props.StatusSO == "Semua" || props.StatusSO == null
              ? ""
              : props.StatusSO
          }&statusFaktur=${
            props.StatusOto == null ? "" : props.StatusOto
          }&termasuk0=${props.Termasuk0}&pernahReject=${
            props.PernahReject
          }&tipeSO=${
            props.TipeSO == "ALL" || props.TipeSO == null ? "" : props.TipeSO
          }&storage=${
            props.Storage == "ALL" || props.Storage == null ? "" : props.Storage
          }&nomorSO=${props.NoSO}&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            // if (totaldata != response.data[0].totalCountData) {
            //   props.setSelectedObj([]);
            //   props.setSelectionModel([]);
            //   props.setSelectedRows([]);
            // }
            const resdata = response.data[0];
            console.log("res", resdata);
            setData(resdata.record);
            props.setSelectedSO(
              []
              // resdata.record.filter((e) => e.StatusSO == "Diajukan")
            );
            settotaldata(resdata.totalCountData);
            // props.setData(resdata.record);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getData(1);
    setcurrentPage(1);
  }, [
    props.StartDate,
    props.EndDate,
    props.AdminPiutang,
    props.StatusSO,
    props.StatusOto,
    props.TipeSO,
    props.Storage,
    props.Termasuk0,
    props.PernahReject,
    props.PernahReject,
    props.getData,
    props.CustomerID,
    props.NoSO,
    pageSize,
  ]);

  return (
    <Card mb={6} mt={0}>
      <Paper>
        <div style={{ width: "100%" }}>
          <DataGrid
            rows={Data}
            ml={6}
            mr={6}
            getRowId={(row) => row.IDListSOOtorisasi}
            columns={columns}
            disableColumnMenu
            rowCount={totaldata}
            editMode="row"
            density="compact"
            onPageSizeChange={(e) => {
              // console.log("eae", e);
              setPageSize(e);
            }}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            // disableSelectionOnClick
            selectionModel={props.SelectedSO.map((a) => a.IDListSOOtorisasi)}
            onSelectionModelChange={(e) => {
              props.setSelectedSO(
                Data.filter((i) => e.includes(i.IDListSOOtorisasi))
              );
            }}
            // selectionModel={props.selectedRows}
            // onSelectionModelChange={(e) => {
            //   //setSelectedRows(e);
            //   // refdata.current.setRowMode(e.map(e), "edit");
            //   props.setSelectionModel(e);
            //   const unselectedIDs = new Set(e);
            //   const selectedIDs = new Set(e);
            //   const unselectedModel = Data.filter(
            //     (item) => !unselectedIDs.has(item.IDListSOOtorisasi)
            //   );
            //   const selectedModel = Data.filter((item) =>
            //     selectedIDs.has(item.IDListSOOtorisasi)
            //   );
            //   console.log("unselect:", unselectedModel);
            //   if (props.selectedObj.length == 0) {
            //     props.setSelectedObj(selectedModel);
            //   }
            //   selectedModel.map((select) => {
            //     if (
            //       !props.selectedObj.some(
            //         (item) => item.IDListSOOtorisasi == select.IDListSOOtorisasi
            //       )
            //     ) {
            //       props.setSelectedObj(props.selectedObj.concat(select));
            //     }
            //   });
            //   unselectedModel.map((unselect) => {
            //     if (
            //       props.selectedObj.some(
            //         (item) =>
            //           item.IDListSOOtorisasi == unselect.IDListSOOtorisasi
            //       )
            //     ) {
            //       props.setSelectedObj(
            //         props.selectedObj.filter(
            //           (obj) =>
            //             obj.IDListSOOtorisasi != unselect.IDListSOOtorisasi
            //         )
            //       );
            //     }
            //   });
            //   // const selectedModel = selectedRows.map((item) => {});
            //   // setSelectedObj(selectedRows);
            // }}
            paginationMode="server"
            pagination
            page={currentPage - 1}
            onPageChange={(page) => {
              getData(page + 1);
              setcurrentPage(page + 1);
              console.log("page = ", page);
            }}
          />
        </div>
        {/* <div>{props.selectedObj.length + " rows selected"}</div> */}
      </Paper>
    </Card>
  );
}
