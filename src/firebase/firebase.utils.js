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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
//trigger google pop up
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

//function to add our database automatically to firebase on time after we remove from app.js
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);

  const batch = firestore.batch(); //we use batch instead of set because we want our data to be added in full and set only set 1 at time and if it fails is going to add only half of the data

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); //random generate a id() or use our names(obj.title) at this new document reference
    //console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  //fire our batch request
  return await batch.commit(); //batch.commit- promise
};

//convert the array from firebase, shopDatabase to a object
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data(); //pull the title and the items
    return {
      routeName: encodeURI(title.toLowerCase()), //encodeURI converts any string to characters that the url can read
      id: doc.id,
      items,
      title,
    };
  });

  //console.log(transformedCollection);

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator; // this will set the key to for ex hat: hatCollections, jackets: jacketsCollection
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
