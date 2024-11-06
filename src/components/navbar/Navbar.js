import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import styled, { withTheme } from "styled-components/macro";
import NavbarBranch from "./NavbarBranch";
import NavbarUserDropdown from "./NavbarUserDropdown";

moment.locale("id");
const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.sidebar.background};
  color: white;
  z-index: 10;
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Navbar = ({ onDrawerToggle }) => {
  const [localtime, setlocaltime] = React.useState(moment().format("LT"));

  React.useEffect(() => {
    setTimeout(() => {
      setlocaltime(moment().format("LT"));
    }, 60000);
  }, [localtime]);

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Paper
                sx={{
                  bgcolor: "transparent",
                  color: "white",
                  height: "100%",
                  borderRight: 2,
                  borderColor: "white",
                }}
              >
                <NavbarBranch />
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  bgcolor: "transparent",
                  color: "white",
                  height: "100%",
                }}
              >
                <Typography variant="p" mx={5}>
                  {localtime}
                </Typography>
                <Typography variant="h4" mx={5}>
                  {moment().format("DD-MM-YYYY")}
                </Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Paper
                sx={{
                  bgcolor: "transparent",
                  color: "white",
                  height: "100%",
                  borderLeft: 2,
                  borderColor: "white",
                }}
              >
                <NavbarUserDropdown />
              </Paper>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(Navbar);
