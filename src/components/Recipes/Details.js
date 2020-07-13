import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Grid, Container, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../../store/reducers/recipes/recipeDetails/operations";
import { closeDialog } from "../../store/reducers/recipes/recipeDetails/actions";
import { recipeDetailsActions } from "../../store/reducers/recipes/recipeDetails";
import RecipeMenu from "./RecipeMenu";

import CommentBox from "../Comments";

/* Details layout: 

h2 Title p CreatedAt by User[FirstName LastName <- link to Profile? Avatar??]
p Desc 
p Likes
img PhotoUrl
grid Ingredients grid Steps / Mobile 2x row Lg 2x col
grid NutritionTable??
grid?? Comments

*/

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecipeDetails(props) {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeDialog());
  };

  const { user: userUid } = props;
  console.log(props);

  useEffect(() => {
    dispatch(getRecipeDetails(userUid, props.id));
  }, []);

  const recipeDetails = useSelector((state) => state.recipe.details);

  const { user, recipe, comments } = recipeDetails;

  const { title, desc, photoUrl, steps, ingredients } = recipe;

  return (
    <div>
      <Dialog
        open={recipeDetails.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions></DialogActions>
        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant="h2">{title}</Typography>
        </DialogTitle>
        <DialogContent>
          <Container content="main" maxWidth="lg">
            <Grid>
              <Grid item>{desc}</Grid>
              <Grid item>
                <ol>
                  {steps &&
                    steps.map((step) => <li key={step.id}>{step.value}</li>)}
                </ol>
              </Grid>
            </Grid>
            <CommentBox comments={comments} recipe={props.id} />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RecipeDetails;
