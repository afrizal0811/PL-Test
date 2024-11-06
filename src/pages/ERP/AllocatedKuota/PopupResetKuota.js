import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import ItemPopup from "../../../components/shared/ItemPopup";
import SelectPopup from "../../../components/shared/SelectPopup";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";
import { NotifySuccess } from "../../services/notification.service";

const PopupResetKuota = ({ open, setOpen }) => {
  const [isModalOpenFromWarehouse, setIsModalOpenFromWarehouse] =
    React.useState(false);
  const [isModalOpenInventory, setIsModalOpenInventory] = React.useState(false);

  const [valueFromWarehouse, setValueFromWarehouse] = React.useState("");
  const [valueInventoryId, setValueInventoryId] = React.useState("");

  const [isLoading, setIsLoading] = React.useState(false);

  const closePopup = () => {
    setOpen(false);
    setValueFromWarehouse("");
    setValueInventoryId("");
  };

  const handleClickProccess = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Reset",
      customClass: {
        container: "swal-z-max",
      },
    }).then(async (result) => {
      if (result.value) {
        setIsLoading(true);
        try {
          const response = await axios.put(
            `${
              process.env.REACT_APP_DOMAIN_API
            }/ResetKuota/${getBrach()}?branchId=${getBrach()}&FromWarehouseID=${valueFromWarehouse}&InventoryID=${valueInventoryId}`,
            undefined,
            GetConfig()
          );
          if (response.status === 200) {
            closePopup();
            NotifySuccess("success", "Kuota telah direset").then(() =>
              window.location.reload()
            );
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          throw new Error(error);
        }
      }
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={isLoading ? undefined : closePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Reset Kuota
          <IconButton
            disabled={isLoading}
            aria-label="close"
            onClick={closePopup}
            style={{ position: "absolute", right: "5px", top: "5px" }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4} md={12}>
            <Grid item md={12} xs={12} marginTop="8px">
              <TextField
                label="From Branch"
                value={getBrach()}
                disabled
                fullWidth
                required
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                label="From Warehouse"
                value={valueFromWarehouse}
                fullWidth
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => setIsModalOpenFromWarehouse(true)}
              />
            </Grid>

            <Grid item md={12} xs={12}>
              <TextField
                label="Inventory ID"
                value={valueInventoryId}
                fullWidth
                style={{ width: "100%" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => setIsModalOpenInventory(true)}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClickProccess}
            color="primary"
            variant="contained"
            disabled={isLoading}
          >
            Proccess
          </Button>
          <Button
            onClick={closePopup}
            color="primary"
            variant="outlined"
            disabled={isLoading}
          >
            Keluar
          </Button>
        </DialogActions>
      </Dialog>
      <SelectPopup
        open={isModalOpenFromWarehouse}
        name={"Warehouse"}
        all
        api={`${
          process.env.REACT_APP_DOMAIN_API
        }/WarehouseReps/Branch/${getBrach()}`}
        config={GetConfig()}
        id={"WarehouseID"}
        desc={"Description"}
        setopen={setIsModalOpenFromWarehouse}
        Temp={valueFromWarehouse}
        setTemp={(value) => {
          setValueFromWarehouse(value.WarehouseID);
        }}
      />
      <ItemPopup
        open={isModalOpenInventory}
        setopen={setIsModalOpenInventory}
        Temp={valueFromWarehouse}
        label={"Item"}
        id={"inventoryID"}
        desc={"description"}
        api={`${process.env.REACT_APP_DOMAIN_API}/StockItemReps/DropDown/StockItem?inventoryID=`}
        setTemp={(value) => {
          setValueInventoryId(value.inventoryID);
        }}
      />
    </>
  );
};

export default PopupResetKuota;
