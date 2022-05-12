import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "interactive-comments-be5da.firebaseapp.com",
  projectId: "interactive-comments-be5da",
  storageBucket: "interactive-comments-be5da.appspot.com",
  messagingSenderId: "1091965200506",
  appId: "1:1091965200506:web:bc855b94b9941362bab3c3",
  measurementId: "G-PSSQF7HQ8X",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
