import { useState } from "react";

import ReportsTabs from "../../components/tabs/ReportsTabs";

import AnalyticsDashboard from "../../components/reports/AnalyticsDashboard";
import RevenueTab from "../../components/reports/RevenueTab";
import BookingTab from "../../components/reports/BookingTab";
import PaymentTab from "../../components/reports/PaymentTab";

const AdminReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsDashboard />;

      case "revenue":
        return <RevenueTab />;

      case "bookings":
        return <BookingTab />;

      case "payments":
        return <PaymentTab />;

      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Reports & Analytics
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View revenue, bookings, payments, and analytics reports.
        </p>
      </div>

      {/* Tabs */}
      <ReportsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Active Content */}
      {renderActiveTab()}
    </div>
  );
};

export default AdminReportsAnalytics;