import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GET_USER_RESET } from "../actions/types";
import { getUserById, updateUser } from "../actions/user";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserEditScreen = ({ match, history }) => {
  const id = match.params.id;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { error, success, loading, user: userInfo } = user;

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_USER_RESET });
      history.push("/admin/users");
    } else {
      if (!userInfo.name || userInfo._id !== id) dispatch(getUserById(id));
      else {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setIsAdmin(userInfo.isAdmin);
      }
    }
  }, [dispatch, userInfo, id, history, success]);

  const submitHandler = (e) => {    
    e.preventDefault();
    dispatch(updateUser({ name, email, isAdmin, _id: id }));
  };

  return (
    <Fragment>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;
