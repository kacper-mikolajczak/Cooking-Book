import React, { useState } from "react";
import { Typography, Input, Button, Container } from "@material-ui/core";
import firebase from "../../Firebase";
import { useSelector } from "react-redux";

const ChangeInput = ({ name, display }: { name: string; display: string }) => {
  const [value, setValue] = useState("");

  const id = useSelector((state) => state.session.authUser.id);

  const handleClick = (e) => {
    console.log(id);
    firebase.user(id).set({ [name]: value }, { merge: true });
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
