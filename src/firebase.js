// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO:  SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe9235hsUQFyDOS00ipUDUTsC-CsSR-Gw",
  authDomain: "cv-manager-57c5d.firebaseapp.com",
  projectId: "cv-manager-57c5d",
  storageBucket: "cv-manager-57c5d.appspot.com",
  messagingSenderId: "199646695763",
  appId: "1:199646695763:web:858c6c720d464b560491a6",
  measurementId: "G-VE7HYNHWYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
