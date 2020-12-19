import React, { useEffect } from "react";
import { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, getUsers } from "../actions/user";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, users } = user;

  const auth = useSelector((state) => state.auth);
  const { user: userInfo } = auth;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsers());
    } else {
      history.push("/");
    }
  }, [history, userInfo, dispatch]);

  useEffect(() => {
    return () => {
      if (!userInfo || !userInfo.isAdmin) {
        history.push("/");
      }
    };
  }, [history, userInfo]);

  const deleteHandler = (user) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUser(user));
    }
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Admin</td>
              <td></td>
            </tr>
          </thead>
          {users.map((i) => (
            <tr key={i._id}>
              <td>{i._id}</td>
              <td>{i.name}</td>
              <td>{i.email}</td>
              <td>
                {i.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/users/${i._id}`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(i)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;
