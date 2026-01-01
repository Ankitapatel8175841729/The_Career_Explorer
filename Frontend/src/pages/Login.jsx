import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

import { auth } from "../context/Firebase";
import { useAuth } from "../context/Authentication";
import { addUserData } from "../DataBase/AddUser";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const { userInfo, loading } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (!loading && userInfo) {
      navigate("/");
    }
  }, [userInfo, loading, navigate]);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [radioValue, setRadioValue] = React.useState("2");

  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingLogin(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log("Login user:", user);
      console.log("User role:", radioValue === "1" ? "Admin" : "Student");
      // Redirect will happen automatically via useEffect
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
      console.error("Error registering user:", errorCode, errorMessage);
    } finally {
      setLoadingLogin(false);
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

        const additionalInfo = getAdditionalUserInfo(result);
        // console.log("Is New User:", additionalInfo.isNewUser);
        if (additionalInfo.isNewUser) {
          addUserData(user.uid, {
            displayName: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
            imageUrl: additionalInfo.profile.picture || "",
            role: radioValue === "1" ? "Admin" : "Student",
          });
        }
        console.log("Google Login user:", user);

        // IdP data available using getAdditionalUserInfo(result)
        console.log("Additional User Info:", getAdditionalUserInfo(result));
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
      <div className="container min-vh-100 pt-3">
        <h2 className="mt-4">Login yourself</h2>
        <div className="container">
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            <Button
              variant="dark"
              type="submit"
              className="m-1 c1"
              disabled={loadingLogin}
            >
              {loadingLogin ? "Logging in..." : "Submit"}
            </Button>
            <Button
              variant="danger"
              className="m-1"
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
