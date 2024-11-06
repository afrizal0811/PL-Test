import { spacing } from "@material-ui/system";
import { DatePicker } from "@mui/lab";
import {
  Autocomplete,
  CardContent,
  Grid,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components/macro";
// import columnLHI from "../columnLHI";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MobileTable from "../../../../components/shared/MobileTable";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getEmployee } from "../../../../utils/jwt";
import opsiStatus from "./OpsiStatus";
import UpdatePopup from "./UpdatePopup";
import columnLHIKolektor from "./columnLHIKolektor";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);

export default function LaporanHarianInkasoMobile(props) {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LHIDocDate, setLHIDocDate] = useState(new Date());
  const [Edit, setEdit] = useState("");
  const [RefNbr, setRefNbr] = useState("");
  const [keterangan, setketerangan] = useState("");
  const mounted = useRef();
  const history = useNavigate();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [curretPage, setcurretPage] = React.useState(0);
  const [totalPage, settotalPage] = React.useState(0);

  React.useEffect(() => {
    getData(1);
  }, [LHIDocDate, keterangan, RefNbr]);

  const UpdateHandler = async (param) => {
    let arr = [];
    Data.map((ae) => {
      arr.push(ae.isi.map((ao) => ao));
    });
    let pay1 = arr.map((ae) => {
      return ae;
    });
    let pay = arr.map((ae) => {
      ae.map((ao) => {
        return {
          nomerLHI: ao.nomorLHI,
          tglKembali: moment(new Date()).format(),
          tglPenagihan: moment(new Date()).format(),
          ketStatusKembali: ao.ketStatusKembali,
          ketKembali: ao.ketKembali,
          cashAccountID: "1102401",
          entryTypeID: "IN",
          extRefNbr: "IN",
          tunaiDiterima: ao.tunaiDiterima,
          nomorFaktur: ao.nomorFaktur,
        };
      });
    });
    // console.log("arr", arr);
    // console.log("payload1", pay1);
    // console.log("payload", pay);
    // try {
    //   await axios
    //     .put(
    //       `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps/UpdateStatusTT`,
    //       pay,
    //       GetConfig()
    //     )
    //     .then(function (response) {
    //       // handle success
    //       // console.log("ini data NotificationTemplateReps = ", response);
    //       if (
    //         response.status == 200 ||
    //         response.status == 201 ||
    //         response.status == 204
    //       ) {
    //         NotifySuccess("success", "Data telah di" + param);
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 800);
    //       }
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     });
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error.message);
    //   setLoading(false);
    // }
  };

  const getData = async (page) => {
    try {
      const res = await axios
        .get(
          // `${process.env.REACT_APP_DOMAIN_API}` +
          //   `/LaporanHarianInkasoReps?page=${page}&rowsCount=5`
          // `${process.env.REACT_APP_DOMAIN_API}/LaporanHarianInkasoReps`
          `${
            process.env.REACT_APP_DOMAIN_API
          }/LaporanHarianInkasoReps/FilterLaporanHarianInkaso?pages=${page}&rowsCount=10&kolektor=${getEmployee()}${
            keterangan == null || keterangan == ""
              ? ""
              : "&ketStatusKembali=" + keterangan.id
          }&tglPenagihan=${moment(LHIDocDate).format("YYYY-MM-DD")}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status == 200) {
            const resdata = response.data[0];
            // console.log("res", resdata);
            // setData(resdata.record);
            // const resdata = response.data;
            const newres = [];
            // settotalPage(resdata.record.length);

            resdata.record.map((arr) =>
              Object.keys(arr.grid).forEach(function (key) {
                newres.push({
                  id: key,
                  tglPenagihan: arr.grid[key].tglPenagihan,
                  tglKembali: arr.grid[key].tglKembali,
                  ketKembali: arr.grid[key].ketKembali,
                  nomorLHI: arr.grid[key].nomorLHI,
                  usrKolektor: arr.grid[key].usrKolektor,
                  customerID: arr.grid[key].customerID,
                  customerName: arr.grid[key].customerName,
                  balanceTotal: arr.balance,
                  ketStatusKembali: arr.grid[key].keterangan,
                  referenceNbr: arr.grid[key].referenceNbr,
                  balance: arr.grid[key].balance,
                  addressLine1: arr.grid[key].addressLine1,
                });
              })
            );
            // let a = groupByKey(newres, "CustomerName");
            let result = newres.reduce(function (r, a) {
              r[a.customerName] = r[a.customerName] || [];
              r[a.customerName].push(a);
              return r;
            }, Object.create(null));
            // setData([a]);
            // settotalPage([a].length);
            let newww = [];
            Object.entries(result).forEach(([key, value]) => {
              console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
              newww.push({ type: key, isi: value });
            });
            console.log("a", newww);
            setData(newww);
            settotalPage(newww.length);
            // settotalPage([a].length);
            // console.log("newres", newres);

            // console.log("[a]", [result]);
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

  return (
    <>
      <Card mb={3}>
        <CardContent>
          {/* <Grid container spacing={4}> */}
          <Grid md={12} mb={2}>
            <DatePicker
              label="Date"
              InputLabelProps={{
                shrink: true,
              }}
              value={LHIDocDate}
              inputFormat={"dd/MM/yyyy"}
              onChange={(newValue) => {
                setLHIDocDate(newValue);
              }}
              renderInput={(params) => <TextField fullWidth {...params} />}
            />
          </Grid>
          <Grid md={12} mb={2}>
            <TextField
              name="RefNbr"
              label="No Faktur"
              fullWidth
              value={RefNbr}
              onChangeCapture={(newValue) => {
                setRefNbr(newValue.target.value);
              }}
            />
          </Grid>
          <Grid md={12} mb={2}>
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={opsiStatus}
              value={keterangan}
              onChange={(e) => {
                console.log(e);
                setketerangan(e.target.value);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Status" />
              )}
            /> */}
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={opsiStatus}
              value={keterangan}
              onChange={(event, e) => {
                setketerangan(e);
                console.log(e);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Status" />
              )}
            />
          </Grid>
          {/* </Grid> */}
        </CardContent>
      </Card>
      <Card mb={3}>
        <Paper>
          {/* <Button
            color="primary"
            // onClick={() => history("add")}
            // disableElevation
          >
            <span>
              <Add style={{ height: "16px", verticalAlign: "sub" }} />
            </span>
            Add
          </Button> */}
          <MobileTable
            data={Data}
            rowDetail={columnLHIKolektor}
            // label={"Expiry Date"}
            id={"type"}
            totaldata={totalPage}
            page={curretPage}
            onCellDoubleClick={(e) => {
              history(`${e}`);
              // setOpenUpdate(true);
              // setEdit(e);
              // console.log(e);
            }}
            rowsPerPage={100}
            onPageChange={(e, page) => {
              setcurretPage(page);
              getData(page + 1);
              console.log("page = ", page);
            }}
          />
        </Paper>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Button
                mr={2}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  // setOpenOtomatis(true);
                  UpdateHandler("receive");
                }}
              >
                Receive
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                mr={2}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  UpdateHandler("submit");
                  // setOpenOtomatis(true);
                  console.log("newdata", Data);
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <UpdatePopup
        openEdit={openUpdate}
        setOpenEdit={(e) => {
          setOpenUpdate(e);
        }}
        DataSource={Data}
        setDataSource={(e) => {
          setData(e);
          // console.log("setDataSource", e);
        }}
        dataEdit={Edit}
        setDataEdit={(e) => {
          setEdit(e);
          // console.log("cus", e);
        }}
      />
    </>
  );
}
