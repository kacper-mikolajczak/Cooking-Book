import React from "react";
import { v4 as uuid } from "uuid";

import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RecipeForm from "./CreateRecipe.Form";

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

const CreateRecipePage = (props) => {
  const classes = useStyles();

  const id = uuid();
  return (
    <div>
      <Container content="main">
        <Grid>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography component="h2" variant="h2">
                {" "}
                Fresh idea in mind?
              </Typography>
              <Typography component="h3" variant="h5">
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

export default CreateRecipePage;

export { RecipeForm };
