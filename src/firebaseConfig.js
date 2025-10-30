// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwQWIjrNs6Y8w-_Ua-24qwe7zDj82ovFw",
  authDomain: "healhubcenter-4bcf7.firebaseapp.com",
  projectId: "healhubcenter-4bcf7",
  storageBucket: "healhubcenter-4bcf7.firebasestorage.app",
  messagingSenderId: "1051075038067",
  appId: "1:1051075038067:web:44e1343b95cb3b98735306",
  measurementId: "G-WRL8H75VQR"
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize Firebase Auth
export const auth = getAuth(app);

// 🌍 Google Provider for Sign-In
export const provider = new GoogleAuthProvider();
