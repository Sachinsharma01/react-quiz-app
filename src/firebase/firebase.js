// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcL8oyIirM1RQ9Jv6O9IM3irbmLTGZe88",
  authDomain: "quiz-app-7fa4f.firebaseapp.com",
  projectId: "quiz-app-7fa4f",
  storageBucket: "quiz-app-7fa4f.appspot.com",
  messagingSenderId: "315903283040",
  appId: "1:315903283040:web:8fe92a119ddc51c5d91805",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
