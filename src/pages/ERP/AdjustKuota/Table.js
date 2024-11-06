import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { useNavigate } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { spacing } from "@material-ui/system";
import Button from "@material-ui/core/Button";
import swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Paper as MuiPaper,
  IconButton,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { GetConfig } from "../../../utils/ConfigHeader";
import { DesktopDatePicker } from "@material-ui/lab";
import { Clear, Search } from "@mui/icons-material";
import PopupImport from "./PopupImport";
import CbData from "../../../components/shared/dropdown";
import SelectPopup from "../../../components/shared/SelectPopup";
import Loader from "../../../components/Loader";
import { getBrach } from "../../../utils/jwt";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const QuickSearch = ({ value, onChange, onClear, placeholder = "" }) => {
  return (
    <TextField
      placeholder={`Search ${placeholder}…`}
      onChange={onChange}
      fullWidth
      value={value}
      size="small"
      InputProps={{
        startAdornment: <Search fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? "visible" : "hidden" }}
            onClick={onClear}
          >
            <Clear fontSize="small" />
          </IconButton>
        ),
      }}
      sx={{
        m: (theme) => theme.spacing(0),
        "& .MuiSvgIcon-root": {
          mr: 2,
        },
        "& .MuiInput-underline:before": {
          borderBottom: 1,
          borderColor: "divider",
        },
        float: "right",
      }}
    />
  );
};

