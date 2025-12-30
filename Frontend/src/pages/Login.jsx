import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { auth } from "../context/Firebase";
import { addUserData } from "../DataBase/AddUser";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [radioValue, setRadioValue] = React.useState("2");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const radios = [
    { name: "Admin", value: "1" },
    { name: "Student", value: "2" },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Login user:", user);
      console.log("User role:", radioValue === "1" ? "Admin" : "Student");
      // Reset form
      setEmail("");
      setPassword("");
      setRadioValue("2");
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
      console.error("Error registering user:", errorCode, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("Google Access Token:", token);

        // The signed-in user info.
        const user = result.user;
        addUserData(user.uid, {
          displayName: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          role: radioValue === "1" ? "Admin" : "Student",
        });
        console.log("Google Login user:", user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Error during Google login:", errorCode, errorMessage);
        // ...
      });
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-4">Login yourself</h2>
        <div className="container">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never spam you.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <h5>Select your role</h5>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-success"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <Button
              variant="primary"
              type="submit"
              className="m-1"
              disabled={loading}
            >
              {loading ? "Registering..." : "Submit"}
            </Button>
          </Form>

          <Button variant="danger" className="m-1" onClick={handleGoogleLogin}>
            Login with Google
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
