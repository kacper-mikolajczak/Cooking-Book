import React from "react";

import { withAuthorization, AuthUserContext } from "../Session";
import RecipesContainer from "../Recipes/Container";

const Home = (props) => {
  //const [loading, setLoading] = useState(false);
  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div>
            <RecipesContainer />
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
