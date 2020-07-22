import React from "react";

import { Typography, Input } from "@material-ui/core";

export interface IRecipeInput {
  name: string;
  value: string;
  onInputChange: any;
  titleVariant: "h5" | "h4" | "h3";
}

const RecipeInput = ({
  name,
  value,
  onInputChange,
  titleVariant,
}: IRecipeInput) => {
  return (
    <>
      <Typography variant={titleVariant} component={titleVariant}>
        {name}:{" "}
      </Typography>
      <Input
        autoFocus
        id={name}
        required
        placeholder={`${value}...`}
        name={name}
        onChange={onInputChange}
        value={value}
        fullWidth
      />
    </>
  );
};

export default RecipeInput;
