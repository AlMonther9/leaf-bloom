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
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Profile from "./components/profile";
import PrivateRoute from "./components/PrivateRoute";
import PlantEncyclopedia from "./components/PlantEncyclopedia";
import AuthProvider from "./context/AuthProvider"; // Import AuthProvider
import Community from "./components/Community";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthProvider>
          {" "}
          {/* Wrap your routes with AuthProvider */}
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="about" element={<About />} />
            <Route path="plant-encyclopedia" element={<PlantEncyclopedia />} />
            <Route element={<PrivateRoute />}>
              <Route path="contact" element={<Contact />} />
              <Route path="products" element={<ProductList />} />
              <Route path="community" element={<Community />} />
            <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;
