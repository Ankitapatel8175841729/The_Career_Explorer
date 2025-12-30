import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmYCRfSKSbk_a7toW0QTwLu5pRXFCx4r8",
  authDomain: "the-career-explorer.firebaseapp.com",
  projectId: "the-career-explorer",
  storageBucket: "the-career-explorer.firebasestorage.app",
  messagingSenderId: "723154650554",
  appId: "1:723154650554:web:839332171a5538351f0983",
  measurementId: "G-T6V4EFT4FG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
