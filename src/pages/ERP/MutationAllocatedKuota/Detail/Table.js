import { Refresh, Reply } from "@mui/icons-material";
import {
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
} from "@mui/material";
import { spacing } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "../../../../components/Loader";
import { GetConfig } from "../../../../utils/ConfigHeader";
import Header from "./Header";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Table(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [widthrow, setwidthrow] = useState(440);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, settotalPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    fromDate: null,
    toDate: null,
  });

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "branchID",
      headerName: "Branch",
      width: 110,
    },
    {
      field: "date",
      headerName: "Datetime",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss")}</p>
        </>
      ),
    },
    {
      field: "refNbr",
      headerName: "Reference Nbr",
      sortable: false,
      width: 140,
    },
    {
      field: "transaksiType",
      headerName: "Transaction Type",
      sortable: false,
      width: 170,
    },
    {
      field: "warehouseID",
      headerName: "Warehouse ID",
      sortable: false,
      width: 120,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 115,
    },
    {
      field: "inventoryID",
      headerName: "Inventory ID",
      sortable: false,
      width: 110,
    },
    {
      field: "inventoryDescription",
      headerName: "Inventory Description",
      sortable: false,
      width: widthrow,
    },
    {
      field: "uom",
      headerName: "UOM",
      sortable: false,
      width: 90,
    },
    {
      field: "begSaldo",
      headerName: "Beg Saldo",
      sortable: false,
      type: "number",
      width: 100,
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
      field: "in",
      headerName: "In",
      sortable: false,
      type: "number",
      width: 90,
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
      field: "out",
      headerName: "Out",
      sortable: false,
      type: "number",
      width: 90,
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
      field: "endSaldo",
      headerName: "End Saldo",
      sortable: false,
      type: "number",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
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
      field: "purchaseBegSaldo",
      headerName: "Purchase Beg Saldo",
      sortable: false,
      type: "number",
      width: 160,
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
      field: "purchaseIn",
      headerName: "Purchase In",
      sortable: false,
      type: "number",
      width: 120,
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
      field: "purchaseOut",
      headerName: "Purchase Out",
      sortable: false,
      type: "number",
      width: 120,
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
      field: "purchaseEndSaldo",
      headerName: "Purchase End Saldo",
      sortable: false,
      type: "number",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
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
      field: "fromBranchID",
      headerName: "Source Branch",
      width: 130,
      sortable: false,
      // renderCell: (params) => {
      //   return <>{props?.select?.FromBranchID}</>;
      // },
    },
    {
      field: "fromWarehouseID",
      headerName: "Source Warehouse",
      sortable: false,
      width: 130,
      // renderCell: (params) => {
      //   return <>{props?.select?.FromWarehouseID}</>;
      // },
    },
  ];

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetMutasiKuotaDetailByPagination?page=${page}&rowsCount=${pageSize}&mutasiKoutaID=${id}&fromDate=${
            searchParams.fromDate
              ? new Date(searchParams.fromDate).toISOString()
              : ""
          }&toDate=${
            searchParams.toDate
              ? new Date(searchParams.toDate).toISOString()
              : ""
          }`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            console.log("res", response.data[0].record);
            const resdata = response.data[0].record;
            resdata.map((item) => {
              item.Date = new Date(item.Date).toLocaleDateString();
              item.fromBranchID = props?.select?.FromBranchID;
              item.fromWarehouseID = props?.select?.FromWarehouseID;
            });
            setData(resdata);
            // if (
            //   resdata.record.filter((ae) => ae.InventoryDescription.length > 55)
            //     .length > 0
            // ) {
            //   setwidthrow(790);
            // } else {
            //   setwidthrow(440);
            // }
            let leng = 1;
            response.data[0].record.map((ae) => {
              if (leng <= ae?.inventoryDescription?.length) {
                leng = ae?.inventoryDescription?.length;
              }
              setwidthrow(leng * 8 + 30);
            });
            settotalPage(response.data[0].totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(1);
  }, [pageSize, searchParams]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => history(`/mutation-allocated-kuota`)}
          disableElevation
        >
          <span>
            <Reply style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Back
        </Button>
        <Button
          color="primary"
          onClick={() => window.location.reload()}
          disableElevation
        >
          <span>
            <Refresh style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Refresh
        </Button>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Header
        searchParams={searchParams}
        setSearchParams={(val) => setSearchParams(val)}
      />
      <Card mb={6} mt={0}>
        {loading ? (
          <Loader />
        ) : (
          <Paper>
            <div style={{ width: "100%" }}>
              <DataGrid
                sx={{
                  "@media print": {
                    ".MuiDataGrid-main": { color: "rgba(0, 0, 0, 0.87)" },
                  },
                }}
                rowsPerPageOptions={[5, 10, 15, 25]}
                rows={data}
                getRowId={(item) => item.mutasiKuotaDetailID}
                columns={columns}
                pageSize={pageSize}
                disableColumnFilter
                disableColumnMenu
                density="compact"
                autoHeight
                components={{
                  Toolbar: CustomToolbar,
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                checkboxSelection={false}
                onCellCLick={handleCellClick}
                onRowCLick={handleRowClick}
                onCellDoubleClick={(params, event) => {
                  // alert("clicked");
                  // history(
                  //   `/mutation-allocated-kuota/detail/${params.row["MutasiKuotaID"]}`
                  // );
                }}
                rowCount={totalPage}
                page={currentPage}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  setCurrentPage(page);
                  getData(page + 1);
                  // console.log("pa", page);
                }}
              />
            </div>
          </Paper>
        )}
      </Card>
    </>
  );
}
