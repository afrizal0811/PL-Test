import { DatePicker } from "@mui/lab";
import {
  Card,
  CardContent,
  FormHelperText,
  Grid,
  IconButton,
  Button as MuiButton,
  Paper as MuiPaper,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Refresh from "@mui/icons-material/Refresh";
import Reply from "@mui/icons-material/Reply";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import CbData from "../../../../components/shared/dropdown";
import { getBrach, getEmployee } from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import CustomerPopup from "./CustomerPopup";
import ItemPopup from "./ItemPopup";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header() {
  const [ExpiryDate, setExpiryDate] = useState("");
  const [DocDate, setDocDate] = useState(new Date());
  const [Qty, setQty] = useState("");
  const [Createdby, setCreatedby] = useState("");
  const [Refnbr, setRefnbr] = useState("");
  const [Location, setLocation] = useState("");
  const [UOM, setUOM] = useState("");
  const [Item, setItem] = useState("");
  const [Description, setDescription] = useState("");
  const [Branch, setBranch] = useState(getBrach());
  const [Employee, setEmployee] = useState(getEmployee());

  const [ItemValid, setItemValid] = useState(true);
  const [ExpValid, setExpValid] = useState(true);

  //state Customer ID
  const [openCust, setOpenCust] = React.useState(false);
  const [openItem, setOpenItem] = React.useState(false);
  const [TempCustomer, setTempCustomer] = React.useState([]);
  const [SelectedCust, setSelectedCust] = React.useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const [Loading, setLoading] = React.useState(false);

  useEffect(() => {
    // console.log(id);
    if (id != undefined) {
      getData();
    }
  }, []);

  useEffect(() => {
    setItemValid(true);
    if (TempCustomer.customerID && Item.inventoryID && DocDate && Location[0])
      ItemValidation();
    if (
      TempCustomer.customerID &&
      Item.inventoryID &&
      DocDate &&
      Location[0] &&
      ExpiryDate
    )
      ExpValidation();
  }, [TempCustomer, DocDate, Location, Item, ExpiryDate]);

  const ItemValidation = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/ExpiryDate/GetByInventoryIDValidation/${
            TempCustomer.customerID
          }&${getBrach()}&${Item.inventoryID}&${moment(DocDate).format(
            "YYYY-MM-DD"
          )}&${Location[0].id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200 && response.data.refNbr !== id) {
            setItemValid(false);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const ExpValidation = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API_BARU
          }/ExpiryDate/GetByExpDateValidation/${
            TempCustomer.customerID
          }&${getBrach()}&${Item.inventoryID}&${moment(ExpiryDate).format(
            "YYYY-MM-DD"
          )}&${Location[0].id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200 && response.data.refNbr !== id) {
            setExpValid(false);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/ExpiryDate/" + id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setLocation([
              {
                id: resdata.locationLineID,
                text: `${resdata.locationID} - ${resdata.locationName}`,
              },
            ]);
            setTempCustomer({
              customerID: resdata.customerID,
              customerName: resdata.customerName,
            });
            setItem({
              inventoryID: resdata.inventoryID,
              description: resdata.inventoryID_Desc,
            });
            setDocDate(resdata.docDate);
            setUOM(resdata.uom);
            // setQty(resdata.qtyStock);
            setQty(resdata.qtyStock);
            setExpiryDate(resdata.expDateStock);
            setDescription(resdata.docDesc);
            setRefnbr(resdata.refNbr);
            setBranch(`${resdata.branchID} - ${resdata.branchName}`);
            setEmployee(resdata.createdByID);
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

  const createData = async (formdata) => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` + "/ExpiryDate/Add",
          formdata,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data berhasil disimpan");
            setTimeout(() => {
              window.location.href = `/expiry-date/detail/${response.data.refNbr}`;
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const editData = async (formdata) => {
    setLoading(true);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}` +
            "/ExpiryDate/Update/" +
            id,
          formdata,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah diperbarui");
            getData(id);
            // setTimeout(() => {
            //   window.location.href = `/expiry-date`;
            // }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const onSumbitHandler = async () => {
    let formData = new FormData();

    formData.append("DocDate", moment(DocDate).format("YYYY-MM-DD"));
    formData.append("LocationLineID", Location[0].id);
    formData.append("CustomerID", TempCustomer.customerID);
    formData.append("BranchID", getBrach());
    formData.append("InventoryID", Item.inventoryID);
    formData.append("UOM", UOM);
    formData.append("QtyStock", Qty);
    formData.append("ExpDateStock", moment(ExpiryDate).format("YYYY-MM-DD"));
    formData.append("CreatedByID", getEmployee());
    formData.append("CreatedByScreenID", "SAW200002");
    formData.append("DocDesc", Description);
    if (id == undefined) {
      createData(formData);
    } else {
      editData(formData);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    // console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/ExpiryDate/Delete/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
            // getData();
            setTimeout(() => {
              window.location.href = `/expiry-date`;
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

  // ini untuk pop up notifikasi
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

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => history("/expiry-date")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            Loading ||
            !ExpValid ||
            !ExpiryDate ||
            !TempCustomer.customerID ||
            !Item.inventoryID ||
            !UOM ||
            !DocDate ||
            !Location[0]
          }
          onClick={() => onSumbitHandler()}
        >
          <SaveIcon />
        </IconButton>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          disabled={Loading}
          onClick={() => {
            history("/expiry-date/add");
            window.location.reload();
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={Loading || !id}
          onClick={() => notifyConfirm(id)}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card>
        <CardContent>
          {/* <Typography sx={{ m: 2 }} variant="h4" gutterBottom>
            Expiry Date
          </Typography> */}
          <Grid container spacing={4}>
            <Grid container spacing={4} item md={8} xs={12} mt={1}>
              <Grid item md={6} mb={4} xs={12}>
                <TextField
                  label="Ref Number"
                  type="text"
                  value={Refnbr}
                  inputProps={{
                    readOnly: true,
                  }}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Item"
                  value={
                    Item == ""
                      ? " "
                      : `${Item.inventoryID} - ${Item.description}`
                  }
                  color={Item == "" || !ItemValid ? "warning" : ""}
                  focused={Item == "" || !ItemValid ? true : false}
                  disabled={Loading}
                  fullWidth
                  required
                  onClick={() => {
                    setOpenItem(true);
                  }}
                  style={{ width: "100%" }}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
                {ItemValid === false && (
                  <FormHelperText style={{ color: "red" }}>
                    Item telah diinput pada lokasi dan tanggal yang sama!
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="Customer"
                  label="Customer"
                  value={
                    TempCustomer == ""
                      ? " "
                      : `${TempCustomer.customerID} - ${TempCustomer.customerName}`
                  }
                  color={TempCustomer == "" ? "warning" : ""}
                  focused={TempCustomer == "" ? true : false}
                  fullWidth
                  required
                  disabled={Loading}
                  onClick={() => {
                    setOpenCust(true);
                  }}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <FormControl style={{ width: "100%" }}>
                  <InputLabel id="status-zona">UOM</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="UOM"
                    defaultValue={UOM}
                    value={!UOM ? "loading" : UOM}
                    required
                    disabled={Loading}
                    onChange={(e) => setUOM(e.target.value)}
                    id="demo-simple-select"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"Base Unit"}>Base Unit</MenuItem>
                    <MenuItem value={"Purchase Unit"}>Purchase Unit</MenuItem>
                    <MenuItem value={"Sales Unit"}>Sales Unit</MenuItem>
                  </Select>
                </FormControl> */}
                <CbData
                  value={UOM == "" ? " " : `${UOM}`}
                  defaultValue={UOM == "" ? " " : `${UOM}`}
                  required
                  disabled={!Item?.inventoryID || Loading}
                  label="UOM"
                  source={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItemUOMById?inventoryID=${Item?.inventoryID}`}
                  id="uom"
                  onChange={(e) => {
                    setUOM(e);
                    console.log("e", e);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <CbLocation
                  value={Location == "" ? " " : `${Location[0].locationName}`}
                  defaultValue={
                    Location == "" ? " " : `${Location[0].locationName}`
                  }
                  required
                  config={GetConfig()}
                  disabled={!TempCustomer.customerName || Loading}
                  label="Location"
                  all
                  customerID={TempCustomer.customerName}
                  id="locationID"
                  onChange={(e) => {
                    setLocation(e);
                    console.log("e", e);
                  }}
                /> */}
                <CbData
                  value={Location == "" ? " " : `${Location[0].text}`}
                  defaultValue={Location == "" ? " " : `${Location[0].text}`}
                  required
                  config={GetConfig()}
                  disabled={!TempCustomer.customerID || Loading}
                  label="Location"
                  all
                  source={`${process.env.REACT_APP_DOMAIN_API_BARU}/master/Location/${TempCustomer.customerID}`}
                  id="text"
                  onChange={(e) => {
                    setLocation(e);
                    // console.log("e", e);
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* <TextField
                  label="Qty"
                  disabled={Loading}
                  required
                  color={Qty == "" ? "warning" : ""}
                  focused={Qty == "" ? true : false}
                  type="number"
                  inputProps={{
                    min: 0,
                  }}
                  value={Qty}
                  onChange={(e) => {
                    // setQty(e.target.value);
                    setQty((Math.round(e.target.value * 100) / 100).toFixed(2));
                  }}
                  style={{ width: "100%" }}
                /> */}
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  id="numb"
                  required
                  color={Qty == "" ? "warning" : ""}
                  focused={Qty == "" ? true : false}
                  label="Qty"
                  value={Qty}
                  decimalScale={2}
                  decimalSeparator="."
                  customInput={TextField}
                  fixedDecimalScale
                  onChange={(e) => {
                    // let a = (Math.round(e.target.value * 100) / 100).toFixed(2);
                    // setQty((Math.round(e.target.value * 100) / 100).toFixed(2));
                    setQty(e.target.value);
                  }}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={false}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DatePicker
                  label="Date"
                  disabled={Loading}
                  // disabled
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={DocDate}
                  onChange={(value) => {
                    setDocDate(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%" }}
                      {...params}
                      value={moment(DocDate).format("MM/DD/YYYY")}
                    />
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DatePicker
                  label="Expiry Date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputFormat={"dd/MM/yyyy"}
                  value={ExpiryDate}
                  disabled={Loading}
                  onChange={(value) => {
                    setExpiryDate(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      style={{ width: "100%" }}
                      required
                      color={!ExpValid || !ExpiryDate ? "warning" : ""}
                      focused={!ExpValid || !ExpiryDate ? true : false}
                      {...params}
                      value={moment(ExpiryDate).format("MM/DD/YYYY")}
                    />
                  )}
                />
                {ExpValid === false && (
                  <FormHelperText style={{ color: "red" }}>
                    Expiry Date sudah pernah diinput
                  </FormHelperText>
                )}
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Branch"
                  disabled
                  type="text"
                  value={Branch}
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  label="Created By"
                  disabled
                  type="text"
                  value={Employee}
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper mt={4}>
                <TextField
                  label="Description"
                  value={Description == "" ? " " : Description}
                  multiline
                  rows={5}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </Paper>
            </Grid>
          </Grid>
          <CustomerPopup
            openCust={openCust}
            setOpenCust={(e) => {
              setOpenCust(e);
            }}
            TempCustomer={TempCustomer}
            setTempCustomer={(e) => {
              setTempCustomer(e);
              console.log("cus", e);
              setLocation("");
              // setItem("");
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
              setUOM("");
              console.log("cus", e);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
