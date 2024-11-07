import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Autocomplete,
  Box,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Tab,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const columnsPayment = [
  {
    field: "DocType",
    headerName: "Doc Type",
    width: 200,
  },
  {
    field: "ReferenceNbr",
    headerName: "Reference Nbr",
    width: 200,
  },
  {
    field: "AppliedToOrder",
    headerName: "Aplied To Order",
    width: 200,
  },
];

const columnsLocation = [
  {
    field: "LocationID",
    headerName: "Location ID",
    width: 200,
  },
  {
    field: "Description",
    headerName: "Description",
    type: "text",
    width: 200,
  },
];

function Header() {
  const [general, setGeneral] = useState({
    IsAKit: false,
  });
  const [header, setHeader] = useState({
    warehouseID: "...",
    description: "...",
    active: false,
  });
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [stockItem, setStockItem] = useState("");
  const [cbStockItem, setCbStockItem] = useState([]);

  useEffect(() => {
    if (stockItem != "") {
      getData(stockItem.inventoryID);
    } else {
      getData(id);
    }
    getCbStockItem();
  }, [stockItem]);

  const getCbStockItem = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_DOMAIN_API}` +
          "/StockItemReps/DropDown/StockItem",
        GetConfig()
      )
      .then(function (response) {
        // handle success
        // console.log(response);
        if (response.status === 200 || response.status === 201) {
          const resdata = response.data;
          const newres = [];
          Object.keys(resdata).forEach(function (key) {
            newres.push({
              inventoryID: resdata[key].InventoryID,
              description: resdata[key].Description,
            });
          });
          setCbStockItem(newres);
        }
      });
  };

  const getData = async (id) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` + "/StockItemReps/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            axios
              .get(
                `${process.env.REACT_APP_DOMAIN_API}` +
                  "/StockItemReps/DropDown/StockItem"
              )
              .then(function (responsedep) {
                Object.keys(responsedep.data).forEach(function (key) {
                  if (stockItem === "") {
                    if (
                      responsedep.data[key].InventoryID == resdata.InventoryID
                    ) {
                      setStockItem({
                        inventoryID: responsedep.data[key].InventoryID,
                        description: responsedep.data[key].Description,
                      });
                    }
                  }
                });
              });
            setGeneral({
              ItemClass: "",
              ItemType: "",
              IsAKit: false,
              TaxCategory: "",
              ValuationMethod: "",
              PostingClass: "",
              LotSerialClass: "",
              DefaultWarehouseID: "",
              DefaultIssueLocationID: "",
              DefaultReceiptLocationID: "",
              BaseUOM: "",
              SalesUOM: "",
              PurchaseUOM: "",
              Group: "",
              Principal: "",
              Kelompok: "",
              F1Pallet: "",
            });
            // console.log(resdata);
            setHeader({
              inventory: resdata.InventoryID,
              description: resdata.Description,
              active: resdata.ItemStatus,
              itemClass: resdata.ItemClass,
            });
            setGeneral(resdata);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Header
        </Typography>
        <Typography variant="body2" gutterBottom mt={3}>
          Detail Stock Item
        </Typography>
        <Grid container spacing={6} md={8} mt={3}>
          <Grid item md={6} xs={6}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              value={stockItem}
              onChange={(event, newValue) => {
                setStockItem(newValue);
                // console.log(newValue);
              }}
              options={cbStockItem}
              getOptionLabel={(option) =>
                option.inventoryID + " - " + option.description
              }
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.inventoryID} - {option.description}
                </Box>
              )}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  my={2}
                  label="Inventory ID"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
            {/* <TextField
              name="inventory"
              label="Inventory ID"
              value={header.inventory}
              fullWidth
              variant="outlined"
              disabled={true}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="description"
              label="Description"
              value={header.description}
              fullWidth
              variant="outlined"
              disabled={true}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="active"
              label="Item Status"
              value={header.active}
              fullWidth
              variant="outlined"
              disabled={true}
              my={2}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <div style={{ border: "1px solid #0078d2", margin: "14px", flexGrow: 1 }}>
        <TabContext value={value}>
          <AppBar
            position="static"
            style={{ background: "#0078d2", color: "white" }}
          >
            <TabList
              onChange={handleChange}
              aria-label="simple tabs example"
              style={{ color: "white" }}
            >
              <Tab
                label="General"
                value="1"
                style={{ color: value == 1 ? "white" : "#a7d2f0" }}
              />
              {/* <Tab
                label="GL Account"
                value="2"
                style={{ color: value == 2 ? "white" : "#a7d2f0" }}
              />
              <Tab
                label="Address"
                value="3"
                style={{ color: value == 3 ? "white" : "#a7d2f0" }}
              /> */}
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <Grid container spacing={1} md={12}>
              <Grid item md={8}>
                <Grid container spacing={3} md={12}>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Item Default</h1>
                    </u>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="itemClass"
                      label="Item Class"
                      value={general.ItemClass}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="itemType"
                      label="Item Type"
                      value={general.ItemType}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={general.IsAKit} name="gilad" />
                      }
                      label="Is a Kit"
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="valuationMethod"
                      label="Valuation Method"
                      value={general.ValuationMethod}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="taxCategory"
                      label="Tax Category"
                      value={general.TaxCategory}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="postingClass"
                      label="posting Class"
                      value={general.PostingClass}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="lot/serialclass"
                      label="Lot/Serial Class"
                      value={general.LotSerialClass}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Warehouse Defaults</h1>
                    </u>
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="defaultWarehouse"
                      label="Default Warehouse"
                      value={general.DefaultWarehouseID}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="defaultIssueFrom"
                      label="Default Issue From"
                      value={general.DefaultIssueLocationID}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={6}>
                    <TextField
                      name="defaultReceiptTo"
                      label="Default Receipt To"
                      value={general.DefaultReceiptLocationID}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container spacing={3} md={12}>
                  <Grid item md={12} xs={12}>
                    <u>
                      <h1>Unit Of Measure</h1>
                    </u>
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="baseUnit"
                      label="Base Unit"
                      value={general.BaseUOM}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="salesUnit"
                      label="Sales Unit"
                      value={general.SalesUOM}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={6}>
                    <TextField
                      name="purchaseUnit"
                      label="Purchase Unit"
                      value={general.PurchaseUOM}
                      fullWidth
                      variant="outlined"
                      disabled={true}
                      my={2}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          {/* <TabPanel value="2">
            <Paper></Paper>
          </TabPanel>
          <TabPanel value="3">
            <Paper></Paper>
          </TabPanel> */}
        </TabContext>
      </div>
    </Card>
  );
}

function DetailStockItem() {
  return (
    <React.Fragment>
      <Helmet title="Detail Stock Item" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Stock Item
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/stock-item">
          Stock Item
        </Link>
        <Typography>Detail Stock Item</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}

export default DetailStockItem;
