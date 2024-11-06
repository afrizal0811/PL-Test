import SearchIcon from "@material-ui/icons/Search";
import { spacing } from "@material-ui/system";
import {
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Card as MuiCard,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import { getBrach } from "../../../utils/jwt";
import DeskCallTable from "./DeskCallTable";

import { Clear } from "@material-ui/icons";
import Refresh from "@material-ui/icons/Refresh";
import { DesktopDatePicker } from "@material-ui/lab";
import { grey } from "@mui/material/colors";
import Swal from "sweetalert2";
import CbData from "../../../components/shared/dropdown";
import { GetConfig } from "../../../utils/ConfigHeader";
import CustomerPopup from "./CustomerPopup";
import DeskcallPopup from "./DeskcallPopup";
import SalesPersonPopup from "./SalesPersonPopup";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);

export default function Header(props) {
  const [CustomerID, setCustomerID] = useState("");
  const [Loading, setLoading] = useState(false);
  const [TopPrint, setTopPrint] = useState("ALL");
  const [Tipe, setTipe] = useState("ALL");
  const [Data, setData] = useState([]);
  const [DCDate, setDCDate] = useState(new Date());
  const [SalesPerson, setSalesPerson] = useState("");
  const [DeskcallID, setDeskcallID] = useState("");
  const [MoreBtn, setMoreBtn] = React.useState(false);
  const [SelectedDeskcall, setSelectedDeskCall] = useState({});
  const [pageSize, setPageSize] = useState(15);

  const [openDetail, setOpenDetail] = useState(false);
  const [openRespon, setOpenRespon] = useState(false);

  const open = Boolean(MoreBtn);
  const id = open ? "simple-popover" : undefined;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openCust, setOpenCust] = React.useState(false);
  const [openSP, setOpenSP] = React.useState(false);
  const [openDC, setOpenDC] = React.useState(false);

  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  useEffect(() => {
    getDataFilter(curretPage);
  }, [CustomerID, Tipe, TopPrint, DCDate, DeskcallID, SalesPerson, pageSize]);

  const getData = async (page) => {
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/DeskcallReps?page=${page}&rowsCount=${pageSize}&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            const newres = [];
            Object.keys(resdata.record).forEach(function (key) {
              newres.push({
                // DeskcallDetailsID: resdata.record[key].deskcallDetailsID,
                // idOto: idOto,
                BrnchID: resdata.record[key].brnchID,
                CompanyID: resdata.record[key].companyID,
                CreatedByID: resdata.record[key].createdByID,
                CreatedByScreenID: resdata.record[key].createdByScreenID,
                CreatedDateTime: resdata.record[key].createdDateTime,
                CustomerID: resdata.record[key].customerID,
                CustomerName: resdata.record[key].customerName,
                DcDate: resdata.record[key].dcDate,
                TopPrint: resdata.record[key].topPrint,
                Type1: resdata.record[key].type1,
                Type2: resdata.record[key].type2,
                UsrAdmPiutang: resdata.record[key].usrAdmPiutang,
                DcJt06: resdata.record[key].dcJt06,
                DcJt30: resdata.record[key].dcJt30,
                DcJt730: resdata.record[key].dcJt730,
                DcKet: resdata.record[key].dcKet,
                DcNotJt: resdata.record[key].dcNotJt,
                DcRespon: resdata.record[key].dcRespon,
                DcResponBack: resdata.record[key].dcResponBack,
                DcTime: resdata.record[key].dcTime,
                DeskcallDetailsID: resdata.record[key].deskcallDetailsID,
                DeskcallID: resdata.record[key].deskcallID,
                DueDate: resdata.record[key].dueDate,
                HaveInvoice: resdata.record[key].haveInvoice,
                IdcResponNull: resdata.record[key].idcResponNull,
                InvoiceDueDate: resdata.record[key].invoiceDueDate,
                Timestamp: resdata.record[key].timestamp,
                LastModifiedDateTime: resdata.record[key].lastModifiedDateTime,
                Phone1: resdata.record[key].phone1,
                PrimaryContactID: resdata.record[key].primaryContactID,
                SalesPersonID: resdata.record[key].salesPersonID,
                SalesPersonID_SalesPerson_descr:
                  resdata.record[key].salesPersonID_SalesPerson_descr,
                ScreenNo: resdata.record[key].screenNo,
              });
            });
            setData(newres);
            settotalPage(resdata.totalCountData);
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

  // useEffect(() => {
  //   getDataFilter(1);
  // }, [CustomerID, Tipe, TopPrint, DCDate, DeskcallID, SalesPerson, pageSize]);

  const generateData = async () => {
    try {
      setLoading(true);
      const res = await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/DeskcallReps/GenerateDataDeskcall",
          {},
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200 || response.status === 204) {
            // getDataFilter(curretPage);
            if (
              CustomerID !== "" ||
              Tipe !== "ALL" ||
              TopPrint !== "ALL" ||
              DCDate !== new Date() ||
              DeskcallID !== "" ||
              SalesPerson !== ""
            ) {
              console.log("getfilter");
              getDataFilter(curretPage + 1);
            } else {
              getData(curretPage + 1);
            }
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDataFilter = async (page) => {
    try {
      setLoading(true);
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/DeskcallReps?page=${page}&rowsCount=${pageSize}&customerID=${
              CustomerID ? CustomerID.customerID : ""
            }&tipe=${
              Tipe === "ALL" || Tipe === null ? "" : Tipe
            }&salesPersonID=${
              SalesPerson ? SalesPerson.SalespersonID : ""
            }&TOPPrint=${
              TopPrint === "ALL" || TopPrint === null ? "" : TopPrint
            }&deskcallID=${DeskcallID}${
              DCDate === undefined || DCDate === ""
                ? ""
                : "&date=" + moment(DCDate).format("YYYY-MM-DD")
            }&BranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            const newres = [];
            Object.keys(resdata.record).forEach(function (key) {
              newres.push({
                BrnchID: resdata.record[key].brnchID,
                CompanyID: resdata.record[key].companyID,
                CreatedByID: resdata.record[key].createdByID,
                CreatedByScreenID: resdata.record[key].createdByScreenID,
                CreatedDateTime: resdata.record[key].createdDateTime,
                CustomerID: resdata.record[key].customerID,
                CustomerName: resdata.record[key].customerName,
                DcDate: resdata.record[key].dcDate,
                TopPrint: resdata.record[key].topPrint,
                Type1: resdata.record[key].type1,
                Type2: resdata.record[key].type2,
                UsrAdmPiutang: resdata.record[key].usrAdmPiutang,
                DcJt06: resdata.record[key].dcJt06,
                DcJt30: resdata.record[key].dcJt30,
                DcJt730: resdata.record[key].dcJt730,
                DcKet: resdata.record[key].dcKet,
                DcNotJt: resdata.record[key].dcNotJt,
                DcRespon: resdata.record[key].dcRespon,
                DcResponBack: resdata.record[key].dcResponBack,
                DcTime: resdata.record[key].dcTime,
                DeskcallDetailsID: resdata.record[key].deskcallDetailsID,
                DeskcallID: resdata.record[key].deskcallID,
                DueDate: resdata.record[key].dueDate,
                HaveInvoice: resdata.record[key].haveInvoice,
                IdcResponNull: resdata.record[key].idcResponNull,
                InvoiceDueDate: resdata.record[key].invoiceDueDate,
                Timestamp: resdata.record[key].timestamp,
                LastModifiedDateTime: resdata.record[key].lastModifiedDateTime,
                Phone1: resdata.record[key].phone1,
                PrimaryContactID: resdata.record[key].primaryContactID,
                SalesPersonID: resdata.record[key].salesPersonID,
                SalesPersonID_SalesPerson_descr:
                  resdata.record[key].salesPersonID_SalesPerson_descr,
                ScreenNo: resdata.record[key].screenNo,
              });
            });
            setData(newres);
            settotalPage(resdata.totalCountData);
          }
          setLoading(false);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const notifyConfirm = async (id) => {
    Swal.fire({
      title: "Anda akan melakukan Generate Data Manual",
      text: "Fungsi ini mungkin membutuhkan cukup waktu!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Generate",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        generateData();
      }
    });
  };

  return (
    <div>
      <Grid container spacing={6} md={12} mt={3} pl={3} pb={2}>
        <IconButton component="span" onClick={() => window.location.reload()}>
          <Refresh />
        </IconButton>

        <Button
          disabled={!SelectedDeskcall?.DeskcallDetailsID}
          style={{
            color: !SelectedDeskcall?.DeskcallDetailsID ? grey[400] : grey[700],
          }}
          onClick={() => {
            setOpenDetail(true);
            setMoreBtn(false);
          }}
        >
          Detail
        </Button>
        <Button
          disabled={!SelectedDeskcall?.DeskcallDetailsID}
          style={{
            color: !SelectedDeskcall?.DeskcallDetailsID ? grey[400] : grey[700],
          }}
          onClick={() => {
            setOpenRespon(true);
            setMoreBtn(false);
          }}
        >
          Respon
        </Button>

        <Popover
          id={"simple-popover"}
          open={MoreBtn}
          anchorEl={anchorEl}
          onClose={(e) => setMoreBtn(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <div style={{ border: "1px solid" }}>
            <Typography variant="h5" p={2}>
              Processing
            </Typography>
            <Button
              disabled={!SelectedDeskcall?.DeskcallDetailsID}
              onClick={() => {
                setOpenDetail(true);
                setMoreBtn(false);
              }}
            >
              Detail
            </Button>
            <br />
            <Button
              disabled={!SelectedDeskcall?.DeskcallDetailsID}
              onClick={() => {
                setOpenRespon(true);
                setMoreBtn(false);
              }}
            >
              Respon
            </Button>
          </div>
        </Popover>
      </Grid>
      <Card>
        <CardContent>
          <Grid container spacing={3} mb={4}>
            <Grid item md={4}>
              <TextField
                label="Customer"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {CustomerID ? (
                        <>
                          <IconButton
                            onClick={() => setCustomerID("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenCust(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={
                  CustomerID
                    ? CustomerID?.customerID + " - " + CustomerID?.customerName
                    : " "
                }
                onClick={() => {
                  if (!CustomerID) {
                    setOpenCust(true);
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <DesktopDatePicker
                disabled={Loading}
                label="Due Date"
                inputFormat={"dd/MM/yyyy"}
                value={DCDate}
                onChange={(newValue) => {
                  setDCDate(newValue);
                  console.log("date", newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Sales Person"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {SalesPerson ? (
                        <>
                          <IconButton
                            onClick={() => setSalesPerson("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenSP(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={
                  SalesPerson
                    ? SalesPerson?.SalespersonID + " - " + SalesPerson?.Name
                    : " "
                }
                onClick={() => {
                  if (!SalesPerson) {
                    setOpenSP(true);
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/DropDown/TOPPrint`}
                id={"dropdownTOPPrint"}
                label="Top Print"
                config={GetConfig()}
                disabled={Loading}
                value={TopPrint === null ? "ALL" : TopPrint}
                onChange={(newValue) => {
                  if (newValue !== "" || newValue !== null) {
                    setTopPrint(newValue);
                  } else {
                    setTopPrint("ALL");
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/DeskcallReps/DropDown/TypeDeskcall`}
                id={"dropdownDeskcallTypeGabungan"}
                config={GetConfig()}
                label="Tipe"
                disabled={Loading}
                value={Tipe === null ? "ALL" : Tipe}
                onChange={(newValue) => {
                  if (newValue !== "" || newValue !== null) {
                    setTipe(newValue);
                  } else {
                    setTipe("ALL");
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Deskcall ID"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {DeskcallID ? (
                        <>
                          <IconButton
                            onClick={() => setDeskcallID("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenDC(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={DeskcallID}
                onClick={() => {
                  if (!DeskcallID) {
                    setOpenDC(true);
                  }
                }}
              />
            </Grid>
          </Grid>
          {Loading ? (
            <Grid container justifyContent="center" DCacing={1} md={12} xs={12}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress
                  disableShrink
                  style={{ textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <h1 style={{ textAlign: "center" }}>Loading</h1>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Timer
                  active={true}
                  duration={null}
                  style={{ textAlign: "center", marginBottom: 20 }}
                >
                  <Timecode />
                </Timer>
              </Grid>
            </Grid>
          ) : (
            <DeskCallTable
              Data={Data}
              DeskcallID={SelectedDeskcall?.DeskcallDetailsID}
              setData={setData}
              openDetail={openDetail}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              setOpenDetail={setOpenDetail}
              openRespon={openRespon}
              setOpenRespon={setOpenRespon}
              SelectedDeskcall={SelectedDeskcall}
              setSelectedDeskCall={setSelectedDeskCall}
              // What this variable means ?
              generateData={() => setDeskcallID("")}
              // ends
              rowCount={totalPage}
              page={curretPage}
              paginationMode="server"
              pagination
              getDataFilter={(e) => getDataFilter(e)}
              setcurretPage={setcurretPage}
            />
          )}
          <CustomerPopup
            openCust={openCust}
            setopenCust={(e) => {
              setOpenCust(e);
            }}
            TempCustomer={CustomerID}
            setTempCustomer={(e) => {
              setCustomerID(e);
              console.log("cus", e);
            }}
          />
          <SalesPersonPopup
            openSP={openSP}
            setOpenSP={(e) => {
              setOpenSP(e);
            }}
            SalesPerson={SalesPerson}
            setSalesPerson={(e) => {
              setSalesPerson(e);
            }}
          />
          <DeskcallPopup
            openDC={openDC}
            setOpenDC={(e) => {
              setOpenDC(e);
            }}
            Deskcall={DeskcallID}
            setDeskcall={(e) => {
              setDeskcallID(e);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
