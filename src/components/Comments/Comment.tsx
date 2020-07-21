import React from "react";

interface ICreatedAt {
  seconds: number;
  nanoseconds: number;
}

interface IUser {
  name: string;
}

interface IComment {
  value: string;
  user: IUser;
  createdAt: ICreatedAt;
  text: string[];
  fun: (arg1: number, arg2: string) => void;
}

const Comment = (comment: IComment) => {
  const time = comment?.createdAt?.seconds;
  const timestamp = time ? new Date(time * 1000) : new Date();
  return (
    <div style={{ paddingLeft: "10px" }}>
      <p>{comment.value}</p>
      <h5>
        <span>
          {" "}
          at <i>{timestamp.toLocaleTimeString()}</i>{" "}
          <i>{timestamp.toLocaleDateString()}</i>
        </span>
        <span>
          {" "}
          by{" "}
          <strong>
            <i>{comment.user.name}</i>
          </strong>{" "}
        </span>
      </h5>
    </div>
  );
};

export default Comment;
