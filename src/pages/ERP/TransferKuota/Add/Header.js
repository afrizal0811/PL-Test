import { spacing } from "@material-ui/system";
import {
  Add,
  Delete,
  MoreHoriz,
  Refresh,
  Reply,
  Save,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Card as MuiCard,
  TextField,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import CbData from "../../../../components/shared/dropdown";
import SelectPopup from "../../../../components/shared/SelectPopup";
import { useTransferKuotaContext } from "../../../../contexts/Modules/TransferKuota/TransferKuotaContext";
import { GetConfig } from "../../../../utils/ConfigHeader";
import {
  getBrach,
  getEmployee,
  getEmployeeName,
  getRoleName,
} from "../../../../utils/jwt";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import MutasiKuotaPopup from "./MutasiKuotaPopup";
import RefnbrPopup from "./RefnbrPopup";
import SourceSection from "./Source/index";
import TransferSection from "./Transfer";

const Card = styled(MuiCard)(spacing);

export default function Header(props) {
  const history = useNavigate();
  const { id } = useParams();
  const isEditPage = !!id;

  const {
    status,
    setStatus,
    date,
    setDate,
    sourceBranchID,
    setSourceBranchID,
    allocatedBranchID,
    setAllocatedBranchID,
    fromWarehouseID,
    setFromWarehouseID,
    allocatedWarehouseID,
    setAllocatedWarehouseID,
    description,
    setDescription,
    createdByID,
    setCreatedByID,
    rejectReason,
    setRejectReason,
    approveReason,
    setApproveReason,
    reject,
    setreject,
    approve,
    setApprove,
    openSourceWarehouse,
    setOpenSourceWarehouse,
    openAllocatedWarehouse,
    setOpenAllocatedWarehouse,
    openRefNbr,
    setOpenRefNbr,
    openMutasiKuota,
    setOpenMutasiKuota,
    transferKuotaDetailSourceRep,
    setTransferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
    approvedByID,
    setApprovedByID,
    approvedDate,
    setApprovedDate,
    defaultValueForm,
    setDefaultValueForm,
    isFormUpdated,
  } = useTransferKuotaContext();

  console.log({ transferKuotaDetailSourceRep });

  const [actionMenu, setActionMenu] = useState(null);
  const [loading, setLoading] = useState(false);

  const employee = getEmployee() + " - " + getEmployeeName();

  React.useEffect(() => {
    if (id) {
      getDataDetail(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataDetail = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetTransferKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data;
            setAllocatedBranchID(resdata.AllocatedBranchID ?? "");
            setAllocatedWarehouseID(resdata.AllocatedWarehouseID ?? "");
            setCreatedByID(resdata.CreatedByID ?? "");
            setDate(resdata.Date ?? "");
            setFromWarehouseID(resdata.FromWarehouseID ?? "");
            setSourceBranchID(resdata.SourceBranchID ?? "");
            setStatus(resdata.Status ?? "");
            setTransferKuotaDetailSourceRep(
              resdata.TransferKuotaDetailSourceRep ?? ""
            );
            setTransferKuotaSourceDetailTransferRep(
              resdata.TransferKuotaSourceDetailTransferRep ?? ""
            );
            setRejectReason(resdata?.RejectReason ?? "");
            setApprovedByID(resdata?.ApprovedByID ?? "");
            setApprovedDate(resdata?.ApprovedDate ?? "");
            setDescription(resdata.Description ?? "");
            setDefaultValueForm({
              allocatedBranchID: resdata.AllocatedBranchID ?? "",
              allocatedWarehouseID: resdata.AllocatedWarehouseID ?? "",
              fromWarehouseID: resdata.FromWarehouseID ?? "",
              date: resdata.Date ?? "",
              description: resdata.Description ?? "",
              transferKuotaDetailSourceRep:
                resdata.TransferKuotaDetailSourceRep ?? "",
              transferKuotaSourceDetailTransferRep:
                resdata.TransferKuotaSourceDetailTransferRep ?? "",
            });
          }
        })
        .catch(function (error) {
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/DeleteTransferKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/transfer-kuota`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  const notifyConfirmDelete = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan hapus data ini?",
      text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    }).then((result) => {
      if (result.value) {
        deleteData(id);
      }
    });
  };

  const notifyConfirmApprove = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        closeMenu();
        handleApprove();
      }
    });
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
        id ? handleUpdate() : handleSave();
      }
    });
  };

  const notifyConfirmSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.value) {
        closeMenu();
        handleSubmit();
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_API}/CreateTransferKuota`,
        {
          screenNo: "SAW200005",
          createdByID: getEmployee(),
          brnchID: getBrach(),
          allocatedBranchID,
          allocatedWarehouseID,
          date,
          fromWarehouseID,
          sourceBranchID,
          status,
          transferKuotaDetailSourceRep,
          transferKuotaSourceDetailTransferRep,
          description,
        },
        GetConfig()
      );
      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        NotifySuccess("success", "Data telah disimpan");
        setTimeout(() => {
          window.location.href = `/transfer-kuota/detail/${response.data.RefNbr}`;
        }, 800);
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_DOMAIN_API}/UpdateTransferKuota`,
        {
          refNbr: id,
          screenNo: "SAW200005",
          createdByID: getEmployee(),
          brnchID: getBrach(),
          allocatedBranchID,
          allocatedWarehouseID,
          date,
          fromWarehouseID,
          sourceBranchID,
          status,
          transferKuotaDetailSourceRep,
          transferKuotaSourceDetailTransferRep,
          description,
        },
        GetConfig()
      );
      if (response.status === 200 || response.status === 204) {
        NotifySuccess("success", "Data telah diubah");
        setTimeout(() => {
          window.location.href = `/transfer-kuota/detail/${id}`;
        }, 800);
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    }
    setLoading(false);
  };

  const toggleMenu = (event) => {
    setActionMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setActionMenu(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (
        transferKuotaDetailSourceRep.some((source) => source.TransferQty < 0)
      ) {
        NotifyError(
          "There was an error!",
          `Qty pada Item ${
            transferKuotaDetailSourceRep.filter(
              (dataSource) => dataSource.TransferQty < 0
            )[0].InventoryID
          } melebihi batas`
        );
      } else {
        const response = await axios.put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateTransferKuota/Submit`,
          {
            refNbr: id,
            status: "Waiting Confirmation",
            screenNo: "SAW200005",
            createdByID: getEmployee(),
            brnchID: getBrach(),
            allocatedBranchID,
            allocatedWarehouseID,
            date,
            fromWarehouseID,
            sourceBranchID,
            transferKuotaDetailSourceRep,
            transferKuotaSourceDetailTransferRep,
            description,
          },
          GetConfig()
        );
        setActionMenu(null);
        // handle success
        if (response.status === 200 || response.status === 204) {
          NotifySuccess("success", "Data telah disubmit");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      NotifyError("There was an error!", error);
    }
    setLoading(false);
  };

  const handleApprove = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/UpdateTransferKuota/Approve?refNbr=${id}&user=${getEmployee()}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          setActionMenu(null);
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah diapprove");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/UpdateTransferKuota/Reject?refNbr=${id}&user=${getEmployee()}&reason=${rejectReason}`,
          {},
          GetConfig()
        )
        .then(function (response) {
          setActionMenu(null);
          // handle success
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah direject");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3}>
        <IconButton
          component="span"
          disabled={loading}
          onClick={() => history("/transfer-kuota")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={
            isEditPage
              ? !isFormUpdated ||
                loading ||
                !sourceBranchID ||
                !fromWarehouseID ||
                !allocatedBranchID ||
                !allocatedWarehouseID ||
                status !== "On Hold"
              : loading ||
                !sourceBranchID ||
                !fromWarehouseID ||
                !allocatedBranchID ||
                !allocatedWarehouseID ||
                status !== "On Hold"
          }
          onClick={notifyConfirmSave}
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
              window.location.href = `/transfer-kuota/add`;
            }, 800);
          }}
        >
          <Add />
        </IconButton>
        <IconButton
          component="span"
          disabled={loading || !id || status !== "On Hold"}
          onClick={() => notifyConfirmDelete(id)}
        >
          <Delete />
        </IconButton>
        <IconButton
          aria-owns={Boolean(actionMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          component="span"
          // disabled={Loading}
          onClick={toggleMenu}
        >
          <MoreHoriz />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={actionMenu}
          open={Boolean(actionMenu)}
          onClose={closeMenu}
        >
          <MenuItem
            disabled={
              isEditPage
                ? isFormUpdated ||
                  !transferKuotaSourceDetailTransferRep ||
                  status !== "On Hold" ||
                  !id ||
                  !sourceBranchID ||
                  !fromWarehouseID ||
                  !allocatedBranchID ||
                  !allocatedWarehouseID ||
                  transferKuotaDetailSourceRep.filter(
                    (a) => a.TransferQty !== 0
                  ).length > 0 ||
                  transferKuotaDetailSourceRep.length === 0 ||
                  transferKuotaSourceDetailTransferRep.length === 0
                : !transferKuotaSourceDetailTransferRep ||
                  status !== "On Hold" ||
                  !id ||
                  !sourceBranchID ||
                  !fromWarehouseID ||
                  !allocatedBranchID ||
                  !allocatedWarehouseID ||
                  transferKuotaDetailSourceRep.filter(
                    (a) => a.TransferQty !== 0
                  ).length > 0 ||
                  transferKuotaDetailSourceRep.length === 0 ||
                  transferKuotaSourceDetailTransferRep.length === 0
            }
            onClick={notifyConfirmSubmit}
          >
            {"Submit"}
          </MenuItem>
          <MenuItem
            disabled={
              status !== "Waiting Confirmation" ||
              getRoleName() !== "Admin Supply Chain"
            }
            onClick={notifyConfirmApprove}
          >
            {"Confirm & Approve"}
          </MenuItem>
          <MenuItem
            disabled={
              status !== "Waiting Confirmation" ||
              getRoleName() !== "Admin Supply Chain"
            }
            onClick={() => {
              closeMenu();
              setreject(true);
            }}
          >
            {"Reject"}
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onClick={() => setOpenRefNbr(true)}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <CbData
                source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
                id={"BranchID"}
                desc={"BranchName"}
                disabled={status !== "On Hold"}
                size="small"
                label="Allocated Branch"
                value={allocatedBranchID}
                defaultValue={allocatedBranchID}
                onChange={(data) => {
                  setAllocatedBranchID(data);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <TextField
                label="Allocated Warehouse"
                value={allocatedWarehouseID ?? ""}
                size="small"
                disabled={
                  status !== "On Hold" ||
                  allocatedWarehouseID ||
                  !allocatedBranchID
                }
                fullWidth
                InputProps={{
                  endAdornment:
                    status === "On Hold" ? (
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
                  setOpenAllocatedWarehouse(true);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Approve By"
                  size="small"
                  type="text"
                  value={approvedByID ?? ""}
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
                disabled={status !== "On Hold"}
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Status"
                  size="small"
                  type="text"
                  value={status ?? ""}
                  disabled
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                label="Source Warehouse"
                value={fromWarehouseID ?? ""}
                size="small"
                disabled={status !== "On Hold" || !fromWarehouseID}
                fullWidth
                InputProps={{
                  endAdornment:
                    status === "On Hold" ? (
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
                  setOpenSourceWarehouse(true);
                }}
              />
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Approve Date"
                  size="small"
                  type="text"
                  value={
                    approvedDate
                      ? moment(approvedDate).format("DD-MM-YYYY")
                      : ""
                  }
                  disabled
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Description"
                  size="small"
                  type="text"
                  value={description ?? ""}
                  disabled={status !== "On Hold"}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Owner"
                  size="small"
                  type="text"
                  value={createdByID ?? ""}
                  disabled
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={3}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Reject Reason"
                  size="small"
                  type="text"
                  value={rejectReason ?? ""}
                  disabled
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
          </Grid>
          <SourceSection />
          <TransferSection />
        </CardContent>
        <Dialog
          open={reject}
          onClose={(e) => setreject(false)}
          sx={{ zIndex: 1 }}
        >
          <DialogTitle>Reject Reason</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Jika sudah yakin untuk melakukan Reject, Anda dapat menambahkan
              reason dibawah
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="RejectReason"
              type="text"
              fullWidth
              value={rejectReason}
              variant="standard"
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                setreject(false);
                setRejectReason("");
              }}
            >
              Batal
            </Button>
            <Button
              disabled={rejectReason?.trim() === ""}
              onClick={(e) => {
                if (rejectReason.trim().length > 50) {
                  NotifyError("Panjang karakter melebihi batas");
                } else {
                  handleReject();
                  setreject(false);
                }
              }}
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
        <RefnbrPopup
          open={openRefNbr}
          setOpenRefNbr={setOpenRefNbr}
          href={"transfer-kuota"}
          label={"Transfer Kuota"}
          id={"RefNbr"}
          api={`${process.env.REACT_APP_DOMAIN_API}/GetTransferKuotaByPagination?`}
        />
        <SelectPopup
          open={openSourceWarehouse}
          name={"Warehouse"}
          all
          api={`${
            process.env.REACT_APP_DOMAIN_API
          }/WarehouseReps/Branch/${getBrach()}`}
          config={GetConfig()}
          id={"WarehouseID"}
          desc={"Description"}
          setopen={setOpenSourceWarehouse}
          Temp={fromWarehouseID}
          setTemp={(data) => {
            setFromWarehouseID(data.WarehouseID);
            setSourceBranchID(data.Branch);
          }}
        />
        <SelectPopup
          open={openAllocatedWarehouse}
          name={"Warehouse"}
          all
          api={`${process.env.REACT_APP_DOMAIN_API}/WarehouseReps/Branch/${allocatedBranchID}`}
          config={GetConfig()}
          id={"WarehouseID"}
          desc={"Description"}
          setopen={(e) => {
            setOpenAllocatedWarehouse(e);
          }}
          Temp={allocatedWarehouseID}
          setTemp={(data) => {
            setAllocatedBranchID(data.Branch);
            setAllocatedWarehouseID(data.WarehouseID);
          }}
        />
        <MutasiKuotaPopup
          open={openMutasiKuota}
          setopen={setOpenMutasiKuota}
          label={"Mutasi Kuota"}
          id={"MutasiKuota"}
          searchParams={{
            warehouseID: fromWarehouseID,
            branchID: sourceBranchID,
          }}
        />
      </Card>
    </>
  );
}
