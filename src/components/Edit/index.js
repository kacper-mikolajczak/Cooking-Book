import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateRecipeForm } from "../CreateRecipe";

const EditPage = (props) => {
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.recipe.details.recipe);
  const user = useSelector((state) => state.session.authUser);
  console.log("EDIT", recipe, user);
  return (
    <div>
      <h2>Edit Page</h2>
      <CreateRecipeForm />
    </div>
  );
};

export default EditPage;
