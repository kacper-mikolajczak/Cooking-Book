import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardHeader,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const RecipeCard = (props) => {
  const classes = useStyles();

  const { title, desc, photoUrl, createdAt } = props;

  return (
    <Card className={classes.card}>
      <CardHeader>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <p>{createdAt}</p>
      </CardHeader>
      <CardMedia className={classes.cardMedia} image={photoUrl} title={title} />
      <CardContent className={classes.cardContent}>
        <Typography>{desc}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
