// Import the functions you need from the SDKs you need sknf
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator,getReactNativePersistence,initializeAuth } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// export declare function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
// import { getReactNativePersistence } from "firebase/auth/react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDr60e3tWzCwRhfdpiQfstiMXst2ax4j04",
  authDomain: "genchat-40209.firebaseapp.com",
  projectId: "genchat-40209",
  storageBucket: "genchat-40209.appspot.com",
  messagingSenderId: "12729428612",
  appId: "1:12729428612:web:7dd995b45c25f3539a70d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
auth.useDeviceLanguage();

// connectAuthEmulator(auth, "http://localhost:9099");
// connectFirestoreEmulator(db, 'localhost', 8081);

// if (window.location.hostname == 'localhost') {
//   db.useEmulator('localhost', '8080');
// }

export default { auth, db };