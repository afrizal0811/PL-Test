import Button from "@material-ui/core/Button";
import { spacing } from "@material-ui/system";
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

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

  // useEffect(() => {
  //   if (warehouse.length > 0 && location.length > 0) {
  //     setData(datadummy);
  //   } else {
  //     setData([]);
  //   }
  // }, [warehouse, location]);

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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="medium"
              disabled={warehouse == "" || location == ""}
              onClick={(e) => history(`/mobile/listing`)}
            >
              Inquiry
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              size="medium"
              disabled={warehouse == "" || location == ""}
              onClick={(e) => history(`/mobile/entry`)}
            >
              Entry
            </Button>
          </Grid>
        </Grid>
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

function MobileInquiry2() {
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

export default MobileInquiry2;
