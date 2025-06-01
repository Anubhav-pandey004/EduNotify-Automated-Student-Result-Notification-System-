import React, { useState } from "react";
import logo from "../assets/images.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const dataResponse = await fetch(SummaryApi.signup.url, {
      method: SummaryApi.signup.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    
    let response = await dataResponse.json()
    
    if (response.success) {
      toast.success(response.message)
      navigate("/login")
    }
    if (response.error) {
      toast.error(response.message.message) || toast.error(response.message.errorResponse.errmsg)
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter your username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
            >
              <option value="">Select Role</option>
              <option value="HOD">HOD</option>
              <option value="Faculty">Faculty</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", { required: "Please confirm your password" })}
              className="w-full p-2 border rounded focus:ring focus:ring-indigo-300"
              placeholder="Confirm your password"
            />
          </div>

          {/* Show Password Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="text-sm text-gray-700">Show Password</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
