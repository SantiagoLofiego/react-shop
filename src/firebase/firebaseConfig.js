import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6-q4lL97-4QEXl-Jkb9OsTA_ZsXPwTqo",
  authDomain: "react-shop-90ad9.firebaseapp.com",
  projectId: "react-shop-90ad9",
  storageBucket: "react-shop-90ad9.appspot.com",
  messagingSenderId: "1034818855679",
  appId: "1:1034818855679:web:8f17868f962100ede2e2ca"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);


