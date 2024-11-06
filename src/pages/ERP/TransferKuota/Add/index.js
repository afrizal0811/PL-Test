import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import TransferKuotaContextProvider from "../../../../contexts/Modules/TransferKuota/TransferKuotaContext";
import Header from "./Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function AddTransferKuota() {
  const { id } = useParams();
  return (
    <React.Fragment>
      <Helmet title={id ? "Edit Transfer Kuota" : "Add Transfer Kuota"} />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/transfer-kuota">
          Transfer Kuota
        </Link>
        <Typography>
          {id ? "Edit Transfer Kuota" : "Add Transfer Kuota"}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3" mb={2} gutterBottom display="inline">
        Detail Transfer Kuota
      </Typography>
      <TransferKuotaContextProvider>
        <Header />
      </TransferKuotaContextProvider>
    </React.Fragment>
  );
}
