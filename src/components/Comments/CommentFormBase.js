import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components";

const useStyles = makeStyles((theme) => {
  return {
    input: {
      marginBottom: "1em",
    },
    button: {
      float: "right",
    },
  };
});

const CommentFormBase = ({ user, recipeId, handleSubmit }) => {
  const classes = useStyles();
  const [textFieldVal, setTextFieldVal] = useState("");

  const handleFormSubmit = (e) => {
    handleSubmit(textFieldVal);
    setTextFieldVal("");
  };

  return (
    <StyledCommentForm>
      <form>
        <TextField
          className={classes.input}
          name="commentText"
          id="commentText"
          placeholder="Write a comment..."
          autoFocus
          fullWidth
          multiline
          rows={3}
          onChange={(e) => {
            setTextFieldVal(e.target.value);
          }}
        />
        <Button
          className={classes.button}
          onClick={handleFormSubmit}
          disabled={textFieldVal.length < 1}
          variant="contained"
          color="primary"
          id="commentSend"
        >
          {" "}
          Send{" "}
        </Button>
      </form>
    </StyledCommentForm>
  );
};

const StyledCommentForm = styled.div`
  & {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 15px 30px;
    padding-bottom: 50px;
    border-radius: 5px;
  }
`;

export default CommentFormBase;
