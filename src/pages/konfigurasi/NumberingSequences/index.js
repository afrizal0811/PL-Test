import React from "react";
import NumberingSequenceTable from "./NumberingSequence";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";

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
