import { spacing } from "@material-ui/system";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import Header from "./Header";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

export default function NumberingSequenceDetail() {
  const [numberingID, setNumberingID] = useState("");
  const [description, setDescription] = useState("");
  const [screenID, setScreenID] = useState("");

  return (
    <React.Fragment>
      <Helmet title="Numbering Sequences" />

      <Breadcrumbs aria-label="Breadcrumb" mb={2}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link component={NavLink} to="/konfigurasi/numbering-sequences">
          Konfigurasi
        </Link>
        <Typography>Numbering Sequences</Typography>
      </Breadcrumbs>

      <Typography variant="h3" gutterBottom display="inline">
        Numbering Sequences
      </Typography>

      <Header
        numberingID={numberingID}
        setNumberingID={setNumberingID}
        description={description}
        setDescription={setDescription}
        screenID={screenID}
        setScreenID={setScreenID}
      />
    </React.Fragment>
  );
}
