// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVil5F6zd0wRr4MSySbWF24wG-x0UmLtw",
  authDomain: "genchat-4e64b.firebaseapp.com",
  projectId: "genchat-4e64b",
  storageBucket: "genchat-4e64b.appspot.com",
  messagingSenderId: "210578620110",
  appId: "1:210578620110:web:633f53705e6730cba9da9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default {app, auth}