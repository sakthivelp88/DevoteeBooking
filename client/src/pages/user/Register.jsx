import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.password ||
            !form.confirmPassword
        ) {
            alert("Please fill all fields");
            return;
        }

        if (!emailRegex.test(form.email)) {
            alert("Invalid email address");
            return;
        }

        if (!passwordRegex.test(form.password)) {
            alert(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
            );
            return;
        }

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await register({
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
            });

            alert(result.message || "Registration successful");

            navigate("/login");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Register
                </h2>

                <form onSubmit={submitHandler} className="space-y-4">
                    <input className="w-full border border-gray-300 rounded-lg p-3"
                        autoFocus
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                name: e.target.value,
                            })
                        }
                    />

                    <input className="w-full border border-gray-300 rounded-lg p-3"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value,
                            })
                        }
                    />

                    <input className="w-full border border-gray-300 rounded-lg p-3"
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value,
                            })
                        }
                    />

                    <input className="w-full border border-gray-300 rounded-lg p-3"
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

                    <input className="w-full border border-gray-300 rounded-lg p-3"
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword:
                                    e.target.value,
                            })
                        }
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}