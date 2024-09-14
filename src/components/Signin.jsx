import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import Button from "./UI/Button";
import ErrorHandler from "./ErrorHandling";
import ResendVerificationEmail from "./VerificationEmail";
import Input from "./UI/Input";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
    setError(null);

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
        setError({
          code: "auth/user-not-verified",
          message:
            "Please verify your email before signing in. A new verification email has been sent.",
        });
        await auth.signOut();
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sign bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
          Sign In
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ErrorHandler error={error} />
          {verificationSent && (
            <Button
              text="Resend Verification Email"
              onClick={<ResendVerificationEmail />}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
            ></Button>
          )}
          <p className="mt-2 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 hover:underline mb-1 py-0"
            >
              Forgot Password?
            </button>
          </p>
          <Button text="Sign In" type="submit"></Button>
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
