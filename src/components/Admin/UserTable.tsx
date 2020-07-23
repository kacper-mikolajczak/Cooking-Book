import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces";

import firebase from "../../Firebase";

import {
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Checkbox,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { searchOperations } from "../../store/reducers/search";

export interface IUserWithCheck extends IUser {
  checked: boolean;
}

const UserTable = ({ users }: { users: IUser[] }) => {
  const dispatch = useDispatch();
  const [currentUsers, setCurrentUsers] = useState<IUserWithCheck[]>([]);

  const handleUserDeleteOrRevive = (id: string, deleteOrRevive: boolean) => {
    firebase
      .user(id)
      .set({ deleted: deleteOrRevive }, { merge: true })
      .then(() => {
        setCurrentUsers((users) =>
          users.map((user: IUserWithCheck) =>
            user.id === id ? { ...user, deleted: deleteOrRevive } : user
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [itemMenu, setItemMenu] = useState("");

  useEffect(() => {
    setCurrentUsers(users.map((user) => ({ ...user, checked: false })));
  }, [users]);

  const handleCheck = (e, id) => {
    const checked = e.currentTarget.checked;
    setCurrentUsers(
      currentUsers.map((user) => (id === user.id ? { ...user, checked } : user))
    );
  };

  const handleCheckAll = (e) => {
    const checked = e.currentTarget.checked;
    setCurrentUsers(users.map((user) => ({ ...user, checked })));
  };

  const handleProfilesClick = (e) => {
    dispatch(
      searchOperations.searchByUsers(
        currentUsers.filter((user) => user.checked).map((user) => user.id)
      )
    );
  };

  const handleDeleteClick = (e) => {
    currentUsers
      .filter((user) => user.checked)
      .forEach((user) => handleUserDeleteOrRevive(user.id, true));
  };

  const handleReviveClick = (e) => {
    currentUsers
      .filter((user) => user.checked)
      .forEach((user) => handleUserDeleteOrRevive(user.id, false));
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox onChange={handleCheckAll} />
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Deleted</TableCell>
              <TableCell>
                <TableMenu
                  disabled={!currentUsers.some((user) => user.checked)}
                  handleProfilesClick={handleProfilesClick}
                  handleDeleteClick={handleDeleteClick}
                  handleRestoreClick={handleReviveClick}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={user.checked}
                      onChange={(e) => handleCheck(e, user.id)}
                    />
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>
                    <Avatar src={user.photoUrl} />
                  </TableCell>
                  <TableCell>
                    {new Date(user?.createdAt?.seconds).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {user.deleted ? (
                      <span style={{ color: "red" }}>Yes</span>
                    ) : (
                      "No"
                    )}
                  </TableCell>
                  <TableCell>
                    <TableItemMenu
                      id={user.id}
                      handleUserDeleteOrRevive={() =>
                        handleUserDeleteOrRevive(user.id, !user.deleted)
                      }
                      deleted={user.deleted}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export const TableMenu = ({
  disabled,
  handleProfilesClick,
  handleDeleteClick,
  handleRestoreClick,
}) => {
  const handleClose = (e) => {
    setAnchor(null);
  };
  const [anchor, setAnchor] = useState<null | EventTarget>(null);
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

export default UserTable;

export { TableItemMenu };
