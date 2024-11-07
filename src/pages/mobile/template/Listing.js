import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  // Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import MobileTable from "../../../components/shared/MobileTable";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

// const Paper = styled(MuiPaper)(spacing);

const columns = [
  // {
  //   field: "pallet",
  //   headerName: "Pallet",
  //   flex: 1,
  //   minWidth: 100,
  // },
  {
    field: "product",
    headerName: "Product",
    width: 115,
    minWidth: 100,
  },
  {
    field: "qty",
    headerName: "Qty On Hand",
    width: 15,
    minWidth: 100,
  },
  {
    field: "qtyAvail",
    headerName: "Qty Available",
    width: 15,
    minWidth: 100,
  },
];

const datadummy = [
  {
    pallet: "pallet1",
    product: "product1",
    qty: 10,
    qtyAvail: 8,
  },
  {
    pallet: "pallet2",
    product: "product2",
    qty: 20,
    qtyAvail: 18,
  },
  {
    pallet: "pallet3",
    product: "product3",
    qty: 30,
    qtyAvail: 28,
  },
  {
    pallet: "pallet4",
    product: "product4",
    qty: 40,
    qtyAvail: 38,
  },
  {
    pallet: "pallet5",
    product: "product5",
    qty: 50,
    qtyAvail: 48,
  },
];

function ListingTabel() {
  // const [warehouse, setwarehouse] = useState("");
  // const [location, setlocation] = useState("");
  // const [selection, setSelection] = useState(0);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [pageSize, setPageSize] = useState(5);
  // const history = useNavigate();

  return (
    <Card mb={6} sx={{ height: "90%" }}>
      <CardContent>
        <MobileTable
          data={datadummy}
          rowDetail={columns}
          label={"Product Inquiry"}
          id={"pallet"}
          totaldata={datadummy.length}
          page={0}
        />
      </CardContent>
    </Card>
  );
}

function MobileListing() {
  return (
    <React.Fragment>
      <Helmet title="Inquiry" />

      <Breadcrumbs aria-label="Breadcrumb" mb={3}>
        <Link component={NavLink} to="/mobile">
          Mobile WMS
        </Link>
        <Link component={NavLink} to="/mobile/inquiry2">
          Inquiry
        </Link>
        <Typography>Listing</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Listing
      </Typography>

      <Divider my={5} />

      <ListingTabel />
    </React.Fragment>
  );
}

export default MobileListing;
