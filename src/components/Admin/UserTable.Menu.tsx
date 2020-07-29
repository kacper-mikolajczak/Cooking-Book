import React, { useState } from "react";

import { Menu, MenuItem, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const TableMenu = ({
  disabled,
  handleProfilesClick,
  handleDeleteClick,
  handleRestoreClick,
}: {
  disabled: boolean;
  handleProfilesClick: any;
  handleDeleteClick: any;
  handleRestoreClick: any;
}) => {
  const handleClose = () => {
    setAnchor(null);
  };
  const [anchor, setAnchor] = useState<null | Element>(null);
  return (
    <>
      <IconButton
        onClick={(e) => setAnchor(e.currentTarget)}
        disabled={disabled}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        {/* {options.map(option => (<MenuItem>
              
          </MenuItem>))} */}
        <MenuItem onClick={handleProfilesClick}>
          <VisibilityIcon />
          <span style={{ marginLeft: "10px" }}>Recipes</span>
        </MenuItem>
        <MenuItem onClick={handleDeleteClick}>
          <DeleteIcon />
          <span style={{ marginLeft: "10px" }}> Delete</span>
        </MenuItem>
        <MenuItem onClick={handleRestoreClick}>
          <SettingsBackupRestoreIcon />
          <span style={{ marginLeft: "10px" }}> Restore</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableMenu;
