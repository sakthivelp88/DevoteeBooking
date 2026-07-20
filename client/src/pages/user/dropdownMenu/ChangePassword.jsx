import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { changePassword } from "@services/user/userService";

const ChangePassword = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const res = await changePassword(form);

      toast.success(res.data.message);

      navigate("/profile");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Failed to change password"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow dark:border-slate-700 dark:bg-slate-800">

      <h2 className="mb-6 text-2xl font-bold text-slate-800 dark:text-slate-100">
        Change Password
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-800 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:focus:border-orange-500 dark:focus:ring-orange-900"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-orange-600 px-5 py-2 text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading
            ? "Updating..."
            : "Change Password"}
        </button>

      </form>

    </div>
  );
};

export default ChangePassword;