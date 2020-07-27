import React from "react";

import { IconButton, Avatar } from "@material-ui/core";
import { useWindowDimensions } from "../../hooks";

import { useDispatch } from "react-redux";
import { searchOperations } from "../../store/reducers/search";
import { recipeDetailsActions } from "../../store/reducers/recipes/recipeDetails";
import { smallScreen } from "../../constants/screen";

interface ICreatedAt {
  seconds: number;
  nanoseconds: number;
}

interface IUser {
  name: string;
  photoUrl: string;
}

interface IComment {
  value: string;
  user: IUser;
  createdAt: ICreatedAt;
  text: string[];
}

const Comment = (comment: IComment) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const time = comment?.createdAt?.seconds;
  const timestamp = time ? new Date(time * 1000) : new Date();
  const small = width < smallScreen;
  return (
    <div style={{ paddingLeft: `${small ? "0" : "10px"}` }}>
      <p
        style={
          small
            ? { paddingLeft: "10px" }
            : {
                margin: "0",
                marginBottom: "0",
                padding: "20px 0 0 20px",
              }
        }
      >
        {comment.value}
      </p>

      <p
        style={{
          float: "right",
          margin: "0",
          padding: "0px",
          paddingRight: "5px",
          fontSize: "0.8em",
        }}
      >
        <span>
          {" "}
          at{" "}
          <strong>
            {timestamp.toLocaleTimeString()} {timestamp.toLocaleDateString()}
          </strong>
        </span>

        {!small && (
          <span>
            {" "}
            by{" "}
            <strong>
              <i>{comment.user.name}</i>
            </strong>{" "}
          </span>
        )}
        <IconButton
          onClick={(e) => {
            dispatch(searchOperations.searchByUsers([comment.user.id]));
            dispatch(recipeDetailsActions.closeDialog());
          }}
        >
          <Avatar src={comment.user.photoUrl} />
        </IconButton>
      </p>
    </div>
  );
};

export default Comment;
