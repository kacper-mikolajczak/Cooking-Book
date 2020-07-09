import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import { Provider } from "react-redux";
import store from "./store";

import Firebase, { FirebaseContext } from "./Firebase";
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";

// const rrfConfig = {
//   userProfile: "users",
// };

// const rrfProps = {
//   /* Firebase not included */
//   config: rrfConfig,
//   dispatch: store.dispatch,
// };

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={Firebase}>
      <App />
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
