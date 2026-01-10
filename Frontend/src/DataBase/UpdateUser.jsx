import { db } from "../context/Firebase";
import { doc, updateDoc } from "firebase/firestore";

const updateUserData = async (userId, data) => {
  const userRef = doc(db, "users", userId);

  return await updateDoc(userRef, {
    displayName: data.displayName,
    phone: data.phoneNumber,
  });
};

export default updateUserData;
