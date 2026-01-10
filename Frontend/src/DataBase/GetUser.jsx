import React from "react";
import { db } from "../context/Firebase";
import { doc, getDoc } from "firebase/firestore";

async function getUserData(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return null;
}

export default getUserData;
