import React from "react";

import { withAuthorization, AuthUserContext } from "../Session";
import RecipesContainer from "../Recipes/Container";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../Firebase";

const Home = (props) => {
  //const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.authUser);

  return (
    <div>
      <h1>Welcome {currentUser?.firstName + " " + currentUser?.lastName}</h1>
      <RecipesContainer />
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
