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
} from "@material-ui/core";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import MobileTable from "../../../components/shared/MobileTable";

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
  const [warehouse, setwarehouse] = useState("");
  const [location, setlocation] = useState("");
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const history = useNavigate();

  useEffect(() => {
    if (warehouse.length > 0 && location.length > 0) {
      setData(datadummy);
    } else {
      setData([]);
    }
  }, [warehouse, location]);

  return (
    <Card mb={6} sx={{ height: "90%" }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Warehouse Code"
              fullWidth
              // disabled={Loading}
              value={warehouse}
              onChange={(e) => setwarehouse(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location Code"
              fullWidth
              // disabled={Loading}
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            />
          </Grid>
        </Grid>
        <Divider my={3} />
        <MobileTable
          data={data}
          rowDetail={columns}
          label={"Product Inquiry"}
          id={"pallet"}
          totaldata={data.length}
          page={0}
        />
      </CardContent>
      {/* <Paper>
        <div
          style={{
            height: 400,
            width: "100%",
            padding: "0px",
            margin: 0,
          }}
        >
          <DataGrid
            rowsPerPageOptions={[5, 10, 25]}
            rows={data}
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            selectionModel={selection}
            onSelectionModelChange={(selection) => {
              setSelection(selection);
              console.log(data[selection[0]]);
            }}
            onCellClick={(params, event) => {
              // console.log(params.row["customer"]);
              // history(`/master-data/branch/${params.row["BranchID"]}`);
            }}
          />
        </div>
      </Paper> */}
    </Card>
  );
}

function MobileInquiry() {
  return (
    <React.Fragment>
      <Helmet title="Inquiry" />

      <Breadcrumbs aria-label="Breadcrumb" mb={3}>
        <Link component={NavLink} to="/mobile">
          Mobile WMS
        </Link>
        <Typography>Inquiry</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        Inquiry
      </Typography>

      <Divider my={5} />

      <ListingTabel />
    </React.Fragment>
  );
}

export default MobileInquiry;
