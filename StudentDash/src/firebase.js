import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAmYCRfSKSbk_a7toW0QTwLu5pRXFCx4r8",
    authDomain: "the-career-explorer.firebaseapp.com",
    projectId: "the-career-explorer"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);