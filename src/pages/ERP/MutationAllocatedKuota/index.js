import React, { useState } from "react";
import Header from "./Header";
import MutationAllocatedKuotaTable from "./MutationAllocatedKuotaTable";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import Table from "./Detail/Table";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

function MutationAllocatedKuota() {
  const [select, setselect] = useState("");
  const { id } = useParams();
  return (
    <React.Fragment>
      {!!id ? (
        <>
          <Helmet title="Detail Mutation Allocated Kuota" />

          <Breadcrumbs aria-label="Breadcrumb" mb={2}>
            <Link component={NavLink} to="/private">
              Home
            </Link>
            <Link component={NavLink} to="/mutation-allocated-kuota">
              Mutation Allocated Kuota
            </Link>
            <Typography>Detail Mutation Allocated Kuota</Typography>
          </Breadcrumbs>
          <Typography variant="h3" mb={2} gutterBottom display="inline">
            Detail Mutation Allocated Kuota
          </Typography>
          <Table select={select} />
        </>
      ) : (
        <>
          <Helmet title="Mutation Allocated Kuota" />

          <Breadcrumbs aria-label="Breadcrumb" mb={4}>
            <Link component={NavLink} to="/private">
              Home
            </Link>
            {/* <Link component={NavLink}>ERP</Link> */}
            <Link component={NavLink} to="/mutation-allocated-kuota">
              Mutation Allocated Kuota
            </Link>
          </Breadcrumbs>

          <Typography variant="h3" gutterBottom display="inline">
            Mutation Allocated Kuota
          </Typography>

          <Grid container spacing={6} mt={2}>
            <Grid item xs={12}>
              {/* <Header /> */}
              <MutationAllocatedKuotaTable
                select={select}
                setselect={(e) => {
                  setselect(e);
                  console.log("select index", e);
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </React.Fragment>
  );
}

export default MutationAllocatedKuota;
