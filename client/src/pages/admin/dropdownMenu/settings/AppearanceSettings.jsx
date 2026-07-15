import { useState } from "react";
import { FiMonitor, FiSun, FiMoon } from "react-icons/fi";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Appearance
        </h1>
        <p className="text-gray-500 mt-1">
          Customize the appearance of the admin dashboard.
        </p>
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
            onChange={() => setTheme("light")}
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
            onChange={() => setTheme("dark")}
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
            onChange={() => setTheme("system")}
          />
        </label>

      </div>
    </div>
  );
}