import React from "react";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

import getUserData from "../DataBase/GetUser";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(null);
  const [profileLoading, setProfileLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    async function fetchProfile() {
      if (!userInfo) return;
      setProfileLoading(true);
      try {
        const data = await getUserData(userInfo.uid);
        setProfile(data || null);
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, [userInfo]);

  return (
    <AuthContext.Provider
      value={{ userInfo, loading, profile, profileLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
