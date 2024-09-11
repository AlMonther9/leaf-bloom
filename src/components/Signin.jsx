import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await sendEmailVerification(user);
        setVerificationSent(true);
        setError(
          "Please verify your email before signing in. A new verification email has been sent."
        );
        await auth.signOut();
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Sign in failed: " + error.message);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setVerificationSent(true);
        setError(
          "A new verification email has been sent. Please check your inbox."
        );
      } else {
        setError(
          "No user is currently signed in. Please try signing in again."
        );
      }
    } catch (error) {
      setError("Failed to resend verification email: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sign bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
          />
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {verificationSent && (
            <button
              type="button"
              onClick={resendVerificationEmail}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
            >
              Resend Verification Email
            </button>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Sign In
          </button>
          <p className="flex text-white gap-2 mt-2 justify-center">
            {" "}
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/signUp")}
              className=" text-white rounded hover:text-green-700"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
