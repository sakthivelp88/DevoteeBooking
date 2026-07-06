import { useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { getDashboardStats } from "../../services/adminDashboardService";

import DashboardCards from "../../components/dashboard/admin/DashboardCards";
import RevenueChart from "../../components/dashboard/admin/RevenueChart";
import BookingStatusChart from "../../components/dashboard/admin/BookingStatusChart";
import RecentBookingsTable from "../../components/dashboard/admin/RecentBookingsTable";
import RecentPaymentsTable from "../../components/dashboard/admin/RecentPaymentsTable";
import TempleBookingChart from "../../components/dashboard/admin/TempleBookingChart";
import DarshanPopularityChart from "../../components/dashboard/admin/DarshanPopularityChart";
import TodayStats from "../../components/dashboard/admin/TodayStats";
import PaymentStatusChart from "../../components/dashboard/admin/PaymentStatusChart";
import LowSeatAlerts from "../../components/dashboard/admin/LowSeatAlerts";
import UpcomingTickets from "../../components/dashboard/admin/UpcomingTickets";
import TopRevenueTemples from "../../components/dashboard/admin/TopRevenueTemples";
import RecentUsers from "../../components/dashboard/admin/RecentUsers";
import RecentActivity from "../../components/dashboard/admin/RecentActivity";
import QuickActions from "../../components/dashboard/admin/QuickActions";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await getDashboardStats();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!dashboard) {
    return (
      <div className="space-y-8 animate-pulse">

        <div className="h-24 rounded-2xl bg-gray-200" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-xl bg-gray-200"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 rounded-xl bg-gray-200" />
          <div className="h-80 rounded-xl bg-gray-200" />
        </div>

        <div className="h-96 rounded-xl bg-gray-200" />

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 rounded-2xl bg-white p-6 shadow md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Here's an overview of your temple booking system.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mt-1 text-sm font-medium text-orange-600">
            Live Dashboard
          </p>
          <button
            onClick={loadDashboard}
            disabled={loading}
            title="Refresh Dashboard"
            className="rounded-lg bg-white p-3 mt-1 text-orange-500 shadow transition hover:bg-orange-50 outline-2 hover:text-orange-600 disabled:cursor-not-allowed"
          >
            <FiRefreshCw
              size={20}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>

      </div>

      {/* Statistics */}

      <DashboardCards
        cards={dashboard.cards}
      />

      {/* Today's Statistics */}

      <TodayStats
        data={dashboard.todayStats}
      />

      <QuickActions />
      
      {/* Charts */}

      <div className="grid gap-6 lg:grid-cols-2">

        <RevenueChart
          data={dashboard.revenueChart}
        />

        <BookingStatusChart
          data={dashboard.bookingStatusChart}
        />

      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PaymentStatusChart
          data={dashboard.paymentStatusChart}
        />

        <LowSeatAlerts
          tickets={dashboard.lowSeatTickets}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <UpcomingTickets
          tickets={dashboard.upcomingTickets}
        />

        <TopRevenueTemples
          temples={dashboard.topRevenueTemples}
        />

        <RecentUsers
          users={dashboard.recentUsers}
        />

      </div>

      <div className="grid gap-6">

        <RecentActivity
          activities={dashboard.recentActivity}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <TempleBookingChart
          data={dashboard.templeBookings}
        />

        <DarshanPopularityChart
          data={dashboard.darshanPopularity}
        />
      </div>

      {/* Tables */}

      <RecentBookingsTable
        bookings={dashboard.recentBookings}
      />

      <RecentPaymentsTable
        payments={dashboard.recentPayments}
      />

    </div>
  );
}