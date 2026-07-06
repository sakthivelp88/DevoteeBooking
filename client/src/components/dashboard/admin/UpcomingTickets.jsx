export default function UpcomingTickets({
  tickets,
}) {
  return (
    <div className="rounded-xl bg-white shadow">

      <div className="border-b p-5">
        <h2 className="text-xl font-semibold">
          Upcoming Ticket Slots
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

                <h3 className="font-semibold">
                  {ticket.temple?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {ticket.darshanType?.name}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(ticket.date).toLocaleDateString()}
                </p>

              </div>

              <div className="text-right">

                <p className="font-medium">
                  {ticket.slotStart}
                </p>

                <p className="text-sm text-gray-500">
                  {ticket.slotEnd}
                </p>

              </div>

            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">
            No upcoming ticket slots.
          </div>
        )}

      </div>

    </div>
  );
}