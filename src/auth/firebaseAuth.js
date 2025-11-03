// src/auth/firebaseAuth.js
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

// ✅ Google Sign-In (popup for desktop, redirect for mobile)
export const loginWithGoogle = async () => {
  try {
    if (window.innerWidth < 768) {
      await signInWithRedirect(auth, provider); // Mobile fallback
    } else {
      const result = await signInWithPopup(auth, provider);
      return result.user;
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

// ✅ Handle redirect login result (mobile)
export const handleRedirectLogin = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    console.error("Redirect login failed:", error.message);
    return null;
  }
};

// ✅ Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.clear();
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

// ✅ Watch login state changes
export const watchUser = (callback) => {
  onAuthStateChanged(auth, (user) => callback(user || null));
};
