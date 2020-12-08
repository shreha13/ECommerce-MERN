import React, { Fragment, useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProductById } from "../actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";

const ProductScreen = ({ match, getProductById, productProp }) => {
  debugger;
  const { product, error, loading } = productProp;

  useEffect(() => {
    getProductById(match.params.id);
  }, [getProductById, match]);

  let content = <Loader />;
  if (error && !loading) {
    content = <Message variant="danger">{error}</Message>;
  }
  if (!error && !loading) {
    content = (
      <Fragment>
        <Link className="btn btn-light my-3" to="/">
          GO BACK
        </Link>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }

  return <Fragment>{content}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    productProp: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductById: (id) => dispatch(getProductById(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);
