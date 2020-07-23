import React from "react";

import { Typography, Input } from "@material-ui/core";

export interface IRecipeInput {
  name: string;
  value: string;
  onInputChange: any;
  titleVariant: "h5" | "h4" | "h3";
  placeholder: string;
}

const RecipeInput = ({
  name,
  value,
  onInputChange,
  titleVariant,
  placeholder,
}: IRecipeInput) => {
  return (
    <>
      <Typography variant={titleVariant} component={titleVariant}>
        {name.substr(0, 1).toLocaleUpperCase() + name.substr(1, name.length)}:{" "}
      </Typography>
      <Input
        autoFocus
        id={name}
        required
        placeholder={placeholder}
        name={name}
        onChange={onInputChange}
        value={value}
        fullWidth
      />
    </>
  );
};

export default RecipeInput;
