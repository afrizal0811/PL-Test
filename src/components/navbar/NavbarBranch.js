import { Menu, MenuItem, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { getBrach, getBranches, setBranch } from "../../utils/jwt";

function NavbarBranch() {
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const navigate = useNavigate();
  const toggleMenu = (event) => {
    if (getBranches().length <= 1) return;
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleChangeBranch = (BranchId) => {
    setBranch(BranchId);
    setAnchorMenu(null);
    navigate("/");
  };

  return (
    <React.Fragment>
      <div
        onClick={toggleMenu}
        style={{ cursor: getBranches().length <= 1 ? "auto" : "pointer" }}
      >
        <Typography variant="p" mr={5}>
          Branch
        </Typography>
        <Typography variant="h4" mr={5}>
          {getBrach()}
        </Typography>
      </div>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {getBranches().map((branch) => (
          <MenuItem onClick={() => handleChangeBranch(branch.branchID)}>
            {branch.branchID}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default NavbarBranch;
