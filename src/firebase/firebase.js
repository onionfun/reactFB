import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDv3pNrCCdjyhBxeeOseSAxMzHaTFEup1Q",
    authDomain: "notes-app-51f7c.firebaseapp.com",
    databaseURL: "https://notes-app-51f7c.firebaseio.com",
    projectId: "notes-app-51f7c",
    storageBucket: "notes-app-51f7c.appspot.com",
    messagingSenderId: "975064099740"
  };
  firebase.initializeApp(config);

  const database = firebase.database();  //assigns return value to database const

  export default database;