import moment from "moment";
import NumberFormat from "react-number-format";

const columnLHIKolektor = [
  {
    field: "isi",
    headerName: "Customer ID",
    width: 100,
    sortable: false,
    renderCell: (params) => <>{params.value[0]?.customerID}</>,
  },
  {
    field: "isi",
    headerName: "Nomor LHI",
    width: 100,
    sortable: false,
    renderCell: (params) => <>{params.value[0]?.nomorLHI}</>,
  },
  {
    field: "isi",
    headerName: "Alamat",
    width: 100,
    sortable: false,
    renderCell: (params) => <>{params.value[0]?.addressLine1}</>,
  },
  // {
  //   field: "TglPenagihan",
  //   headerName: "Tanggal LHI",
  //   width: 110,
  //   sortable: false,
  //   type: "date",
  //   renderCell: (params) =>
  //     params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  // },
  {
    field: "isi",
    headerName: "Nilai Hutang",
    width: 120,
    // type: "number",
    sortable: false,
    renderCell: (params) => (
      <>
        <NumberFormat
          thousandSeparator={true}
          decimalScale={2}
          fixedDecimalScale={true}
          // thousandsGroupStyle="wan"
          value={params.value[0]?.balance}
          displayType={"text"}
        />
      </>
    ),
  },
  {
    field: "isi",
    headerName: "Status",
    width: 120,
    sortable: false,
    renderCell: (params) => <>{params.value[0]?.ketStatusKembali}</>,
  },
  // {
  //   field: "UsrKolektor",
  //   headerName: "Kolektor",
  //   width: 130,
  //   sortable: false,
  // },
  // {
  //   field: "Balance",
  //   headerName: "Hutang",
  //   width: 120,
  //   type: "number",
  //   sortable: false,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         <NumberFormat
  //           thousandSeparator={true}
  //           // thousandsGroupStyle="wan"
  //           value={params.value}
  //           displayType={"text"}
  //         />
  //       </>
  //     );
  //   },
  // },
];

export default columnLHIKolektor;
