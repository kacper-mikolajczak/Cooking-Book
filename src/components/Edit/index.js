import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RecipeForm } from "../CreateRecipe";
import { recipeFormActions } from "../../store/reducers/createRecipeForm";

const EditPage = (props) => {
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.editedRecipe.recipe);
  const user = useSelector((state) => state.session.authUser);

  return (
    <div>
      <h2>Edit Page</h2>
      <RecipeForm
        recipe={recipe}
        recipeId={recipe.id}
        msg={"Edit this recipe!"}
      />
    </div>
  );
};

export default EditPage;
