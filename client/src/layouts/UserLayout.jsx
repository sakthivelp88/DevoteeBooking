import { Outlet } from "react-router-dom";
import Navbar from "@components/users/Navbar";
import { UserThemeProvider } from "@/context/userThemeContext";

export default function UserLayout() {
  return (
    <UserThemeProvider>
      <Navbar />

      <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Outlet />
      </main>
    </UserThemeProvider>
  );
}