import React from "react";

const Comment = ({ comment }) => {
  const time = comment?.createdAt?.seconds;
  const timestamp = time ? new Date(time * 1000) : new Date();
  return (
    <div>
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
