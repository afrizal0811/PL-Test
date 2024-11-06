import {
  // Card as MuiCard,
  // Divider as MuiDivider,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
// const Card = styled(MuiCard)(spacing);
// const Divider = styled(MuiDivider)(spacing);

export default function DetailAdjustmentKuota(props) {
  const { id } = useParams();
  console.log("id", id);
  // useEffect(() => {
  //   console.log("id", id);
  //   if (!!id && !Detail) {
  //     history(`/adjustment-kuota`);
  //   }
  // }, []);
  return (
    <React.Fragment>
      <Helmet title={!!id ? "Edit Adjustment Kuota" : "Add Adjustment Kuota"} />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/adjustment-kuota">
          Adjustment Kuota
        </Link>
        <Typography>
          {!!id ? "Edit Adjustment Kuota" : "Add Adjustment Kuota"}
        </Typography>
      </Breadcrumbs>
      <Typography variant="h3" mb={2} gutterBottom display="inline">
        {!!id ? "Edit Adjustment Kuota" : "Add Adjustment Kuota"}
      </Typography>
      <Header />
    </React.Fragment>
  );
}
