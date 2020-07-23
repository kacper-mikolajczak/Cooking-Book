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
      commentsArr.map((com, index) => (
        <div
          key={index}
          className={classes.comment}
          style={{
            backgroundColor:
              index % 2 ? "rgba(100,100,255,.2)" : "rgba(200,200,200,.2)",
            marginTop: "5px",
            marginBottom: "5px",
            borderRadius: "10px",
          }}
        >
          <Comment key={com.id} {...com} />
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
