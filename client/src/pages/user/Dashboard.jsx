import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/dashboard/user",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setDashboard(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        User Dashboard
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold">
          Welcome,
          {" "}
          {dashboard?.user?.name}
        </h2>

        <p className="text-gray-600 mt-2">
          Manage your bookings and
          view your ticket history.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">
            Total Bookings
          </h3>

          <p className="text-3xl font-bold mt-2">
            {dashboard?.totalBookings || 0}
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold">
            Total Amount Spent
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹
            {dashboard?.totalSpent || 0}
          </p>
        </div>

      </div>
    </div>
  );
}