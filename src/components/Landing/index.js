import React from "react";
import { topRecipesOperations } from "../../store/reducers/topRecipes";

import RecipesContainer from "../Recipes/Container";

const Landing = (props) => {
  return (
    <div>
      <RecipesContainer
        getOp={topRecipesOperations.get}
        selectOp={(state) => state.topRecipes}
        msg="No Top Recipes available!"
        storeSrc="topRecipes"
      />
    </div>
  );
};

export default Landing;
