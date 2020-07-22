import React from "react";

import { Typography, Input } from "@material-ui/core";

export interface IRecipeTextField {
  name: string;
  value: string;
  rows: number;
  onInputChange: any;
  variant: "h5" | "h4" | "h3";
}

const RecipeTextField = ({
  name,
  value,
  rows,
  onInputChange,
  variant,
}: IRecipeTextField) => {
  return (
    <>
      <Typography variant={variant} component={variant}>
        {name}:{" "}
      </Typography>
      <Input
        id={name}
        multiline
        placeholder={name}
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
