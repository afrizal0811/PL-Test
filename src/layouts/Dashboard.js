import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";

import { spacing } from "@material-ui/system";
import { CssBaseline, Hidden, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Footer from "../components/Footer";
import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

import { useMenuSidebar } from "../hooks/useMenuSidebar";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const { navItems } = useMenuSidebar();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden lgUp implementation="js">
          <Sidebar
            Mobile={true}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            items={navItems}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth, zIndex: 1 } }}
            items={navItems}
          />
        </Hidden>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 12 : 5}>
          {children}
          <Outlet />
        </MainContent>
        <Footer />
      </AppContent>
    </Root>
  );
};

export default Dashboard;
