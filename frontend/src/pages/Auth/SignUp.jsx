import React, { useState } from "react";
import PasswordInput from "../../components/input/PasswordInput";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen bg-cyan-50 overflow-hidden relative">
      {/* Background UI Boxes */}
      <div className="login-ui-box bg-cyan-200 -bottom-20 right-1/2" />

      {/* Container */}
      <div className="container h-screen flex items-center justify-center px-4 mx-auto">
        {/* Image Section */}
        <div className="hidden md:flex w-1/3 lg:w-5/12 h-[90vh] bg-signup-bg-img bg-cover bg-center rounded-l-lg p-10 relative">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-transparent" />
          <div className="p-6">
            <h4 className="text-4xl text-white font-semibold leading-snug">
              Join the <br /> Adventure
            </h4>
            <p className="text-sm text-white leading-6 mt-4">
              Create an account to start documenting your travels and preserving
              your memories in your personal travel journal.
            </p>
          </div>
        </div>

        {/* Sign Up Form Section */}
        <div className="w-full md:w-1/2 lg:w-5/12 h-[75vh] bg-white rounded-lg shadow-lg relative p-8 md:p-12">
          <form onSubmit={handleSignUp} className="space-y-6">
            <h4 className="text-2xl font-semibold mb-4 text-center">Sign Up</h4>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="w-full border rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button
              type="submit"
              className="btn-primary"
            >
              CREATE ACCOUNT
            </button>

            <button
              type="button"
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-full hover:bg-gray-300 transition"
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
