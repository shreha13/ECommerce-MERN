import "./App.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import ProductScreen from "./screens/ProductScreen";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Switch>
              <Route path="/" exact component={HomeScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceOrder} />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/product/:id" exact component={ProductScreen} />
              <Route path="/cart/:id?" exact component={CartScreen} />
              <Route path="/orders/:id" exact component={OrderScreen} />
              <Route path="/admin/users" exact component={UserListScreen} />
              <Route path="/admin/users/:id" exact component={UserEditScreen} />
              <Route
                path="/admin/products"
                exact
                component={ProductListScreen}
              />
              <Route path="/admin/products/:id" component={ProductEditScreen} />
              <Route path="/admin/orders" component={OrderListScreen} />
            </Switch>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
