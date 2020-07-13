import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <p>{comment.value}</p>
      <span>
        {" "}
        at {new Date(comment.createdAt.seconds).toLocaleTimeString()}
      </span>
      <span> by {comment.user.name}</span>
    </div>
  );
};

export default Comment;
