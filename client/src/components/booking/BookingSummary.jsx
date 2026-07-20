function BookingSummary({ ticket, quantity }) {
    return (
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
                Booking Summary
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Temple:
                    </span>{" "}
                    {ticket.temple?.name}
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Darshan Type:
                    </span>{" "}
                    {ticket.darshanType?.name}
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Date:
                    </span>{" "}
                    {new Date(ticket.date).toLocaleDateString()}
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Slot:
                    </span>{" "}
                    {ticket.slotStart} - {ticket.slotEnd}
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Ticket Price:
                    </span>{" "}
                    ₹{ticket.price}
                </div>

                <div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        Quantity:
                    </span>{" "}
                    {quantity}
                </div>

                <div className="md:col-span-2 rounded-lg border border-orange-200 bg-orange-50 p-4 text-xl font-bold text-orange-600 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-400">
                    Total Amount: ₹{ticket.price * quantity}
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;