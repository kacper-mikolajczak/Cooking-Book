import React from "react";

import { withAuthorization } from "../Session";
import RecipesContainer from "../Recipes/Container";
import { useSelector } from "react-redux";
//import firebase from "../../Firebase";

import { userRecipesOperations } from "../../store/reducers/userRecipes";

const Home = (props) => {
  const currentUser = useSelector((state) => state.session.authUser);

  return (
    <div>
      <h1>Welcome {currentUser?.firstName + " " + currentUser?.lastName}</h1>
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
