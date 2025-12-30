import React from "react";
import { db } from "../context/Firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

async function getUserData(id) {
  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log("Document data:", doc.data().displayName);
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });
  // return querySnapshot;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

export { getUserData };
