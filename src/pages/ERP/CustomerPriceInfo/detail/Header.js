import React, { useEffect, useState } from "react";
import Detail from "./Detail";
import styled from "styled-components/macro";
import QrCodeScannerIcon from "@material-ui/icons/QrCodeScanner";
import { Search } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card as MuiCard,
  CardContent,
  Grid,
  TextField as MuiTextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { DatePicker } from "@material-ui/lab";
import moment from "moment";
import axios from "axios";
import PromoPopup from "./PromoPopup";
import ItemPopup from "./ItemPopup";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";
import Refresh from "@material-ui/icons/Refresh";
import Add from "@material-ui/icons/Add";
import Reply from "@material-ui/icons/Reply";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import Swal from "sweetalert2";
import NumberFormat from "react-number-format";
import CustomerPopup from "../../promoActivity/detail/CustomerPopup";
import QrBarcodeScanner from "../../../../components/QrBarcodeScanner";

const Card = styled(MuiCard)(spacing);
const TextField = styled(MuiTextField)(spacing);

function Header() {
  const { id } = useParams();
  const history = useNavigate();

  const [openItem, setOpenItem] = useState(false);
  const [RefNbr, setRefNbr] = useState("");
  const [BranchName, setBranchName] = useState(
    getBrach() + " - PL " + getBrach()
  );
  const [Item, setItem] = useState("");
  const [CRPrice, setCRPrice] = useState("");
  const [CRPriceInfoDate, setCRPriceInfoDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [Location, setLocation] = useState("");
  const [imgData, setImgData] = useState([]);
  const [Files, setFiles] = useState([]);
  const [TempProduct, setTempProduct] = React.useState("");
  const [Loading, setLoading] = useState(false);

  //state Promo ID
  const [openPromo, setOpenPromo] = React.useState(false);
  const [TempPromoID, setTempPromoID] = React.useState("");

  //state Customer ID
  const [openCust, setOpenCust] = React.useState(false);
  const [TempCustomer, setTempCustomer] = React.useState("");

  const [openScanner, setOpenScanner] = useState(false);

  useEffect(() => {
    if (id) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/CustomerPrice/Delete/" +
            id +
            "/SAC300005",
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            setTimeout(() => {
              window.location.href = `/customer-price-info`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan Hapus Data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const getData = async () => {
    try {
      await axios
        .get(
          process.env.REACT_APP_DOMAIN_API_BARU + "/CustomerPrice/" + id,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            console.log("ini resdata => ", resdata);
            console.log("ini resdata.branchID => ", resdata.branchID);
            console.log(
              "ini resdata.inventoryID_Desc => ",
              resdata.inventoryID_Desc
            );
            console.log("ini Item => ", Item.promoFile);
            console.log("ini branchID => ", resdata.branchID);
            console.log("ini branchID => ", resdata.branchID);
            console.log("ini branchID => ", resdata.branchID);
            setRefNbr(resdata.refNbr);
            setCRPriceInfoDate(resdata.crPriceInfoDate);
            setCRPrice(resdata.crPrice);
            setBranchName(resdata.branchID + " - " + resdata.branchName);
            setTempCustomer({
              customerID: resdata.customerID,
              customerName: resdata.customerName,
            });
            setLocation({
              id: resdata.locationLineID,
              text: resdata.locationID + " - " + resdata.locationName,
            });
            setItem({
              inventoryID: resdata.inventoryID,
              description: resdata.inventoryID_Desc,
            });
            // setImgData(resdata.pictCust);
            let arrimg = resdata.imageBase64.split(",data:image/");
            let filtered = arrimg.filter(function (el) {
              return el !== "";
            });
            let add = filtered.map((item) => "data:image/" + item);
            console.log("filtered image", filtered);
            setImgData(add);
            setFiles(resdata.pictCust);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const createData = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      await axios
        .post(
          process.env.REACT_APP_DOMAIN_API_BARU + "/CustomerPrice/Add",
          formData,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              window.location.href = `/customer-price-info/detail/${response.data.refNbr}`;
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const editData = async (formData) => {
    setLoading(true);
    try {
      console.log(formData);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/CustomerPrice/Update/" +
            id,
          formData,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Dirubah");
            setTimeout(() => {
              window.location.href = `/customer-price-info/detail/${id}`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const notifySave = async () => {
    Swal.fire({
      title: "Apakah Anda yakin menyimpan data ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        onSumbitHandler();
      }
    });
  };

  const onSumbitHandler = async () => {
    let formData = new FormData();
    let arr = [];
    if (imgData.length > 0) {
      imgData.forEach((a) => {
        arr.push(a);
      });
    }
    // formData.append("refNbr", RefNbr.toString());
    formData.append(
      "CRPriceInfoDate",
      moment(CRPriceInfoDate).format("YYYY-MM-DD")
    );
    formData.append("CRPrice", CRPrice);
    formData.append("BranchID", getBrach());
    formData.append("CustomerID", TempCustomer.customerID);
    formData.append("LocationLineID", Location.id);
    formData.append("InventoryID", Item.inventoryID);
    formData.append("ScreenID", "SAC300005");
    formData.append("ImageBase64", arr.toString());
    if (id === undefined) {
      createData(formData);
    } else {
      editData(formData);
    }
  };

  const getDataStockItem = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=${id}`,
        GetConfig()
      );
      if (response.status === 200) {
        setItem(response.data[0]);
        setOpenScanner(false);
      }
    } catch (error) {
      NotifyError("Produk tidak ditemukan");
    }
  };

  const onScanSuccess = (result) => {
    getDataStockItem(result);
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          onClick={() => history("/customer-price-info")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            TempCustomer.customerID === "" ||
            TempCustomer?.customerID === undefined ||
            Location?.id === undefined ||
            Location.id === "" ||
            Item?.inventoryID === undefined ||
            Item?.inventoryID === "" ||
            CRPrice === ""
          }
          onClick={() => notifySave()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          // disabled={Loading}
          onClick={() => {
            history("/customer-price-info/add");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          onClick={() => notifyConfirm(id)}
          // onClick={onSumbitHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={6} md={12} mt={3} mb={5}>
            <Grid item md={4} xs={12}>
              <TextField
                name="RefNbr"
                label="Reference Nbr"
                value={RefNbr}
                fullWidth
                required
                variant="outlined"
                disabled={true}
                onChange={(e) => setRefNbr(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="Branch"
                label="Branch"
                value={BranchName}
                fullWidth
                variant="outlined"
                disabled={true}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                name="Customer"
                label="Customer"
                value={
                  TempCustomer === ""
                    ? " "
                    : `${TempCustomer.customerID} - ${TempCustomer.customerName}`
                }
                fullWidth
                required
                onClick={() => {
                  setOpenCust(true);
                }}
                variant="outlined"
                disabled={false}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <CbData
                value={Location === "" ? " " : `${Location.text}`}
                defaultValue={Location === "" ? " " : `${Location.text}`}
                required
                disabled={!TempCustomer.customerID}
                all
                source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/Location/${TempCustomer.customerID}`}
                config={GetConfig()}
                id="text"
                label="Location ID"
                onChange={(e) => {
                  setLocation(e[0]);
                  console.log("ini e nya Location => ", e);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Item"
                value={
                  Item ? Item?.inventoryID + " - " + Item?.description : " "
                }
                disabled={Loading}
                fullWidth
                required
                onClick={() => {}}
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <>
                        <IconButton
                          onClick={() => setOpenItem(true)}
                          disabled={Loading}
                        >
                          <Search />
                        </IconButton>
                      </>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => setOpenScanner(true)}
                      >
                        <QrCodeScannerIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                label="Price (Include PPN)"
                value={CRPrice}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                onChange={(e) => setCRPrice(e.target.value)}
                displayType="input"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DatePicker
                label="Date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={CRPriceInfoDate}
                inputFormat={"dd/MM/yyyy"}
                onChange={(newValue) => {
                  setCRPriceInfoDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField style={{ width: "100%" }} {...params} />
                )}
              />
            </Grid>
          </Grid>
          <Detail
            imgData={imgData}
            setImgData={(e) => setImgData(e)}
            TempProduct={TempProduct}
            setTempProduct={(e) => setTempProduct(e)}
            description={description}
            Files={Files}
            setDescription={(e) => setDescription(e)}
            id={id}
          />
        </CardContent>
        <PromoPopup
          openPromo={openPromo}
          setOpenPromo={(e) => {
            setOpenPromo(e);
          }}
          TempPromoID={TempPromoID}
          setTempPromoID={(e) => {
            setTempPromoID(e);
            console.log("e", e);
          }}
        />
        <CustomerPopup
          openCust={openCust}
          setOpenCust={(e) => {
            setOpenCust(e);
            console.log("ee", e);
          }}
          TempCustomer={TempCustomer}
          setTempCustomer={(e) => {
            setTempCustomer(e);
          }}
        />
        <ItemPopup
          open={openItem}
          setopen={(e) => {
            setOpenItem(e);
          }}
          Temp={Item}
          label={"Item"}
          id={"inventoryID"}
          desc={"description"}
          api={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=`}
          setTemp={(e) => {
            setItem(e);
            console.log("cus", e);
          }}
        />
        <QrBarcodeScanner
          openScanner={openScanner}
          setOpenScanner={setOpenScanner}
          onSuccess={onScanSuccess}
        />
      </Card>
    </>
  );
}

export default Header;
