// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJVuY8azQU6A6p_gfPGqXdjo79U5yeeu4",
  authDomain: "food-sharing-32a17.firebaseapp.com",
  projectId: "food-sharing-32a17",
  storageBucket: "food-sharing-32a17.firebasestorage.app",
  messagingSenderId: "59355746423",
  appId: "1:59355746423:web:a0e4d10c70b65a2c9af672"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default (app);