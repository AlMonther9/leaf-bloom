const ErrorHandler = ({ error }) => {
  let errorMessage = "";

  switch (error?.code) {
    case "auth/wrong-password":
      errorMessage = "Incorrect password. Please try again.";
      break;
    case "auth/user-not-found":
      errorMessage = "No user found with this email. Please sign up.";
      break;
    case "auth/user-disabled":
      errorMessage =
        "This user account has been disabled. Please contact support.";
      break;
    case "auth/email-already-in-use":
      errorMessage =
        "An account with this email already exists. Please sign in.";
      break;
    case "auth/invalid-email":
      errorMessage = "Invalid email format. Please enter a valid email.";
      break;
    case "auth/user-not-verified":
      errorMessage = "Please verify your email before signing in.";
      break;
    case "auth/invalid-login-credentials":
      errorMessage = "This email does not exist, please sign up first.";
      break;
    default:
      errorMessage = error ? "An error occurred: " + error.message : "";
  }

  return errorMessage ? <p className="text-red-600">{errorMessage}</p> : null;
};

export default ErrorHandler;
