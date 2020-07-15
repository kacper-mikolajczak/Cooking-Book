import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../store/reducers/recipes/recipeDetails/actions";
import CommentBox from "../Comments";
import Loader from "../Loader";

/* Details layout: 

h2 Title p CreatedAt by User[FirstName LastName <- link to Profile? Avatar??]
p Desc 
p Likes
img PhotoUrl
grid Ingredients grid Steps / Mobile 2x row Lg 2x col
grid NutritionTable??
grid?? Comments

*/

const useStyles = makeStyles((theme) => {
  const bgColors = ["white"];
  const colors = ["black"];
  return {
    paper: {
      backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    },
  };
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecipeDetails(props) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  const recipeDetails = useSelector((state) => state.recipe.details);
  const { user, recipe, comments, pending, open } = recipeDetails;
  const { id, title, desc, photoUrl, steps, ingredients } = recipe;

  console.log(pending);

  return (
    <div>
      <Dialog
        PaperProps={{
          className: classes.paper,
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {pending ? (
          <Loader isLoading={pending} />
        ) : (
          <>
            <DialogActions></DialogActions>
            <DialogTitle id="alert-dialog-slide-title">
              <Typography variant="h3">{title}</Typography>
              <hr />
            </DialogTitle>
            <DialogContent>
              <Container content="main" maxWidth="lg">
                <Grid>
                  <Grid item>{desc}</Grid>
                  <Grid item>
                    <h4>Ingredients: </h4>
                    <ul>
                      {ingredients?.length > 0 ? (
                        ingredients.map((ing) => (
                          <li key={ing.id}>{ing.value}</li>
                        ))
                      ) : (
                        <p>No ingredients added in this recipe!</p>
                      )}
                    </ul>
                  </Grid>
                  <Grid item>
                    <h4>Steps: </h4>
                    <ol>
                      {steps?.length > 0 ? (
                        steps.map((step) => <li key={step.id}>{step.value}</li>)
                      ) : (
                        <p>No steps added in this recipe!</p>
                      )}
                    </ol>
                  </Grid>
                </Grid>
                <CommentBox comments={comments} recipeId={id} />
              </Container>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}

export default RecipeDetails;
