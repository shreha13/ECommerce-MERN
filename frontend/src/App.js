import "./App.css";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/product/:id" exact component={ProductScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
