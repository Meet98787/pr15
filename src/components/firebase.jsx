import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCWetUxehukoddoca8-e9TdUMRT5ss5NAo",
  authDomain: "pr15-a252f.firebaseapp.com",
  projectId: "pr15-a252f",
  storageBucket: "pr15-a252f.appspot.com",
  messagingSenderId: "190735154596",
  appId: "1:190735154596:web:267a0220360dc533f79531"
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const authh = getAuth(app);
export default firebase;
export { authh, signInWithPopup ,app};

export const auth = firebase.auth();
export const handleLogout = () => {
  auth.signOut().then(() => {
    localStorage.setItem('Active-user', JSON.stringify(""))
    window.location.href = "/login";
  });
};

