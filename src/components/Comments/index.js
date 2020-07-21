import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../Firebase";
import { v4 as uuid } from "uuid";

import Comments from "./Comments";
import CommentFormBase from "./CommentFormBase";
import Loader from "../Loader";

import { makeStyles } from "@material-ui/core/styles";
import { SignInLink } from "../SignIn";
import { recipeDetailsActions } from "../../store/reducers/recipes/recipeDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const CommentsBox = ({ comments, recipeId, deleted }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.session.authUser);

  const handleCommentSubmit = (value) => {
    const id = uuid();
    setLoading(true);
    const comment = {
      [id]: {
        id,
        deleted: false,
        user: {
          name: user.lastName + " " + user.firstName,
          id: user.id,
          photoUrl: user.photoUrl,
        },
        createdAt: new Date(),
        value,
      },
    };
    firebase
      .comments()
      .doc(recipeId)
      .set(comment, { merge: true })
      .then((res) => {
        dispatch(recipeDetailsActions.addNewComment(comment[id]));
        setLoading(false);
      });
  };

  const commentsOrMsg = !deleted && (
    <CommentFormBase
      user={user}
      recipeId={recipeId}
      handleSubmit={handleCommentSubmit}
    />
  );

  return (
    <div className={classes.root}>
      <Comments comments={comments} />
      <hr />
      {user ? (
        <div>{loading ? <Loader isLoading={loading} /> : commentsOrMsg}</div>
      ) : (
        <SignInLink msg="Want to leave a comment? " />
      )}
    </div>
  );
};

export default CommentsBox;
