import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { auth } from "../context/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import getUserData from "../DataBase/GetUser.jsx";

function MyNavbar() {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.uid).then((data) => {
          setUserData(data);
        });
      } else {
        setUserData(null);
        console.log("No user is signed in.");
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

          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={signOutUser}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
