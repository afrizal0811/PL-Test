import { Delete, MoreHoriz, Refresh, Reply, Save } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { DatePicker } from "@mui/lab";
import {
  Button,
  CardContent,
  CircularProgress,
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
import { spacing } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  useBlocker,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import Swal from "sweetalert2";
import {
  NotifyError,
  NotifySuccess,
} from "../../../services/notification.service";
import SourceTable from "./Source/index";

// import AllocatedTable from "./Allocated/index";
// import RefnbrPopup from "./RefnbrPopup";
import CbData from "../../../../components/shared/dropdown";
import { GetConfig } from "../../../../utils/ConfigHeader";
import { getBrach } from "../../../../utils/jwt";
import RefnbrPopup from "../../ERPPopup/RefnbrPopup";
import MutasiKuotaPopup from "./MutasiKuotaPopup";

const Card = styled(MuiCard)(spacing);

function AlertDialog({ isBlocking }) {
  function useCallbackPrompt(when) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = useCallback(() => {
      setShowPrompt(false);
    }, []);

    const handleBlockedNavigation = useCallback(
      (nextLocation) => {
        if (
          !confirmedNavigation &&
          nextLocation.location.pathname !== location.pathname
        ) {
          setShowPrompt(true);
          setLastLocation(nextLocation);
          return false;
        }
        return true;
      },
      [confirmedNavigation]
    );

    const confirmNavigation = useCallback(() => {
      setShowPrompt(false);
      setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        navigate(lastLocation.location.pathname);
      }
    }, [confirmedNavigation, lastLocation]);

    useBlocker(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
  }
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(isBlocking);
  return (
    <Dialog
      open={showPrompt}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Unsaved Changes"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Sepertinya Anda telah mengedit sesuatu. Jika Anda keluar sebelum
          menyimpan, perubahan yang Anda buat akan hilang.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmNavigation} color="primary">
          Keluar
        </Button>
        <Button onClick={cancelNavigation} color="primary" autoFocus>
          Back to Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Header(props) {
  const [Data, setData] = useState("");
  const [anchorMenu, setAnchorMenu] = useState(null);
  // const [counter, setcounter] = useState(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [Status, setStatus] = useState("");
  const [Warehouse, setWarehouse] = useState("");
  const [branch, setbranch] = useState(getBrach());
  const [descr, setDescription] = useState("");
  // const [ResetMode, setResetMode] = useState(false);
  const [openRefnbr, setopenRefnbr] = useState(false);
  const [openMutasiKuota, setopenMutasiKuota] = useState(false);
  const [DataSource, setDataSource] = useState([]);
  const [DataAllo, setDataAllo] = useState([]);
  const [Last, setLast] = useState([]);
  const [isBlocking, setIsBlocking] = useState(false);
  const [AnyChanges, setAnyChanges] = useState(0);
  // const [Header, setHeader] = useState({});

  const history = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    // console.log(id);
    getLast();
    if (id != undefined) {
      getData(id);
    } else {
      setStatus("On Hold");
    }
  }, []);

  React.useEffect(() => {
    // console.log(id);
    if (AnyChanges > 1 && Status != "Released") {
      setIsBlocking(true);
    }
  }, [Status, AnyChanges]);

  const getLast = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetAllocatedKuotaByPagination?page=1&rowsCount=1`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            console.log("res", response);
            const resdata = response.data[0];
            if (resdata.record.length > 0) {
              setLast(resdata.record);
            }
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  const getData = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetAllocatedKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data;
            var index = 0;
            var tempDataAllo = [];
            resdata.AllocatedKuotaDetailSourceRep.map((item1) => {
              item1.AllocatedKuotaSourceDetailAllocatedRep.map((item2) => {
                item2.id = index++;
                tempDataAllo.push(item2);
              });
            });
            setDataAllo(tempDataAllo);
            setData(resdata);
            setDate(resdata.Date);
            setbranch(resdata.BranchID);
            setWarehouse(resdata.FromWarehouseID);
            setStatus(resdata.Status);
            setDescription(resdata.Descr);
          }
        })
        .catch(function (error) {
          // handle error
          // console.log(error);
          NotifyError("There was an error!", error);
        });
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/DeleteAllocatedKuotaById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/allocated-kuota`;
            }, 800);
          }
        })
        .catch(function (error) {
          // handle error
          NotifyError("There was an error!", error);
          // console.log(error);
        });
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setLoading(false);
      NotifyError("There was an error!", error);
    }
  };

  const notifyConfirm = async (id) => {
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

  const ConfirmReset = async (id) => {
    Swal.fire({
      title: "Apakah Anda yakin melakukan reset data ini?",
      // text: "Anda tidak akan bisa mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Reset",
    }).then((result) => {
      if (result.value) {
        resetRefnbr(id);
      }
    });
  };

  const resetRefnbr = async (id) => {
    setLoading(true);
    try {
      const payload = {
        refNbr: id,
      };
      console.log("header payload", payload);
      // console.log(payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateAllocatedKuota/ResetByrefNbr?refNbr=${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah disimpan");
            // props.getDataSource();
            // setcounter(counter + 1);
            setTimeout(() => {
              window.location.reload();
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
    setIsBlocking(false);
  };

  const HandleSave = async () => {
    setLoading(true);
    try {
      const arralo = DataSource.map((item, i) => {
        return {
          AllocatedKuotaDetailSourceID: item.AllocatedKuotaDetailSourceID,
          DetailSourceID: item.DetailSourceID,
          InventoryID: item.InventoryID,
          Descr: item.Descr,
          SrcQty: item.SrcQty,
          UOM: item.UOM,
          AlloKuota: item.AlloKuota,
          KeepKuota: item.KeepKuota,
          UnAlloKuota:
            item.AlloKuota -
            DataAllo.filter((ab) => ab.InventoryID === item.InventoryID).reduce(
              (n, { DstAlloKuota }) => n + DstAlloKuota,
              0
            ),
          AllocatedRefNbr: item.AllocatedRefNbr,
          AllocatedKuotaSourceDetailAllocatedRep: DataAllo.filter(
            (ab) => ab.InventoryID === item.InventoryID
          ).map((ao) => {
            return ao;
          }),
        };
      });

      const payload = {
        RefNbr: Data.RefNbr,
        Date: date,
        BranchID: Data.BranchID,
        Status: Data.Status,
        Descr: descr,
        FromWarehouseID: Data.FromWarehouseID,
        AllocatedKuotaDetailSourceRep: arralo,
        ScreenNo: "SAW300021",
      };
      console.log("header payload", payload);
      // console.log(payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateAllocatedKuota`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah disimpan");
            // props.getDataSource();
            // setcounter(counter + 1);
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
    setIsBlocking(false);
  };

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

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

  const handleRelease = async () => {
    setLoading(true);
    try {
      const arralo = DataSource.map((item, i) => {
        return {
          AllocatedKuotaDetailSourceID: item.AllocatedKuotaDetailSourceID,
          DetailSourceID: item.DetailSourceID,
          InventoryID: item.InventoryID,
          Descr: item.Descr,
          SrcQty: item.SrcQty,
          UOM: item.UOM,
          AlloKuota: item.AlloKuota,
          KeepKuota: item.KeepKuota,
          UnAlloKuota:
            item.AlloKuota -
            DataAllo.filter((ab) => ab.InventoryID === item.InventoryID).reduce(
              (n, { DstAlloKuota }) => n + DstAlloKuota,
              0
            ),
          AllocatedRefNbr: item.AllocatedRefNbr,
          AllocatedKuotaSourceDetailAllocatedRep: DataAllo.filter(
            (ab) => ab.InventoryID === item.InventoryID
          ).map((ao) => {
            return ao;
          }),
        };
      });

      //payload lama
      // const payload = {
      //   RefNbr: Data.RefNbr,
      //   Date: date,
      //   BranchID: Data.BranchID,
      //   Status: Data.Status,
      //   Descr: descr,
      //   FromWarehouseID: Data.FromWarehouseID,
      //   AllocatedKuotaDetailSourceRep: arralo,
      //   ScreenNo: "SAW300021",
      // };

      //payload baru
      const payload = {
        refNbr: Data.RefNbr,
        lastModifiedByScreenID: "SAW300021",
      };
      console.log("header payload", payload);
      await axios
        .put(
          `${process.env.REACT_APP_DOMAIN_API}/UpdateAllocatedKuota/Released`,
          payload,
          GetConfig()
        )
        .then(function (response) {
          setAnchorMenu(null);
          // handle success
          console.log(response);
          if (response.status === 200 || response.status === 204) {
            NotifySuccess("success", "Data telah dirilis");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            // props.getDataSource();
            // setcounter(counter + 1);
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

  return (
    <>
      <Grid container spacing={6} md={12} mt={3} pl={3}>
        <IconButton
          component="span"
          disabled={loading}
          onClick={() => history("/allocated-kuota")}
        >
          <Reply />
        </IconButton>
        <IconButton
          component="span"
          disabled={loading || Status !== "On Hold"}
          onClick={() => HandleSave()}
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
          disabled={loading || !id || Status === "Released"}
          onClick={() => notifyConfirm(id)}
        >
          <Delete />
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
              DataSource.filter((aw) => aw.UnAlloKuota < 0).length > 0 ||
              DataSource.filter((aw) => aw.UnAlloKuota != 0).length > 0 ||
              Data.Status === "Released" ||
              DataAllo.length == 0 ||
              isBlocking ||
              loading
            }
            onClick={handleRelease}
          >
            Release
          </MenuItem>
          {/* <MenuItem
            disabled={!!id ? false : true}
            onClick={() => {
              // setopenMutasiKuota(true);
              ConfirmReset(id);
              setAnchorMenu(null);
            }}
          >
            Reset
          </MenuItem> */}
          {/* <MenuItem
            disabled={!!id ? false : true}
            onClick={() => {
              console.log(
                "DataSource 1",
                DataSource.filter((aw) => aw.UnAlloKuota < 0).length > 0
              );
              console.log("isBlocking", isBlocking);
              console.log(
                "DataSource 2",
                DataSource.filter((aw) => aw.UnAlloKuota != 0).length > 0
              );
              // setopenMutasiKuota(true);
              // ConfirmReset(id);
              // setAnchorMenu(null);
            }}
          >
            Reset
          </MenuItem> */}
        </Menu>
      </Grid>
      <Card mt={3} mb={3}>
        <CardContent>
          <Grid container spacing={4} md={9}>
            <Grid item md={4}>
              <TextField
                label="Reference Nbr"
                value={id ? id : " "}
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
                // value={RefNbr}
                // onChange={(newValue) => {
                //   setRefNbr(RefNbr);
                // }}
                onClick={() => setopenRefnbr(true)}
              />
            </Grid>
            <Grid item md={4}>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  label="Status"
                  type="text"
                  value={Status ? Status : " "}
                  disabled
                  // onChange={(e) => {
                  //   setStatus(e.target.value);
                  // }}
                  style={{ width: "100%" }}
                />
              </FormControl>
            </Grid>
            <Grid item md={4}>
              <DatePicker
                label="Date"
                InputLabelProps={{
                  shrink: true,
                }}
                inputFormat={"dd/MM/yyyy"}
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              {/* <TextField
                label="Warehouse"
                type="text"
                value={Warehouse}
                onChange={leavePage}
                style={{ width: "100%" }}
              /> */}
              <CbData
                value={Warehouse == "" ? " " : `${Warehouse}`}
                defaultValue={Warehouse == "" ? " " : `${Warehouse}`}
                required
                disabled={DataSource.length > 0}
                label="Warehouse"
                source={`${
                  process.env.REACT_APP_DOMAIN_API
                }/WarehouseReps/DropDown/Warehouse?branch=${getBrach()}`}
                id="warehouseID"
                desc="description"
                onChange={(e) => {
                  setWarehouse(e);
                  console.log("e", e);
                }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Branch"
                type="text"
                value={branch}
                // onChange={(e) => {
                //   setbranch(e.target.value);
                // }}
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <TextField
                label="Description"
                type="text"
                value={!!descr ? descr : " "}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setIsBlocking(event.target.value.length > 0);
                }}
                // onChange={leavePage}
                style={{ width: "100%" }}
              />
            </Grid>
            {/* <Grid item md={4} xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={ResetMode} onChange={handleResetMode} />
                }
                label="Reset Mode"
              />
            </Grid> */}
          </Grid>

          {/* <Grid item md={4}>
              <TextField
                label="Description"
                type="text"
                value={description}
                onChange={e => { setName(e.target.value);}}
              />
            </Grid> */}
          {loading ? (
            <Grid container justifyContent="center" DCacing={1} md={12} xs={12}>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <CircularProgress
                  disableShrink
                  style={{ textAlign: "center" }}
                />
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <h1 style={{ textAlign: "center" }}>Loading</h1>
              </Grid>
              <Grid item xs={12} justifyContent="center" alignItems="center">
                <Timer
                  active={true}
                  duration={null}
                  style={{ textAlign: "center", marginBottom: 20 }}
                >
                  <Timecode />
                </Timer>
              </Grid>
            </Grid>
          ) : (
            <SourceTable
              Warehouse={Warehouse}
              RefNbr={id}
              Status={Status}
              Date={date}
              BranchID={branch}
              Descr={descr}
              DataAllo={DataAllo}
              // counter={counter}
              setAnyChanges={(isChange) => {
                if (isChange) {
                  setAnyChanges(AnyChanges + 1);
                }
              }}
              setLoading={(e) => setLoading(e)}
              loading={loading}
              setDataSource={(e) => {
                // if (e.length != DataSource.length) {
                //   setAnyChanges(AnyChanges + 1);
                // }
                setDataSource(e);
              }}
              setDataAllo={(e) => {
                if (e.length != DataAllo.length) {
                  setAnyChanges(AnyChanges + 1);
                }
                setDataAllo(e);
              }}
            />
          )}
        </CardContent>
        <RefnbrPopup
          open={openRefnbr}
          setopen={(e) => {
            setopenRefnbr(e);
          }}
          href={"allocated-kuota"}
          label={"Allocated Kuota"}
          id={"RefNbr"}
          column={columnRefnbr}
          api={`${process.env.REACT_APP_DOMAIN_API}/GetAllocatedKuotaByPagination?`}
        />
        <MutasiKuotaPopup
          open={openMutasiKuota}
          setopen={(e) => {
            setopenMutasiKuota(e);
          }}
          label={"Mutasi Kuota"}
          id={"MutasiKuota"}
          searchParams={{
            warehouseID: Warehouse,
            branchID: branch,
          }}
        />
        <AlertDialog isBlocking={isBlocking} />
      </Card>
    </>
  );
}
