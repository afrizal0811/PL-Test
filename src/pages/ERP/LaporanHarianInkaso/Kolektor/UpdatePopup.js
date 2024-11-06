import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import opsiStatus from "./OpsiStatus";
function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
  return (
    <Box sx={{ bgcolor: "yellow" }}>
      <TextField
        variant="standard"
        value={props.value}
        onChange={props.onChange}
        placeholder="Search…"
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" />,
          endAdornment: (
            <IconButton
              title="Clear"
              aria-label="Clear"
              size="small"
              style={{ visibility: props.value ? "visible" : "hidden" }}
              onClick={props.clearSearch}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
        sx={{
          width: {
            xs: 1,
            sm: "auto",
          },
          pr: 4,
          m: (theme) => theme.spacing(0),
          "& .MuiSvgIcon-root": {
            mr: 5,
          },
          "& .MuiInput-underline:before": {
            borderBottom: 1,
            borderColor: "divider",
          },
          float: "right",
        }}
      />
    </Box>
  );
}

QuickSearchToolbar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default function UpdatePopup(props) {
  //state Customer ID
  const [KetStatusKembali, setKetStatusKembali] = useState("");
  const [BalanceTotal, setBalanceTotal] = useState("");
  const [TunaiDiterima, setTunaiDiterima] = useState(0);
  const [KetKembali, setKetKembali] = useState("");
  const [faktur, setfaktur] = useState([]);
  const [selectedfaktur, setselectedfaktur] = useState([]);
  const [Data, setData] = useState("");

  useEffect(() => {
    // getData();
    if (props.dataEdit !== "") {
      const newList = props.DataSource.filter(
        (item) => item.type === props.dataEdit
      )[0].isi;
      //   // getStockItemConversion(newList[0].InventoryID);
      //   console.log("list", newList);
      console.log("newList", newList);

      setData(newList);
      setKetStatusKembali(newList[0]?.ketStatusKembali);
      if (newList[0]?.ketStatusKembali == "Bayar") {
        setTunaiDiterima(newList[0]?.balanceTotal);
      } else if (newList[0]?.ketStatusKembali == "Sebagian") {
        setTunaiDiterima(newList[0]?.balanceTotal / 2);
      }
      setBalanceTotal(newList[0]?.balanceTotal);
      setfaktur(
        newList?.map((ae) => {
          return { id: ae.referenceNbr, label: ae.referenceNbr };
        })
      );
      setKetKembali(newList[0]?.ketKembali);

      // setselectedfaktur([
      //   newList?.map((ae) => {
      //     return { id: ae.ReferenceNbr, label: ae.ReferenceNbr };
      //   }),
      // ]);
      // setsrcExpdate(newList[0]?.SrcExpDate);
    }
  }, [props.dataEdit]);

  const handleSave = async () => {
    props.setOpenEdit(false);
    const selectedfakturall = Data.filter((ae) => {
      return selectedfaktur.some((f) => {
        return f.id == ae.referenceNbr;
      });
    });
    const newfaktur = selectedfakturall.map((aaa) => {
      aaa.ketKembali = KetKembali;
      aaa.ketStatusKembali = KetStatusKembali;
      aaa.cashAccountID = "1102401";
      aaa.entryTypeID = "IN";
      aaa.extRefNbr = "IN";
      aaa.nomorFaktur = aaa.referenceNbr;
      aaa.tglKembali = moment(new Date()).format();
      aaa.tglPenagihan = moment(new Date()).format();
      let tunai = TunaiDiterima;
      if (KetStatusKembali == "Bayar") {
        aaa.balanceTotal = 0;
        aaa.balance = 0;
        aaa.tunaiDiterima = BalanceTotal;
      } else if (KetStatusKembali == "Sebagian" && TunaiDiterima > 0) {
        // tunai = parseInt(TunaiDiterima) - parseInt(aaa.balance);
        // aaa.balance = parseInt(aaa.balance) - parseInt(TunaiDiterima);
        // if (aaa.balance <= 0) {
        //   aaa.tunaiDiterima = aaa.balance;
        // } else {
        //   aaa.tunaiDiterima = Math.abs(tunai);
        //   setTunaiDiterima(tunai);
        // }
        if ((aaa.balance = aaa.balance - TunaiDiterima >= 0)) {
          aaa.balance = aaa.balance - TunaiDiterima;
          aaa.tunaiDiterima = TunaiDiterima;
        } else {
          aaa.balance = 0;
          aaa.tunaiDiterima = aaa.balance;
          setTunaiDiterima(Math.abs(aaa.balance - TunaiDiterima));
        }
      }
      // BalanceTotal BalanceTotal - TunaiDiterima;
      // aaa.
      return aaa;
    });
    console.log("selectedfakturall", selectedfakturall);
    console.log("ReferenceNbr", selectedfaktur);
    console.log("newfaktur", newfaktur);
    const newdata = props.DataSource.map((item) => {
      if (item.type == props.dataEdit) {
        item.isi = newfaktur;
      }
      return item;
    });
    console.log("KetStatusKembali", KetStatusKembali);
    console.log("newdata", newdata);
    props.setDataSource(newdata);
    props.setDataEdit("");
    setKetKembali("");
    setselectedfaktur([]);
  };

  // const getData = async (id) => {
  //   try {
  //     await axios
  //       .get(
  //         `${process.env.REACT_APP_DOMAIN_API}/StockItemReps/StockItemUOMConversion/${id}`
  //       )
  //       .then(function (response) {
  //         // handle success
  //         if (response.status === 200) {
  //           const resdata = response.data;

  //           setUomConversion(resdata);
  //           console.log("uom conversion", resdata);
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         console.log(error);
  //       });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // useEffect(() => {
  //   getData(1);
  // }, [searchText]);

  return (
    <React.Fragment>
      <Dialog
        open={props.openEdit}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => props.setOpenEdit(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Data Item</DialogTitle>
        <DialogContent>
          <Grid item md={12} xs={12} mt={3}>
            <NumberFormat
              thousandsGroupStyle="thousand"
              fullWidth
              label="Nilai Hutang"
              value={BalanceTotal}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              customInput={TextField}
              // onChange={(e) => setCRPrice(e.target.value)}
              displayType="input"
              type="text"
              thousandSeparator={true}
              allowNegative={false}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={12} xs={12} mt={3}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={KetStatusKembali}
              options={opsiStatus}
              onChange={(event, newValue) => {
                console.log(newValue);
                if (newValue.id == "Bayar") {
                  setTunaiDiterima(BalanceTotal);
                } else if (newValue.id == "Sebagian") {
                  setTunaiDiterima(BalanceTotal / 2);
                }
                setKetStatusKembali(newValue.id);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Status" />
              )}
            />
          </Grid>
          <Grid item md={12} xs={12} mt={3}>
            <Autocomplete
              // disablePortal
              multiple
              id="combo-box-demo"
              value={selectedfaktur}
              // defaultValue={faktur[0]}
              options={faktur}
              onChange={(event, newValue) => setselectedfaktur(newValue)}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Nomer Faktur" />
              )}
            />
          </Grid>
          <Grid item md={12} xs={12} mt={3}>
            <NumberFormat
              autoFocus
              thousandsGroupStyle="thousand"
              fullWidth
              label="Uang Diterima"
              value={TunaiDiterima}
              max={BalanceTotal}
              decimalScale={2}
              fixedDecimalScale={true}
              decimalSeparator="."
              customInput={TextField}
              onValueChange={(e) => {
                console.log("nbr credit", e);
                setTunaiDiterima(e.floatValue);
              }}
              // onChange={(e) => setCRPrice(e.target.value)}
              displayType="input"
              type="text"
              thousandSeparator={true}
              allowNegative={false}
              // inputProps={{
              //   readOnly: true,
              // }}
            />
          </Grid>
          <Grid item md={12} xs={12} mt={3}>
            <TextField
              autoFocus
              id="Keterangan"
              label="Keterangan"
              type="text"
              // color={!TunaiDiterimanbr || TunaiDiterimanbr == "" ? "warning" : ""}
              // focused={!TunaiDiterimanbr || TunaiDiterimanbr == "" ? true : false}
              value={KetKembali == "" ? " " : KetKembali}
              onChange={(e) => setKetKembali(e.target.value)}
              // disabled
              fullWidth
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenEdit(false);
              // setPrincipal("");
              // setSelectedCust(props.TempCustomer);
              props.setDataEdit("");
              setKetKembali("");
              setselectedfaktur([]);
              // setFilterCustomer(props.TempCustomer);
            }}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            disabled={selectedfaktur.length <= 0}
            onClick={handleSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
