import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyB6D2hi1XOL87ghg_lZrUe1fb2jT7Y3NXU",
    authDomain: "fir-react-basics.firebaseapp.com",
    databaseURL: "https://fir-react-basics.firebaseio.com",
    projectId: "fir-react-basics",
    storageBucket: "fir-react-basics.appspot.com",
    messagingSenderId: "555404250422",
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

        /* Auth API */
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

        doSignOut = () => this.auth.signOut();

        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
        
        /* Database */
            /* User API */
        user = uid => this.db.ref(`users/${uid}`);

        users = () => this.db.ref('users');

            /* Data API */
        data = () => this.db.ref('data');

}

export default Firebase;