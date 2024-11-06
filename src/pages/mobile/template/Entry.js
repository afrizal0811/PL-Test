import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { GetConfig } from "../../../utils/ConfigHeader";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
  Icon,
  Grid,
  CircularProgress,
  TextField,
  TablePagination,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  PaginationItem,
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import MobileTable from "../../../components/shared/MobileTable";
import MobileTableEntry from "../../../components/shared/MobileTableEntry";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

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
    render: (e) => {
      console.log("product", e);
      return <>product</>;
    },
  },
  {
    field: "qty",
    headerName: "Qty On Hand",
    width: 15,
    minWidth: 100,
    render: (e) => {
      console.log("product", e);
      return <>product</>;
    },
  },
  {
    field: "qtyAvail",
    headerName: "Qty Available",
    width: 15,
    minWidth: 100,
    render: (e) => {
      console.log("product", e);
      return <>product</>;
    },
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
  {
    pallet: "pallet6",
    product: "product6",
    qty: 60,
    qtyAvail: 58,
  },
];

function ListingTabel() {
  const [Data, setData] = useState([]);
  const [location, setlocation] = useState("");
  const [selection, setSelection] = useState(0);
  const [page, setpage] = useState(1);
  const [pallet, setpallet] = useState("");
  const [product, setproduct] = useState("");
  const [qty, setqty] = useState("");
  const [qtyavail, setqtyavail] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();

  const handleChangePage = (event, newPage) => {
    setpage(newPage);
  };

  useEffect(() => {
    setpallet(datadummy[page - 1]?.pallet);
    setproduct(datadummy[page - 1]?.product);
    setqty(datadummy[page - 1]?.qty);
    setqtyavail(datadummy[page - 1]?.qtyAvail);
  }, [page]);

  useEffect(() => {
    // setpallet(datadummy[page - 1]?.pallet);
    // setproduct(datadummy[page - 1]?.product);
    // setqty(datadummy[page - 1]?.qty);
    // setqtyavail(datadummy[page - 1]?.qtyAvail);
    const temp = Data.filter((ae) => ae.pallet !== pallet);
    setData(
      temp.concat({
        pallet: pallet,
        product: product,
        qty: qty,
        qtyAvail: qtyavail,
      })
    );
  }, [product, qty, qtyavail]);

  return (
    <Card mb={6} sx={{ height: "90%" }}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom display="inline">
          Product Entry
        </Typography>
        <Grid container spacing={4} xs={12} my={3}>
          <Grid item xs={12}>
            <TextField
              label="Pallet"
              fullWidth
              disabled
              value={pallet}
              // onChange={(e) => setpallet(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Product"
              fullWidth
              // disabled={Loading}
              value={product}
              onChange={(e) => {
                setproduct(e.target.value);
                setData(Data.filter((ea) => ea.pallet == pallet)[0]);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Qty on Hand"
              fullWidth
              // disabled={Loading}
              value={qty}
              onChange={(e) => setqty(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Qty Available"
              fullWidth
              // disabled={Loading}
              value={qtyavail}
              onChange={(e) => setqtyavail(e.target.value)}
            />
          </Grid>
        </Grid>
        <Pagination
          count={datadummy.length}
          onChange={handleChangePage}
          page={page}
          defaultPage={page}
          siblingCount={1}
          boundaryCount={0}
          renderItem={(item) => (
            <PaginationItem
              components={{
                previous: ArrowBackIcon,
                next: ArrowForwardIcon,
              }}
              {...item}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

function MobileEntry() {
  return (
    <React.Fragment>
      <Helmet title="Inquiry" />

      <Breadcrumbs aria-label="Breadcrumb" mb={3}>
        <Link component={NavLink} to="/mobile">
          Mobile WMS
        </Link>
        <Link component={NavLink} to="/mobile/inquiry2">
          Entry
        </Link>
        <Typography>Entry</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Entry
      </Typography>

      <Divider my={5} />

      <ListingTabel />
    </React.Fragment>
  );
}

export default MobileEntry;
