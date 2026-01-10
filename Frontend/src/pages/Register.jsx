import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useNavigate } from "react-router";
import { auth } from "../context/Firebase";
import { useAuth } from "../context/Authentication";
import { addUserData } from "../DataBase/AddUser";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const { userInfo, loading } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (!loading && userInfo) {
      navigate("/");
    }
  }, [userInfo, loading, navigate]);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [radioValue, setRadioValue] = React.useState("2");

  const [loadingReg, setLoadingReg] = React.useState(false);
  const [error, setError] = React.useState("");

  const radios = [
    { name: "Admin", value: "1" },
    { name: "Student", value: "2" },
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingReg(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      addUserData(user.uid, {
        displayName: name,
        email: user.email,
        phone: phone,
        role: radioValue === "1" ? "Admin" : "Student",
      });

      console.log("Registered user:", user);
      console.log("User role:", radioValue === "1" ? "Admin" : "Student");
      // Redirect will happen automatically via useEffect
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      setError(`Error (${errorCode}): ${errorMessage}`);
      console.error("Error registering user:", errorCode, errorMessage);
    } finally {
      setLoadingReg(false);
    }
  };

  return (
    <>
      <div className="container min-vh-100 pt-3">
        <div
          className="container c3 p-4 mt-4 border rounded"
          style={{ maxWidth: "1000px" }}
        >
          <h1>Register yourself</h1>
          <Form onSubmit={handleRegister}>
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
                  className="c5"
                  type="radio"
                  variant={"outline-dark"}
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
              variant="success"
              type="submit"
              className="m-1 c1"
              disabled={loadingReg}
            >
              {loadingReg ? "Registering..." : "Submit"}
            </Button>
          </Form>
        </div>
        <div
          className="container c3 p-4 mt-4 border rounded"
          style={{ maxWidth: "1000px" }}
        >
          <h2>Already have an account? Login instead</h2>
          <Button
            variant="dark"
            className="m-1 c1"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Register;
