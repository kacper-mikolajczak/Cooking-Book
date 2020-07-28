import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Menu, MenuItem, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { searchOperations } from "../../store/reducers/search";
import { ErrorActions } from "../../store/reducers/error";

const TableItemMenu = ({
  id,
  handleUserDeleteOrRevive,
  deleted,
}: {
  id: string;
  handleUserDeleteOrRevive: any;
  deleted: boolean;
}) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    setAnchor(null);
  };

  const handleProfileClick = (e) => {
    dispatch(searchOperations.searchByUsers([id]));
  };

  const handleDeleteOrReviveClick = (e) => {
    dispatch(ErrorActions.set(deleted ? "User restored!" : "User deleted!"));
    handleUserDeleteOrRevive();
  };

  const [anchor, setAnchor] = useState<null | EventTarget>(null);

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose}
      >
        <MenuItem id="peak-profile" onClick={handleProfileClick}>
          <VisibilityIcon />
          <span style={{ marginLeft: "10px" }}>Recipes</span>
        </MenuItem>
        <MenuItem id="deleteOrRevive" onClick={handleDeleteOrReviveClick}>
          {deleted ? <SettingsBackupRestoreIcon /> : <DeleteIcon />}
          <span style={{ marginLeft: "10px" }}>
            {deleted ? "Revive" : "Delete"}
          </span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TableItemMenu;
