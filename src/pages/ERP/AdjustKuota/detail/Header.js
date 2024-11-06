import { Add, MoreHoriz, Refresh, Reply, Save } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Card as MuiCard,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import SelectPopup from "../../../../components/shared/SelectPopup";
import useFormIsUpdated from "../../../../hooks/useFormIsUpdated";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import Table from "./Table";

const Card = styled(MuiCard)(spacing);

export default function Header(props) {
  const history = useNavigate();
  const { id } = useParams();

  const [Data, setData] = useState("");
  const [TableData, setTableData] = useState([]);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openWH, setopenWH] = useState(false);

  const [defaultValueForm, setDefaultValueForm] = useState(null);

  const currentValue = {
    FromWarehouseID: Data.FromWarehouseID,
    Date: Data.Date,
    Description: Data.Description ?? "",
    KuotaAdjustmentDetailRep: TableData,
  };

  const isFormUpdated = useFormIsUpdated(defaultValueForm, currentValue);

  React.useEffect(() => {
    if (!!id) {
      setLoading(true);
      getData(id).then((res) => {
        if (res.status) {
          console.log(res);
          setData(res.data);
          if (!!res.data?.KuotaAdjustmentDetailRep) {
            const stockItemConversion = res.data.KuotaAdjustmentDetailRep.map(
              (item) => {
                if (item.MutasiKuotaID) {
                  return getAvailable(
                    item.MutasiKuotaID,
                    res.data.FromWarehouseID
                  ).then((res) => {
                    if (res.status) {
                      return {
                        data: res.data,
                        detail: res.detail,
                      };
                    }
                  });
                }
                return 0;
              }
            );
            const promiseAll = Promise.all(
              [stockItemConversion].map((innerPromiseArray) =>
                Promise.all(innerPromiseArray)
              )
            );
            promiseAll.then((value) => {
              const newData = res.data.KuotaAdjustmentDetailRep.map(
                (allData, idx) => {
                  const newObj = {
                    ...allData,
                    KuotaAvailable: value?.[0]?.[idx]?.data,
                  };
                  return newObj;
                }
              );
              console.log("newdata", newData);
              setTableData(newData);
              setDefaultValueForm({
                FromWarehouseID: res.data.FromWarehouseID ?? "",
                Date: res.data.Date ?? "",
                Description: res.data.Description ?? "",
                KuotaAdjustmentDetailRep: newData ?? [],
              });
            });
          }
        }
      });
      setLoading(false);
    } else {
      setData({
        ...Data,
        StatusAdjustment: "On Hold",
        Date: new Date(),
      });
    }
  }, []);

  const getAvailable = (mutasiID, wh) => {
    // setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_DOMAIN_API}/GetMutasiKuotaSummaryByPagination?page=1&rowsCount=1&mutasiKuotaID=${mutasiID}&isDry=true&isFrozen=true&warehouseID=${wh}`,
            GetConfig()
          )
          .then(function (response) {
            // handle success
            if (response.status === 200) {
              const resdata = response.data[0].record[0]?.AvailableKuotaBase;

              resolve({
                status: true,
                data: resdata,
                detail: response.data?.[0]?.record?.[0],
              });
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            reject({ status: false, error });
          });
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        reject({ status: false, error });
        // setLoading(false);
      }
    });
  };

  const getData = async (id) => {
    // setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        await axios
          .get(
            `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/GetKuotaAdjustmentRepByPagination?page=1&rowsCount=1&RefNbr=${id}`,
            GetConfig()
          )
          .then(function (response) {
            // handle success
            if (response.status === 200 && response.data.record.length > 0) {
              const resdata = response.data.record[0];
              resolve({ status: true, data: resdata });
            }
          })
          .catch(function (error) {
            // handle error
            NotifyError("There was an error!", error);
            reject({ status: false, error });
          });
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
        NotifyError("There was an error!", error);
      }
    });
  };

  const HandleSave = async () => {
    setLoading(true);
    try {
      const detail = TableData.map((item, i) => {
        return {
          mutasiKuotaID: item.MutasiKuotaID,
          inventoryID: item.InventoryID,
          inventoryDescription: item.InventoryDescription,
          adjusmentQty: item.AdjusmentQty,
          uom: item.UOM,
          date: Data.Date,
        };
      });

      const payload = [
        {
          fromBranchID: Data.FromBranchID,
          fromWarehouseID: Data.FromWarehouseID,
          date: Data.Date,
          description: Data.Description,
          kuotaAdjustmentDetailRep: detail,
          statusAdjustment: "On Hold",
          branchID: getBrach(),
        },
      ];
      console.log("payload Data", payload);
      console.log("detail", detail);

      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/InsertKuotaAdjustment`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204
          ) {
            NotifySuccess("success", "Data telah disimpan");
            setTimeout(() => {
              window.location.href = `/adjustment-kuota/detail/${response.data[0].RefNbr}`;
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

  const HandleUpdate = async () => {
    setLoading(true);
    try {
      const detail = TableData.map((item, i) => {
        let data = {
          refNbr: Data.RefNbr,
          mutasiKuotaID: item.MutasiKuotaID,
          inventoryID: item.InventoryID,
          inventoryDescription: item.InventoryDescription,
          adjusmentQty: item.AdjusmentQty,
          uom: item.UOM,
          date: Data.Date,
          fromWarehouseID: item.FromWarehouseID,
        };

        return data;
      });
      const payload = [
        {
          refNbr: Data.RefNbr,
          fromBranchID: Data.FromBranchID,
          kuotaAdjustmentID: Data.KuotaAdjustmentID,
          fromWarehouseID: Data.FromWarehouseID,
          date: Data.Date,
          description: Data.Description,
          kuotaAdjustmentDetailRep: detail,
          statusAdjustment: "On Hold",
          branchID: getBrach(),
        },
      ];
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/UpdateKuotaAdjustment`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah diubah");
            window.location.reload();
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

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleProcess = async () => {
    setLoading(true);
    console.log("data", Data);
    try {
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/ReleaseKuotaAdjustment?KuotaAdjustmentId=${Data.KuotaAdjustmentID}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          setAnchorMenu(null);
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah diAdjust");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            // props.getDataSource();
            // setcounter(counter + 1);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error.response.data);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3}>
        <IconButton
          component="span"
          disabled={loading}
          onClick={() => history("/adjustment-kuota")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            id
              ? !isFormUpdated ||
                loading ||
                !Data.FromBranchID ||
                !Data.FromWarehouseID ||
                String(Data.StatusAdjustment).toLowerCase() !== "on hold"
              : loading ||
                !Data.FromBranchID ||
                !Data.FromWarehouseID ||
                String(Data.StatusAdjustment).toLowerCase() !== "on hold"
          }
          onClick={() => {
            id ? HandleUpdate() : HandleSave();
          }}
        >
          <Save />
        </IconButton>
        <IconButton
          component="span"
          disabled={loading}
          onClick={() => window.location.reload()}
        >
          <Refresh />
        </IconButton>
        <IconButton
          component="span"
          disabled={loading || !id}
          onClick={() => {
            setTimeout(() => {
              window.location.href = `/adjustment-kuota/add`;
            }, 800);
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          component="span"
          // disabled={Loading}
          onClick={toggleMenu}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorMenu}
          open={Boolean(anchorMenu)}
          onClose={closeMenu}
        >
          <MenuItem
            disabled={
              id
                ? isFormUpdated ||
                  !TableData ||
                  String(Data?.StatusAdjustment).toLowerCase() !== "on hold" ||
                  !id ||
                  !Data.KuotaAdjustmentID ||
                  loading
                : !TableData ||
                  String(Data?.StatusAdjustment).toLowerCase() !== "on hold" ||
                  !id ||
                  !Data.KuotaAdjustmentID ||
                  loading
            }
            onClick={() => {
              closeMenu();
              handleProcess();
            }}
          >
            {"Processing"}
          </MenuItem>
        </Menu>
      </Grid>
      <Card mt={3} mb={3}>
        <CardContent>
          <Grid container spacing={4} md={12}>
            <Grid item md={3}>
              <TextField
                label="Reference Nbr"
                value={id ? id : " "}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                label="Warehouse ID"
                value={
                  Data?.FromWarehouseID === undefined
                    ? " "
                    : Data.FromWarehouseID
                }
                size="small"
                disabled={
                  String(Data?.StatusAdjustment).toLowerCase() !== "on hold"
                }
                fullWidth
                InputProps={{
                  endAdornment:
                    String(Data?.StatusAdjustment).toLowerCase() ===
                    "on hold" ? (
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
                  setopenWH(true);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Status"
                  size="small"
                  type="text"
                  value={
                    Data?.StatusAdjustment === undefined
                      ? " "
                      : Data.StatusAdjustment
                  }
                  disabled
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <DatePicker
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                disabled={
                  String(Data?.StatusAdjustment).toLowerCase() !== "on hold"
                }
                value={Data.Date}
                onChange={(newValue) => {
                  setData({
                    ...Data,
                    Date: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Description"
                  size="small"
                  type="text"
                  value={
                    Data?.Description === undefined ? " " : Data.Description
                  }
                  disabled={
                    String(Data?.StatusAdjustment).toLowerCase() !== "on hold"
                  }
                  onChange={(e) => {
                    setData({
                      ...Data,
                      Description: e.target.value,
                    });
                  }}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <SelectPopup
          open={openWH}
          name={"Warehouse"}
          all
          api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps`}
          config={GetConfig()}
          id={"WarehouseID"}
          desc={"Description"}
          setopen={(e) => {
            setopenWH(e);
          }}
          Temp={Data.FromWarehouseID}
          setTemp={(e) => {
            const {
              KuotaAdjustmentDetailRep,
              FromBranchID,
              FromWarehouseID,
              Description,
              ...NewData
            } = Data;
            setData({
              ...NewData,
              FromBranchID: e.Branch,
              FromWarehouseID: e.WarehouseID,
            });
            setTableData([]);
            // }
            console.log("e", e);
          }}
        />
      </Card>
      <Table
        Data={Data}
        TableData={TableData}
        setTableData={(e) => setTableData(e)}
        loading={loading}
      />
    </>
  );
}
