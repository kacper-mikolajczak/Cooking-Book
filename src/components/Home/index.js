import React, { useState } from "react";

import { withAuthorization, AuthUserContext } from "../Session";

const Home = (props) => {
  //const [loading, setLoading] = useState(false);
  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div>
            {false ? (
              <p>Loading...</p>
            ) : (
              <div>
                <h1>Home Page</h1>
                <p>{JSON.stringify(authUser)}</p>
                <p>Page only accessible by the user {} </p>
                <p>
                  <strong>
                    What Firebase Context provides is user info from hidden
                    default Firebase table - if I want to get other data (
                    username etc. ) gotta fetch it separately.
                  </strong>
                </p>
              </div>
            )}
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
