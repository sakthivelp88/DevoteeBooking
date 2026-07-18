import { useState } from "react";
import { FiMonitor, FiSun, FiMoon, FiArrowLeft, } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/context/ThemeContext";

export default function AppearanceSettings() {
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/admin/settings")}
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <FiArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Appearance
          </h1>
          <p className="text-gray-500 mt-1">
            Customize the appearance of the admin dashboard.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white shadow p-6 space-y-5">

        <label className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiSun className="text-orange-500" />
            <span>Light Theme</span>
          </div>

          <input
            type="radio"
            checked={theme === "light"}
            onChange={() => changeTheme("light")}
          />
        </label>

        <label className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiMoon className="text-orange-500" />
            <span>Dark Theme</span>
          </div>

          <input
            type="radio"
            checked={theme === "dark"}
            onChange={() => changeTheme("dark")}
          />
        </label>

        <label className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiMonitor className="text-orange-500" />
            <span>System Default</span>
          </div>

          <input
            type="radio"
            checked={theme === "system"}
            onChange={() => changeTheme("system")}
          />
        </label>

      </div>
    </div>
  );
}