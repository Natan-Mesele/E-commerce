import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAwJMvLIX1uuHtaragnfc8gAvwRD8UgJv0",
  authDomain: "car-rent-auth-5ecb1.firebaseapp.com",
  projectId: "car-rent-auth-5ecb1",
  storageBucket: "car-rent-auth-5ecb1.firebasestorage.app",
  messagingSenderId: "1090709677980",
  appId: "1:1090709677980:web:8e7327dd600f067e968a59",
  measurementId: "G-CCBNPV5D8N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };