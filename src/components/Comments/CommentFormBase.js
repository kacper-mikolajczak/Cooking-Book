import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const CommentFormBase = ({ user, recipe, handleSubmit }) => {
  const [textFieldVal, setTextFieldVal] = useState("");

  const handleFormSubmit = (e) => {
    console.log("Comment sender clicked!", user, recipe);
    handleSubmit(textFieldVal);
    setTextFieldVal("");
  };

  return (
    <>
      <form>
        <TextField
          name="commentText"
          id="commentText"
          placeholder="Write a comment..."
          autoFocus
          onChange={(e) => {
            setTextFieldVal(e.target.value);
          }}
        />
        <Button
          onClick={handleFormSubmit}
          disabled={textFieldVal.length < 1}
          variant="contained"
          color="primary"
        >
          {" "}
          Send{" "}
        </Button>
      </form>
    </>
  );
};

export default CommentFormBase;
