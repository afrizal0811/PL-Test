import {
  CardContent,
  Grid,
  Link,
  Alert as MuiAlert,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)(spacing);

const timeOut = (time) => new Promise((res) => setTimeout(res, time));

const Paper = styled(MuiPaper)(spacing);

const columns = [
  {
    field: "tipe2Principal",
    headerName: "Type 2 Principal",
    width: 200,
  },
  {
    field: "active",
    headerName: "Status",
    width: 200,
  },
  {
    field: "tipe2Desc",
    headerName: "Tipe 2 Desc",
    type: "text",
    width: 200,
  },
];

const columnskelompok = [
  {
    field: "tipe3Kelompok",
    headerName: "Type 3 Kelompok",
    width: 200,
  },
  {
    field: "active",
    headerName: "Status",
    width: 200,
  },
  {
    field: "tipe3Desc",
    headerName: "Tipe 3 Desc",
    type: "text",
    width: 200,
  },
];

function Header() {
  const [loading, setLoading] = useState(false);
  const [dataprincipal, setdataprincipal] = useState([]);
  const [datakelompok, setdatakelompok] = useState([]);
  const [pageSize1, setPageSize1] = useState(5);
  const [typeKategori, settypeKategori] = useState("");
  const [type1Group, settype1Group] = useState("");
  const [active, setactive] = useState(false);
  const { id } = useParams();
  const [selection, setSelection] = useState("");

  useEffect(() => {
    // console.log(id);
    if (id !== undefined) {
      getDataPrincipal();
    }
  }, []);

  useEffect(() => {
    if (selection !== "") {
      setdatakelompok(
        dataprincipal
          .filter((ao) => ao.tipe2Principal == selection[0])[0]
          ?.masterKategoriKelompokRep.filter(
            (ea) => ea.tipe2Value == selection[0]
          )
      );
    }
  }, [selection]);

  const getDataPrincipal = async () => {
    setLoading(true);
    try {
      const res = await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}` +
            "/MasterKategoriReps/GetPrincipalByMasterKategori/" +
            id,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          if (response.status === 200) {
            const resdata = response.data;
            setdataprincipal(resdata[0].masterKategoriPrincipalRep);
            settypeKategori(resdata[0].typeKategori);
            settype1Group(resdata[0].type1Group);
            setactive(resdata[0].active);
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

  return (
    <Card mb={6}>
      <CardContent>
        <Grid container spacing={6} md={12} mt={3}>
          <Grid item md={4} xs={4}>
            <TextField
              name="typeKategori"
              label="Type Kategori"
              value={typeKategori}
              type={"text"}
              fullWidth
              variant="outlined"
              my={2}
              disabled
            />
          </Grid>
          <Grid item md={4} xs={4}>
            <TextField
              name="type1Group"
              label="Type Group"
              value={type1Group}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              disabled
            />
          </Grid>
          <Grid item md={4} xs={4}>
            <TextField
              name="active"
              label="Active"
              value={active}
              type="text"
              fullWidth
              variant="outlined"
              my={2}
              disabled
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <Paper>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <DataGrid
                  rowsPerPageOptions={[5, 10, 25]}
                  rows={dataprincipal}
                  autoHeight
                  getRowId={(ao) => ao.tipe2Principal}
                  columns={columns}
                  pageSize={pageSize1}
                  onPageSizeChange={(newPageSize) => setPageSize1(newPageSize)}
                  selectionModel={selection}
                  onSelectionModelChange={(selection) => {
                    setSelection(selection);
                  }}
                />
              </div>
            </Paper>
          </Grid>
          <Grid item md={12} xs={12}>
            <Paper>
              <div style={{ width: "100%", marginTop: "10px" }}>
                <DataGrid
                  rowsPerPageOptions={[5, 10, 25]}
                  rows={datakelompok}
                  autoHeight
                  getRowId={(ao) => ao.kelompokID}
                  columns={columnskelompok}
                  pageSize={pageSize1}
                  onPageSizeChange={(newPageSize) => setPageSize1(newPageSize)}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default function DetailKategori() {
  return (
    <React.Fragment>
      <Helmet title="Detail Kategori" />
      <Typography variant="h3" gutterBottom display="inline">
        Detail Kategori
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Link component={NavLink} to="/master-data/kategori">
          Kategori
        </Link>
        <Typography>Detail Kategori</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Header />
    </React.Fragment>
  );
}
