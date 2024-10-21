// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from "firebase/database";


// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const dev = process.env.NODE_ENV !== 'production';
const firebaseConfig = dev? {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain:process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  databaseURL: "https://connect-4-94fab-default-rtdb.firebaseio.com/"
} : {
  apiKey: process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  databaseURL: "https://connect-4-94fab-default-rtdb.firebaseio.com/"
};
console.log(dev)
console.log(process.env)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth(app)
