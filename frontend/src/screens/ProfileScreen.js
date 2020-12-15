import React, { Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getProfile, updateUserProfile } from "../actions/auth";
import { getOrders } from "../actions/order";
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
  const order = useSelector((state) => state.order);

  const { error, loading, user, userProfile, message } = auth;

  const { error: errorOrder, loading: loadingOrder, orders } = order;

  useEffect(() => {
    dispatch(getOrders());
    if (userProfile) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    } else {
      dispatch(getProfile());
    }
  }, [userProfile, dispatch]);

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
          {loadingOrder ? (
            <Loader />
          ) : errorOrder ? (
            <Message variant="danger">{errorOrder}</Message>
          ) : (
            <Table bordered hovered striped responsive className="table-sm">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Date</td>
                  <td>Total</td>
                  <td>Paid</td>
                  <td>Delivered</td>
                  <td></td>
                </tr>
              </thead>
              {orders.map((i) => (
                <tr key={i._id}>
                  <td>{i._id}</td>
                  <td>{i.createdAt.substring(0, 10)}</td>
                  <td>{i.totalPrice}</td>
                  <td>
                    {i.isPaid ? (
                      i.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {i.isDelivered ? (
                      i.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${i._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </Col>
      </Row>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default ProfileScreen;
