import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../actions/cart.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, loading, error } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addItemsToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  let content = <Loader />;

  if (loading === false && error) {
    <Message>{error}</Message>;
  } else if (loading === false && !error) {
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map((i) => (
              <ListGroup.Item key={i.product}>
                <Row>
                  <Col md={2}>
                    <Image src={i.image} alt={i.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${i.product}`}>{i.name}</Link>
                  </Col>
                  <Col md={2}>${i.price}</Col>
                  <Col md={2}>
                    {" "}
                    <Form.Control
                      as="select"
                      value={i.qty}
                      onChange={(e) =>
                        dispatch(
                          addItemsToCart(i.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(i.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => dispatch(removeItemsFromCart(i.product))}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, cur) => acc + cur.qty, 0)})
                items
              </h2>
              $ {cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>;
  }
  return { content };
};

export default CartScreen;
