import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: "revents-2ad3f.firebaseapp.com",
   databaseURL: "https://revents-2ad3f.firebaseio.com",
   projectId: "revents-2ad3f",
   storageBucket: "",
   messagingSenderId: "354112880728",
   appId: "1:354112880728:web:ea30172ea973af78"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
