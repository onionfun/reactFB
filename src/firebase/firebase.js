import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyA-qIK6dsZFzEKwQF7jU-mJCkF9BL0AuZM",
    authDomain: "chatapp-b9baf.firebaseapp.com",
    databaseURL: "https://chatapp-b9baf.firebaseio.com",
    projectId: "chatapp-b9baf",
    storageBucket: "chatapp-b9baf.appspot.com",
    messagingSenderId: "987363613178"
  };
  firebase.initializeApp(config); //assigns return value to database const
  const database = firebase.database();
  export default database;