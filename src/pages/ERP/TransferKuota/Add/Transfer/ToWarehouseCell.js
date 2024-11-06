import SearchIcon from "@material-ui/icons/Search";
import {
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SelectPopup from "../../../../../components/shared/SelectPopup";
import { useTransferKuotaContext } from "../../../../../contexts/Modules/TransferKuota/TransferKuotaContext";
import { GetConfig } from "../../../../../utils/ConfigHeader";

const ToWarehouseCell = ({
  index,
  value,
  isInEditModeZona,
  selectedRows,
  rowId,
  branchId,
  rows,
  setRows,
}) => {
  const { allocatedWarehouseID } = useTransferKuotaContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <FormControl style={{ width: "100%" }}>
        <TextField
          label=""
          value={value ?? ""}
          disabled={!isInEditModeZona}
          fullWidth
          InputProps={{
            endAdornment: isInEditModeZona ? (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ) : (
              ""
            ),
          }}
          onClick={() => {
            console.log({ index });
            if (!selectedRows.includes(rowId)) return;
            setIsModalOpen(true);
          }}
        />
      </FormControl>
      <SelectPopup
        open={isModalOpen}
        maxWidth={"sm"}
        name={"Warehouse"}
        all
        api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/Branch/${branchId}`}
        config={GetConfig()}
        id={"WarehouseID"}
        desc={"Description"}
        setopen={(e) => {
          console.log({ index });
          setIsModalOpen(e);
        }}
        setTemp={(data) => {
          const newRows = rows.map((row, idx) => {
            if (idx === index) {
              return { ...row, ToWarehouseID: data.WarehouseID };
            }
            return row;
          });
          setRows(newRows);
        }}
      />
    </>
  );
};

export default ToWarehouseCell;
