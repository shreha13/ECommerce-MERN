import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateUserProfile } from "../actions/auth";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message1, setMessage] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { error, loading, user, userProfile, message } = auth;

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    } else {
      dispatch(getProfile());
    }
  }, [userProfile, dispatch, getProfile]);

  const submitHandler = (e) => {
    e.preventDefault();
    debugger;
    if (password === confirmPassword) {
      setMessage(null);
      dispatch(updateUserProfile(email, name, password));
    } else {
      setMessage("Passwords does not match.");
    }
  };

  let content = <Loader />;
  if (!user && !loading) {
    history.push("/login");
  } else {
    content = (
      <Row>
        <Col md={3}>
          {error && !loading && <Message variant="danger">{error}</Message>}
          {message1 && <Message variant="danger">{message1}</Message>}
          {message && <Message variant="success">{message}</Message>}
          <h1>User Profile</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My orders</h2>
        </Col>
      </Row>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default ProfileScreen;
