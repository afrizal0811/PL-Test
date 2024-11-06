import moment from "moment";
import NumberFormat from "react-number-format";

const columnRouting = [
  {
    field: "RefNbrRouting",
    headerName: "Ref.Nbr Routing",
    width: 125,
    sortable: false,
  },
  {
    field: "VehicleID",
    headerName: "Vehicle ID",
    width: 100,
    sortable: false,
    // renderCell: (params) => (
    //   <p>
    //     {params.value} - {params.row.VehicleName}
    //   </p>
    // ),
  },
  {
    field: "VehicleName",
    headerName: "Vehicle Name",
    width: 130,
    sortable: false,
  },
  {
    field: "NoPolisi",
    headerName: "No Polisi",
    width: 100,
    sortable: false,
  },
  {
    field: "DriverName",
    headerName: "Driver Name",
    width: 120,
    sortable: false,
  },
  {
    field: "HelperName",
    headerName: "Helper Name",
    width: 120,
    sortable: false,
  },
  {
    field: "ShippingZone",
    headerName: "Shipping Zone",
    width: 125,
    sortable: false,
  },
  {
    field: "TotalSO",
    headerName: "Total SO",
    width: 110,
    sortable: false,
  },
  {
    field: "QtyDelivWhole",
    headerName: "Qty Deliv. Whole(CTN)",
    width: 120,
    sortable: false,
  },
  {
    field: "QtyDelivLoose",
    headerName: "Qty Deliv. Loose(PAK)",
    width: 120,
    sortable: false,
  },
  {
    field: "PlanWeight",
    headerName: "Plan Weight",
    width: 115,
    sortable: false,
  },
  {
    field: "PlanVolume",
    headerName: "Plan Volume",
    width: 115,
    sortable: false,
  },
  {
    field: "ActualWeight",
    headerName: "Actual Weight",
    width: 115,
    sortable: false,
  },
  {
    field: "ActualVolume",
    headerName: "Actual Volume",
    width: 115,
    sortable: false,
  },
  {
    field: "ActualUtilWeight",
    headerName: "Actual Util Weight",
    width: 125,
    sortable: false,
  },
  {
    field: "ActualUtilVolume",
    headerName: "Actual Util Volume",
    width: 125,
    sortable: false,
  },
  {
    field: "DispatchDate",
    headerName: "Dispatch Date",
    width: 120,
    sortable: false,
  },
  {
    field: "BatchNbr",
    headerName: "Batch Nbr",
    width: 110,
    sortable: false,
  },
];

export default columnRouting;
