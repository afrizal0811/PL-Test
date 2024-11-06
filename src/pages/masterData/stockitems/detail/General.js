import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField as MuiTextField,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const TextField = styled(MuiTextField)(spacing);

TabGeneral.propTypes = {
  ItemClass: PropTypes.any,
  ItemType: PropTypes.any,
  IsAKit: PropTypes.any,
  TaxCategory: PropTypes.any,
  ValuationMethod: PropTypes.any,
  PostingClass: PropTypes.any,
  LotSerialClass: PropTypes.any,
  DefaultWarehouseID: PropTypes.any,
  DefaultIssueLocationID: PropTypes.any,
  DefaultReceiptLocationID: PropTypes.any,
  BaseUOM: PropTypes.any,
  SalesUOM: PropTypes.any,
  PurchaseUOM: PropTypes.any,
  Group: PropTypes.any,
  Principal: PropTypes.any,
  Kelompok: PropTypes.any,
  F1Pallet: PropTypes.any,
};

export default function TabGeneral(props) {
  console.log("INI GUH PROPS", props);
  return (
    <>
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
                value={
                  !props.ItemClass || props.ItemClass == ""
                    ? " "
                    : props.ItemClass
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="itemType"
                label="Item Type"
                value={
                  !props.ItemType || props.ItemType == "" ? " " : props.ItemType
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <FormControlLabel
                control={<Checkbox checked={props.IsAKit} name="gilad" />}
                label="Is a Kit"
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="valuationMethod"
                label="Valuation Method"
                value={
                  !props.ValuationMethod || props.ValuationMethod == ""
                    ? " "
                    : props.ValuationMethod
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="taxCategory"
                label="Tax Category"
                value={
                  !props.TaxCategory || props.TaxCategory == ""
                    ? " "
                    : props.TaxCategory
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="postingClass"
                label="posting Class"
                value={
                  !props.PostingClass || props.PostingClass == ""
                    ? " "
                    : props.PostingClass
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="lot/serialclass"
                label="Lot/Serial Class"
                value={
                  !props.LotSerialClass || props.LotSerialClass == ""
                    ? " "
                    : props.LotSerialClass
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
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
                value={
                  !props.DefaultWarehouseID || props.DefaultWarehouseID == ""
                    ? " "
                    : props.DefaultWarehouseID
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="defaultIssueFrom"
                label="Default Issue From"
                value={
                  !props.DefaultIssueLocationID ||
                  props.DefaultIssueLocationID == ""
                    ? " "
                    : props.DefaultIssueLocationID
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="defaultReceiptTo"
                label="Default Receipt To"
                value={
                  !props.DefaultReceiptLocationID ||
                  props.DefaultReceiptLocationID == ""
                    ? " "
                    : props.DefaultReceiptLocationID
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <u>
                <h1>Additional Info</h1>
              </u>
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="group"
                label="Group"
                value={!props.Group || props.Group == "" ? " " : props.Group}
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="principal"
                label="Principal"
                value={
                  !props.Principal || props.Principal == ""
                    ? " "
                    : props.Principal
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="kelompok"
                label="Kelompok"
                value={
                  !props.Kelompok || props.Kelompok == "" ? " " : props.Kelompok
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={6} xs={6}>
              <TextField
                name="f1Pallet"
                label="1 Pallet"
                value={
                  !props.F1Pallet || props.F1Pallet == "" ? " " : props.F1Pallet
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
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
                value={
                  !props.BaseUOM || props.BaseUOM == "" ? " " : props.BaseUOM
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="salesUnit"
                label="Sales Unit"
                value={
                  !props.SalesUOM || props.SalesUOM == "" ? " " : props.SalesUOM
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item md={12} xs={6}>
              <TextField
                name="purchaseUnit"
                label="Purchase Unit"
                value={
                  !props.PurchaseUOM || props.PurchaseUOM == ""
                    ? " "
                    : props.PurchaseUOM
                }
                fullWidth
                variant="outlined"
                my={2}
                InputLabelProps={{
                  shrink: true,
                  readOnly: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
