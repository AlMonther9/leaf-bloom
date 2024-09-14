import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, updateProfile, signOut } from "firebase/auth";
import Validate from "./validate";
import Input from "./UI/Input";
import ErrorHandler from "./ErrorHandling";
import Button from "./UI/Button";
const SignUp = () => {
  const { createUser, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    emailOrPhone: "",
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(<Validate />)) return;

    setIsSigningUp(true);
    try {
      const { username, emailOrPhone, password } = formData;
      const userCredential = await createUser(emailOrPhone, password);
      const newUser = userCredential.user;

      await updateProfile(newUser, { displayName: username });

      if (emailOrPhone.includes("@")) {
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

  return (
    <div className="flex justify-center items-center h-screen bg-signBg bg-cover">
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded-lg shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h1>
        {!verificationSent ? (
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              placeholder="Email or Phone"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
              value={formData.emailOrPhone}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <ErrorHandler error={error} />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="flex text-white gap-2 mt-2 justify-center">
              {" "}
              Already have an account?
              <button
                type="button"
                onClick={() => navigate("/signin")}
                className=" text-white rounded hover:text-green-700"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <div>
            <p className="text-green-500 text-sm mb-4">
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
    </div>
  );
};

export default SignUp;
