import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8HU9RWhHFz-4MQdojkZ8-cCkRIzdhB0k",
  authDomain: "workout-tracker-3e1fa.firebaseapp.com",
  projectId: "workout-tracker-3e1fa",
  storageBucket: "workout-tracker-3e1fa.appspot.com",
  messagingSenderId: "27617111077",
  appId: "1:27617111077:web:de7dcbbd81ab5e5a26a3cc",
  measurementId: "G-TNJ12B692W",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default app;
