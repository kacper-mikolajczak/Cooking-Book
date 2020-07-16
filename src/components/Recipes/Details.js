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

h2 Title p CreatedAt by FirstName LastName <- link to Profile? Avatar??]
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
    header: {
      paddingBottom: "0",
    },
    subheader: {
      fontSize: "1em",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingBottom: "10px",
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

  function nullToString(obj) {
    if (!obj) return {};
    let temp = {};
    for (const [key, val] of Object.entries(obj)) {
      temp[key] = val ?? "";
    }
    return temp;
  }

  const recipeDetails = useSelector((state) => state.recipe.details);
  const { user, recipe, comments, pending, open } = recipeDetails;
  const { id, title, desc, photoUrl, steps, ingredients } = nullToString(
    recipe
  );
  const {
    lastName,
    firstName,
    id: userId,
    photoUrl: userPhotoUrl,
  } = nullToString(user);

  const seconds = recipe?.createdAt?.seconds;

  const createdAt = seconds
    ? `${new Date(seconds * 1000).toLocaleTimeString()} ${new Date(
        seconds * 1000
      ).toLocaleDateString()}`
    : "No data";

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
            <DialogTitle
              id="alert-dialog-slide-title"
              className={classes.header}
            >
              <Typography variant="h4">{title}</Typography>
              <hr />
            </DialogTitle>
            <div className={classes.subheader}>
              <div>
                Author:{" "}
                <strong>
                  {lastName} {firstName}
                </strong>
              </div>
              <div>
                Created at: <strong>{createdAt}</strong>
              </div>
            </div>
            <DialogContent>
              <Container content="main" maxWidth="lg">
                <DetailsFormBase
                  desc={desc}
                  steps={steps}
                  ingredients={ingredients}
                />
                <CommentBox comments={comments} recipeId={id} />
              </Container>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
}

const DetailsFormBase = ({ ingredients, desc, steps }) => {
  return (
    <Grid>
      <Grid item>{desc}</Grid>
      <Grid item>
        <h4>Ingredients: </h4>
        <ul>
          {ingredients?.length > 0 ? (
            ingredients.map((ing) => <li key={ing.id}>{ing.value}</li>)
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
  );
};

export default RecipeDetails;

export { DetailsFormBase };
