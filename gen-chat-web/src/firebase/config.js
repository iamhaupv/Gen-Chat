// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr60e3tWzCwRhfdpiQfstiMXst2ax4j04",
  authDomain: "genchat-40209.firebaseapp.com",
  projectId: "genchat-40209",
  storageBucket: "genchat-40209.appspot.com",
  messagingSenderId: "12729428612",
  appId: "1:12729428612:web:7dd995b45c25f3539a70d1",
  measurementId: "G-5CC8N690ZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "en"

export default {app, auth}