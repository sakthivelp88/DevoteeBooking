import { Outlet } from "react-router-dom";
import Navbar from "../components/users/Navbar";

export default function UserLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}