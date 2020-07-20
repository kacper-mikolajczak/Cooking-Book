import React from "react";

import { withAuthorization } from "../Session";
import RecipesContainer from "../Recipes/Container";
//import firebase from "../../Firebase";

import { userRecipesOperations } from "../../store/reducers/userRecipes";

const Home = (props) => {
  return (
    <div>
      <RecipesContainer
        getOp={userRecipesOperations.get}
        selectOp={(state) => state.userRecipes}
        msg="User has no recipes yet :("
        storeSrc="userRecipes"
      />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
