import React from "react";

import Comment from "./Comment";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
  },
  comment: {
    flexGrow: "1",
  },
}));

function Comments({ comments }) {
  const classes = useStyles();

  const commentsArr = Object.values(comments || {});

  const mappedComments =
    commentsArr.length > 0 ? (
      commentsArr.map((com) => (
        <div className={classes.comment}>
          <Comment key={com.id} comment={com} />
        </div>
      ))
    ) : (
      <p>No comments yet</p>
    );

  return (
    <div>
      <div className={classes.box}>{mappedComments}</div>
    </div>
  );
}

export default Comments;
