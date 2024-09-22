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
import { Boxes } from "./UI/backgroundBox";
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
    <main className="relative flex items-center justify-center h-screen overflow-hidden bg">
      <div className="absolute inset-0 w-full h-full bg-quinary z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row">
        <div className="w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-2xl bg-quaternary">
          <h1 className="mb-6 text-2xl font-bold text-center text-white">
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
                className="w-full py-2 mb-4 text-white bg-blue-600 rounded hover:bg-blue-700"
              ></Button>
            )}
            <p className="mt-2 text-center">
              <button
                onClick={() => navigate("/forgot-password")}
                className="py-0 mb-1 text-white hover:underline"
              >
                Forgot Password?
              </button>
            </p>
            <button
              text="Sign In"
              type="submit"
              className="w-full py-2 transition-colors duration-75 rounded-lg bg-beige2 hover:bg-[#d6c48d] text-tertiary font-semibold"
            >
              Sign In
            </button>
            <p className="flex justify-center gap-2 mt-2 text-white">
              {" "}
              Don't have an account?
              <button
                type="button"
                onClick={() => navigate("/signUp")}
                className="text-white underline rounded hover:text-beige2"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
        <div className="hidden w-1/3 md:flex ">
          <img
            src={require("../assets/flowerSteps.png")}
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default SignIn;
