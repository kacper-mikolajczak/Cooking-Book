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
  Button,
  IconButton,
} from "@material-ui/core";
import { createDispatchHook } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { searchOperations } from "../../store/reducers/search";

const UserTable = ({ users }: { users: IUser[] }) => {
  const [currentUsers, setCurrentUsers] = useState<IUser[]>([]);

  const handleUserDeleteOrRevive = (id: string, deleteOrRevive: boolean) => {
    firebase
      .user(id)
      .set({ deleted: deleteOrRevive }, { merge: true })
      .then(() => {
        setCurrentUsers((users) =>
          users.map((user: IUser) =>
            user.id === id ? { ...user, deleted: deleteOrRevive } : user
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleUserProfileClick = (e) => {
    console.log("USERSTABLE Profile item clicked!");
  };

  const [itemMenu, setItemMenu] = useState("");

  useEffect(() => {
    setCurrentUsers(users);
  }, [users]);

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Second Name</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Deleted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => {
              return (
                <TableRow hover key={user.id}>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>
                    <Avatar src={user.photoUrl} />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt.seconds).toLocaleDateString()}
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

// {
//     anchor,
//     handleClose,
//     handleProfileClick,
//     handleDeleteClick,
//   }      : {
//           anchor : null|HTMLElement;
//           handleClose : (e : React.MouseEvent<HTMLButtonElement>) : void => {};
//           handleProfileClick : (e : React.MouseEvent<HTMLButtonElement>) : void => {};
//           handleDeleteClick : (e : React.MouseEvent<HTMLButtonElement>) : void => {};
//       }) =>

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
    dispatch(searchOperations.searchByUser(id));
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
