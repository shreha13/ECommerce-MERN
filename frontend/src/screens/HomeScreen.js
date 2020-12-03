import React, { Fragment, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const response = await axios.get("/api/products");
    const products = response.data.products;
    setProducts(products);
  }, []);
  
  return (
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
};

export default HomeScreen;
