// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOptMyjPIWqhoIbFsUbvd5mDt7Tam4leE",
  authDomain: "react-quiz-29083.firebaseapp.com",
  projectId: "react-quiz-29083",
  storageBucket: "react-quiz-29083.appspot.com",
  messagingSenderId: "781544712579",
  appId: "1:781544712579:web:ef9cd70c757efda64f6eb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
