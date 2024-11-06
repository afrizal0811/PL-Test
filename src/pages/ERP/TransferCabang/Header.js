/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import axios from "axios";
import * as Yup from "yup";
import swal from "sweetalert2";
import {
  Grid,
  Card as MuiCard,
  Paper as MuiPaper,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import {
  Reply,
  Save,
  Edit,
  Refresh,
  Add,
  Delete,
  MoreHoriz,
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import SearchIcon from "@material-ui/icons/Search";
import { DatePicker } from "@material-ui/lab";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import RefnbrPopup from "./RefnbrPopup";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import CbData from "../../../components/shared/dropdown";
import { getEmployeeName, getBrach } from "../../../utils/jwt";
import { GetConfig } from "../../../utils/ConfigHeader";
import SelectPopup from "../../../components/shared/SelectPopup";
import useFormIsUpdated from "../../../hooks/useFormIsUpdated";
import Swal from "sweetalert2";
import Loader from "../../../components/Loader";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);

let schema = Yup.object().shape({
  FrSiteCD: Yup.string().required(),
  ToBranchID: Yup.string().required(),
  ToSiteCD: Yup.string().required(),
});

export default function Header({
  type,
  selectionTCById,
  setSelectionTCById,
  getData,
  setLoading,
  loading,
  dataDetail,
  setDataDetail,
  setRequiredField,
  dataListDetail,
  getDataListDetail,
  isListTableUpdated,
  defaultValueForm,
}) {
  const [isRelease, setIsrelease] = useState(false);
  const [RefNbr, setRefNbr] = useState("");
  const [openRefnbr, setopenRefnbr] = useState(false);
  const [date, setDate] = useState(new Date());
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [FrBranchID, setFrBranchID] = useState(getBrach());
  const [ToBranchID, setToBranchID] = useState("");
  const [Descr, setDescr] = useState("");
  const [FrSiteCD, setFrSiteCD] = useState("");
  const [ToSiteCD, setToSiteCD] = useState("");
  const [TotalWeight, setTotalWeight] = useState("");
  const [TotalVolume, setTotalVolume] = useState("");
  const [WeightUOM, setWeightUOM] = useState("");
  const [VolumeUOM, setVolumeUOM] = useState("");
  const [DryCheck, setDryCheck] = useState(false);
  const [FrozenCheck, setFrozenCheck] = useState(false);
  const [Status, setStatus] = useState("On Hold");
  const [Owner, setOwner] = useState("");
  const [SONbr, setSONbr] = useState("");
  const [openWH, setopenWH] = useState(false);
  const [openWH2, setopenWH2] = useState(false);
  const [error, setError] = useState({
    FrSiteCD: false,
    ToSiteCD: false,
    ToBranchID: false,
  });
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const currentValueForm = {
    date,
    FrSiteCD,
    Descr,
    ToBranchID,
    ToSiteCD,
    SONbr,
    FrozenCheck,
    DryCheck,
  };

  const isFormHeaderUpdated = useFormIsUpdated(
    defaultValueForm,
    currentValueForm
  );
  const isFormUpdated = isFormHeaderUpdated || isListTableUpdated;

  const history = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const storageType = [];
    let totalVolume = 0;
    let totalWeight = 0;

    (dataListDetail || []).map((data) => {
      totalVolume += data.ExtVolume;
      totalWeight += data.ExtWeight;

      storageType.push(data.StorageType);

      data.RemainKuota < 0 || parseInt(data.TransferQty) > data.KuotaAvailable
        ? setIsrelease(true)
        : setIsrelease(false);

      return true;
    });

    if (!!dataDetail && type !== "add") {
      setRefNbr(dataDetail?.RefNbr);
      setFrBranchID(dataDetail?.FrBranchID);
      setToBranchID(dataDetail?.ToBranchID);
      setDate(dataDetail?.Date);
      setFrSiteCD(dataDetail?.FrSiteCD);
      setToSiteCD(dataDetail?.ToSiteCD);
      setTotalWeight(totalWeight);
      setTotalVolume(totalVolume);
      setWeightUOM(dataDetail?.WeightUOM);
      setVolumeUOM(dataDetail?.VolumeUOM);
      setDryCheck(dataDetail?.Dry ?? storageType.includes("Dry"));
      setFrozenCheck(dataDetail?.Frozen ?? storageType.includes("Frozen"));
      setStatus(dataDetail?.Status);
      setSONbr(dataDetail?.SONbr);
      setDescr(dataDetail?.Descr);

      if (dataDetail?.Status === "Released") {
        setIsFormDisabled(true);
      }
    }

    setOwner(getEmployeeName() || "");
  }, [dataDetail, dataListDetail]);

  useEffect(() => {
    if (
      location.pathname.includes("/transfer-cabang/detail") ||
      location.pathname.includes("/transfer-cabang/add")
    ) {
      setRequiredField(
        !!date &&
          !!ToBranchID &&
          !!FrSiteCD &&
          !!ToSiteCD &&
          (!!DryCheck || !!FrozenCheck)
      );
    }
  }, [date, ToBranchID, FrSiteCD, ToSiteCD, DryCheck, FrozenCheck]);

  const columnRefnbr = [
    {
      field: "RefNbr",
      headerName: "Ref Nbr.",
      width: 200,
    },
    {
      field: "BranchID",
      width: 200,
      headerName: "Branch",
    },
    {
      field: "Status",
      width: 200,
      headerName: "Status",
    },
    {
      field: "Date",
      width: 200,
      headerName: "Date",
    },
  ];

  const notifyDeleteConfirm = async (id) => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Hapus Data ini?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus",
      })
      .then((result) => {
        if (result.value) {
          !!params.id && HandleDeleteTransferCabang(id);
        }
      });
  };

  const HandleDeleteTransferCabang = async (id) => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}/DeleteTransferCabangById`,
          [id],
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = "/transfer-cabang";
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
      NotifyError("There was an error!", error.message);
      setLoading(false);
    }
  };

  const HandleSave = async ({ releaseCheck }) => {
    setLoading(true);

    try {
      // Validasi InventoryID di sini
      const existingInventoryIDs = new Set();
      let isDuplicateInventoryID = false;

      for (const item of dataListDetail) {
        if (existingInventoryIDs.has(item.InventoryID)) {
          isDuplicateInventoryID = true;
          break;
        }
        existingInventoryIDs.add(item.InventoryID);
      }

      if (isDuplicateInventoryID) {
        // Tampilkan pesan bahwa ada InventoryID yang sama
        swal
          .fire({
            title: "Gagal",
            text: "InventoryID sudah ada dalam data!",
            icon: "error",
            confirmButtonColor: "#3085d6",
          })
          .then(() => {
            window.location.reload();
          });
        setLoading(false);
        return;
      }

      const arrTc = dataListDetail.map((item) => ({
        TransferCabangDetailAllocatedID: item.TransferCabangDetailAllocatedID,
        TCRefNbr: RefNbr,
        InventoryID: item?.InventoryID,
        Descr: item?.Descr,
        UOM: item?.UOMSelected || item?.UOM,
        TransferQty: item?.TransferQty,
        KuotaAvailable: item?.KuotaAvailable,
        KuotaAvailableBase: item?.AvailableKuotaBase,
        KuotaAvailablePurchase: item?.AvailableKuotaPurchase,
        RemainKuota: item?.RemainKuota,
        LastUpdate: item?.LastUpdate,
        BaseItemWeight: item?.BaseItemWeight,
        ExtWeight: item?.ExtWeight,
        BaseItemVolume: item?.BaseItemVolume,
        ExtVolume: item?.ExtVolume,
        StorageType: item?.StorageType,
      }));

      const payload = {
        RefNbr,
        FrSiteCD,
        ToSiteCD,
        SONbr,
        Status,
        Date: date,
        FrBranchID,
        ToBranchID,
        Dry: DryCheck,
        Frozen: FrozenCheck,
        TotalWeight,
        TotalVolume,
        transferCabangDetailAllocatedRep: arrTc,
        Owner,
        Descr,
        BrnchID: FrBranchID,
        DateShipping: !params.id ? new Date() : dataDetail?.DateShipping,
      };

      let url = "";
      let message = "";

      if (!!params.id && !releaseCheck) {
        url = "/UpdateTransferCabang";
        message = "Data berhasil diperbarui!";
      } else if (!!params.id && releaseCheck) {
        url = `/UpdateTransferCabang/ReleaseById/${params.id}`;
        message = "Data berhasil direlease!";
      } else {
        url = "/CreateTransferCabang";
        message = "Data berhasil dibuatkan!";
      }

      const res = await axios({
        method: !params.id ? "post" : "put",
        url: `${process.env.REACT_APP_DOMAIN_API}${url}`,
        data: payload,
        ...GetConfig(),
      });

      schema
        .isValid({
          FrSiteCD: payload.FrSiteCD,
          ToBranchID: payload.ToBranchID,
          ToSiteCD: payload.ToSiteCD,
        })
        .then((valid) => {
          if (valid) {
            if (res.status >= 200 || res.status < 400) {
              swal
                .fire({
                  title: "Sukses",
                  text: message,
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                })
                .then(() => {
                  if (params.id) {
                    // getDataListDetail();
                    window.location.reload();
                  } else if (params.id && releaseCheck) {
                    // history("/transfer-cabang");
                    window.location.reload();
                  } else if (res.data.RefNbr) {
                    window.location.href = `/transfer-cabang/detail/${res.data.RefNbr}`;
                  } else {
                    window.location.href = "/transfer-cabang";
                  }

                  setSelectionTCById("");
                })
                .catch(function (error) {
                  // handle error
                  setSelectionTCById("");
                  NotifyError("There was an error!", error);
                });
            }
          }
        });

      schema
        .validate(
          {
            FrSiteCD: payload.FrSiteCD,
            ToBranchID: payload.ToBranchID,
            ToSiteCD: payload.ToSiteCD,
          },
          { abortEarly: false }
        )
        .catch(function (err) {
          let statusPath = err.inner.map((e) => e.path);

          setError({
            ...error,
            FrSiteCD: statusPath.includes("FrSiteCD"),
            ToBranchID: statusPath.includes("ToBranchID"),
            ToSiteCD: statusPath.includes("ToSiteCD"),
          });
        });

      setLoading(false);
    } catch (error) {
      NotifyError("There was an error!", error.response.data);
      setSelectionTCById("");
      setLoading(false);
    }
  };

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleDryCheck = (event) => {
    setDryCheck(event.target.checked);
    setDataDetail({ ...dataDetail, Dry: event.target.checked });
  };

  const handleFrozenCheck = (event) => {
    setFrozenCheck(event.target.checked);
    setDataDetail({ ...dataDetail, Frozen: event.target.checked });
  };

  const notifyConfirmSave = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        HandleSave({ releaseCheck: false });
      }
    });
  };

  const notifyConfirmRelease = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        HandleSave({ releaseCheck: true });
      }
    });
  };

  return (
    <div>
      <Grid container spacing={6} md={12} mt={3} pl={3}>
        {/* <IconButton
          component="span"
          onClick={() =>
            history(
              type && (type === "add" || type === "detail")
                ? "/transfer-cabang"
                : -1
            )
          }
        >
          <Reply />
        </IconButton> */}

        {type && (type !== "add" || type !== "detail") && (
          <>
            <IconButton
              component="span"
              // disabled={Loading}
              onClick={() => history("/transfer-cabang")}
            >
              <Reply />
            </IconButton>
            <IconButton
              component="span"
              disabled={Status === "Released" || !isFormUpdated}
              onClick={notifyConfirmSave}
            >
              <Save />
            </IconButton>
            <IconButton
              component="span"
              onClick={() => window.location.reload()}
            >
              <Refresh />
            </IconButton>
            <IconButton
              component="span"
              disabled={!params.id || Status === "Released" ? true : false}
              onClick={() => notifyDeleteConfirm(params.id)}
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
              aria-haspopup="true"
              component="span"
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
                  location.pathname === "/transfer-cabang/add" ||
                  isRelease ||
                  isFormDisabled ||
                  isFormUpdated
                }
                onClick={notifyConfirmRelease}
                sx={{ display: { xs: "block" } }}
              >
                <Typography fontSize="14px">Processing</Typography>
                <Typography fontSize="12px" color="primary">
                  Release
                </Typography>
              </MenuItem>
              <MenuItem
                disabled={false}
                onClick={() => null}
                sx={{ display: { xs: "block" } }}
              >
                <Typography fontSize="14px">Printing and Emailing</Typography>
                <Typography fontSize="12px" color="primary">
                  Print
                </Typography>
              </MenuItem>
            </Menu>
          </>
        )}
        {/* {!type && (
          <IconButton
            component="span"
            disabled={selectionTCById.length === 1 ? false : true}
            onClick={() =>
              history(`/transfer-cabang/detail/${selectionTCById}`)
            }
          >
            <Edit fontSize="small" />
          </IconButton>
        )} */}
      </Grid>
      {!!type && (
        <Card mt={3}>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item md={3}>
                <Paper mt={3}>
                  <TextField
                    label="Ref. Nbr"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={RefNbr}
                    onChange={(newValue) => {
                      setRefNbr(newValue);
                    }}
                    onClick={() => {
                      if (!isFormDisabled) setopenRefnbr(true);
                    }}
                    disabled={isFormDisabled}
                  />
                </Paper>
                <Paper mt={3}>
                  <DatePicker
                    label="Date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    inputFormat={"dd/MM/yyyy"}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                    disabled={isFormDisabled}
                  />
                </Paper>
                <Paper mt={3}>
                  <TextField
                    label="From Warehouse"
                    value={!FrSiteCD ? " " : FrSiteCD}
                    // size="small"
                    disabled={isFormDisabled}
                    fullWidth
                    InputProps={{
                      endAdornment: isFormDisabled ? (
                        ""
                      ) : (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onClick={() => {
                      // if (!!Data.FromWarehouseID) {
                      //   setopenAlloWH(true);
                      // } else {
                      //   alert("Input Source Warehouse terlebih dahulu");
                      // }
                      setopenWH(true);
                    }}
                  />
                  {/* <CbData
                    required={error.FrSiteCD}
                    label="From Warehouse"
                    fullWidth
                    value={FrSiteCD}
                    disabledId={ToSiteCD}
                    source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse?branch=${FrBranchID}`}
                    config={GetConfig()}
                    id="warehouseID"
                    onChange={(evt) => {
                      setFrSiteCD(evt);

                      setDataDetail((prevState) => ({
                        ...prevState,
                        FrSiteCD: evt,
                      }));

                      if (!!evt) {
                        setError({ ...error, FrSiteCD: false });
                      }
                    }}
                    disabled={isFormDisabled}
                  /> */}
                </Paper>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="Description"
                    fullWidth
                    value={Descr}
                    onChange={(e) => {
                      setDescr(e.target.value);
                    }}
                    disabled={isFormDisabled}
                  />
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper mt={3}>
                  <CbData
                    id="branchID"
                    label="From Branch"
                    fullWidth
                    value={FrBranchID}
                    source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
                    config={GetConfig()}
                    disabled
                  />
                </Paper>
                <Paper mt={3}>
                  <CbData
                    id="BranchID"
                    required={error.ToBranchID}
                    label="To Branch"
                    fullWidth
                    value={ToBranchID}
                    disabledId={FrBranchID}
                    source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
                    config={GetConfig()}
                    onChange={(evt) => {
                      setToBranchID(evt);

                      if (!!evt) {
                        setError({ ...error, ToBranchID: false });
                      }
                    }}
                    disabled={isFormDisabled}
                  />
                </Paper>
                <Paper mt={3}>
                  <TextField
                    label="To Warehouse"
                    value={!ToSiteCD ? " " : ToSiteCD}
                    // size="small"
                    disabled={isFormDisabled || !ToBranchID}
                    fullWidth
                    InputProps={{
                      endAdornment: isFormDisabled ? (
                        ""
                      ) : (
                        <InputAdornment>
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onClick={() => {
                      // if (!!Data.FromWarehouseID) {
                      //   setopenAlloWH(true);
                      // } else {
                      //   alert("Input Source Warehouse terlebih dahulu");
                      // }
                      setopenWH2(true);
                    }}
                  />
                  {/* <CbData
                    required={error.ToSiteCD}
                    label="To Warehouse"
                    fullWidth
                    value={ToSiteCD}
                    defaultValue={ToSiteCD}
                    disabledId={FrSiteCD}
                    source={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/DropDown/Warehouse?branch=${ToBranchID}`}
                    config={GetConfig()}
                    id="warehouseID"
                    onChange={(evt) => {
                      console.log("evt: ", evt);
                      setToSiteCD(evt);

                      setDataDetail((prevState) => ({
                        ...prevState,
                        ToSiteCD: evt,
                      }));

                      if (!!evt) {
                        setError({ ...error, ToSiteCD: false });
                      }
                    }}
                    disabled={isFormDisabled}
                  /> */}
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="Total Weight"
                    value={TotalWeight}
                    fullWidth
                    disabled
                    onChange={(e) => {
                      setTotalWeight(e.target.value);
                    }}
                  />
                </Paper>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="Total Volume"
                    value={TotalVolume}
                    fullWidth
                    disabled
                    onChange={(e) => {
                      setTotalVolume(e.target.value);
                    }}
                  />
                </Paper>
                <Grid container spacing={4}>
                  <Grid item md={6}>
                    <Paper mt={3}>
                      <TextField
                        id="outlined-helperText"
                        label="Weight UOM"
                        value={WeightUOM}
                        fullWidth
                        disabled
                        onChange={(e) => {
                          setWeightUOM(e.target.value);
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item md={6}>
                    <Paper mt={3}>
                      <TextField
                        id="outlined-helperText"
                        label="Volume UOM"
                        value={VolumeUOM}
                        fullWidth
                        disabled
                        onChange={(e) => {
                          setVolumeUOM(e.target.value);
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Paper mt={3}>
                  <Grid container spacing={12}>
                    <Grid item md={3}>
                      <Paper mt={6}>
                        <Checkbox
                          onChange={handleDryCheck}
                          value={DryCheck}
                          checked={DryCheck}
                          disabled={isFormDisabled}
                        />
                        Dry
                      </Paper>
                    </Grid>
                    <Grid item md={3}>
                      <Paper mt={6}>
                        <Checkbox
                          onChange={handleFrozenCheck}
                          value={FrozenCheck}
                          checked={FrozenCheck}
                          disabled={isFormDisabled}
                        />
                        Frozen
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item md={3}>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="Status"
                    fullWidth
                    value={Status}
                    disabled
                  />
                </Paper>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="Owner"
                    fullWidth
                    disabled
                    value={Owner}
                  />
                </Paper>
                <Paper mt={3}>
                  <TextField
                    id="outlined-helperText"
                    label="SO Nbr"
                    fullWidth
                    value={SONbr}
                    onChange={(e) => {
                      setSONbr(e.target.value);
                    }}
                    disabled={isFormDisabled}
                  />
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
          <RefnbrPopup
            open={openRefnbr}
            setopen={(e) => {
              setopenRefnbr(e);
            }}
            href={"transfer-cabang"}
            label={"Transfer Cabang"}
            id={"RefNbr"}
            column={columnRefnbr}
            api={`${process.env.REACT_APP_DOMAIN_API}/GetTransferCabangByPagination?`}
            config={GetConfig()}
          />
        </Card>
      )}
      <SelectPopup
        open={openWH}
        name={"Warehouse"}
        all
        api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/Branch/${FrBranchID}`}
        config={GetConfig()}
        id={"WarehouseID"}
        desc={"Description"}
        setopen={(e) => {
          setopenWH(e);
        }}
        Temp={FrSiteCD}
        setTemp={(evt) => {
          setFrSiteCD(evt.WarehouseID);
          setDataDetail((prevState) => ({
            ...prevState,
            FrSiteCD: evt.WarehouseID,
          }));

          if (!!evt.WarehouseID) {
            setError({ ...error, FrSiteCD: false });
          }
          // setData({
          //   ...Data,
          //   FromBranchID: e.Branch,
          //   FromWarehouseID: e.WarehouseID,
          // });
          // }
          console.log("e", evt);
        }}
      />
      <SelectPopup
        open={openWH2}
        name={"Warehouse"}
        all
        api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/Branch/${ToBranchID}`}
        config={GetConfig()}
        id={"WarehouseID"}
        desc={"Description"}
        setopen={(e) => {
          setopenWH2(e);
        }}
        Temp={ToSiteCD}
        setTemp={(evt) => {
          setToSiteCD(evt.WarehouseID);
          setToBranchID(evt.Branch);
          setDataDetail((prevState) => ({
            ...prevState,
            ToBranchID: evt.Branch,
            ToSiteCD: evt.WarehouseID,
          }));

          if (!!evt.WarehouseID) {
            setError({ ...error, ToSiteCD: false, ToBranchID: false });
          }
          // setData({
          //   ...Data,
          //   FromBranchID: e.Branch,
          //   FromWarehouseID: e.WarehouseID,
          // });
          // }
          console.log("e", evt);
        }}
      />
    </div>
  );
}
