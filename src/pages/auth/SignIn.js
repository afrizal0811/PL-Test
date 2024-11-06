import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components/macro";

import { Avatar, Paper, Typography } from "@mui/material";

import { Box } from "@mui/material";
import SignInComponent from "../../components/auth/SignIn";
import { useMaintenance } from "../../contexts/MaintenanceProvider";
import { ReactComponent as Logo } from "../../vendor/logo.svg";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

const UnderMaintenanceContent = () => (
  <Box>
    <Typography variant="h2" align="center" mb={2} color="red">
      Under Maintenance
    </Typography>
    <Typography variant="h4" align="center" mb={2}>
      We'll Be Back Soon.
    </Typography>
    <Typography component="p" variant="p" align="center" textAlign="center">
      We're busy upgrading with new technology, We apologize for the
      inconvenience.
    </Typography>
  </Box>
);

function SignIn() {
  const { isMaintenance } = useMaintenance();
  return (
    <React.Fragment>
      {/* <Brand /> */}
      <Wrapper>
        <Helmet title="Sign In" />
        <BigAvatar alt="Lucy" src="/static/img/PL-logo.png" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Welcome To Pangan Lestari
        </Typography>
        <Typography component="h2" variant="body1" align="center" mb={3}>
          Sign in to your account to continue
        </Typography>
        {isMaintenance ? (
          <>
            <SignInComponent />
            <UnderMaintenanceContent />
          </>
        ) : (
          <SignInComponent />
        )}
      </Wrapper>
    </React.Fragment>
  );
}

export default SignIn;
