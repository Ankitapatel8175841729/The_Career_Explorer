import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { auth } from "../context/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function MyNavbar() {
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

  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  return (
    <Navbar expand="lg" className="p-3" bg="dark" data-bs-theme="dark">
      <Navbar.Brand href="/">Career Explorer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>

          <NavDropdown title="Others" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">xyz</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signOutUser}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      <h5
        className="text-white"
        style={{ cursor: "pointer" }}
        onClick={() => (window.location.href = "/profile")}
      >
        <span>{userInfo ? "Welcome, " : ""} </span>
        <span>{userInfo ? userInfo.displayName : "Login Please"}</span>
      </h5>
    </Navbar>
  );
}

export default MyNavbar;
