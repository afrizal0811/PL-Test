/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import TransferCabangTable from "./TransferCabangTable";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import moment from "moment";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { GetConfig } from "../../../utils/ConfigHeader";
import { getBrach } from "../../../utils/jwt";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function TransferCabang() {
  const [selectionTCById, setSelectionTCById] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [StartDate, setStartDate] = useState(moment().subtract(7, "days"));
  const [EndDate, setEndDate] = useState(new Date());
  const [totalPage, setTotalPage] = useState(1);
  const [refNbr, setRefNbr] = useState("");
  const [pageSize, setPageSize] = useState(15);
  const [curretPage, setCurretPage] = useState(1);
  const [description, setDescription] = useState("");

  useEffect(() => {
    getData();
  }, [curretPage, pageSize, refNbr, StartDate, EndDate, description]);

  const getData = async () => {
    setLoading(true);
    try {
      await axios
        .get(
          `${
            process.env.REACT_APP_DOMAIN_API
          }/GetTransferCabangByPagination?page=${curretPage}&rowsCount=${pageSize}${
            !!refNbr ? `&refNbr=${refNbr}` : ""
          }${!!description ? `&Description=${description}` : ""}${
            StartDate !== null
              ? "&startDate=" + moment(StartDate).format("MM-DD-YYYY")
              : ""
          }${
            EndDate !== null
              ? "&endDate=" +
                moment(EndDate).add(1, "days").format("MM-DD-YYYY")
              : ""
          }&FrBranchID=${getBrach()}`,
          GetConfig()
        )
        .then(function (response) {
          // handle success
          if (response.status === 200) {
            const resdata = response.data[0];
            setData(resdata.record);
            setTotalPage(resdata.totalCountData);
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
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Transfer Cabang
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Header
            selectionTCById={selectionTCById}
            getData={getData}
            setLoading={setLoading}
          />
          <TransferCabangTable
            description={description}
            setDescription={setDescription}
            startDate={StartDate}
            setStartDate={setStartDate}
            endDate={EndDate}
            setEndDate={setEndDate}
            selectionTCById={selectionTCById}
            setSelectionTCById={setSelectionTCById}
            getData={getData}
            pageSize={pageSize}
            curretPage={curretPage}
            setCurretPage={setCurretPage}
            data={data}
            setRefNbr={setRefNbr}
            refNbr={refNbr}
            loading={loading}
            setPageSize={setPageSize}
            totalPage={totalPage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TransferCabang;
