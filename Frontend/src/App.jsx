import React from "react";
import "./App.css";
import { Routes, Route } from "react-router";

import { AuthProvider } from "./context/Authentication.jsx";

import MyNavbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

import Engineering from "../careerPages/Engineering.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <main>
          <MyNavbar />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/architecture" element={<Engineering />} />
            <Route path="/dental" element={<Engineering />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/law" element={<Engineering />} />
            <Route path="/management" element={<Engineering />} />
            <Route path="/medical" element={<Engineering />} />
            <Route path="/pharmacy" element={<Engineering />} />
            <Route path="/research" element={<Engineering />} />
          </Routes>
          <Footer />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
