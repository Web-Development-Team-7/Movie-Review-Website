// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZLAR5Tw7fvxXNrQMZUpjyWfnpRTlzKXc",
  authDomain: "movitoes-179d9.firebaseapp.com",
  projectId: "movitoes-179d9",
  storageBucket: "movitoes-179d9.appspot.com",
  messagingSenderId: "291342011181",
  appId: "1:291342011181:web:cb401000de573caff3a1a4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

