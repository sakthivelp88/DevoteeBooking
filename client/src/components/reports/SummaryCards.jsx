import {
  BanknotesIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const SummaryCard = ({ title, value, Icon, iconClass }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {value}
        </h3>
      </div>

      <div className={`rounded-full p-3 ${iconClass}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  </div>
);

const SummaryCards = ({ summary = {} }) => {
  const {
    totalRevenue = 0,
    totalBookings = 0,
    successfulPayments = 0,
    pendingPayments = 0,
  } = summary;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      Icon: BanknotesIcon,
      iconClass: "bg-green-100 text-green-600",
    },
    {
      title: "Total Bookings",
      value: totalBookings.toLocaleString(),
      Icon: CalendarDaysIcon,
      iconClass: "bg-blue-100 text-blue-600",
    },
    {
      title: "Successful Payments",
      value: successfulPayments.toLocaleString(),
      Icon: CheckCircleIcon,
      iconClass: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Pending Payments",
      value: pendingPayments.toLocaleString(),
      Icon: ClockIcon,
      iconClass: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.value}
          Icon={card.Icon}
          iconClass={card.iconClass}
        />
      ))}
    </section>
  );
};

export default SummaryCards;