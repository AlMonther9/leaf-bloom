import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.css";
// Compnents
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPage from "./components/landpage";
import About from "./components/About";
import Contact from "./components/Contact";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="products" element={<ProductList />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
