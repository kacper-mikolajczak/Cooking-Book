import app from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

import { v4 as uuid } from "uuid";

const config = {
  apiKey: "AIzaSyB6D2hi1XOL87ghg_lZrUe1fb2jT7Y3NXU",
  authDomain: "fir-react-basics.firebaseapp.com",
  databaseURL: "https://fir-react-basics.firebaseio.com",
  projectId: "fir-react-basics",
  storageBucket: "fir-react-basics.appspot.com",
  messagingSenderId: "555404250422",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    // this.db = app.database();

    this.db = app.firestore();
    //console.log(this.db, this.firestore);
  }

  /* Auth API */
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  /* Database */
  /* User API */
  // user = (uid) => this.db.ref(`users/${uid}`);

  // users = () => this.db.ref("users");

  // /* Data API */
  // data = () => this.db.ref("data");

  // /* Recipes API */
  // newRecipe = () => this.db.ref(`recipes/${uuid()}`);

  // recipes = () => this.db.ref(`recipes`);

  /* Users */

  users = () => this.db.collection("users");

  user = (uid) => this.users().doc(`${uid}`);

  clients = () => this.users().where("admin", "==", false);
  admins = () => this.users().where("admin", "==", true);

  /* Recipes */
  recipes = () => this.db.collection("recipes");

  getRecipe = (uid) => this.recipes().doc(`${uid}`);
  setRecipe = () => this.recipes().doc(`${uuid()}`);

  userRecipes = (userUid) => this.recipes().where("user", "==", userUid);
}

const firebase = new Firebase();
console.log(firebase);
// (async () => {
//   await firebase.user("111").set({ name: "Kevin", admin: false });
//   const snap = await firebase.admins().get();
//   console.log(snap.docs.map((doc) => doc.data()));
//   const snap2 = await firebase.clients().get();
//   console.log(snap2.docs.map((doc) => doc.data()));
// })();

export default firebase;
