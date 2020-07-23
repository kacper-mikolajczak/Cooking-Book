import React from "react";

import { Typography, Input } from "@material-ui/core";

export interface IRecipeTextField {
  name: string;
  value: string;
  rows: number;
  onInputChange: any;
  variant: "h5" | "h4" | "h3";
  placeholder: string;
}

const RecipeTextField = ({
  name,
  value,
  rows,
  onInputChange,
  variant,
  placeholder,
}: IRecipeTextField) => {
  const prettyName =
    name.substr(0, 1).toLocaleUpperCase() + name.substr(1, name.length);
  return (
    <>
      <Typography variant={variant} component={variant}>
        {prettyName}:{" "}
      </Typography>
      <Input
        id={name}
        multiline
        placeholder={placeholder}
        name={name}
        onChange={onInputChange}
        value={value}
        rows={rows}
        fullWidth
      />
    </>
  );
};

export default RecipeTextField;
