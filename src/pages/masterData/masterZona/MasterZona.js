import SynchIcon from "@mui/icons-material/Sync";
import {
  CircularProgress,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { spacing } from "@mui/system";
import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate } from "react-router-dom";
import Timecode from "react-timecode";
import Timer from "react-timer-wrapper";
import styled from "styled-components/macro";
import swal from "sweetalert2";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  NotifyError,
  NotifySuccess,
} from "../../services/notification.service";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function TableZona() {
  const [selection, setSelection] = useState(0);
  const [rows, setrows] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentpage, setcurrentpage] = useState(1);
  const [totaldata, settotaldata] = useState(0);
  const history = useNavigate();
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    getData(currentpage);
  }, []);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        // console.log("row field", row[field]);
        return searchRegex.test(row[field].toString());
      });
    });
    console.log("filter", filteredRows);
    setrows(filteredRows);
  };

  // function kotaCell(props) {
  //   return (
  //     <>
  //       <Tooltip
  //         title={
  //           !props?.row?.ZonaLineRep
  //             ? " "
  //             : props?.row?.ZonaLineRep.map((item) => (
  //                 <span key={item.MasterZonaLineID}> {item.NamaKota}, </span>
  //               ))
  //         }
  //         arrow
  //         placement="top-end"
  //         // TransitionComponent={Zoom}
  //       >
  //         <div
  //           style={{
  //             lineHeight: "10%",
  //             width: "100%",
  //           }}
  //         >
  //           {!props?.row?.ZonaLineRep
  //             ? " "
  //             : props?.row?.ZonaLineRep.map((item) => (
  //                 <p key={item.MasterZonaLineID}> {item.NamaKota}</p>
  //               ))}
  //         </div>
  //       </Tooltip>
  //     </>
  //   );
  // }

  // Ini untuk pengaturan header
  const columns = [
    {
      field: "zoneID",
      headerName: "Zone ID",
      sortable: false,
      width: 150,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      width: 270,
    },
    {
      field: "branch",
      sortable: false,
      headerName: "Branch",
      minWidth: 200,
      // renderCell: kotaCell,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      // disableColumnMenu: true,
      width: 100,
    },
    {
      field: "lastSync",
      sortable: false,
      headerName: "Last Sync",
      type: "text",
      width: 200,
      renderCell: (params) => (
        <>
          <p>{moment(params.value).format("DD/MM/YYYY HH:mm:ss")}</p>
        </>
      ),
    },
    // {
    //   field: "id",
    //   sortable: false,
    //   disableColumnMenu: true,
    //   headerName: "Actions",
    //   width: 150,
    //   renderCell: (params) => (
    //     <strong>
    //       <Button
    //         variant="text"
    //         color="primary"
    //         size="small"
    //         startIcon={<EditIcon />}
    //         onClick={() => {
    //           history(`/master-data/update-zona/${params.row.IDZona}`);
    //         }}
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         variant="text"
    //         color="error"
    //         size="small"
    //         style={{ marginLeft: 8 }}
    //         startIcon={<DeleteIcon />}
    //         onClick={() => notifyConfirm(params.row.IDZona)}
    //       >
    //         Delete
    //       </Button>
    //     </strong>
    //   ),
    // },
  ];

  // Ini untuk pengaturan alamat API
  const getData = async (page) => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            `/ShippingZoneSyncReps?page=${page}&rowsCount=5`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data[0].record;
            const newdata = resdata.map((item, i) => {
              item.id = i;
              return item;
            });
            setData(newdata);
            // setRows(resdata);
            settotaldata(response.data[0].totalCountData);
            // const resdata = response.data;
            // setrows(newdata);
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

  const Synch = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          `${process.env.REACT_APP_DOMAIN_API}` + "/ShippingZoneSyncReps/Sync",
          {},
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            NotifySuccess("success", "Data Telah DiSinkronisasi");
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
  };

  // const deleteData = async (id) => {
  //   setLoading(true);
  //   try {
  //     await axios
  //       .delete(`${process.env.REACT_APP_DOMAIN_API}` + "/ZonaReps/" + id)
  //       .then(function (response) {
  //         // handle success
  //         // console.log(response);
  //         if (response.status === 200 || response.status === 204) {
  //           NotifySuccess("success", "Data Telah DiHapus");
  //           getData();
  //         }
  //       })
  //       .catch(function (error) {
  //         // handle error
  //         NotifyError("There was an error!", error);
  //         console.log(error);
  //       });
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };

  // ini untuk pop up notifikasi
  const notifyConfirm = async () => {
    swal
      .fire({
        title: "Apakah Anda yakin melakukan Synchronisasi?",
        text: "Anda tidak akan bisa mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Synch",
      })
      .then((result) => {
        if (result.value) {
          Synch();
        }
      });
  };
  // const notifyConfirm = async (id) => {
  //   swal
  //     .fire({
  //       title: "Apakah Anda yakin melakukan Hapus Data ini?",
  //       text: "Anda tidak akan bisa mengembalikan ini!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Ya, Hapus",
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         deleteData(id);
  //       }
  //     });
  // };

  function CustomToolbar(props) {
    return (
      <GridToolbarContainer>
        {/* <Button
          color="primary"
          onClick={() => history("/master-data/add-zona")}
          // onClick={(e) => {
          //   console.log("props", props);
          // }}
          disableElevation
        >
          <span>
            <AddIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Add
        </Button> */}
        {/* <TextField
          variant="standard"
          value={searchText}
          onChange={(event) => requestSearch(event.target.value)}
          placeholder="Search…"
          // className={"float-right"}
          style={{ marginLeft: "auto" }}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: searchText === "" ? "visible" : "hidden" }}
                onClick={() => requestSearch("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        /> */}
        <Button
          color="success"
          onClick={notifyConfirm}
          disableElevation
          style={{ marginLeft: "auto" }}
        >
          <span>
            <SynchIcon style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Sync
        </Button>
      </GridToolbarContainer>
    );
  }

  // CustomToolbar.propTypes = {
  //   clearSearch: PropTypes.func.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   value: PropTypes.string.isRequired,
  // };

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Typography variant="h6" gutterBottom>
          Master Shipping Zone
        </Typography>
        <Typography variant="body2" gutterBottom></Typography>
      </CardContent>
      {loading ? (
        <Grid container justifyContent="center" spacing={1} md={12} xs={12}>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress disableShrink style={{ textAlign: "center" }} />
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
        <Paper>
          <div style={{ width: "100%", padding: "10px" }}>
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              pageSize={5}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              selectionModel={selection}
              onSelectionModelChange={(selection) => {
                setSelection(selection);
                console.log(data[selection[0]]);
              }}
              rowHeight={50}
              components={{
                Toolbar: CustomToolbar,
              }}
              // componentsProps={{
              //   toolbar: {
              //     value: searchText,
              //     onChange: (event) => requestSearch(event.target.value),
              //     clearSearch: () => requestSearch(""),
              //   },
              // }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`/master-data/master-zona/${params.row["zoneID"]}`);
              }}
              paginationMode="server"
              rowCount={totaldata}
              pagination
              page={currentpage - 1}
              onPageChange={(page) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                getData(page + 1);
                console.log("page = ", page);
                setcurrentpage(page + 1);
              }}
            />
          </div>
        </Paper>
      )}
    </Card>
  );
}

function MasterZona() {
  const [searchText, setSearchText] = React.useState("");
  return (
    <React.Fragment>
      <Helmet title="Master Zona" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Master Shipping Zone</Typography>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Master Shipping Zone
      </Typography>

      <Divider mt={3} />

      <TableZona />
    </React.Fragment>
  );
}

export default MasterZona;
