import moment from "moment";
import NumberFormat from "react-number-format";

const columnLHI = [
  {
    field: "nomerLHI",
    headerName: "Nomor",
    width: 135,
  },
  {
    field: "branchID",
    headerName: "Branch",
    width: 110,
  },
  {
    field: "usrAdminPiutang",
    headerName: "Admin Piutang",
    width: 130,
  },
  {
    field: "tglPenagihan",
    headerName: "Tanggal LHI",
    width: 110,
    type: "date",
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "ketStatusKembali",
    headerName: "Status",
    width: 120,
  },
  {
    field: "usrKolektor",
    headerName: "Kolektor",
    width: 160,
    renderCell: (params) =>
      params.value ? (
        <p>
          {params.value} - {params.row.namaKolektor}
        </p>
      ) : (
        <></>
      ),
  },
  {
    field: "balance",
    headerName: "Hutang",
    width: 120,
    type: "number",
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

export default columnLHI;
