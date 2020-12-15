import React, { useEffect } from "react";
import { Fragment } from "react";
import { ListGroup, Image, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/order";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const orderState = useSelector((state) => state.order);

  const { loading, order, error, success } = orderState;

  useEffect(() => {
    if (!loading && success) {
      history.push(`/orders/${order._id}`);
    }
  }, [success, history, loading, order]);
 
  //CALCULATE PRICES
  cart.itemPrice = Number(
    cart.cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)
  ).toFixed(2);

  cart.shippingPrice = Number(cart.itemPrice > 100 ? 0 : 100).toFixed(2);

  cart.taxPrice = Number(cart.itemPrice * 0.15).toFixed(2);

  cart.totalPrice = Number(
    +cart.itemPrice + +cart.shippingPrice + +cart.taxPrice
  ).toFixed(2);

  const dispatch = useDispatch();

  const placeOrderHandler = (e) => {
    e.preventDefault();
    const orderData = {
      shippingAddress: cart.shippingAddress,
      itemPrice: cart.itemPrice,
      taxPrice: cart.taxPrice,
      totalPrice: cart.totalPrice,
      shippingPrice: cart.shippingPrice,
      orderItems: cart.cartItems,
      paymentMethod: cart.paymentMethod,
    };
    dispatch(createOrder(orderData));
  };

  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      {!loading && error && <Message variant="danger">{error}</Message>}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((i, index) => (
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
                  <Col>${cart.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default PlaceOrder;
