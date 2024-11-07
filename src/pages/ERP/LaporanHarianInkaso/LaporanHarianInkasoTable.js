import { Add, Clear } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Button as MuiButton,
  Card as MuiCard,
  Paper as MuiPaper,
  TextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { useDebounceSearch } from "../../../hooks/useDebounceSearch";
import { GetConfig } from "../../../utils/ConfigHeader";
import {
  getBrach,
  getEmployee,
  getEmployeeName,
  getRoleName,
} from "../../../utils/jwt";
import columnLHI from "./columnLHI";
import AdmPiutangPopup from "./Dialogs/OtomatisDialog/AdminPiutangPopup";
import FakturPopup from "./FakturPopup";
import KolektorPopup from "./KolektorPopup";

const Card = styled(MuiCard)(spacing);
const Paper = styled(MuiPaper)(spacing);
const Button = styled(MuiButton)(spacing);
const keterangan = [
  { id: "Draft", label: "Draft" },
  { id: "Open", label: "Open" },
  { id: "On Progress", label: "On Progress" },
  { id: "Closed", label: "Closed" },
];

export default function LaporanHarianInkasoTable(props) {
  const [Data, setData] = useState([]);
  const [selectedLHI, setselectedLHI] = useState([]);
  const [Kolektor, setKolektor] = useState("");
  const [Faktur, setFaktur] = useState("");
  const [orderNbr, setOrderNbr] = useState("");
  const [adminPiutang, setAdminPiutang] = useState(
    getRoleName() === "Super Admin"
      ? null
      : {
          employeeID: getEmployee(),
          employeeName: getEmployeeName(),
        }
  );
  const [Nomor, setNomor] = useState("");
  const [Status, setStatus] = useState("");
  const mounted = useRef();
  const history = useNavigate();
  const [Dropdown, setDropdown] = useState([]);

  const searchDebounceNomor = useDebounceSearch(Nomor);
  const searchDebounceFaktur = useDebounceSearch(Faktur);
  const searchDebounceOrderNbr = useDebounceSearch(orderNbr);

  const [Loading, setLoading] = useState(false);
  const [openKolektor, setOpenKolektor] = useState(false);
  const [openFaktur, setOpenFaktur] = useState(false);
  const [openAdminPiutang, setOpenAdminPiutang] = useState(false);
  const [pageSize, setPageSize] = useState(15);

  const [curretPage, setcurretPage] = React.useState(1);
  const [totalPage, settotalPage] = React.useState(1);

  const [sortModel, setSortModel] = React.useState(null);
  const [filterModel, setFilterModel] = React.useState(null);

  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      getDataFilter(1);
    } else {
      // getData(curretPage);
      getDataFilter(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    Status,
    Kolektor,
    searchDebounceNomor,
    pageSize,
    searchDebounceFaktur,
    searchDebounceOrderNbr,
    adminPiutang,
    sortModel,
    filterModel,
  ]);

  const getDataFilter = async (page) => {
    setLoading(true);
    console.log({ filterModel });
    try {
      const res = await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/LaporanHarianInkasoReps/FilterLaporanHarianInkaso?pages=${page}&rowsCount=${pageSize}${
            Kolektor == "" ? "" : "&kolektor=" + Kolektor.employeeID
          }${!!searchDebounceNomor ? "&nomorLHI=" + searchDebounceNomor : ""}${
            Status == null || Status == ""
              ? ""
              : "&ketStatusKembali=" + Status.id
          }${
            searchDebounceFaktur ? "&referenceNbr=" + Faktur : ""
          }&BranchID=${getBrach()}${
            searchDebounceOrderNbr ? `&orderNbr=${searchDebounceOrderNbr}` : ""
          }${adminPiutang ? `&adminPiutang=${adminPiutang?.employeeID}` : ""}${
            sortModel
              ? `&sortingFilter=${sortModel.field},${sortModel.sort}`
              : ""
          }${
            filterModel
              ? `&extraFilter=${filterModel.columnField},${filterModel.operatorValue},${filterModel.value}`
              : ""
          }`,
          GetConfig()
        )
        .then(function (response) {
          if (response.status === 200) {
            const resdata = response.data[0];
            console.log("res", resdata);
            console.log(
              "gird leng",
              resdata.record.filter((a) => a.grid.length > 0)
            );
            setData(resdata.record);
            setDropdown(resdata.dropDownListFaktur);
            settotalPage(resdata.totalCountData);
            setcurretPage(page);
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  const handleSortModelChange = React.useCallback((sortModel) => {
    if (sortModel.length === 0) setSortModel(null);
    if (sortModel.length === 1) setSortModel(sortModel[0]);
  }, []);

  const onFilterChange = React.useCallback((filterModel) => {
    const filterActive =
      filterModel.items.length === 1 && !!filterModel.items[0]?.value;
    if (filterActive) {
      setFilterModel(filterModel.items[0]);
    } else {
      setFilterModel(null);
    }
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          onClick={() => {
            history("/laporan-harian-inkaso/add");
          }}
          mr={2}
          disableElevation
        >
          <span>
            <Add style={{ height: "16px", verticalAlign: "sub" }} />
          </span>
          Tambah
        </Button>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <Card mb={3}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item md={4}>
              <TextField
                label="Admin Piutang"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {adminPiutang ? (
                        <>
                          <IconButton
                            onClick={() => setAdminPiutang("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenAdminPiutang(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={adminPiutang ? adminPiutang?.employeeName : ""}
                onClick={() => {
                  if (!adminPiutang) {
                    setOpenAdminPiutang(true);
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="Kolektor"
                fullWidth
                disabled={Loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      {Kolektor ? (
                        <>
                          <IconButton
                            onClick={() => setKolektor("")}
                            disabled={Loading}
                          >
                            <Clear />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            onClick={() => setOpenKolektor(true)}
                            disabled={Loading}
                          >
                            <SearchIcon />
                          </IconButton>
                        </>
                      )}
                    </InputAdornment>
                  ),
                }}
                value={Kolektor == "" ? "" : Kolektor.employeeName}
                onClick={() => {
                  if (!Kolektor) {
                    setOpenKolektor(true);
                  }
                }}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                name="Nomor"
                fullWidth
                label="Nomor LHI"
                value={Nomor}
                onChange={(e) => {
                  setNomor(e.target.value);
                }}
              />
            </Grid>
            <Grid item md={4}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={keterangan}
                value={Status}
                onChange={(event, e) => {
                  setStatus(e);
                  console.log(e);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Status" />
                )}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="No. Invoice"
                fullWidth
                value={Faktur ?? ""}
                onChange={(e) => setFaktur(e.target.value)}
              />
            </Grid>
            <Grid item md={4}>
              <TextField
                label="No. SO"
                fullWidth
                value={orderNbr ?? ""}
                onChange={(e) => setOrderNbr(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card mb={3} mt={0}>
        <Paper>
          <div style={{ width: "100%" }}>
            <DataGrid
              rowsPerPageOptions={[5, 10, 15, 25, 50, 100]}
              rows={Data}
              autoHeight
              getRowId={(ia) => ia.nomerLHI}
              columns={columnLHI}
              density="compact"
              pageSize={pageSize}
              components={{
                Toolbar: CustomToolbar,
              }}
              componentsProps={{
                GridToolbar: {
                  printOptions: {
                    pageStyle:
                      ".MuiDataGrid-root .MuiDataGrid-main { color: rgba(0, 0, 0, 0.87); }",
                  },
                },
              }}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              checkboxSelection
              selectionModel={selectedLHI.map((a) => a.nomerLHI)}
              onSelectionModelChange={(e) => {
                setselectedLHI(Data.filter((i) => e.includes(i.nomerLHI)));
                // setselectedLHI(
                //   e.map((a) => {
                //     Data.filter((aa) => aa.LaporanHarianInkasoGridRepID == a);
                //   })
                // );
              }}
              onCellDoubleClick={(params, event) => {
                // console.log(params.row["customer"]);
                history(`detail/${params.row.nomerLHI}`);
              }}
              // onCellCLick={handleCellClick}
              // onRowCLick={handleRowClick}
              rowCount={totalPage}
              page={curretPage - 1}
              paginationMode="server"
              pagination
              onPageChange={(page) => {
                setcurretPage(page + 1);
                getDataFilter(page + 1);
                console.log("page = ", page);
              }}
              filterMode="server"
              sortingMode="server"
              onSortModelChange={handleSortModelChange}
              onFilterModelChange={onFilterChange}
              loading={Loading}
            />
          </div>
        </Paper>
      </Card>
      <AdmPiutangPopup
        openCust={openAdminPiutang}
        setopenCust={(e) => {
          setOpenAdminPiutang(e);
        }}
        TempCustomer={adminPiutang}
        setTempCustomer={(e) => {
          setAdminPiutang(e);
        }}
      />
      <KolektorPopup
        openCust={openKolektor}
        setopenCust={(e) => {
          setOpenKolektor(e);
        }}
        TempCustomer={Kolektor}
        setTempCustomer={(e) => {
          setKolektor(e);
          console.log("cus", e);
        }}
      />
      <FakturPopup
        openCust={openFaktur}
        dropdown={Dropdown}
        setopenCust={(e) => {
          setOpenFaktur(e);
        }}
        TempCustomer={Faktur}
        setTempCustomer={(e) => {
          setFaktur(e.referenceNbr);
          console.log("cus", e);
        }}
      />
    </>
  );
}
