// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'; //lite cuz i no need all the export from here

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN5YgOlK_bYgPURqfELSp1xKxYYCAq6qU",
  authDomain: "react-journallapp.firebaseapp.com",
  projectId: "react-journallapp",
  storageBucket: "react-journallapp.appspot.com",
  messagingSenderId: "968198075538",
  appId: "1:968198075538:web:37ae33cd7a9dc2da2a224b"
};

// Initialize Firebase
//what i need to interact with firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const firebaseB = getFirestore(FirebaseApp)
