// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBAE_API_KEY,
  authDomain: "mern-blog-efb7b.firebaseapp.com",
  projectId: "mern-blog-efb7b",
  storageBucket: "mern-blog-efb7b.appspot.com",
  messagingSenderId: "810806151600",
  appId: "1:810806151600:web:d18c6476a38cbce6a62e75"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);