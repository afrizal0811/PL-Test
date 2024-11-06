import { spacing } from "@material-ui/system";
import { Grid, Card as MuiCard, Paper as MuiPaper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function FakturTabel(props) {
  React.useEffect(() => {
    if (!!props.DataFaktur[0]) {
      props.setFaktur(props.DataFaktur[0]);
    } else {
      props.setFaktur("");
    }
  }, [props.DataFaktur]);
  const [Faktur, setFaktur] = React.useState({});

  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: "refNbr",
      headerName: "No Faktur",
      width: 130,
      sortable: false,
    },
    {
      field: "noSo",
      headerName: "No. So",
      width: 130,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Tanggal Faktur",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        return <>{moment(params.value).format("DD-MM-YYYY")}</>;
      },
    },
    {
      field: "curyOrigDocAmt",
      headerName: "Nilai Faktur",
      sortable: false,
      width: 115,
      type: "number",
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={params.value}
            />
          </>
        );
      },
    },
    {
      field: "curyDocBal",
      headerName: "Nilai Hutang",
      sortable: false,
      type: "number",
      width: 115,
      renderCell: (params) => {
        return (
          <>
            <NumberFormat
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              // thousandsGroupStyle="wan"
              displayType={"text"}
              value={params.value}
            />
          </>
        );
      },
    },
    {
      field: "topPrint",
      headerName: "TOP Print",
      sortable: false,
      width: 90,
    },
    {
      field: "dueDate",
      headerName: "Tgl JT",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        if (params?.value?.length > 0) {
          return <>{moment(params.value).format("DD-MM-YYYY HH:mm:ss")}</>;
        } else {
          return "";
        }
      },
    },
    {
      field: "dcKategori",
      headerName: "Kategori",
      sortable: false,
      width: 90,
    },
    {
      field: "posisiFaktur",
      headerName: "Posisi Faktur",
      sortable: false,
      width: 150,
      // renderCell: (params) => {
      //   if (params.value != null) {
      //     return <>{moment(params.value).format("DD-MM-YYYY HH:mm:ss")}</>;
      //   } else {
      //     return "";
      //   }
      // },
    },
    {
      field: "tglKembali",
      headerName: "Tanggal LHI",
      sortable: false,
      width: 110,
      renderCell: (params) => {
        if (params.value !== null) {
          return <>{moment(params.value).format("DD-MM-YYYY")}</>;
        } else {
          return "";
        }
      },
    },
    {
      field: "ketKembali",
      headerName: "Ket LHI",
      sortable: false,
      width: 140,
    },
    {
      field: "ketStatusKembali",
      headerName: "Status di LHI",
      sortable: false,
      width: 140,
    },
    {
      field: "salesPersonID_SalesPerson_descr",
      headerName: "Salesperson",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <p>
          {params.row.salesPersonID} - {params.value}
        </p>
      ),
    },
  ];

  return (
    <Card mb={2} mt={0}>
      <Grid container>
        <div style={{ height: 200, width: "100%" }}>
          <DataGrid
            getRowId={(row) => row.refNbr}
            // rowsPerPageOptions={[5, 10, 25]}
            rows={props.DataFaktur}
            columns={columns}
            density="compact"
            hideFooter
            disableColumnFilter
            disableColumnSelector
            disableColumnMenu
            selectionModel={props?.Faktur[0]}
            onSelectionModelChange={(e) => {
              props.setFaktur(
                props.DataFaktur.filter((i) => e.includes(i.refNbr))[0]
              );
            }}
            fullWidth
            // pageSize={5}
            // checkboxSelection
            // onCellCLick={handleCellClick}
            // onRowCLick={handleRowClick}
          />
        </div>
      </Grid>
    </Card>
  );
}
