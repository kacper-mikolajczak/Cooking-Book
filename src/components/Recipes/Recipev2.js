import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import RecipeMenu from "./RecipeMenu";

import firebase from "../../Firebase";

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

  const [likes, setLikes] = useState([]);

  const { id, title, desc, photoUrl, createdAt, deleted } = props;

  const dateField = (
    <span className={classes.dateField}>
      Published: {new Date(createdAt.seconds * 1000).toLocaleDateString()}
    </span>
  );

  useEffect(() => {
    (async () => {
      try {
        const likes = await firebase
          .recipeLikes(id)
          .get()
          .then((dbRes) => dbRes.data());
        const ids = Object.keys(likes);
        const vals = Object.values(likes);
        setLikes(ids.filter((id, index) => vals[index]));
      } catch (error) {
        setLikes([]);
      }
    })();
  }, [id]);

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={deleted ? () => {} : props.handleClick}
        style={deleted ? { opacity: "0.6" } : {}}
      >
        <CardHeader title={title} subheader={dateField} />
        <CardMedia
          className={classes.media}
          image={photoUrl.split("\n")[0]}
          title={title}
        />
        <CardContent
          style={{ maxHeight: "80px", height: "80px", overflow: "hidden" }}
        >
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={classes.icons}>
        <RecipeMenu
          recipe={props}
          likes={likes}
          handleShowClick={props.handleClick}
        />
      </CardActions>
    </Card>
  );
}

export default RecipeCard;
