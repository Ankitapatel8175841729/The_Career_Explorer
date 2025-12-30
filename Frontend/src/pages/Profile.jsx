import React, { use } from "react";
import { auth } from "../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "../DataBase/GetUser.jsx";

const Profile = () => {
  //   const [doc, setdoc] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      //   console.log("User info:", user);
      setUserInfo(user);
    } else {
      console.log("No user is signed in.");
      setUserInfo(null);
    }
  });

  //   React.useEffect(() => {
  //     if (userInfo) {
  //       getUserData(userInfo.uid)
  //         .then((data) => setdoc(data[0]))
  //         .then(() => console.log(doc))
  //         .catch((err) => console.error(err));
  //     }
  //   }, [userInfo]);

  return (
    <>
      <div className="container m-3 p-3">
        <h1>Profile</h1>
        {userInfo ? (
          <div>
            <p>
              <span className="bold">Name:</span> {userInfo.displayName}
            </p>
            <p>
              <span className="bold">Phone:</span> {userInfo.phoneNumber}
            </p>
            <p>
              <span className="bold">Email:</span> {userInfo.email}
            </p>
            <p>
              <span className="bold">User ID:</span> {userInfo.uid}
            </p>
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}
      </div>
    </>
  );
};

export default Profile;
