import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.get("user_name")) errors.user_name = "Name is required";
    if (!formData.get("user_email")) {
      errors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.get("user_email"))) {
      errors.user_email = "Email is invalid";
    }
    if (!formData.get("message")) errors.message = "Message cannot be empty";
    return errors;
  };
  const form = useRef();
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      const result = await emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        form.current,
        process.env.REACT_APP_PUBLIC_KEY
      );

      console.log("Email sent successfully:", result.text);
      setStateMessage("Message sent! 🌱");
    } catch (error) {
      console.error("Failed to send email:", error);
      setStateMessage("Something went wrong, please try again later.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        e.target.reset();
      }, 4000); // Delay form reset for 4 seconds
    }
  };

  return (
    <main className="pt-[3rem] pb-[2.5rem]">
      <form
        ref={form}
        onSubmit={handleFormSubmission}
        className="mt-[3rem] max-w-md mx-auto p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg shadow-lg border border-green-200 transform hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-green-800 text-center">
          Grow With Us
        </h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-green-700 font-semibold">Your Name</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                name="user_name"
                className="block w-full pl-10 pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Jane Doe"
              />
              {formErrors.user_name && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.user_name}
                </p>
              )}
            </div>
          </label>

          <label className="block">
            <span className="text-green-700 font-semibold">Your Email</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                name="user_email"
                className="block w-full pl-10 pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="jane@example.com"
              />
              {formErrors.user_email && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.user_email}
                </p>
              )}
            </div>
          </label>

          <label className="block">
            <span className="text-green-700 font-semibold">Your Message</span>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <textarea
                name="message"
                rows="4"
                className="block resize-none w-full pl-10 pr-3 py-2 border border-green-300 rounded-md leading-5 bg-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Let your thoughts bloom..."
              ></textarea>
              {formErrors.message && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.message}
                </p>
              )}
            </div>
          </label>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            {isSubmitting ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <span>Plant Your Message</span>
            )}
          </button>
        </div>

        {stateMessage && (
          <p className="mt-4 text-sm text-center text-green-600 bg-green-100 rounded-md py-2 px-4 animate-pulse">
            {stateMessage}
          </p>
        )}
      </form>
    </main>
  );
};

export default Contact;
