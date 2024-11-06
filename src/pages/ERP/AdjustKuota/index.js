import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import AdjustmentKuotaTable from "./Table";
import DetailAdjustmentKuota from "./detail";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function AdjustmentKuota() {
  const [Panel, setPanel] = React.useState("1");
  const [Detail, setDetail] = React.useState("");
  const history = useNavigate();
  const { id } = useParams();
  // useEffect(() => {
  //   if (window.location.href.includes("add")) {
  //     setDetail("Add");
  //   } else if (!Detail) {
  //     history(`/adjustment-kuota`);
  //   } else if (!id) {
  //     setDetail("");
  //   }
  // }, [window.location.href]);

  return (
    <React.Fragment>
      <Helmet title="Adjustment Kuota" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/adjustment-kuota">
          Adjustment Kuota
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        {!!Detail ? "Detail" : ""} Adjustment Kuota
      </Typography>

      <>
        <Divider my={6} />
        <AdjustmentKuotaTable setDetail={(e) => setDetail(e)} />
      </>
    </React.Fragment>
  );
}
