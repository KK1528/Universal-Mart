// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP_XUSXRBebg_HLkrwGOgiabVQ1Sj6VGI",
  authDomain: "e-commerce-website-cd139.firebaseapp.com",
  projectId: "e-commerce-website-cd139",
  storageBucket: "e-commerce-website-cd139.appspot.com",
  messagingSenderId: "1001875974817",
  appId: "1:1001875974817:web:36359e9b5191ada3c4dee0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;