QuickSearch.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  column: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default function AdjustmentKuotaTable(props) {
  const [selection, setSelection] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const history = useNavigate();
  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);
  const [start, setstart] = React.useState(null);
  const [branch, setbranch] = React.useState("");
  const [Status, setStatus] = React.useState("ALL");
  const [WH, setWH] = React.useState("");
  const [openWH, setopenWH] = React.useState(false);
  const [openImport, setopenImport] = React.useState(false);
  const [refNbr, setRefNbr] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getData(1);
  }, [pageSize, start, refNbr, description, Status, branch, WH]);

  // Ini untuk pengaturan header
  const columns = [
    // {
    //   field: "KuotaAdjustmentID",
    //   headerName: "KuotaAdjustment ID",
    //   sortable: false,
    //   width: 130,
    //   // renderCell: (params) => (
    //   //   <>
    //   //     <p>{`AK-000${params.row.KuotaAdjustmentID.slice(0, 2)}`}</p>
    //   //   </>
    //   // ),
    // },
    {
      field: "RefNbr",
      headerName: "Ref Nbr.",
      sortable: false,
      width: 130,
      // renderCell: (params) => (
      //   <>
      //     <p>{`AK-000${params.row.KuotaAdjustmentID.slice(0, 2)}`}</p>
      //   </>
      // ),
    },
    {
      field: "Description",
      headerName: "Description",
      sortable: false,
      width: 170,
      // renderCell: (params) => (
      //   <>
      //     <p>{`AK-000${params.row.KuotaAdjustmentID.slice(0, 2)}`}</p>
      //   </>
      // ),
    },
    {
      field: "StatusAdjustment",
      headerName: "Status",
      sortable: false,
      width: 150,
    },
    {
      field: "Date",
      headerName: "Date",
      sortable: false,
      type: "Date",
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY")}</p>
        </>
      ),
      width: 105,
    },
    {
      field: "BranchID",
      headerName: "Branch ID",
      sortable: false,
      width: 105,
    },
    {
      field: "CreatedByID",
      headerName: "Created By",
      sortable: false,
      width: 105,
    },
    {
      field: "id",
      headerName: "Action",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      renderCell: (params) => (
        <strong>
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => {
              props.setDetail(
                data.filter(
                  (ae) => ae.KuotaAdjustmentID == params.row.KuotaAdjustmentID
                )[0]
              );
              history(`/adjustment-kuota/detail/${params.row.RefNbr}`);
              // history(
              //   `/adjustment-kuota/detail/${params.row.KuotaAdjustmentID}}`
              // );
            }}
          >
            Detail
          </Button>
          <Button
            variant="text"
            color="error"
            size="small"
            style={{ marginLeft: 8 }}
            disabled={params.row.StatusAdjustment == "On Hold" ? false : true}
            startIcon={<DeleteIcon />}
            onClick={() =>
              notifyConfirm(params.row.KuotaAdjustmentID, params.row.RefNbr)
            }
          >
            Delete
          </Button>
        </strong>
      ),
    },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async (page) => {
    // alert("Get data adjustment in progress development");
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/KuotaAdjustment/GetKuotaAdjustmentRepByPagination?page=${page}&rowsCount=${pageSize}${
            start !== null ? "&date=" + moment(start).format("YYYY-MM-DD") : ""
          }&RefNbr=${refNbr}&FromBranchID=${
            !!branch ? branch : ""
          }&FromWarehouseID=${WH}&Description=${description}&StatusAdjustment=${
            Status == "ALL" ? "" : Status
          }&branch=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          console.log("response", response);

          // handle success
          if (response.status == 200) {
            const resdata = response.data;
            console.log("res", resdata);
            setData(resdata.record);
            settotalPage(resdata.totalCountData);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const deleteData = async (KuotaAdjustmentID, id) => {
    setLoading(true);
    try {
      await axios
        .delete(
          `${process.env.REACT_APP_DOMAIN_API}/KuotaAdjustment/DeleteKuotaAdjustmentById/${id}?KuotaAdjustmentID=${KuotaAdjustmentID}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status == 200 || response.status == 204) {
            NotifySuccess("success", "Data telah dihapus");
            setTimeout(() => {
              window.location.href = `/adjustment-kuota`;
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

  // // ini untuk pop up notifikasi
  const notifyConfirm = async (KuotaAdjustmentID, id) => {
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
          console.log("ini di swal delete, result = ", result);
          console.log("ini di swal delete, id = ", id);
          deleteData(KuotaAdjustmentID, id);
        }
      });
  };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => {
            // if (data.filter((ae) => ae.Status == "On Hold").length > 0) {
            //   NotifyError("Error!", "Terdapat transfer kuota yang belum rilis");
            // } else {
            props.setDetail("Add");
            history("add");
            // }
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button>
        <Button
          color="primary"
          onClick={() => {
            // history("add");
            setopenImport(true);
          }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Import
        </Button>
      </GridToolbarContainer>
    );
  }

  CustomToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  return (
    <Card mb={6}>
      <Grid container spacing={4} mb={1} px={2} mt={3}>
        <Grid item md={4}>
          <DesktopDatePicker
            disabled={loading}
            label="Date"
            inputFormat={"dd/MM/yyyy"}
            value={start}
            onChange={(newValue) => {
              setstart(newValue);
              console.log("date", newValue);
            }}
            cancelText
            renderInput={(params) => (
              <TextField {...params} size="small" fullWidth />
            )}
          />
        </Grid>
        <Grid item md={4}>
          <QuickSearch
            value={refNbr}
            placeholder="Ref. Nbr"
            onChange={(evt) => setRefNbr(evt.target.value)}
            onClear={() => setRefNbr("")}
          />
        </Grid>
        <Grid item md={4}>
          <FormControl size="small" style={{ width: "100%" }}>
            <InputLabel id="Status">Status</InputLabel>
            <Select
              labelId="Status"
              label="Status"
              size="small"
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
              id="Status"
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"On Hold"}>On Hold</MenuItem>
              <MenuItem value={"Released"}>Released</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <QuickSearch
            value={description}
            placeholder="Description"
            onChange={(evt) => setDescription(evt.target.value)}
            onClear={() => setDescription("")}
          />
        </Grid>
        {/* <Grid item md={4}>
          <QuickSearch
            value={description}
            placeholder="Description"
            onChange={(evt) => setDescription(evt.target.value)}
            onClear={() => setDescription("")}
          />
        </Grid> */}
        <Grid item md={4}>
          <CbData
            source={`${process.env.REACT_APP_DOMAIN_API}/BranchReps/DropDown/Branch`}
            id={"BranchID"}
            desc={"BranchName"}
            size="small"
            label="Branch"
            value={!!branch ? branch : "ALL"}
            defaultValue={!!branch ? branch : "ALL"}
            onChange={(e) => {
              setbranch(e);
              // setData({
              //   ...Data,
              //   AllocatedBranchID: e,
              //   // AllocatedWarehouseID: "",
              // });
              console.log("e", e);
            }}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            label="Warehouse"
            value={!!WH ? WH : "ALL"}
            size="small"
            // disabled={Data.Status !== "On Hold" || !Data.FromWarehouseID}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {!!WH ? (
                    <>
                      <IconButton
                        onClick={() => setWH("")}
                        // disabled={Loading}
                      >
                        <Clear />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => {
                          setopenWH(true);
                        }}
                        // disabled={oading}
                      >
                        <SearchIcon />
                      </IconButton>
                    </>
                  )}
                </InputAdornment>
              ),
            }}
            onClick={() => {
              if (!WH) {
                setopenWH(true);
              }
            }}
          />
        </Grid>
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              rows={data}
              getRowId={(r) => r.KuotaAdjustmentID}
              columns={columns}
              pageSize={pageSize}
              disableColumnFilter
              disableColumnMenu
              density="compact"
              autoHeight
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                // console.log(data[selection[0]]);
              }}
              components={{
                Toolbar: () => (
                  <GridToolbarContainer>
                    <Button
                      color="primary"
                      onClick={() => {
                        // if (data.filter((ae) => ae.Status == "On Hold").length > 0) {
                        //   NotifyError("Error!", "Terdapat transfer kuota yang belum rilis");
                        // } else {
                        props.setDetail("Add");
                        history("add");
                        // }
                      }}
                      disableElevation
                    >
                      <span>
                        <AddIcon
                          style={{ height: "16px", verticalAlign: "sub" }}
                        />
                      </span>
                      Add
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        // history("add");
                        setopenImport(true);
                      }}
                      disableElevation
                    >
                      <span>
                        <AddIcon
                          style={{ height: "16px", verticalAlign: "sub" }}
                        />
                      </span>
                      Import
                    </Button>
                  </GridToolbarContainer>
                ),
              }}
              // componentsProps={}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                // history(
                //   `/adjustment-kuota/detail/${params.row.RefNbr}}`
                // );
                props.setDetail(
                  data.filter(
                    (ae) => ae.KuotaAdjustmentID == params.row.KuotaAdjustmentID
                  )[0]
                );
                history(`/adjustment-kuota/detail/${params.row.RefNbr}`);
              }}
              rowCount={totalPage}
              page={curretPage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                setcurretPage(page + 1);
                getData(page + 1);
                console.log("page = ", page);
              }}
            />
          </div>
        </Paper>
      )}
      <PopupImport openImport={openImport} setopenImport={setopenImport} />
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
        Temp={WH}
        setTemp={(e) => {
          setbranch(e.Branch);
          setWH(e.WarehouseID);
          // console.log("e", e);
        }}
      />
    </Card>
  );
}
