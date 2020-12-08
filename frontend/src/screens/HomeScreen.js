import React, { Fragment, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { getProducts } from "../actions/product";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = ({ getProducts, productProp }) => {
  const { products, error, loading } = productProp;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  let content = <Loader />;
  if (error && !loading) {
    content = <Message variant="danger">{error}</Message>;
  }
  if (!error && !loading) {
    content = (
      <Fragment>
        <h1>LATEST PRODUCTS</h1>
        <Row>
          {products.map((i) => (
            <Col key={i._id} lg={4} sm={12} md={6} xl={3}>
              <Product product={i} />
            </Col>
          ))}
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
    getProducts: () => dispatch(getProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
