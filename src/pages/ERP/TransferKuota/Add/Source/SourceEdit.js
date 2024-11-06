import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { useTransferKuotaContext } from "../../../../../contexts/Modules/TransferKuota/TransferKuotaContext";

export default function SourceEdit(props) {
  const { transferKuotaSourceDetailTransferRep } = useTransferKuotaContext();

  const [totalTransferQty, setTotalTransferQty] = useState(0);
  const [qtyUsed, setQtyUsed] = useState(0);
  const [sourceSelected, setSourceSelected] = useState("");

  useEffect(() => {
    if (props.dataEdit) {
      const selected = props.rowSource.find(
        (item) =>
          (item.id ?? item.TransferKuotaDetailSourceID) === props.dataEdit
      );
      setSourceSelected(selected);
      setTotalTransferQty(
        selected.QtyBeforeTransfer - selected.QtyAfterTransfer
      );
      // setkeep(newList[0].KeepKuota);
    }
  }, [props.dataEdit]);

  const EditRows = async () => {
    const newdata = props.rowSource.map((item, i) => {
      if (props.dataEdit === (item.id ?? item.TransferKuotaDetailSourceID)) {
        item.QtyAfterTransfer =
          sourceSelected.QtyBeforeTransfer - totalTransferQty;
        item.Qty = totalTransferQty - qtyUsed;
        item.TransferQty = totalTransferQty - qtyUsed;
        item.unAllo = totalTransferQty - qtyUsed;
      }
      return item;
    });
    props.setrowSource(newdata);
    props.setDataEdit("");
    props.setOpenEdit(false);
  };

  useEffect(() => {
    if (!!sourceSelected) {
      const idSourceTransfer =
        sourceSelected.id ?? sourceSelected.DetailSourceID;
      const filteredTransferMatchSource =
        transferKuotaSourceDetailTransferRep.filter(
          (transfer) => transfer.DetailSourceID === idSourceTransfer
        );
      console.log({ idSourceTransfer });
      let _qtyUsed = 0;
      filteredTransferMatchSource.forEach((transfer) => {
        _qtyUsed += transfer.Qty;
      });
      console.log({ filteredTransferMatchSource });

      setQtyUsed(_qtyUsed);
    }
  }, [transferKuotaSourceDetailTransferRep, props.openEdit, sourceSelected]);

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
              <TextField
                autoFocus
                id="srcqty"
                label="Qty Before Transfer"
                type="number"
                disabled
                value={sourceSelected.QtyBeforeTransfer}
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12} mt={2}>
              <NumberFormat
                thousandsGroupStyle="thousand"
                fullWidth
                required
                decimalScale={2}
                fixedDecimalScale={true}
                decimalSeparator="."
                customInput={TextField}
                onDoubleClick={(event) => event.stopPropagation()}
                label="Total Transfer Qty"
                value={totalTransferQty}
                inputProps={{
                  max: sourceSelected.QtyBeforeTransfer,
                  min: 0,
                }}
                onChange={(e) => {
                  setTotalTransferQty(parseFloat(e.target.value));
                }}
                onValueChange={(e) => {
                  setTotalTransferQty(e.floatValue);
                }}
                helperText={
                  totalTransferQty > sourceSelected.QtyBeforeTransfer
                    ? "Total Transfer QTY Melebih QTY Before Transfer"
                    : totalTransferQty < qtyUsed
                    ? "Total transfer QTY harus lebih besar dari QTY Used"
                    : ""
                }
                focused
                error={
                  totalTransferQty > sourceSelected.QtyBeforeTransfer ||
                  totalTransferQty < qtyUsed
                }
                color={
                  totalTransferQty > sourceSelected.QtyBeforeTransfer ||
                  totalTransferQty < qtyUsed
                    ? "warning"
                    : ""
                }
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                autoFocus
                id="qtyUsed"
                label="Qty Used"
                type="number"
                value={qtyUsed}
                disabled
                fullWidth
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                autoFocus
                id="srcqty"
                label="Qty After Transfer"
                type="number"
                value={sourceSelected.QtyBeforeTransfer - totalTransferQty}
                focused={
                  sourceSelected.QtyBeforeTransfer - totalTransferQty < 0
                    ? true
                    : ""
                }
                color={
                  sourceSelected.QtyBeforeTransfer - totalTransferQty < 0
                    ? "warning"
                    : ""
                }
                disabled
                fullWidth
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
            disabled={
              totalTransferQty > sourceSelected.QtyBeforeTransfer ||
              totalTransferQty < qtyUsed
            }
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
