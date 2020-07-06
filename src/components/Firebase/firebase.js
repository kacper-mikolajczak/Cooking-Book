import app from 'firebase/app';
import './firebase/auth';

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

        /* Auth API */
        doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

        signInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

        doSignOut = () => this.auth.signOut();

        doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

        doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
    }
}

export default Firebase;