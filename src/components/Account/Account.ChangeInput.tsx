import React, { useState } from "react";
import { Typography, Input, Button, Container } from "@material-ui/core";
import firebase from "../../Firebase";
import { useSelector, useDispatch } from "react-redux";
import { ErrorActions } from "../../store/reducers/error";
import { sessionOperations } from "../../store/reducers/session";

const ChangeInput = ({ name, display }: { name: string; display: string }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const id = useSelector((state: any) => state.session.authUser.id);

  const handleClick = () => {
    dispatch(ErrorActions.set("User data updated!"));
    firebase.user(id).set({ [name]: value }, { merge: true });
    dispatch(sessionOperations.getAuthUser(id));
  };

  return (
    <>
      <Typography variant="h5" style={{ marginTop: "30px" }}>
        Set new {display}:{" "}
      </Typography>
      <form style={{ display: "grid", gridGap: "10px" }}>
        <Input
          placeholder={`New ${display}...`}
          name={name}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <Button
          disabled={value.length < 1}
          onClick={handleClick}
          variant="outlined"
          color="secondary"
        >
          Set new {display}!
        </Button>
      </form>
    </>
  );
};

export default ChangeInput;
