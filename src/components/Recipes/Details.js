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
import RecipeMenu from "./RecipeMenu";

import Author from "./details/RecipeDetails.Author";
import CreationTimestamp from "./details/RecipeDetails.Timestamp";
import Description from "./details/RecipeDetails.Description";
import AccordionBase from "./details/RecipeDetails.Accordion";
import List from "./details/RecipeDetails.List";
import Gallery from "./details/RecipeDetails.Gallery";
import CaloriesTable from "./details/RecipeDetails.Table";

import { useWindowDimensions } from "../../hooks";

/* Details layout: 

h2 Title p CreatedAt by FirstName LastName <- link to Profile? Avatar??]
p Desc 
p Likes
img PhotoUrl
grid Ingredients grid Steps / Mobile 2x row Lg 2x col
grid NutritionTable??
grid?? Comments

*/
const bgColors = ["white"];
const colors = ["black"];
const useStyles = makeStyles({
  paper: {
    backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
    color: colors[Math.floor(Math.random() * colors.length)],
  },
  header: {
    textAlign: "center",
    margin: "0 20px",
    padding: "0",
    borderBottom: "1px solid rgba(0,0,0,.3)",
  },
  conent: {
    padding: "0",
    margin: "0",
    backgroundColor: "red",
  },
  subheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RecipeDetails(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { width } = useWindowDimensions();

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

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
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
        <DialogActions></DialogActions>
        <DialogTitle id="alert-dialog-slide-title" className={classes.header}>
          <h3>{title} </h3>
          {recipe.deleted && (
            <span style={{ fontSize: "0.5em", color: "red" }}>
              - recipe removed
            </span>
          )}
        </DialogTitle>
        <DialogContent classes={{ root: classes.content }}>
          <Grid container>
            <Grid item md={6} xs={6}>
              <Author {...user} />
            </Grid>
            <Grid item md={6} xs={6}>
              <CreationTimestamp seconds={recipe?.createdAt?.seconds} />
            </Grid>
          </Grid>
          <Grid container style={{ marginBottom: "20px" }} spacing={2}>
            <Grid item xs={12} md={5}>
              <Description text={desc} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Gallery url={photoUrl} />
            </Grid>
          </Grid>
          <Container content="main" maxWidth="lg">
            <h3>Details: </h3>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <AccordionBase
                  title={"Ingredients"}
                  renderComponent={
                    <List
                      items={ingredients}
                      error={"There is no ingredients in this recipe! :("}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AccordionBase
                  title={"Steps"}
                  renderComponent={
                    <List
                      items={steps}
                      error={"There is no steps in this recipe"}
                      ordered
                    />
                  }
                />
              </Grid>
            </Grid>
            {/* <DetailsList desc={desc} steps={steps} ingredients={ingredients} /> */}
            {/* <CaloriesTable
              //Placeholder
              rows={[
                {
                  calories: 222,
                  fat: 333,
                  carbs: 20,
                  protein: 9,
                },
              ]}
              title={title}
            /> */}
            <h3>Comments: </h3>
            <CommentBox
              comments={comments}
              recipeId={id}
              deleted={recipe.deleted ?? false}
            />
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const DetailsList = ({ ingredients, steps }) => {
  return (
    <Grid>
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

export { DetailsList };
