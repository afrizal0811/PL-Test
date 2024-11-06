import React, { useEffect, useState } from "react";
// import DestinationTable from "./DestinationTable";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
// import { columnsSource } from "./ColumnSouce";
// import { columnsDestination } from "./ColumnDestination";
import moment from "moment";
import NumberFormat from "react-number-format";

export default function SourceEdit(props) {
  const [AlloKuota, setAlloKuota] = useState(0);
  const [keep, setkeep] = useState("");
  const [srcLotnbr, setsrcLotnbr] = useState("");
  const [srcExpdate, setsrcExpdate] = useState("");
  const [srcList, setsrcList] = useState("");

  useEffect(() => {
    // getData();
    console.log("props.dataedit", props.dataEdit);
    if (props.dataEdit !== "") {
      const newList = props.rowSource.filter(
        (item) => item.id === props.dataEdit
      );
      console.log("list", newList);
      setsrcList(newList[0]);
      setAlloKuota(newList[0].AlloKuota);
      setkeep(newList[0].KeepKuota);
    }
  }, [props.dataEdit]);

  const EditRows = async () => {
    const newdata = props.rowSource.map((item, i) => {
      if (props.dataEdit === item.id) {
        item.AlloKuota = AlloKuota;
        item.KeepKuota = srcList.SrcQty - AlloKuota;
        item.SrcExpDate = moment(srcExpdate).format("YYYY-MM-DD");
        item.UnAlloKuota =
          AlloKuota -
          props.DataAllo.filter(
            (ab) => ab.InventoryID == item.InventoryID
          ).reduce((n, { DstAlloKuota }) => n + DstAlloKuota, 0);
        // item.MasterApprovalRepTransaksiID = menuID.transaksiID;
      }
      return item;
    });
    props.setrowSource(newdata);
    // props.setDriver(newdata);
    props.setDataEdit("");
    props.setOpenEdit(false);
  };

  return (
    <>
      <Dialog
        open={props.openEdit}
        fullWidth={true}
        maxWidth={"sm"}
        onClose={() => props.setOpenEdit(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Data Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} md={12} mt={2}>
            <Grid item md={12} xs={12}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                // label="Price (Include PPN)"
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                autoFocus
                id="srcqty"
                label="Source Qty"
                type="number"
                value={srcList.SrcQty}
              />
            </Grid>
            <Grid item md={12} xs={12} mt={2}>
              {/* <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                // label="Price (Include PPN)"
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                autoFocus
                id="Allocated"
                label="Allocated Kuota"
                type="number"
                value={AlloKuota}
                inputProps={{
                  max: srcList.SrcQty,
                  min: 0,
                }}
                onChange={(e) => {
                  setAlloKuota(e.target.value);
                }}
                focused
                color={AlloKuota > srcList.SrcQty ? "warning" : ""}
              /> */}
              <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                label="Allocated Kuota"
                value={AlloKuota}
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                onChange={(e) => setAlloKuota(e.target.value)}
                displayType="input"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
                color={AlloKuota > srcList.SrcQty ? "warning" : ""}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                // label="Price (Include PPN)"
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                autoFocus
                id="srcqty"
                label="Keep Kuota"
                type="number"
                value={srcList.SrcQty - AlloKuota}
                focused={srcList.SrcQty - AlloKuota < 0 ? true : ""}
                color={srcList.SrcQty - AlloKuota < 0 ? "warning" : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setOpenEdit(false);
              props.setDataEdit("");
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={EditRows}
            disabled={AlloKuota > srcList.SrcQty}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
