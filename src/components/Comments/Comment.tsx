import React from "react";

import { IconButton, Avatar } from "@material-ui/core";
import { useWindowDimensions } from "../../hooks";

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
  const { height, width } = useWindowDimensions();
  const time = comment?.createdAt?.seconds;
  const timestamp = time ? new Date(time * 1000) : new Date();
  const small = width < 768;
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
        <span>
          {" "}
          by{" "}
          <strong>
            <i>{comment.user.name}</i>
          </strong>{" "}
          {!small && (
            <IconButton>
              <Avatar src={comment.user.photoUrl} />
            </IconButton>
          )}
        </span>
      </p>
    </div>
  );
};

export default Comment;
