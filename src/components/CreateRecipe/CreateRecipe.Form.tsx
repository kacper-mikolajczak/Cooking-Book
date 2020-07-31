import { IRecipe } from "../../interfaces";
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeFormActions } from "../../store/reducers/createRecipeForm";

import firebase from "../../Firebase";

import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import { Container, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecipeList from "./CreateRecipe.Form.List";
import RecipeInput from "./CreateRecipe.Form.Input";
import RecipeTextField from "./CreateRecipe.Form.TextField";

import { ErrorActions } from "../../store/reducers/error";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    textAlign: "center",
  },
  form: {},
  formElem: {
    margin: "2em",
  },
  list: {
    textAlign: "center",
  },
  listBox: {
    marginLeft: "2em",
    textAlign: "center",
  },
  addBtn: {
    width: "100%",
    boxShadow:
      "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset",
    marginBottom: "2em",
  },
}));

export interface IRecipeFormProps {
  recipe: IRecipe;
  msg: string;
  recipeId: string;
}

export interface IListItem {
  id: string;
  value: string;
}

const RecipeForm = ({ recipe, msg, recipeId }: IRecipeFormProps) => {
  const lastKeyStroke: { current: number | null } = useRef(null);
  const lastList: { current: string | null } = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (recipe) {
      dispatch(recipeFormActions.setState(recipe));
    }
  }, [recipe, dispatch]);

  const {
    title,
    desc,
    photoUrl,
    nutrients,
    groups,
    ingredients,
    steps,
  } = useSelector((state: any): any => state.recipeForm);

  const user = useSelector((state: any): string => state.session.authUser.id);

  const handleListFocusChange = (name: string, keyCode: number) => {
    lastList.current = name;
    lastKeyStroke.current = keyCode;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(recipeFormActions.setInput(e.target));
  };

  const onNutrientChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(
      recipeFormActions.setNutrientInput({
        name: e.target.name,
        value: Number(e.target.value),
      })
    );
  };

  return (
    <div className={classes.root}>
      <Container component="main">
        <Grid container direction="row">
          <Grid item xs={12} md={8}>
            <div className={classes.form}>
              <div className={classes.formElem}>
                <RecipeInput
                  value={title}
                  name="title"
                  onInputChange={onInputChange}
                  titleVariant="h4"
                  placeholder="Type in recipe title"
                />
              </div>
              <div className={classes.formElem}>
                <RecipeTextField
                  variant="h5"
                  name="desc"
                  value={desc}
                  onInputChange={onInputChange}
                  rows={4}
                  placeholder="Type in short description about your recipe"
                />
              </div>
              <div className={classes.formElem}>
                <RecipeTextField
                  variant="h5"
                  name="photoUrl"
                  value={photoUrl}
                  onInputChange={onInputChange}
                  rows={3}
                  placeholder="Paste in urls of photos - Press enter after every link"
                />
              </div>
              <div className={classes.formElem}>
                <RecipeInput
                  value={groups}
                  name="groups"
                  onInputChange={onInputChange}
                  titleVariant="h5"
                  placeholder="Meal Soup Breakfast etc. - separate with spaces"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
            <div className={classes.formElem}>
              <RecipeInput
                type="number"
                value={nutrients?.kcal}
                name="kcal"
                onInputChange={onNutrientChange}
                titleVariant="h6"
                placeholder=""
              />
            </div>
            <div className={classes.formElem}>
              <RecipeInput
                type="number"
                value={nutrients?.fats}
                name="fats"
                onInputChange={onNutrientChange}
                titleVariant="h6"
                placeholder=""
              />
            </div>
            <div className={classes.formElem}>
              <RecipeInput
                type="number"
                value={nutrients?.carbs}
                name="carbs"
                onInputChange={onNutrientChange}
                titleVariant="h6"
                placeholder=""
              />
            </div>
            <div className={classes.formElem}>
              <RecipeInput
                type="number"
                value={nutrients?.proteins}
                name="proteins"
                onInputChange={onNutrientChange}
                titleVariant="h6"
                placeholder=""
              />
            </div>
            <div className={classes.formElem}>
              <RecipeInput
                type="number"
                value={nutrients?.salt}
                name="salt"
                onInputChange={onNutrientChange}
                titleVariant="h6"
                placeholder=""
              />
            </div>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className={classes.formElem}>
                <Grid item xs={12} className={classes.listBox}>
                  {/* Ingredient List */}
                  <RecipeList
                    name="ingredients"
                    items={ingredients}
                    variant="ul"
                    focused={
                      lastList.current === "ingredients" &&
                      lastKeyStroke.current === 13
                    }
                    onListFocus={handleListFocusChange}
                  />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.formElem}>
                <Grid item xs={12} className={classes.listBox}>
                  {/* Cooking Steps */}
                  <RecipeList
                    name="steps"
                    items={steps}
                    variant="ol"
                    focused={
                      lastList.current === "steps" &&
                      lastKeyStroke.current === 13
                    }
                    onListFocus={handleListFocusChange}
                  />
                </Grid>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12}></Grid>
          <Button
            color="primary"
            variant="contained"
            className={classes.addBtn}
            onClick={() => {
              const currentDate = new Date();
              firebase.recipe(`/${recipeId}`).set(
                {
                  id: recipeId,
                  title,
                  desc,
                  createdAt:
                    recipe && recipe.createdAt ? recipe.createdAt : currentDate,
                  editedAt: currentDate,
                  user: recipe && recipe.user ? recipe.user : user,
                  ingredients: ingredients.filter(
                    (ing: IListItem) => ing.value.length > 0
                  ),
                  steps: steps.filter(
                    (step: IListItem) => step.value.length > 0
                  ),
                  photoUrl,
                  deleted: false,
                  groups: groups ? groups : "all",
                  nutrients,
                },
                { merge: true }
              );
              dispatch(recipeFormActions.clearState());
              dispatch(ErrorActions.set("Recipe sent!"));
              history.push(ROUTES.USER_RECIPES);
            }}
          >
            {msg}
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default RecipeForm;
