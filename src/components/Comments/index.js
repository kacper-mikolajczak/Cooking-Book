import React from "react";
import { useSelector } from "react-redux";
import firebase from "../../Firebase";
import { v4 as uuid } from "uuid";

import Comments from "./Comments";
import CommentFormBase from "./CommentFormBase";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const CommentsBox = ({ comments, recipe }) => {
  const classes = useStyles();
  console.log(comments);

  const user = useSelector((state) => state.session.authUser);

  const handleCommentSubmit = (value) => {
    const id = uuid();
    firebase
      .comments()
      .doc(recipe)
      .set(
        {
          [id]: {
            id,
            user: {
              name: user.lastName + " " + user.firstName,
              id: user.uid,
              photoUrl: user.photoUrl,
            },
            createdAt: new Date(),
            value,
          },
        },
        { merge: true }
      )
      .then((wtf) => console.log("Comment added", wtf));
  };

  return (
    <div className={classes.root}>
      <Comments comments={comments} />
      <CommentFormBase
        user={user}
        recipe={recipe}
        handleSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default CommentsBox;
