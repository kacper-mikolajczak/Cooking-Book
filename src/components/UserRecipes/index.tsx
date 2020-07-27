import * as React from "react";

import { withAuthorization } from "../Session";
import RecipesContainer from "../Recipes/Container";

import { userRecipesOperations } from "../../store/reducers/userRecipes";

const UsersRecipes = () => {
  return (
    <div>
      <RecipesContainer
        getOp={userRecipesOperations.get}
        selectOp={(state) => state.userRecipes}
        msg="You have no recipes yet :("
        storeSrc="userRecipes"
      />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(UsersRecipes);
