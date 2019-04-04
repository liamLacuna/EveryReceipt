import firebase from "firebase/app";
import "firebase/firestore"; //Database
import "firebase/auth"; //User Authentication

var config = {
  apiKey: "AIzaSyAQJOqhvfCVrQsLlgzMWHQIZ-mK8-Ii3XQ",
  authDomain: "every-receipt.firebaseapp.com",
  databaseURL: "https://every-receipt.firebaseio.com",
  projectId: "every-receipt",
  storageBucket: "every-receipt.appspot.com",
  messagingSenderId: "275127044096"
};
firebase.initializeApp(config);
//Handle update for timestamps data
// firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
