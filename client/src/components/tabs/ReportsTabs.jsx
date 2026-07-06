import React from "react";

const tabs = [
  {
    id: "analytics",
    label: "Analytics",
  },
  {
    id: "revenue",
    label: "Revenue",
  },
  {
    id: "bookings",
    label: "Bookings",
  },
  {
    id: "payments",
    label: "Payments",
  },
];

const ReportsTabs = ({ activeTab, onChange }) => {
  return (
    <div className="mb-6 border-b">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`border-b-2 pb-3 text-sm font-semibold transition-all ${activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-indigo-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReportsTabs;