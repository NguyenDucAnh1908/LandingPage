import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBdM4h2aYxygrq7ghPa7trr1ZMiEqE1oWE",
  authDomain: "auction-firebase-ff9de.firebaseapp.com",
  projectId: "auction-firebase-ff9de",
  storageBucket: "auction-firebase-ff9de.appspot.com",
  messagingSenderId: "459437694003",
  appId: "1:459437694003:web:adc2dbd0218e4da5ddd746",
  measurementId: "G-4W89D990QD",
};

export const app = initializeApp(firebaseConfig);
