import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { List } from "@mui/material";
import React from "react";
import ReactPerfectScrollbar from "react-perfect-scrollbar";
import styled, { css } from "styled-components/macro";

import SidebarNavSection from "./SidebarNavSection";

import "../../vendor/perfect-scrollbar.css";

const baseScrollbar = css`
  background-color: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid rgba(0, 0, 0, 0.12);
`;

const Scrollbar = styled.div`
  ${baseScrollbar}
`;

const PerfectScrollbar = styled(ReactPerfectScrollbar)`
  ${baseScrollbar}
`;

const Items = styled.div`
  padding-top: ${(props) => props.theme.spacing(2.5)};
  padding-bottom: ${(props) => props.theme.spacing(2.5)};
`;

const SidebarNav = ({ items, onClick }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const ScrollbarComponent = matches ? PerfectScrollbar : Scrollbar;

  return (
    <ScrollbarComponent>
      <List disablePadding>
        <Items>
          {items &&
            items?.map((item) => (
              <SidebarNavSection
                onClick={() => {
                  onClick();
                }}
                component="div"
                key={item?.title}
                pages={item?.pages}
                title={item?.title}
              />
            ))}
        </Items>
      </List>
    </ScrollbarComponent>
  );
};

export default SidebarNav;
