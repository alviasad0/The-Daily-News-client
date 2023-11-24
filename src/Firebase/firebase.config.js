// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJGFG6RIjmxBqB2a7ex3RTCW2X4Siblzg",
    authDomain: "the-daily-news-57616.firebaseapp.com",
    projectId: "the-daily-news-57616",
    storageBucket: "the-daily-news-57616.appspot.com",
    messagingSenderId: "549337029836",
    appId: "1:549337029836:web:6448ef68561024c406b669"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth