import React, { useEffect } from "react";
import { Fragment } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deliverOrder, getAllOrders } from "../actions/order";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const { loading, error, orders } = order;

  const auth = useSelector((state) => state.auth);
  const { user: userInfo } = auth;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllOrders());
    } else {
      history.push("/");
    }
  }, [history, userInfo, dispatch]);

  const markAsDelivered = (id) => {
      dispatch(deliverOrder(id))
  }

  return (
    <Fragment>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive bordered className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>User</td>
              <td>Total</td>
              <td>Date</td>
              <td>Paid</td>
              <td>Delivered</td>
              <td></td>
            </tr>
          </thead>
          {orders.map((i) => (
            <tr key={i._id}>
              <td>{i._id}</td>
              <td>{i.user && i.user.name}</td>
              <td>${i.totalPrice.toFixed(2)}</td>
              <td>{i.createdAt.substring(0, 10)}</td>
              <td>
                {" "}
                {i.isPaid ? (
                  i.paidAt.substring(0, 10)
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                {" "}
                {i.isDelivered ? (
                  i.deliveredAt.substring(0, 10)
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                {!i.isDelivered && <Button
                  variant="light"
                  className="btn-sm"
                  onClick={() => markAsDelivered(i._id)}
                >
                  Mark as Delivered
                </Button>}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </Fragment>
  );
};

export default OrderListScreen;
