import React from "react";
import { IListItem } from "./CreateRecipe.Form";

import { ListItem, Input, Button } from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

export interface IRecipeListInput {
  ordered: boolean;
  index: number;
  item: IListItem;
  listName: string;
  focused: boolean;
  handleListItemKeyDown: any;
  handleListItemChange: any;
  handleListItemButtonClick: any;
  placeholder: string;
}

const RecipeListInput = ({
  ordered,
  index,
  item,
  listName,
  focused,
  handleListItemButtonClick,
  handleListItemChange,
  handleListItemKeyDown,
  placeholder,
}: IRecipeListInput) => {
  return (
    <ListItem>
      {ordered && <span>{index + 1}.</span>}
      <Input
        fullWidth
        value={item.value}
        onKeyDown={(e) => handleListItemKeyDown(e, listName)}
        onChange={(e) => handleListItemChange(e, item, listName)}
        inputRef={(input) => focused && input && input.focus()}
        placeholder={placeholder}
      ></Input>
      <Button onClick={(e) => handleListItemButtonClick(e, item, listName)}>
        <ClearSharpIcon />
      </Button>
    </ListItem>
  );
};

export default RecipeListInput;
