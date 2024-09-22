import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, updateProfile, signOut } from "firebase/auth";
import Validate from "./validate";
import Input from "./UI/Input";
import ErrorHandler from "./ErrorHandling";
import Button from "./UI/Button";
import Loading from "./UI/Loader";
import { Boxes } from "./UI/backgroundBox";
const SignUp = () => {
  const { createUser, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    if (user && !loading && user.emailVerified) {
      navigate("/");
    }
  }, [user, navigate, loading]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(<Validate />)) return;

    setIsSigningUp(true);
    try {
      const { username, email, password } = formData;
      const userCredential = await createUser(email, password);
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName: username });

      if (email.includes("@")) {
        await sendEmailVerification(newUser);
        setVerificationSent(true);
        await signOut(newUser.auth);
      } else {
        setError("Phone number verification not implemented yet");
        setIsSigningUp(false);
        return;
      }
      await checkVerification();
      setIsSigningUp(false);
    } catch (error) {
      setError("Signup failed: " + error.message);
      setIsSigningUp(false);
    }
  };

  const checkVerification = async () => {
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        navigate("/");
      } else {
        setError(
          "Email not verified yet. Please check your inbox and verify your email."
        );
      }
    } else {
      setError("Please sign in to check your email verification status.");
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden bg">
      <div className="absolute inset-0 w-full h-full bg-quinary z-10 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="flex flex-col items-center justify-center gap-20 md:flex-row">
        <div className="z-30 w-full max-w-md p-6 rounded-lg shadow-md backdrop-blur-2xl bg-quaternary ">
          <h1 className="mb-6 text-2xl font-bold text-center text-white">
            Sign Up
          </h1>
          {!verificationSent ? (
            <form onSubmit={handleSubmit}>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />

              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />

              <ErrorHandler error={error} />
              <button
                type="submit"
                className="w-full py-2 transition-colors duration-75 rounded-lg bg-beige2 hover:bg-[#d6c48d] text-tertiary font-semibold"
                disabled={isSigningUp}
              >
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </button>
              <p className="flex justify-center gap-2 mt-2 text-white">
                {" "}
                Already have an account?
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="underline transition-colors hover:text-beige2"
                >
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <div>
              <p className="mb-4 text-sm text-green-500">
                Verification email sent. Please check your inbox and verify your
                email.
              </p>
              <Button
                onClick={checkVerification}
                text="I've verified my email"
              ></Button>
              <ErrorHandler />
            </div>
          )}
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

export default SignUp;
