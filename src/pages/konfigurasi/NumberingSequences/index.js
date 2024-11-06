import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import NumberingSequenceTable from "./NumberingSequence";

const Divider = styled(MuiDivider)(spacing);
const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function NumberingSequences() {
  return (
    <React.Fragment>
      <Helmet title="Numbering Sequences" />

      <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/private">
          Home
        </Link>
        <Link component={NavLink} to="/konfigurasi/numbering-sequences">
          Numbering Sequences
        </Link>
      </Breadcrumbs>
      <Typography variant="h3" gutterBottom display="inline">
        List Numbering Sequences
      </Typography>

      <Divider my={6} />

      <NumberingSequenceTable />
    </React.Fragment>
  );
}
