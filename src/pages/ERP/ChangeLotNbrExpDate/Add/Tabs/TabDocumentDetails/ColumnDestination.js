import { Tooltip, Typography } from "@mui/material";
import moment from "moment";
import NumberFormat from "react-number-format";

const columnsDestination = [
  {
    field: "InventoryID",
    headerName: "Inventory ID",
    width: 115,
    sortable: false,
    renderCell: (params) =>
      !params.row.ToLotNbr ||
      !params.row.ToExpDate ||
      params.row.ToExpDate == "" ||
      params.row.ToLotNbr == "" ? (
        <>
          <Tooltip title="Data Inventory ini belum lengkap">
            <Typography sx={{ color: "red" }}>{params.value}</Typography>
          </Tooltip>
        </>
      ) : (
        <>{params.value}</>
      ),
  },
  {
    field: "InventoryDesc",
    headerName: "Description",
    sortable: false,
    width: 150,
    renderCell: (params) =>
      !params.row.ToLotNbr ||
      !params.row.ToExpDate ||
      params.row.ToExpDate == "" ||
      params.row.ToLotNbr == "" ? (
        <>
          <Tooltip title="Data Inventory ini belum lengkap">
            <Typography sx={{ color: "red" }}>{params.value}</Typography>
          </Tooltip>
        </>
      ) : (
        <>{params.value}</>
      ),
  },
  {
    field: "ToSiteCD",
    headerName: "To Warehouse",
    sortable: false,
    width: 130,
    // editable: true,
  },
  {
    field: "ToLocationID",
    headerName: "To Location",
    sortable: false,
    width: 120,
    // editable: true,
  },
  {
    field: "ToUOM",
    headerName: "To UOM",
    sortable: false,
    width: 100,
    // editable: true,
  },
  {
    field: "ToQty",
    headerName: "To Qty",
    sortable: false,
    width: 100,
    type: "number",
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
    // editable: true,
  },
  {
    field: "ToLotNbr",
    headerName: "To Lot Nbr",
    sortable: false,
    width: 120,
    // editable: true,
  },
  {
    field: "ToExpDate",
    headerName: "To Exp Date",
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <p>
        {params?.value?.length > 0 || params?.value !== "" ? (
          <>{moment(params.value).format("YYYY-MM-DD")}</>
        ) : (
          " "
        )}
      </p>
    ),
    // renderCell: (params) => <p>{moment(params.value).format("YYYY-MM-DD")}</p>,
    // type: "date",
    // editable: true,
  },
  {
    field: "ToReasonCode",
    headerName: "Reason Code",
    width: 120,
    filterable: false,
    sortable: false,
    // editable: true,
  },
];

export default columnsDestination;
