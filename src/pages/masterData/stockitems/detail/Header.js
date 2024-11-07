import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  AppBar,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
  Tab,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";
import TabGeneral from "./General";
import RefnbrPopup from "./Refnbrpopup";

const TextField = styled(MuiTextField)(spacing);

export default function Header() {
  const [stockItem, setStockItem] = useState("");
  const [description, setdescription] = useState("");
  const [active, setactive] = useState(false);
  const [ItemClass, setitemClass] = useState("");
  const [ItemType, setItemType] = useState("");
  const [IsAKit, setIsAKit] = useState("");
  const [TaxCategory, setTaxCategory] = useState("");
  const [ValuationMethod, setValuationMethod] = useState("");
  const [PostingClass, setPostingClass] = useState("");
  const [LotSerialClass, setLotSerialClass] = useState("");
  const [DefaultWarehouseID, setDefaultWarehouseID] = useState("");
  const [DefaultIssueLocationID, setDefaultIssueLocationID] = useState("");
  const [DefaultReceiptLocationID, setDefaultReceiptLocationID] = useState("");
  const [BaseUOM, setBaseUOM] = useState("");
  const [SalesUOM, setSalesUOM] = useState("");
  const [PurchaseUOM, setPurchaseUOM] = useState("");
  const [Group, setGroup] = useState("");
  const [Principal, setPrincipal] = useState("");
  const [Kelompok, setKelompok] = useState("");
  const [F1Pallet, setF1Pallet] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [value, setValue] = React.useState("1");
  const [openRefnbr, setopenRefnbr] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const columnRefnbr = [
    {
      field: "InventoryID",
      headerName: "Inventory ID",
      width: 200,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 200,
    },
    {
      field: "ItemStatus",
      headerName: "Item Status",
      width: 200,
    },
    {
      field: "ItemClass",
      headerName: "Item Class",
      width: 200,
    },
    {
      field: "PostingClass",
      headerName: "Posting Class",
      width: 200,
    },
  ];

  useEffect(() => {
    getData(id);
  }, []);

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
            setStockItem([resdata.InventoryID]);
            setdescription(resdata.Description);
            setactive(resdata.ItemStatus);
            setitemClass(resdata.ItemClass);
            setItemType(resdata.ItemType);
            setIsAKit(resdata.IsAKit);
            setTaxCategory(resdata.TaxCategory);
            setValuationMethod(resdata.ValuationMethod);
            setPostingClass(resdata.PostingClass);
            setLotSerialClass(resdata.LotSerialClass);
            setDefaultWarehouseID(resdata.DefaultWarehouseID);
            setDefaultIssueLocationID(resdata.DefaultIssueLocationID);
            setDefaultReceiptLocationID(resdata.DefaultReceiptLocationID);
            setBaseUOM(resdata.BaseUOM);
            setSalesUOM(resdata.SalesUOM);
            setPurchaseUOM(resdata.PurchaseUOM);
            setGroup(resdata.Group);
            setPrincipal(resdata.Principal);
            setKelompok(resdata.Kelompok);
            setF1Pallet(resdata.F1Pallet);
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
            {/* <CbData
              label={"Inventory ID"}
              source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem`}
              id={"inventoryID"}
              desc={"description"}
              value={stockItem}
              onChange={(newValue) => {
                setStockItem(newValue);
                getData(newValue);
                // console.log(newValue);
              }}
            /> */}
            <TextField
              label="Inventory ID"
              value={id ? id : " "}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // value={RefNbr}
              // onChange={(newValue) => {
              //   setRefNbr(RefNbr);
              // }}
              onClick={() => setopenRefnbr(true)}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="description"
              label="Description"
              value={!description || description === "" ? " " : description}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <TextField
              name="active"
              label="Item Status"
              value={!active || active === "" ? " " : active}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
                readOnly: true,
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
                style={{ color: value === 1 ? "white" : "#a7d2f0" }}
              />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <TabGeneral
              ItemClass={ItemClass}
              ItemType={ItemType}
              IsAKit={IsAKit}
              TaxCategory={TaxCategory}
              ValuationMethod={ValuationMethod}
              PostingClass={PostingClass}
              LotSerialClass={LotSerialClass}
              DefaultWarehouseID={DefaultWarehouseID}
              DefaultIssueLocationID={DefaultIssueLocationID}
              DefaultReceiptLocationID={DefaultReceiptLocationID}
              BaseUOM={BaseUOM}
              SalesUOM={SalesUOM}
              PurchaseUOM={PurchaseUOM}
              Group={Group}
              Principal={Principal}
              Kelompok={Kelompok}
              F1Pallet={F1Pallet}
            />
          </TabPanel>
        </TabContext>
      </div>
      <RefnbrPopup
        open={openRefnbr}
        setopen={(e) => {
          setopenRefnbr(e);
        }}
        label={"Stock Item"}
        id={"InventoryID"}
        column={columnRefnbr}
        api={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps`}
      />
    </Card>
  );
}
