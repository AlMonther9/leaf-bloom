import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
// Compnents
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import LandingPage from "./components/landpage";
import ProductList from "./components/ProductList";
function App() {
  return (
    <Provider>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />{" "}
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
