import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD_PRODUCT_RESET } from "../actions/types";
import { addProduct, editProduct, getProductById } from "../actions/product";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Axios from "axios";

const ProductEditScreen = ({ location, match, history }) => {
  const id = match.params.id;
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product);

  const { error, success, loading, product: ProductInfo } = products;

  useEffect(() => {
    dispatch({ type: ADD_PRODUCT_RESET });
    if (success) {
      //   dispatch({ type: GET_Product_RESET });
      history.push("/admin/products");
    } else if (location.pathname.endsWith("edit")) {
      if (!ProductInfo.name || ProductInfo._id !== id)
        dispatch(getProductById(id));
      else {
        setName(ProductInfo.name);
        setCategory(ProductInfo.category);
        setBrand(ProductInfo.brand);
        setPrice(ProductInfo.price);
        setDescription(ProductInfo.description);
        setImage(ProductInfo.image);
        setCountInStock(ProductInfo.countInStock);
      }
    }
  }, [dispatch, match, ProductInfo, id, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (location.pathname.endsWith("edit")) {
      dispatch(
        editProduct({
          name,
          description,
          price,
          category,
          countInStock,
          image,
          brand,
          _id: id,
        })
      );
    } else {
      dispatch(
        addProduct({
          name,
          description,
          price,
          category,
          brand,
          countInStock,
          image: "/images/phone.jpg",
        })
      );
    }
    // dispatch(updateProduct({ name, email, isAdmin, _id: id }));
  };

  const fileUploadHandler = async (e) => {
    debugger;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const { data } = await Axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <Fragment>
      <Link to="/admin/products" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>{location.pathname.endsWith("edit") ? "Edit" : "Add"} Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.File
                label="Choose file"
                custom
                onChange={fileUploadHandler}
              ></Form.File>
            </Form.Group>
            {uploading && <Loader />}

            <Form.Group>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;
