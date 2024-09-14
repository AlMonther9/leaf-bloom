import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Button from "./UI/Button";
import ErrorHandler from "./ErrorHandling";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (!email) {
      setError({
        code: "auth/empty-email",
        message: "Please enter your email address.",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => navigate("/signIn"), 3000);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sign bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
          />
          <ErrorHandler error={error} />
          {successMessage && (
            <p className="text-green-600 text-sm mb-4">{successMessage}</p>
          )}
          <Button text="Reset Password" type="submit" />
        </form>
        <p className="mt-4 text-center">
          <button
            onClick={() => navigate("/signIn")}
            className="text-blue-600 hover:underline"
          >
            Back to Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
