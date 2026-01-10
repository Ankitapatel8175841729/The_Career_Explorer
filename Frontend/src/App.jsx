import "./App.css";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/Authentication.jsx";

import MyNavbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

import Architecture from "./careerPages/Architecture.jsx";
import Dental from "./careerPages/Dental.jsx";
import Engineering from "./careerPages/Engineering.jsx";
import Law from "./careerPages/Law.jsx";
import Management from "./careerPages/Management.jsx";
import Medical from "./careerPages/Medical.jsx";
import Pharmacy from "./careerPages/Pharmacy.jsx";
import Research from "./careerPages/Research.jsx";

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

            <Route path="/architecture" element={<Architecture />} />
            <Route path="/dental" element={<Dental />} />
            <Route path="/engineering" element={<Engineering />} />
            <Route path="/law" element={<Law />} />
            <Route path="/management" element={<Management />} />
            <Route path="/medical" element={<Medical />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/research" element={<Research />} />
          </Routes>
          <Footer />
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
