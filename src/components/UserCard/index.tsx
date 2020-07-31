import React from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { searchOperations } from "../../store/reducers/search";
import { IUser } from "../../interfaces";

const useStyles = makeStyles({
  root: {
    background: "rgba(255,255,255,.3)",
    margin: "0 3px",
    "&:hover": {
      cursor: "pointer",
    },
    padding: "2px",
  },
  avatar: {
    textAlign: "center",
    width: "100%",
  },
  fullName: {
    width: "100%",
    textAlign: "center",
  },
});

const UserCard = ({ user }: { user: IUser }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleAvatarClick = () => {
    dispatch(searchOperations.searchByUsers([user.id]));
  };

  const fullName = user.firstName + " " + user.lastName;

  return (
    <div className={classes.root} onClick={handleAvatarClick}>
      <div className={classes.avatar}>
        <IconButton>
          <Avatar src={user.photoUrl} />
        </IconButton>
      </div>
      <div className={classes.fullName}>
        <p>{fullName}</p>
      </div>
    </div>
  );
};

export default UserCard;
