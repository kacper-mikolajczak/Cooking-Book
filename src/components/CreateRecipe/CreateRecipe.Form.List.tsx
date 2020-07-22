import React from "react";

import { useDispatch } from "react-redux";

import { Typography, List, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { recipeFormActions } from "../../store/reducers/createRecipeForm";
import RecipeListInput from "./CreateRecipe.Form.ListInput";

export interface IListItem {
  id: string;
  value: string;
}
export interface IRecipeList {
  name: string;
  items: IListItem[];
  variant: "ol" | "ul";
  onListFocus: any;
  focused: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {
    textAlign: "center",
  },
}));

const RecipeList = ({
  name,
  items,
  variant,
  onListFocus,
  focused,
}: IRecipeList) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleListItemKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    listName: string
  ): void => {
    if (e.keyCode === 13) {
      dispatch(recipeFormActions.pushEmptyListItem({ name: listName }));
    }

    onListFocus(name, e.keyCode);
  };

  const handleListItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: IListItem,
    listName: string
  ): void => {
    dispatch(
      recipeFormActions.setListInput({
        id: item.id,
        name: listName,
        value: e.target.value,
      })
    );
  };

  const handleListItemButtonClick = (
    e: React.MouseEvent<HTMLInputElement>,
    item: IListItem,
    listName: string
  ) => {
    dispatch(recipeFormActions.removeItemsList(listName, item.id));
  };

  const mappedItems = items.map((item: IListItem, index: number) => (
    <RecipeListInput
      key={index}
      ordered={variant === "ol"}
      index={index}
      item={item}
      listName={name}
      focused={index === items.length - 1 && focused}
      handleListItemButtonClick={handleListItemButtonClick}
      handleListItemChange={handleListItemChange}
      handleListItemKeyDown={handleListItemKeyDown}
    />
  ));
  return (
    <>
      <Typography variant="h5" component="h5">
        Recipe {name}:{" "}
      </Typography>
      <List className={classes.list} component={variant}>
        {mappedItems.length > 0 ? mappedItems : <p>No {name} added</p>}
      </List>
      <Button
        color="primary"
        variant="contained"
        name={name}
        onClick={(e) =>
          dispatch(recipeFormActions.pushEmptyListItem({ name: name }))
        }
      >
        Add next {name.substr(0, name.length - 1)}
      </Button>
    </>
  );
};

export default RecipeList;
