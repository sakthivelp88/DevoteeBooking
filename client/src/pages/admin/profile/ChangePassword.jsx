import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { changePassword } from "../../../services/profileService";


const ChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordFields = [
    {
      label: "Current Password",
      name: "currentPassword",
      key: "current",
      placeholder: "Enter current password",
    },
    {
      label: "New Password",
      name: "newPassword",
      key: "new",
      placeholder: "Enter new password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      key: "confirm",
      placeholder: "Confirm new password",
    },
  ];

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.currentPassword.trim()) {
      return toast.error("Current password is required.");
    }

    if (!formData.newPassword.trim()) {
      return toast.error("New password is required.");
    }

    if (!passwordRegex.test(formData.newPassword)) {
      return toast.error(
        "Password must contain uppercase, lowercase, number and special character."
      );
    }

    if (formData.currentPassword === formData.newPassword) {
      return toast.error(
        "New password must be different from the current password."
      );
    }

    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await changePassword(formData);

      toast.success(res.message);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPassword({
        current: false,
        new: false,
        confirm: false,
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Change Password
      </h2>

      <p className="text-gray-500 mt-2 mb-6">
        Update your account password securely.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {passwordFields.map((field) => (
          <div key={field.name}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              {field.label}
            </label>

            <div className="relative">
              <input
                type={showPassword[field.key] ? "text" : "password"}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => togglePassword(field.key)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
              >
                {showPassword[field.key] ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {field.name === "newPassword" && (
              <p className="mt-2 text-xs text-gray-500">
                Password must be at least 8 characters and include an uppercase letter,
                lowercase letter, number, and special character.
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={
            loading ||
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
          }
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;