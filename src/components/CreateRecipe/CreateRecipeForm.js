import React from "react";

import {
  Container,
  Typography,
  TextField,
  Grid,
  Input,
  List,
  ListItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

// h1 Fresh idea in mind? :)
// p Add new recipe...

// input title
// textArea desc
// input/drag&drop photoUrl

// list ingredients
// orderedList steps

// table nutrition

const CreateRecipeForm = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid>
          <Grid item xs={12}>
            <Typography> Fresh idea in mind? :)</Typography>
            <Typography> Add new recipe and share it with others!</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid>
              <Grid item xs={6}>
                <Input autoFocus id="title" placeholder="Title..." />
              </Grid>
              <Grid item xs={12}>
                <TextField id="desc" placeholder="Description..." multiline />
              </Grid>
              <Grid item xs={12}>
                <Input id="photUrl" placeholder="Photo URL..." />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* Ingredient List */}
            <List>
              {/* List Items will be rendered from state */}
              <ListItem>
                <Input></Input>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            {/* Cooking Steps */}
            <List>
              <ListItem>First Step</ListItem>
              <ListItem>Second Step</ListItem>
              <ListItem>Third Step</ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            {/* Here Nutrition Table */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateRecipeForm;
