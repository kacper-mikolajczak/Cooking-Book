import app from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import "firebase/firestore";

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

  /* Users */
  users = () => this.db.collection("users");

  user = (uid) => this.users().doc(`${uid}`);

  clients = () => this.users().where("admin", "==", false);
  admins = () => this.users().where("admin", "==", true);

  /* Recipes */
  recipes = () => this.db.collection("recipes");
  recipesAlive = () =>
    this.db.collection("recipes").where("deleted", "==", false);
  recipesAllOrAlive = (condition) =>
    condition ? this.recipes() : this.recipesAlive();

  recipe = (uid) => this.recipes().doc(`${uid}`);

  userRecipes = (userUid) => this.recipes().where("user", "==", userUid);

  /* Comments */
  comments = () => this.db.collection("comments");
  comment = (recipeId) => this.comments().doc(`${recipeId}`);

  /* Likes */
  likes = () => this.db.collection("likes");
  recipeLikes = (recipeId) => this.likes().doc(`${recipeId}`);
}

const firebase = new Firebase();

export default firebase;
