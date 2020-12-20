import React, { useEffect } from "react";
import { Fragment } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteProduct, getProducts } from "../actions/product";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  const { loading, error, products } = product;

  const auth = useSelector((state) => state.auth);
  const { user: userInfo } = auth;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts());
    } else {
      history.push("/");
    }
  }, [history, userInfo, dispatch]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    history.push('/admin/products/add')
    //   dispatch(createPro)
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus">
              {" "}Create Product
            </i>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive bordered className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Brand</td>
              <td></td>
            </tr>
          </thead>
          {products.map((i) => (
            <tr key={i._id}>
              <td>{i._id}</td>
              <td>{i.name}</td>
              <td>${i.price.toFixed(2)}</td>
              <td>{i.category}</td>
              <td>{i.brand}</td>
              <td>
                <LinkContainer to={`/admin/products/${i._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(i._id)}
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

export default ProductListScreen;
