/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useLocation, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { GetConfig } from "../../../../utils/ConfigHeader";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  capitalize,
} from "@mui/material";

import { spacing } from "@mui/system";
import useFormIsUpdated from "../../../../hooks/useFormIsUpdated";
import Header from "../Header";
import DetailTransfer from "./Transfer";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function TransferCabang() {
  const location = useLocation();
  const { id } = useParams();

  const [requiredField, setRequiredField] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [selectionTCById, setSelectionTCById] = useState("");
  const [dataListDetail, setDataListDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(15);
  const [curretPage, setCurretPage] = useState(1);
  const [totalPageDataDetail, setTotalPageDataDetail] = useState(1);

  console.log({ dataDetail });

  const [defaultValueForm, setDefaultValueForm] = useState(null);

  const [defaultListDetail, setDefaultListDetail] = useState(null);

  const isListTableUpdated = useFormIsUpdated(
    defaultListDetail,
    dataListDetail
  );

  useEffect(() => {
    if (id) {
      getDataDetail();
      getDataListDetail();
    }
  }, [id, pageSize, curretPage]);

  const getDataDetail = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetTransferCabangById/${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data;
            setDataDetail(resdata);
            setDefaultValueForm({
              date: resdata?.Date ?? "",
              FrSiteCD: resdata?.FrSiteCD ?? "",
              Descr: resdata?.Descr ?? "",
              ToBranchID: resdata?.ToBranchID ?? "",
              ToSiteCD: resdata?.ToSiteCD ?? "",
              SONbr: resdata?.SONbr ?? "",
              FrozenCheck: resdata?.Frozen ?? false,
              DryCheck: resdata?.Dry ?? false,
            });
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

  const getDataListDetail = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${process.env.REACT_APP_DOMAIN_API}/GetDetailsAllocatedByPagination?page=${curretPage}&rowsCount=${pageSize}&refNbr=${id}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data[0];
            setDataListDetail(resdata.record);
            setDefaultListDetail(resdata.record);
            setTotalPageDataDetail(resdata.totalCountData);
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
    <React.Fragment>
      <Helmet title="Transfer Cabang" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/transfer-cabang">
          Transfer Cabang
        </Link>
        <Typography>{`${capitalize(
          location.pathname.split("/")[2]
        )} Transfer Cabang`}</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        {`${capitalize(location.pathname.split("/")[2])} Transfer Cabang`}
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Header
            loading={loading}
            setLoading={setLoading}
            selectionTCById={selectionTCById}
            setSelectionTCById={setSelectionTCById}
            type={location.pathname.split("/")[2]}
            dataDetail={dataDetail}
            setDataDetail={setDataDetail}
            setRequiredField={setRequiredField}
            dataListDetail={dataListDetail}
            setDataListDetail={setDataListDetail}
            getDataListDetail={getDataListDetail}
            isListTableUpdated={isListTableUpdated}
            defaultValueForm={defaultValueForm}
          />
          <DetailTransfer
            dataListDetail={dataListDetail}
            selectionTCById={selectionTCById}
            setSelectionTCById={setSelectionTCById}
            setDataListDetail={setDataListDetail}
            loading={loading}
            requiredField={requiredField}
            dataDetail={dataDetail}
            totalPageDataDetail={totalPageDataDetail}
            setTotalPageDataDetail={(e) => setTotalPageDataDetail(e)}
            setPageSize={setPageSize}
            pageSize={pageSize}
            curretPage={curretPage}
            setCurretPage={setCurretPage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TransferCabang;
