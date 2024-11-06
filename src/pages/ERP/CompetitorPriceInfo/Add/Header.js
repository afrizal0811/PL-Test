import { Add, Delete, Refresh, Reply, Save } from "@mui/icons-material";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { DatePicker } from "@mui/lab";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Paper as MuiPaper,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Search } from "react-feather";
import NumberFormat from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import QrBarcodeScanner from "../../../../components/QrBarcodeScanner";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import BPOMPopup from "./BPOMPopup";
import Detail from "./Detail";

const TextField = styled(MuiTextField)(spacing);
const Paper = styled(MuiPaper)(spacing);

export default function Header() {
  const [BranchID, setBranchID] = useState(
    "PL " + getBrach() + " - " + getBrach()
  );
  const [CPBrand, setCPBrand] = useState("");
  const [CPItem, setCPItem] = useState("");
  const [CPPrice, setCPPrice] = useState(0);
  const [GroupBy, setGroupBy] = useState("");
  const [CPLocation, setCPLocation] = useState("");
  const [CPDesc, setCPDesc] = useState("");
  const [CPDate, setCPDate] = useState(new Date());
  const [NoBPOM, setNoBPOM] = useState("");
  const [imgData, setImgData] = useState([]);
  const history = useNavigate();
  const [RefNbr, setRefNbr] = useState("");
  const [Loading, setLoading] = useState(false);
  const [openScanner, setOpenScanner] = useState(false);
  const [openBPOM, setopenBPOM] = useState(false);
  const { id } = useParams();

  const columnsBPOM = [
    {
      field: "noBPOM",
      headerName: "No. BPOM",
      sortable: false,
      width: 150,
    },
    {
      field: "cpBrand",
      headerName: "Brand",
      sortable: false,
      width: 130,
    },
    {
      field: "jenisItem",
      headerName: "Item",
      sortable: false,
      width: 130,
    },
  ];

  React.useEffect(() => {
    if (id !== undefined) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/${id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setRefNbr(resdata.refNbr);
            setNoBPOM(resdata.noBPOM);
            setGroupBy(resdata.productBy);
            setCPBrand(resdata.cpBrand);
            setCPItem(resdata.cpItem);
            setCPDate(resdata.docDate);
            setCPDesc(resdata.cpDesc);
            setCPPrice(resdata.cpPrice);
            setBranchID(resdata.branchID + " - " + resdata.branchName);
            setCPLocation(resdata.cpLocation);
            let arrimg = resdata.imageBase64.split(",data:image/");
            let filtered = arrimg.filter(function (el) {
              return el !== "";
            });
            let add = filtered.map((item) => "data:image/" + item);
            console.log("filtered image", filtered);
            setImgData(add);
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

  const createData = async (payload) => {
    try {
      console.log("ini didalam handleSave, isi dari payload", payload);
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/AddV2`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              history(`/competitor-price-info/detail/${response.data.refNbr}`);
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const editData = async (payload) => {
    try {
      console.log("ini didalam handleSave, isi dari payload", payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/Update/${id}`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          console.log(response);
          if (response.status === 200 || response.status === 201) {
            NotifySuccess("success", "Data Telah Ditambah");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSumbitHandler = async () => {
    let formData = new FormData();
    let arr = [];
    if (imgData.length > 0) {
      imgData.forEach((a) => {
        arr.push(a);
      });
    }
    formData.append("DocDate", moment(CPDate).format("YYYY-MM-DD"));
    formData.append("CPPrice", CPPrice);
    formData.append("CPDesc", CPDesc);
    formData.append("NoBPOM", NoBPOM);
    formData.append("CPLocation", CPLocation);
    formData.append("ScreenID", "SAC300004");
    formData.append("BranchID", getBrach());
    formData.append("ImageBase64", arr.toString());
    if (id === undefined) {
      // console.log("ini tempcustomer => ", TempCustomer);
      createData(formData);
    } else {
      editData(formData);
    }
  };

  const notifySubmit = async () => {
    Swal.fire({
      title: "Apakah Anda yakin untuk Menyimpan dokumen ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        onSumbitHandler();
      }
    });
  };

  const deleteData = async (id) => {
    setLoading(true);
    console.log("ini di delete, id = ", id);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API_BARU}/api/CompetitorPriceInfo/Delete/${id}/screenId`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data Telah DiHapus");
            setTimeout(() => {
              window.location.reload();
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
        console.log("ini di swal delete, result = ", result);
        console.log("ini di swal delete, id = ", id);
        deleteData(id);
      }
    });
  };

  const getDataProductCompetitor = async (noBpom) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/${noBpom}`,
        GetConfig()
      );
      if (response.status === 200) {
        setNoBPOM(response.data.noBPOM);
        setCPItem(response.data.cpItem);
        setCPBrand(response.data.cpBrand);
        setGroupBy(
          `${response.data.type1Group} ${response.data.tipe2Desc} ${response.data.tipe3Desc}`
        );
      }
    } catch (error) {
      NotifyError("No BPOM tidak ditemukan");
    }
  };

  const onScanSuccess = (result) => {
    getDataProductCompetitor(result);
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton
          component="span"
          onClick={() => history("/competitor-price-info")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            NoBPOM === "" ||
            CPDate === "" ||
            CPPrice === "" ||
            CPLocation === ""
          }
          onClick={() => notifySubmit()}
        >
          <Save />
        </IconButton>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          onClick={() => {
            window.location.replace("/competitor-price-info/add");
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={!id}
          onClick={() => notifyConfirm(id)}
        >
          <Delete />
        </IconButton>
      </Grid>
      <Card mb={6}>
        <CardContent>
          <Grid container spacing={4} xs={12}>
            <Grid item md={3} xs={12}>
              <Paper mt={3}>
                <TextField
                  label="Reference Nbr"
                  value={RefNbr}
                  disabled={true}
                  fullWidth
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  label="Barcode BPOM"
                  value={NoBPOM}
                  disabled={Loading}
                  fullWidth
                  required
                  color={!NoBPOM ? "warning" : ""}
                  focused={!NoBPOM ? true : false}
                  style={{ width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          onClick={() => setopenBPOM(true)}
                          disabled={Loading}
                        >
                          <Search />
                        </IconButton>
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
              </Paper>
              <Paper mt={3}>
                <DatePicker
                  label="Date"
                  disabled
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={CPDate}
                  inputFormat={"dd/MM/yyyy"}
                  onChange={(e) => {
                    setCPDate(e.target.value);
                  }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Paper>
            </Grid>
            <Grid item md={3} xs={12}>
              <Paper mt={3}>
                <TextField
                  id="CPItem"
                  label="Competitor Item"
                  disabled
                  value={CPItem}
                  onChange={(e) => {
                    setCPItem(e.target.value);
                  }}
                  fullWidth
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  id="CPBrand"
                  label="Competitor Brand"
                  disabled
                  value={CPBrand}
                  onChange={(e) => {
                    setCPBrand(e.target.value);
                  }}
                  fullWidth
                />
              </Paper>
              <Paper mt={3}>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  fullWidth
                  label="Competitor Price"
                  value={CPPrice}
                  decimalScale={2}
                  color={CPPrice === 0 ? "warning" : ""}
                  focused={CPPrice === 0 ? true : false}
                  fixedDecimalScale={true}
                  onChange={(e) => {
                    setCPPrice(e.target.value);
                  }}
                  decimalSeparator="."
                  customInput={TextField}
                  displayType="input"
                  type="text"
                  thousandSeparator={true}
                  allowNegative={true}
                />
              </Paper>
            </Grid>
            <Grid item md={3} xs={12}>
              <Paper mt={3}>
                <TextField
                  name="Branch"
                  label="Branch"
                  value={BranchID}
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  name="Location"
                  label="Location"
                  value={CPLocation}
                  color={CPLocation === 0 ? "warning" : ""}
                  focused={CPLocation === 0 ? true : false}
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setCPLocation(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Paper>
              <Paper mt={3}>
                <TextField
                  name="GroupBy"
                  label="Product by Group, Principal, Kelompok"
                  value={GroupBy}
                  fullWidth
                  variant="outlined"
                  disabled={true}
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true,
                  }}
                />
              </Paper>
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                mt={3}
                id="outlined-multiline-static"
                margin="dense"
                fullwidth={true}
                multiline
                label="Description"
                value={CPDesc}
                onChange={(e) => {
                  setCPDesc(e.target.value);
                }}
                rows={4}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Detail imgData={imgData} setImgData={(e) => setImgData(e)} />
        </CardContent>
      </Card>
      <QrBarcodeScanner
        openScanner={openScanner}
        setOpenScanner={setOpenScanner}
        onSuccess={onScanSuccess}
      />
      <BPOMPopup
        open={openBPOM}
        setopen={(e) => {
          setopenBPOM(e);
        }}
        setTemp={(e) => {
          console.log("bpom", e);
          setNoBPOM(e.noBPOM);
          setCPBrand(e.cpBrand);
          setCPItem(e.cpItem);
          setGroupBy(`${e.type1Group} ${e.tipe2Desc} ${e.tipe3Desc}`);
        }}
        label={"Master Competitor"}
        id={"noBPOM"}
        column={columnsBPOM}
        api={`${process.env.REACT_APP_DOMAIN_API_BARU}/api/Competitor/Pagination2?`}
        config={GetConfig()}
      />
    </>
  );
}
