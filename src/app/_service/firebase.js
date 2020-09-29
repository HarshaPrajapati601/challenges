import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsAj95c9ekT6JaBdVsEL_ByoH4LaYHhYc",
    authDomain: "hacknews-a868f.firebaseapp.com",
    databaseURL: "https://hacknews-a868f.firebaseio.com",
    projectId: "hacknews-a868f",
    storageBucket: "hacknews-a868f.appspot.com",
    messagingSenderId: "587314502527",
    appId: "1:587314502527:web:de20abb48953133bde184a",
    measurementId: "G-94M6EPZTML"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };