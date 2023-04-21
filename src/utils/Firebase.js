import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { API_KEY } from "./Constants";

console.log("API_KEY", API_KEY);

const firebaseConfig = {
    apiKey: "AIzaSyA3aj1ezvJw5eQEeJO7MIWE6X_3GKJ1dck",
    authDomain: "myquotanow-e50bc.firebaseapp.com",
    projectId: "myquotanow-e50bc",
    storageBucket: "myquotanow-e50bc.appspot.com",
    messagingSenderId: "1072211183504",
    appId: "1:1072211183504:web:e1e8d00d70841f1445d515",
    measurementId: "G-M50X8NDD3B"
  };
  
  // Initialize Firebase
  export const FirebaseApp = initializeApp(firebaseConfig);
  export const Analytics = getAnalytics(FirebaseApp);