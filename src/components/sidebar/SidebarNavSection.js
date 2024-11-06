import React from "react";
import styled from "styled-components/macro";

import { Typography } from "@material-ui/core";

import SidebarNavList from "./SidebarNavList";

const Title = styled(Typography)`
  color: ${(props) => props.theme.sidebar.color};
  font-size: 16px;
  padding: ${(props) => props.theme.spacing(4)}
    ${(props) => props.theme.spacing(7)} ${(props) => props.theme.spacing(1)};
  opacity: 0.6;
  font-weight: 900;
  text-transform: uppercase;
  display: block;
`;

const SidebarNavSection = (props) => {
  const {
    title,
    pages,
    className,
    component: Component = "nav",
    ...rest
  } = props;

  return (
    <Component {...rest}>
      {title && <Title variant="h5">{title}</Title>}
      <SidebarNavList pages={pages} depth={0} />
    </Component>
  );
};

export default SidebarNavSection;
