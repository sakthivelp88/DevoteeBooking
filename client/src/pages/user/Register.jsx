import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "@services/auth/authService";

export default function Register() {
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: "",
        address: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex = /^[6-9]\d{9}$/;

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

        if (
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.gender ||
            !form.dob ||
            !form.address ||
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

        if (!phoneRegex.test(form.phone)) {
            alert("Enter a valid 10-digit mobile number");
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

        setSubmitting(true);

        try {
            const result = await register({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                gender: form.gender,
                dob: form.dob,
                address: form.address.trim(),
                password: form.password.trim(),
            });

            alert(result.message || "Registration successful");

            navigate("/login");
        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setSubmitting(false);
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

                    <input
                        className="w-full border border-gray-300 rounded-lg p-3"
                        type="tel"
                        placeholder="Phone Number"
                        maxLength={10}
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value.replace(/\D/g, ""),
                            })
                        }
                    />
                    <select
                        className="w-full border border-gray-300 rounded-lg p-3"
                        value={form.gender}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                gender: e.target.value,
                            })
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <input
                        className="w-full border border-gray-300 rounded-lg p-3"
                        type="date"
                        value={form.dob}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                dob: e.target.value,
                            })
                        }
                    />
                    <textarea
                        className="w-full border border-gray-300 rounded-lg p-3"
                        rows="3"
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: e.target.value,
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
                        disabled={submitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
                    >
                        {submitting ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="text-center mt-6 text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-600 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}