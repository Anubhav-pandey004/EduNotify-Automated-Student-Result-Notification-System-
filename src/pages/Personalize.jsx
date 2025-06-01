import React, { useState } from "react";
import { toast } from "react-toastify"; // Assuming you're using toast for notifications
import SummaryApi from "../common";

const Personalize = () => {
  const [email, setRecipientEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    // Log the form data
    console.log("Form Submitted:", { email, subject, message });

    try {
      const response = await fetch(SummaryApi.sendEmail.url, {
        method: SummaryApi.sendEmail.method, // Assuming this is POST or your preferred HTTP method
        credentials: "include", // To include credentials like cookies if necessary
        body: JSON.stringify({ email, subject, message }), // Send data (email, subject, and message)
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      const data = await response.json(); // Parse the JSON response from the backend
      console.log(data);

      if (data.success) {
        toast.success(data.message); // Show success toast notification

        // Reset the form fields after successful email sending
        setRecipientEmail(""); // Clear the email input
        setSubject(""); // Clear the subject input
        setMessage(""); // Clear the message input
      } else {
        toast.error(data.message); // Show error toast notification
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to send the message. Please try again."); // Show failure toast notification
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Send Personalized Letter to Parents
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipient's Email */}
        <div className="space-y-2">
          <label
            htmlFor="recipientEmail"
            className="text-xl font-medium text-gray-900"
          >
            Recipient's Email
          </label>
          <input
            id="recipientEmail"
            type="email"
            value={email}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700"
            placeholder="Enter recipient's email"
            required
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label
            htmlFor="subject"
            className="text-xl font-medium text-gray-900"
          >
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700"
            placeholder="Enter the subject"
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-xl font-medium text-gray-900"
          >
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg text-gray-700"
            placeholder="Write your message here"
            rows="5"
            required
          />
        </div>

        {/* Submit Button with Loading Animation */}
        <div className="text-right">
          <button
            type="submit"
            className={`w-full sm:w-auto md:w-[15vw] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Sending...
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Personalize;
