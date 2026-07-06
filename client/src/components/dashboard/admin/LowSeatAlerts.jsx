export default function LowSeatAlerts({ tickets }) {
  return (
    <div className="rounded-xl bg-white shadow">
      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Low Seat Alerts
        </h2>
      </div>

      <div className="divide-y">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="flex items-center justify-between p-5"
            >
              <div>
                <h3 className="font-semibold text-gray-800">
                  {ticket.temple?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {ticket.darshanType?.name}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(ticket.date).toLocaleDateString()}
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                {ticket.availableSeats} Seats Left
              </span>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No low seat alerts.
          </div>
        )}
      </div>
    </div>
  );
}