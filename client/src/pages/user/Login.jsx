import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, login } = useAuth(); 

  const [form, setForm] = useState({
    emailOrPhone: "",
    password: "",
  });

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.emailOrPhone || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await login(
        form.emailOrPhone,
        form.password
      );   

      if (response.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Invalid email/phone or password"
      );
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg p-3"
            autoFocus
            type="text"
            placeholder="Email or Phone"
            value={form.emailOrPhone}
            onChange={(e) =>
              setForm({
                ...form,
                emailOrPhone: e.target.value,
              })
            }
          />

          <input
            className="w-full border border-gray-300 rounded-lg p-3"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}