import React from "react";

import { auth } from "../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="container">
        <div className="container">
          <h1>Welcome to Career Explorer</h1>
          <h5>
            {userInfo
              ? `Logged in as: ${userInfo.email}`
              : "Login to explore more!"}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Home;
