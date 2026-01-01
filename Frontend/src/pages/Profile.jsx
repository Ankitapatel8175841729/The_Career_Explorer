import React from "react";
import { auth } from "../context/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import getUserData from "../DataBase/GetUser.jsx";
import updateUserData from "../DataBase/UpdateUser.jsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Profile = () => {
  const [userId, setUserId] = React.useState(null); // Store user data (Auth user)
  const [isAdmin, setAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(null); // Store user data (Firestore data)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user);
        getUserData(user.uid).then((data) => {
          setUserData(data);
          setLoading(false);

          setName(data.displayName || "");
          setPhone(data.phone || "");

          if (data.role === "Admin") setAdmin(true);
          else setAdmin(false);
        });
      } else {
        setUserId(null);
        setUserData(null);
        setLoading(false);
        console.log("No user is signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");
  const [loadingUpdating, setLoadingUpdating] = React.useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoadingUpdating(true);
    updateUserData(userId.uid, {
      displayName: name,
      phoneNumber: phone,
    })
      .then(() => {
        setLoadingUpdating(false);
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        setLoadingUpdating(false);
      });
  };

  return (
    <>
      <div className="min-vh-100">
        <div className="container m-auto p-3">
          <h1>Welcome to your Profile</h1>
          <div className="container-sm c2 p-3 my-3 border rounded-3">
            {loading ? (
              <h5>Loading profile...</h5>
            ) : userData ? (
              <div>
                <Container>
                  <Row>
                    <Col sm={9}>
                      <p>
                        <span className="fw-bold">Role:</span> {userData.role}
                      </p>
                      <p>
                        <span className="fw-bold">Name:</span>{" "}
                        {userData.displayName}
                      </p>
                      <p>
                        <span className="fw-bold">Phone:</span> {userData.phone}
                      </p>
                      <p>
                        <span className="fw-bold">Email:</span> {userData.email}
                      </p>
                      <p>
                        <span className="fw-bold">User ID:</span> {userId.uid}
                      </p>
                    </Col>

                    <Col sm={3} className="m-auto">
                      <div className="d-flex justify-content-center align-items-center py-3">
                        <Image
                          src={userData.imageUrl}
                          fluid
                          className="border rounded-3 overflow-hidden"
                          style={{ width: "150px", height: "150px" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            ) : (
              <p>Please log in to view your profile.</p>
            )}
          </div>

          {userData ? (
            <>
              <Button variant="dark" onClick={handleShow}>
                Update Profile
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header className="c1">
                  <Modal.Title>Update your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="c2">
                  <Form onSubmit={handleUpdate}>
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

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}
                    <Button
                      variant="success"
                      type="submit"
                      className="m-1 c1"
                      disabled={loadingUpdating}
                    >
                      {loadingUpdating ? "Updating..." : "Update"}
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer className="c1">
                  <Button variant="danger" onClick={handleClose} className="c3">
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
