import { useState } from "react";

import axiosInstance from "~/utils/axiosInstance";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLogin) {
      const { email, password } = data;
      axiosInstance
        .post("/auth/login", { email, password })
        .then((res) => {
          console.log(res);
          setData({ ...data, email: "", password: "" });
          toast.success(
            res.data.message || "Logged in successfully! Welcome back.",
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            err.response.data.message ||
              "Login failed! Please check your credentials.",
          );
        });
    } else {
      axiosInstance
        .post(`/auth/register`, data)
        .then((res) => {
          console.log(res);
          setData({ ...data, name: "", email: "", password: "" });
          toast.success(
            res.data.message || "Registered successfully! Please login.",
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            err.response.data.message ||
              "Registration failed! Please try again.",
          );
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          {isLogin
            ? "Login to continue building your DevLink"
            : "Join DevLink and start connecting"}
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={data?.name}
              onChange={handleChange}
            />
          )}

          <Input
            label="Email Address"
            name="email"
            value={data?.email}
            type="email"
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            value={data?.password}
            type="password"
            onChange={handleChange}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Social Login */}
        <button className="w-full flex items-center justify-center gap-2 py-3 border border-gray-600 rounded-lg text-white hover:bg-white/10 transition">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="github"
            className="w-5"
          />
          Continue with GitHub
        </button>

        {/* Toggle */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 cursor-pointer ml-2 hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({
  label,
  type,
  name,
  value,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 pt-5 pb-2 bg-transparent border border-gray-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 peer"
        placeholder=" "
      />
      <label
        className="absolute left-4 top-2 text-gray-400 text-sm transition-all 
        peer-placeholder-shown:top-3.5 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-500 
        peer-focus:top-2 
        peer-focus:text-sm 
        peer-focus:text-indigo-400"
      >
        {label}
      </label>
    </div>
  );
}
