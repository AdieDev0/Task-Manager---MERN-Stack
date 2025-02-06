import { useState } from "react";
import { loginUser } from "../api/apiBackend";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // ✅ Use Link instead of <a>

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Show loading state

    try {
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert("Invalid login response");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Try again.";
      alert(errorMessage);
    } finally {
      setLoading(false); // ✅ Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-md my-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-md my-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            disabled={loading} // ✅ Disable button while loading
          >
            {loading ? "Logging in..." : "Login"} {/* ✅ Show loading text */}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
