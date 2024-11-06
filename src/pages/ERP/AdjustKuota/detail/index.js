import React from "react";
import Header from "./Header";
import styled from "styled-components/macro";
import { NavLink, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  // Card as MuiCard,
  // Divider as MuiDivider,
  Link,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import Table from "./Table";

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
