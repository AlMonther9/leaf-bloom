import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useState } from "react";
const ResendVerificationEmail = async () => {
  const [verificationSent, setVerificationSent] = useState(false);
  const [error, setError] = useState(null);
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      setVerificationSent(true);
      setError({
        code: "auth/verification-email-sent",
        message:
          "A new verification email has been sent. Please check your inbox.",
      });
    } else {
      setError({
        code: "auth/no-user-signed-in",
        message: "No user is currently signed in. Please try signing in again.",
      });
    }
  } catch (error) {
    setError(error);
  }
};
export default ResendVerificationEmail;
