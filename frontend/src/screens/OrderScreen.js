import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ListGroup, Image, Row, Col, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderById, payOrder } from "../actions/order";
import { ORDER_PAY_RESET, ORDER_RESET } from "../actions/types";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = ({ match }) => {
  const id = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderState = useSelector((state) => state.order);
  const { loading, order, error, loadingPay, successPay } = orderState;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => setSdkReady(true);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderById(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, order, successPay, sdkReady]);

  useEffect(() => {
    return () => dispatch({ type: ORDER_RESET });
  }, [dispatch]);

  const paypalSuccessHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  return (
    <Fragment>
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : loading || !order ? (
        <Loader />
      ) : (
        <Fragment>
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a
                      style={{ color: "blue" }}
                      href={`mailto: ${order.user.email}`}
                    >
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address} {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Paid on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid</Message>
                  )}
                </ListGroup.Item>

                {order.orderItems.length === 0 ? (
                  <Message>Your order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((i, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={i.image} alt={i.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${i.product}`}>{i.name}</Link>
                          </Col>
                          <Col md={4}>
                            {i.qty} X {i.price}= ${i.qty * i.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && <Loader />}
                      {
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={paypalSuccessHandler}
                        ></PayPalButton>
                      }
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderScreen;
