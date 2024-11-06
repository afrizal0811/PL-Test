import * as React from "react";
import styled from "styled-components/macro";
import { Power, User } from "react-feather";
import { useNavigate } from "react-router-dom";

import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  Typography,
} from "@material-ui/core";

import useAuth from "../../modules/Auth/hooks/useAuth";
import { getEmployee, getEmployeeName } from "../../utils/jwt";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function NavbarUserDropdown() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleProfile = () => {
    navigate(`/my-profile/${getEmployee()}`);
    setAnchorMenu(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/sign-in");
  };

  return (
    <React.Fragment>
      <Tooltip title="Account">
        <IconButton
          aria-owns={Boolean(anchorMenu) ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="inherit"
          size="large"
        >
          <User />
          <Typography variant="h6" component="span" ml={2}>
            {getEmployeeName()}
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default NavbarUserDropdown;
