import React from "react";

import { withAuthorization } from "../Session";
import RecipesContainer from "../Recipes/Container";
import { likedRecipesOperations } from "../../store/reducers/likedRecipes";

const Home = () => {
  return (
    <div>
      <RecipesContainer
        getOp={likedRecipesOperations.getUserLikedRecipes}
        selectOp={(state) => state.likedRecipes}
        msg="Search for recipes that suits your taste!"
        storeSrc="likedRecipes"
      />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
