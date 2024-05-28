// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/database"

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRLYDbyRQjFqvNnACoej_LeSSxTIrWoeo",
  authDomain: "connect-4-94fab.firebaseapp.com",
  projectId: "connect-4-94fab",
  storageBucket: "connect-4-94fab.appspot.com",
  messagingSenderId: "235528607172",
  appId: "1:235528607172:web:46db54b79db731d8b24091",
  measurementId: "G-LY1RN9GLM2",
  databaseURL: "https://connect-4-94fab-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.database()

