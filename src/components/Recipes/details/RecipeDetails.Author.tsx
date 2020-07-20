import React from "react";

import { Avatar, IconButton } from "@material-ui/core";

interface IRecipeDetailsAuthor {
  firstName: string;
  lastName: string;
  photoUrl: string;
  id: string;
}

const Author = ({
  firstName,
  lastName,
  photoUrl,
  id,
}: IRecipeDetailsAuthor) => {
  const displayName =
    firstName && lastName ? `${firstName} ${lastName}` : "Anonymous";

  const photoSrc = photoUrl ? photoUrl : "";

  return (
    <p style={{ padding: "0", margin: "0" }}>
      Author: <strong>{displayName}</strong>
      <IconButton>
        <Avatar src={photoSrc} />
      </IconButton>
    </p>
  );
};

export default Author;
