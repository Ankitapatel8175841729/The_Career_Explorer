import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router";
import { auth } from "./context/Firebase";
import { onAuthStateChanged } from "firebase/auth";

import MyNavbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
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
      <MyNavbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
