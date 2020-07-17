import React, { useRef, useEffect } from "react";
import { useWindowDimensions } from "../../hooks";
import {
  Container,
  Typography,
  Grid,
  Input,
  List,
  ListItem,
  Button,
} from "@material-ui/core";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { recipeFormActions } from "../../store/reducers/createRecipeForm";

import firebase from "../../Firebase";
import { v4 as uuid } from "uuid";
import { DetailsList } from "../Recipes/Details";

import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

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

// h1 Fresh idea in mind? :)
// p Add new recipe...

// input title
// textArea desc
// input/drag&drop photoUrl

// list ingredients
// orderedList steps

// table nutrition

const CreateRecipePage = (props) => {
  const classes = useStyles();

  const id = uuid();
  return (
    <div>
      <Container content="main">
        <Grid>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography compnt="h2" variant="h2">
                {" "}
                Fresh idea in mind?
              </Typography>
              <Typography compnt="h3" variant="h5">
                {" "}
                Add new recipe and share it with others!
              </Typography>
            </div>
          </Grid>
          <RecipeForm msg={"Share this recipe!"} recipeId={id} />
        </Grid>
      </Container>
    </div>
  );
};

const RecipeForm = ({ recipe, msg, recipeId }) => {
  const lastKeyStroke = useRef(null);
  const lastList = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (recipe) {
      dispatch(
        recipeFormActions.setInput({ name: "title", value: recipe.title })
      );
      dispatch(
        recipeFormActions.setInput({ name: "desc", value: recipe.desc })
      );
      dispatch(
        recipeFormActions.setInput({ name: "photoUrl", value: recipe.photoUrl })
      );
      dispatch(recipeFormActions.setList("ingredients", recipe.ingredients));
      dispatch(recipeFormActions.setList("steps", recipe.steps));
    }
  }, [recipe, dispatch]);

  const {
    title,
    desc,
    photoUrl,
    lists: { ingredients, steps },
  } = useSelector((state) => state.recipeForm);

  const user = useSelector((state) => state.session.authUser.id);

  const ingItems = ingredients.map((item, index) => {
    return (
      <ListItem key={item.id}>
        <Input
          value={item.value}
          fullWidth
          onKeyDown={(e) => {
            if (e.keyCode === 13)
              dispatch(
                recipeFormActions.pushEmptyListItem({ name: "ingredients" })
              );
            lastKeyStroke.current = 13;
            lastList.current = "ingredients";
          }}
          onChange={(e) =>
            dispatch(
              recipeFormActions.setListInput({
                id: item.id,
                name: "ingredients",
                value: e.target.value,
              })
            )
          }
          inputRef={(input) =>
            lastList.current === "ingredients" &&
            lastKeyStroke.current === 13 &&
            index === ingredients.length - 1 &&
            input &&
            input.focus()
          }
        >
          {item.value}
        </Input>
        <Button
          onClick={(e) =>
            dispatch(recipeFormActions.removeItemsList("ingredients", item.id))
          }
        >
          <ClearSharpIcon />
        </Button>
      </ListItem>
    );
  });

  const stepsItems = steps.map((item, index) => (
    <ListItem key={item.id}>
      <span>{index + 1}.</span>
      <Input
        fullWidth
        value={item.value}
        onKeyDown={(e) => {
          if (e.keyCode === 13)
            dispatch(recipeFormActions.pushEmptyListItem({ name: "steps" }));
          lastKeyStroke.current = 13;

          lastList.current = "steps";
        }}
        onChange={(e) => {
          dispatch(
            recipeFormActions.setListInput({
              id: item.id,
              name: "steps",
              value: e.target.value,
            })
          );
        }}
        inputRef={(input) =>
          lastList.current === "steps" &&
          lastKeyStroke.current === 13 &&
          index === steps.length - 1 &&
          input &&
          input.focus()
        }
      >
        {item.value}
      </Input>
      <Button
        onClick={(e) =>
          dispatch(recipeFormActions.removeItemsList("steps", item.id))
        }
      >
        <ClearSharpIcon />
      </Button>
    </ListItem>
  ));

  const onInputChange = (e) => {
    dispatch(recipeFormActions.setInput(e.target));
  };

  return (
    <div className={classes.root}>
      <Container container="main">
        <Grid container direction="row">
          <Grid item xs={12} md={12}>
            <Grid item xs={12}>
              <div className={classes.form}>
                <div className={classes.formElem}>
                  <Typography variant="h4" compnt="h4">
                    Title:{" "}
                  </Typography>
                  <Input
                    autoFocus
                    id="title"
                    required
                    label="Title"
                    placeholder="Title..."
                    name="title"
                    onChange={onInputChange}
                    value={title}
                    fullWidth
                  />
                </div>
                <div className={classes.formElem}>
                  <Typography variant="h5" compnt="h5">
                    Description:{" "}
                  </Typography>
                  <Input
                    id="desc"
                    multiline
                    label="Description"
                    placeholder="Description..."
                    name="desc"
                    onChange={onInputChange}
                    value={desc}
                    rows={4}
                    fullWidth
                  />
                </div>
                <div className={classes.formElem}>
                  <Typography variant="h5" compnt="h5">
                    Photo URL:{" "}
                  </Typography>
                  <Input
                    id="photUrl"
                    label="Photo URL"
                    placeholder="Photo URL..."
                    name="photoUrl"
                    onChange={onInputChange}
                    value={photoUrl}
                    fullWidth
                  />
                </div>
              </div>
            </Grid>

            <div className={classes.formElem}>
              <Grid item xs={12} className={classes.listBox}>
                {/* Ingredient List */}
                <Typography variant="h5" compnt="h5">
                  Ingredients list:{" "}
                </Typography>
                <List name="ingredients" className={classes.list}>
                  {/* List Items will be rendered from state */}
                  {ingItems.length > 0 ? ingItems : <p>No ingredients Added</p>}
                </List>
                <Button
                  color="primary"
                  variant="contained"
                  name="ingredients"
                  onClick={(e) =>
                    dispatch(
                      recipeFormActions.pushEmptyListItem({
                        name: "ingredients",
                      })
                    )
                  }
                >
                  Add next ingredient
                </Button>
              </Grid>
            </div>
            <div className={classes.formElem}>
              <Grid item xs={12} className={classes.listBox}>
                {/* Cooking Steps */}
                <Typography variant="h5" compnt="h5">
                  Steps list:{" "}
                </Typography>
                <List name="steps" className={classes.list}>
                  {stepsItems.length > 0 ? stepsItems : <p>No steps added</p>}
                </List>
                <Button
                  color="primary"
                  variant="contained"
                  name="steps"
                  onClick={(e) =>
                    dispatch(
                      recipeFormActions.pushEmptyListItem({ name: "steps" })
                    )
                  }
                >
                  Add next step
                </Button>
              </Grid>
            </div>
            <Grid item xs={12}>
              {/* Here Nutrition Table */}
            </Grid>
          </Grid>
          {width > 9999 && (
            <Grid item md={6}>
              <h3>This is presumably going to be a preview for a recipe</h3>
              <span style={{ fontSize: "8px" }}>Stupid idea...</span>
              <DetailsList
                ingredients={ingredients}
                steps={steps}
                desc={desc}
              />
            </Grid>
          )}
          <Button
            color="primary"
            variant="contained"
            className={classes.addBtn}
            onClick={() => {
              firebase.recipe(`/${recipeId}`).set(
                {
                  id: recipeId,
                  title,
                  desc,
                  createdAt: new Date(),
                  user,
                  ingredients: ingredients.filter(
                    (ing) => ing.value.length > 0
                  ),
                  steps: steps.filter((step) => step.value.lenght > 0),
                  photoUrl,
                  deleted: false,
                },
                { merge: true }
              );
              dispatch(recipeFormActions.clearState());
              history.push(ROUTES.HOME);
            }}
          >
            {msg}
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateRecipePage;

export { RecipeForm };
