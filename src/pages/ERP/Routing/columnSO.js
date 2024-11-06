import moment from "moment";
import NumberFormat from "react-number-format";

const columnSO = [
  {
    field: "ShippingZone",
    headerName: "Shipping Zone",
    width: 120,
    sortable: false,
  },
  {
    field: "NoSalesOrder",
    headerName: "No.Sales Order",
    width: 110,
    sortable: false,
    // renderCell: (params) => (
    //   <p>
    //     {params.value} - {params.row.VehicleName}
    //   </p>
    // ),
  },
  {
    field: "NoShipment",
    headerName: "No Shipment",
    width: 130,
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
    field: "CustomerName",
    headerName: "Customer Name",
    width: 120,
    sortable: false,
  },
  {
    field: "Address",
    headerName: "Address",
    width: 120,
    sortable: false,
  },
  {
    field: "SODate",
    headerName: "SO Date",
    width: 110,
    sortable: false,
  },
  {
    field: "DeliveryDate",
    headerName: "Delivery Date",
    width: 120,
    sortable: false,
  },
  {
    field: "Weight",
    headerName: "Weight",
    width: 110,
    sortable: false,
  },

  {
    field: "Volume",
    headerName: "Volume",
    width: 110,
    sortable: false,
  },
  {
    field: "CreatedbySO",
    headerName: "Created by SO",
    width: 120,
    sortable: false,
  },
  {
    field: "BatchNbr",
    headerName: "Batch Nbr",
    width: 110,
    sortable: false,
  },
  {
    field: "StatusBatch",
    headerName: "Status Batch",
    width: 120,
    sortable: false,
  },
  {
    field: "POSource",
    headerName: "PO Source",
    width: 120,
    sortable: false,
  },
  {
    field: "NoPurchaseOrder",
    headerName: "No Purchase Order",
    width: 125,
    sortable: false,
  },
];

export default columnSO;
