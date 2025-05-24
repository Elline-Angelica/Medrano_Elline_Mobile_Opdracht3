// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA3q1YgtqRZaN9fXj4MxvHSAYRzQ7-Jhs",
  authDomain: "mobile-d47f0.firebaseapp.com",
  projectId: "mobile-d47f0",
  storageBucket: "mobile-d47f0.firebasestorage.app",
  messagingSenderId: "1021882988636",
  appId: "1:1021882988636:web:8b0cd2d8428eb6f1798e99",
  measurementId: "G-DKDMLXNT78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

