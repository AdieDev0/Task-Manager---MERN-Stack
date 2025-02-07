import { useState } from "react";
import { registerUser } from "../api/apiBackend";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success("Registration Successful! 🎉");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border rounded-md my-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-md my-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-md my-2 focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-all"
          >
            Register
          </motion.button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Register;
