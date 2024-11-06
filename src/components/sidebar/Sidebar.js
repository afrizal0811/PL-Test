import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { green } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";

import {
  Chip,
  ListItemButton,
  Box as MuiBox,
  Drawer as MuiDrawer,
} from "@mui/material";

import { Avatar } from "@mui/material";
import SidebarNav from "./SidebarNav";

const Box = styled(MuiBox)(spacing);

const Drawer = styled(MuiDrawer)`
  border-right: 0;

  > div {
    border-right: 0;
  }
`;

const Brand = styled(ListItemButton)`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  color: ${(props) => props.theme.sidebar.header.color};
  background-color: ${(props) => props.theme.sidebar.header.background};
  font-family: ${(props) => props.theme.typography.fontFamily};
  min-height: 56px;
  padding-left: ${(props) => props.theme.spacing(6)};
  padding-right: ${(props) => props.theme.spacing(6)};
  justify-content: center;
  cursor: pointer;
  flex-grow: 0;

  ${(props) => props.theme.breakpoints.up("sm")} {
    min-height: 64px;
  }

  &:hover {
    background-color: ${(props) => props.theme.sidebar.header.background};
  }
`;

const BrandChip = styled(Chip)`
  background-color: ${green[700]};
  border-radius: 5px;
  color: ${(props) => props.theme.palette.common.white};
  font-size: 55%;
  height: 18px;
  margin-left: 2px;
  margin-top: -16px;
  padding: 3px 0;

  span {
    padding-left: ${(props) => props.theme.spacing(1.375)};
    padding-right: ${(props) => props.theme.spacing(1.375)};
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 5 auto ${(props) => props.theme.spacing(5)};
`;

const Sidebar = ({ Mobile, onClick, items, showFooter = true, ...rest }) => {
  return (
    <Drawer variant="permanent" {...rest}>
      <Brand component={NavLink} to="/">
        <BigAvatar alt="Lucy" src="/static/img/PL-logo.png" />
        <span style={{ marginLeft: "5px" }}></span>
        <Box ml={1}>
          Pangan Lestari <BrandChip label="v.1.0" />
        </Box>
      </Brand>
      <SidebarNav
        onClick={() => {
          if (Mobile) onClick();
        }}
        items={items}
      />
    </Drawer>
  );
};

export default Sidebar;
