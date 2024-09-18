import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Boxes } from "./UI/backgroundBox";
import { cn } from "../lib/utils";

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
      }, 4000);
    }
  };

  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden bg">
      <div className="absolute inset-0 w-full h-full bg-quinary z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />

      <form
        ref={form}
        onSubmit={handleFormSubmission}
        className="relative z-20 max-w-md px-12 py-6 transition-transform duration-300 transform rounded-lg shadow-md bg-opacity-80 backdrop-blur-lg"
      >
        <h2 className="mb-6 text-3xl font-extrabold text-center text-green-800">
          Grow With Us
        </h2>

        <div className="space-y-4">
          <label className="block">
            <span className="font-semibold text-green-700">Your Name</span>
            <div className="relative mt-1 rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-green-500"
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
                className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-300 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Jane Doe"
              />
              {formErrors.user_name && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.user_name}
                </p>
              )}
            </div>
          </label>

          <label className="block">
            <span className="font-semibold text-green-700">Your Email</span>
            <div className="relative mt-1 rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-green-500"
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
                className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-300 bg-white border border-green-300 rounded-lg focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="jane@example.com"
              />
              {formErrors.user_email && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.user_email}
                </p>
              )}
            </div>
          </label>

          <label className="block">
            <span className="font-semibold text-green-700">Your Message</span>
            <div className="relative mt-1 rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-green-500"
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
                className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-300 bg-white border border-green-300 rounded-lg resize-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Let your thoughts bloom..."
              ></textarea>
              {formErrors.message && (
                <p className="mt-1 text-sm text-red-600">
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
            className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition duration-150 ease-in-out transform bg-green-600 border border-transparent rounded-lg shadow-sm hover:bg-green-700 focus:outline-none focus:ring-offset-2 focus:ring-green-500 hover:scale-105"
          >
            {isSubmitting ? (
              <svg
                className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
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
          <p className="px-4 py-2 mt-4 text-sm text-center text-white bg-green-500 rounded-lg">
            {stateMessage}
          </p>
        )}
      </form>
    </main>
  );
};

export default Contact;
