import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification, updateProfile, signOut } from "firebase/auth";
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

  const validate = () => {
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
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
        formData.emailOrPhone
      )
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

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

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
        // Handle phone number verification if needed
        setError("Phone number verification not implemented yet");
        setIsSigningUp(false);
        return;
      }

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
      <div className="bg-opacity-50 backdrop-blur-2xl p-6 m-auto rounded shadow-md w-full max-w-md ">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Sign Up
        </h1>
        {!verificationSent ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-2 focus:border-green-600"
              value={formData.emailOrPhone}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2 "
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded outline-none focus:border-green-600 focus:border-2"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {error && (
              <p className="text-red-500 text-xs italic mb-4">{error}</p>
            )}
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
                onClick={() => navigate("/signUp")}
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
            <button
              onClick={checkVerification}
              className="w-full bg-tertiary text-white py-2 rounded-lg hover:bg-quaternary transition-colors"
            >
              I've verified my email
            </button>
            {error && (
              <p className="text-red-500 text-xs italic mt-2">{error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
