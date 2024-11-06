import { FileDownload, Refresh } from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import {
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
} from "@mui/material";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import Loader from "../../../components/Loader";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import Header from "./Header";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function MutationAllocatedKuotaTable(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [widthrow, setwidthrow] = useState(440);
  const [RowPageOption, setRowPageOption] = useState([5, 10, 15, 25, 50]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, settotalPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    // branchID: localStorage.getItem("branch") || "",
    branchID: "",
    warehouseID: "",
    date: new Date(),
    inventoryID: "",
    kelompok: "",
  });

  const columns = [
    // {
    //   field: "MutasiKuotaID",
    //   headerName: "Mutation Kuota ID",
    //   width: 300,
    // },
    {
      field: "BranchID",
      headerName: "Branch",
      width: 105,
      sortable: false,
    },
    {
      field: "WarehouseID",
      headerName: "Warehouse ID",
      sortable: false,
      width: 120,
    },
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      sortable: false,
      width: 120,
    },
    {
      field: "Kelompok",
      headerName: "Kelompok",
      sortable: false,
      width: 110,
    },
    {
      field: "InventoryDescription",
      headerName: "Inventory Description",
      sortable: false,
      width: widthrow,
    },
    {
      field: "PurchaseEndSaldo",
      headerName: "Purchase UOM Qty",
      type: "number",
      sortable: false,
      width: 130,
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
      field: "BegSaldo",
      headerName: "Beg Saldo",
      type: "number",
      sortable: false,
      width: 110,
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
      field: "EndSaldo",
      headerName: "End Saldo",
      type: "number",
      sortable: false,
      width: 110,
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
      field: "FromBranchID",
      headerName: "Source Branch",
      width: 105,
      sortable: false,
    },
    {
      field: "FromWarehouseID",
      headerName: "Source Warehouse",
      sortable: false,
      width: 120,
    },
  ];

  async function ImportCsv(ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData;
    var CSV = "";

    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}/GetMutasiKuotaSummaryList?page=1&rowsCount=${totalPage}&isDry=True&isFrozen=True`,
        GetConfig()
      )
      .then(function (response) {
        // handle success
        if (response.status == 200) {
          // console.log("res", response);
          const resdata = response.data[0];
          arrData = resdata.record;
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    //This condition will generate the Label/Header
    if (ShowLabel) {
      console.log("arrData", arrData);
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ";";
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + "\r\n";
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '";';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + "\r\n";
    }

    if (CSV == "") {
      alert("Invalid data");
      return;
    }

    //this trick will generate a temp "a" tag
    // var link = document.createElement("a");
    // link.id = "lnkDwnldLnk";

    //this part will append the anchor tag and remove it after automatic click
    // document.body.appendChild(link);

    var csv = CSV;
    var blob = new Blob([csv], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // FileSaver.saveAs(blob, "excel.xlsx");
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "MutationAllocated.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    // const blob = new Blob([csv], { type: "text/csv" });
    // var csvUrl = window.webkitURL.createObjectURL(blob);
    // var filename = (ReportTitle || "UserExport") + ".csv";
    // $("#lnkDwnldLnk").attr({
    //   download: filename,
    //   href: csvUrl,
    // });

    // $("#lnkDwnldLnk")[0].click();
    // document.body.removeChild(link);
  }

  const getData = async (page) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetMutasiKuotaSummaryList?page=${page}&rowsCount=${pageSize}&branchID=${
            searchParams.branchID
          }&warehouseID=${searchParams.warehouseID}&date=${moment().format(
            "YYYY-MM-DD"
          )}&inventoryID=${searchParams.inventoryID}&kelompok=${
            searchParams.kelompok
          }&isDry=True&isFrozen=True&branch=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status == 200) {
            // console.log("res", response);
            const resdata = response.data[0];
            setData(resdata.record);
            // if (
            //   resdata.record.filter((ae) => ae.InventoryDescription.length > 55)
            //     .length > 0
            // ) {
            //   setwidthrow(790);
            // } else {
            //   setwidthrow(440);
            // }
            let leng = 1;
            resdata.record.map((ae) => {
              if (leng <= ae.InventoryDescription.length) {
                leng = ae.InventoryDescription.length;
              }
              setwidthrow(leng * 8 + 30);
              // console.log(
              //   "ae.InventoryDescription.length",
              //   ae.InventoryDescription.length
              // );
              // console.log("leng", leng);
              // console.log("widhrow", leng * 14);
            });
            // setRowPageOption(
            //   RowPageOption.includes(resdata.totalCountData)
            //     ? RowPageOption
            //     : RowPageOption.concat(resdata.totalCountData)
            // );
            settotalPage(resdata.totalCountData);
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
    setCurrentPage(1);
    getData(1);
    console.log("currnet", currentPage);
  }, [pageSize, searchParams]);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
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
        <Button
          color="primary"
          onClick={() => ImportCsv(true)}
          disableElevation
        >
          <span>
            <FileDownload style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Export CSV
        </Button>
        {/* <GridToolbarExport /> */}
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
                rowsPerPageOptions={RowPageOption}
                rows={data}
                getRowId={(item) => item.MutasiKuotaID}
                columns={columns}
                pageSize={pageSize}
                autoHeight
                components={{
                  Toolbar: CustomToolbar,
                }}
                componentsProps={{
                  GridToolbar: {
                    printOptions: {
                      pageStyle:
                        ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
                    },
                  },
                }}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                checkboxSelection={false}
                selectionModel={props.select?.MutasiKuotaID}
                onSelectionModelChange={(e) => {
                  props.setselect(
                    data.filter((ea) => ea.MutasiKuotaID == e)[0]
                  );
                }}
                // onCellCLick={handleCellClick}
                // onRowCLick={handleRowClick}
                onCellDoubleClick={(params, event) => {
                  // alert("clicked");
                  history(
                    `/mutation-allocated-kuota/detail/${params.row["MutasiKuotaID"]}`
                  );
                }}
                density="compact"
                disableColumnFilter
                disableColumnMenu
                rowCount={totalPage}
                page={currentPage - 1}
                paginationMode="server"
                pagination
                onPageChange={(page) => {
                  setCurrentPage(page + 1);
                  getData(page + 1);
                  console.log("page", page);
                }}
              />
            </div>
          </Paper>
        )}
      </Card>
    </>
  );
}
