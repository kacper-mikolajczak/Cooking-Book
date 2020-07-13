import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import RecipeDetails from "./Details";
import { useSelector, useDispatch } from "react-redux";
import { recipeDetailsActions } from "../../store/reducers/recipes/recipeDetails";

import RecipeMenu from "./RecipeMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  dateField: {
    fontSize: "0.8em",
    color: "rgba(0,0,0,.5)",
  },
  favourite: {},
  icons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9em",
    color: "rgba(0,0,0,.6)",
  },
}));

function RecipeCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id, title, desc, photoUrl, createdAt } = props;

  const dateField = (
    <span className={classes.dateField}>
      Published: {new Date(createdAt.seconds * 1000).toLocaleDateString()}
    </span>
  );

  const isDialogOpen = useSelector((state) => state.recipe.details.open);

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={(e) => {
          dispatch(recipeDetailsActions.openDialog());
        }}
      >
        <CardHeader title={title} subheader={dateField} />
        <CardMedia className={classes.media} image={photoUrl} title={title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={classes.icons}>
        <RecipeMenu />
      </CardActions>
      {isDialogOpen && <RecipeDetails recipe={id} {...props} />}
    </Card>
  );
}

export default RecipeCard;
