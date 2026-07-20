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
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100 px-4 py-10 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
            <div className="w-full max-w-lg rounded-[24px] border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
                <div className="mb-6 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Register to book your temple visits effortlessly
                    </p>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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

                    <input
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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

                    <input
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
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

                    <input
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                confirmPassword: e.target.value,
                            })
                        }
                    />

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                        {submitting ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Already have an account? {" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="font-semibold text-orange-600 transition hover:underline dark:text-orange-400"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}