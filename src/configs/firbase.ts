"use client"
import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging"
const firebaseConfig = {
  apiKey: "AIzaSyC-yByDGOtQdJmcVgovgh9l-0H-xRyjGgQ",
  authDomain: "tic-tac-toe-ee2b1.firebaseapp.com",
  projectId: "tic-tac-toe-ee2b1",
  storageBucket: "tic-tac-toe-ee2b1.appspot.com",
  messagingSenderId: "167887642006",
  appId: "1:167887642006:web:9c685ef79cc33aa53151b7",
  measurementId: "G-4305T2Q9Z9"
};

export const app = initializeApp(firebaseConfig);
export const msg = getMessaging(app)