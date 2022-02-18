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

export const creatUserProfileDocument = async (userAuth, additionalData) => {
  //only store user if they sign in we get null if theres no sign in
  if (!userAuth) return; // if user object is null, do nothing

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get(); //.get give us a snapshot with a property of exists

  //console.log(snapShot);

  //check if that user exist in our database, if not
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
