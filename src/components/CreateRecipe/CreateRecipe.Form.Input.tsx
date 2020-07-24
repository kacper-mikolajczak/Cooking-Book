import React from "react";

import { Typography, Input } from "@material-ui/core";

export interface IRecipeInput {
  name: string;
  value: string;
  onInputChange: any;
  titleVariant: "h6" | "h5" | "h4" | "h3";
  placeholder: string;
  type?: "number" | "text";
}

const RecipeInput = ({
  name,
  value,
  onInputChange,
  titleVariant,
  placeholder,
  type,
}: IRecipeInput) => {
  return (
    <>
      <Typography variant={titleVariant} component={titleVariant}>
        {name.substr(0, 1).toLocaleUpperCase() + name.substr(1, name.length)}:{" "}
      </Typography>
      <Input
        type={type ? type : "text"}
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
