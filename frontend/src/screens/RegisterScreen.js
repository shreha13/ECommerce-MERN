import React, { Fragment, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../actions/auth";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : null;

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const { error, loading, user } = auth;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setMessage(null);
      dispatch(registerUser(email, password, name));
    } else {
      setMessage("Passwords does not match.");
    }
  };

  let content = <Loader />;
  if (user && !loading) {
    history.push(redirect ? `/${redirect}` : "/");
  } else {
    content = (
      <FormContainer>
        {error && !loading && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        <h1>Sign Up</h1>
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
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Sign In
            </Link>
          </Col>
        </Row>
      </FormContainer>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default RegisterScreen;
