import moment from "moment";
import NumberFormat from "react-number-format";

const columnLHIDetail = [
  // {
  //   field: "tglPenagihan",
  //   headerName: "Tanggal LHI",
  //   width: 110,
  //   sortable: false,
  //   type: "date",
  //   renderCell: (params) =>
  //     params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  // },
  // {
  //   field: "nomorLHI",
  //   headerName: "Nomor",
  //   width: 140,
  //   sortable: false,
  // },
  {
    field: "usrKolektor",
    headerName: "Kolektor ID",
    width: 150,
  },
  {
    field: "namaKolektor",
    headerName: "Nama Kolektor",
    width: 200,
  },
  {
    field: "customerID",
    headerName: "Kode Customer",
    width: 200,
  },
  {
    field: "customerName",
    headerName: "Nama Customer",
    width: 200,
  },
  // {
  //   field: "CustomerName",
  //   headerName: "Nama Customer",
  //   width: 150,
  //   sortable: false,
  // },
  {
    field: "tglFaktur",
    headerName: "Tanggal Faktur",
    width: 125,
    type: "date",
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "referenceNbr",
    headerName: "No Invoice",
    width: 150,
  },
  {
    field: "soNo",
    headerName: "No. SO",
    width: 140,
  },
  {
    field: "balance",
    headerName: "Hutang",
    width: 125,
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
  {
    field: "keterangan",
    headerName: "Keterangan",
    width: 130,
  },
  {
    field: "deskCallStatus",
    headerName: "Status Deskcall",
    width: 130,
  },
  {
    field: "statusSebelumnya",
    headerName: "Status Sebelumnya",
    width: 145,
  },
  {
    field: "tglKembali",
    headerName: "Tanggal Kembali",
    type: "date",
    width: 140,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "ketKembali",
    headerName: "Ket TT",
    width: 150,
  },
  {
    field: "tglJatuhTempo",
    headerName: "Tgl Jatuh Tempo",
    type: "date",
    width: 145,
    renderCell: (params) =>
      params.value ? <p>{moment(params.value).format("DD-MM-YYYY")}</p> : <></>,
  },
  {
    field: "ttf",
    headerName: "TTF",
    width: 130,
    renderCell: (params) => <p>{params.value.toString().toUpperCase()}</p>,
  },
  {
    field: "topPrint",
    headerName: "Top Print",
    width: 130,
  },
  {
    field: "addressLine1",
    headerName: "Alamat",
    width: 260,
  },
  {
    field: "custHariTT",
    headerName: "Jadwal Tukar TT",
    width: 260,
  },
  {
    field: "custHariTagih",
    headerName: "Jadwal Tagih",
    width: 260,
  },
  {
    field: "eFakturNbr",
    headerName: "No. Pajak",
    width: 180,
  },
];

export default columnLHIDetail;
