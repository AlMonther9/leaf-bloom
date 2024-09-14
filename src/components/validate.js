import { useState } from "react";
const Validate = () => {
  const [formData, setFormData] = useState({
    username: "",
    emailOrPhone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  if (!formData.username) {
    setError("Username is required");
    return false;
  }
  if (!formData.emailOrPhone) {
    setError("Email or phone number is required");
    return false;
  }

  if (
    formData.emailOrPhone.includes("@") &&
    !/\S+@\S+\.\S+/.test(formData.emailOrPhone)
  ) {
    setError("Email is invalid");
    return false;
  }
  if (
    !formData.emailOrPhone.includes("@") &&
    !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.emailOrPhone)
  ) {
    setError("Phone number is invalid");
    return false;
  }
  if (!formData.password) {
    setError("Password is required");
    return false;
  }
  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return false;
  }
  setError("");
  return true;
};
export default Validate;
