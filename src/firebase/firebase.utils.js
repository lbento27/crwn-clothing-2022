import firebase from "firebase/compat/app";
//auth and firestore are automatically attach to firebase key
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyAiWVBz522YNE7jL1_cgKncc_WoPhd5Cao",
  authDomain: "crwn-db-2022-13eb0.firebaseapp.com",
  projectId: "crwn-db-2022-13eb0",
  storageBucket: "crwn-db-2022-13eb0.appspot.com",
  messagingSenderId: "409641280469",
  appId: "1:409641280469:web:0ad72d0abbb948e96e535c",
  measurementId: "G-D92Q8MN7MD",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
