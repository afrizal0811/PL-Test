import moment from "moment";
import NumberFormat from "react-number-format";

const columnTambah = [
  {
    field: "kolektorTagih",
    headerName: "Kolektor TG",
    width: 115,
    sortable: false,
  },
  {
    field: "kolektorTT",
    headerName: "Kolektor TT",
    width: 115,
    sortable: false,
  },
  {
    field: "customerID",
    headerName: "Customer",
    width: 210,
    sortable: false,
    renderCell: (params) =>
      params.value ? (
        <p>
          {params.value} - {params.row.customerName}
        </p>
      ) : (
        <></>
      ),
  },
  // {
  //   field: "customerName",
  //   headerName: "Nama Customer",
  //   width: 180,
  //   sortable: false,
  // },
  {
    field: "date",
    headerName: "Tanggal Faktur",
    width: 130,
    sortable: false,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "referenceNbr",
    headerName: "No. Faktur",
    width: 130,
    sortable: false,
  },
  {
    field: "balance",
    headerName: "Hutang",
    width: 120,
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <NumberFormat
            thousandSeparator={true}
            // thousandsGroupStyle="wan"
            value={params.value}
            displayType={"text"}
          />
        </>
      );
    },
  },
];

export default columnTambah;
