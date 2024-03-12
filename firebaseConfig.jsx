// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjuCKAI94VnXwb4XUnFmP8JCAvRowNupk",
  authDomain: "shufoodrescue.firebaseapp.com",
  projectId: "shufoodrescue",
  storageBucket: "shufoodrescue.appspot.com",
  messagingSenderId: "751156117562",
  appId: "1:751156117562:web:d89d8321f0087376817503",
  measurementId: "G-D8Z2VS7SCC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);