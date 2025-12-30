import React from "react";
import { db } from "../context/Firebase";
import { collection, addDoc } from "firebase/firestore";

async function addUserData(userId, data) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      ID: userId,
      displayName: data.displayName,
      email: data.email,
      phone: data.phone,
      role: data.role,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { addUserData };
