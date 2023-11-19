// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPSj3s4GbkyRKcHk8WV0hUrGxfBspRAYg",
  authDomain: "netflixgpt-7fad1.firebaseapp.com",
  projectId: "netflixgpt-7fad1",
  storageBucket: "netflixgpt-7fad1.appspot.com",
  messagingSenderId: "24971269230",
  appId: "1:24971269230:web:ce27752e642a83a325027f",
  measurementId: "G-CQDYKZFJD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
