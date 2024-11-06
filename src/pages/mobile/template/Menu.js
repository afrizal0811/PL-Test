import {
  Grid,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Paper as MuiPaper,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

function MobileMenu() {
  const history = useNavigate();
  return (
    <React.Fragment>
      <Helmet title="Inquiry" />

      {/* <Breadcrumbs aria-label="Breadcrumb" mb={4}>
        <Link component={NavLink} to="/">
          Dashboard
        </Link>
        <Link>Master Data</Link>
        <Typography>Promotion</Typography>
      </Breadcrumbs> */}
      <Typography variant="h3" gutterBottom display="inline">
        Mobile WMS
      </Typography>

      {/* <Divider my={6} /> */}

      <Grid container mt={5} spacing={3}>
        <Grid item xs={12}>
          <Card p={5} onClick={() => history(`/mobile/inquiry`)}>
            <CardContent p={0} m={0}>
              <Typography variant="h5" gutterBottom>
                Template Inquiry 1
              </Typography>
              <Typography variant="body2" m={0} p={0}>
                Inquiry
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card p={5} onClick={() => history(`/mobile/inquiry2`)}>
            <CardContent p={0} m={0}>
              <Typography variant="h5" gutterBottom>
                Template Inquiry 2
              </Typography>
              <Typography variant="body2" m={0} p={0}>
                Inquiry
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card p={5} onClick={() => history(`/mobile/listing`)}>
            <CardContent p={0} m={0}>
              <Typography variant="h5" gutterBottom>
                Template Listing
              </Typography>
              <Typography variant="body2" m={0} p={0}>
                Listing
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card p={5} onClick={() => history(`/mobile/entry`)}>
            <CardContent p={0} m={0}>
              <Typography variant="h5" gutterBottom>
                Template Product
              </Typography>
              <Typography variant="body2" m={0} p={0}>
                Entry
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default MobileMenu;
