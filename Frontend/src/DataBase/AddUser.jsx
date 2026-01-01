import React from "react";
import { db } from "../context/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

function addUserData(userId, data) {
  const userRef = collection(db, "users");
  setDoc(doc(userRef, userId), {
    ID: userId,
    displayName: data.displayName,
    email: data.email,
    phone: data.phone,
    imageUrl: data.imageUrl,
    role: data.role,
  })
    .then(() => {
      console.log("User data successfully written!");
    })
    .catch((error) => {
      console.error("Error writing user data: ", error);
    });
}

export { addUserData };
