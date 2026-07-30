import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBookingById } from "@/features/booking/services/bookingService";

export default function BookingTicket() {

	const { id } = useParams();

	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchBooking();
	}, [id]);

	const fetchBooking = async () => {
		try {
			const data = await getBookingById(id);

			setBooking(data.booking);

		} catch (err) {
			console.error(err);

		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="p-6">
				Loading ticket...
			</div>
		);
	}

	if (!booking) {
		return (
			<div className="p-6">
				Ticket not found.
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-5xl px-4 py-8 text-slate-900 dark:text-slate-100">
			<div className="rounded-[24px] border border-orange-200 bg-orange-600 px-6 py-5 text-white shadow-lg dark:border-orange-900 dark:bg-slate-900">
				<h1 className="text-2xl font-bold">
					Temple Darshan Ticket
				</h1>
				<p className="mt-2 text-orange-50">
					Review your booking details and current status.
				</p>
			</div>

			<div className="mt-6 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Temple:</strong>{" "}
						{booking.temple.name}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Darshan:</strong>{" "}
						{booking.darshanType.name}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Date:</strong>{" "}
						{new Date(
							booking.ticket.date
						).toLocaleDateString()}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Time:</strong>{" "}
						{booking.ticket.slotStart} - {booking.ticket.slotEnd}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Booking No:</strong>{" "}
						{booking.bookingNumber}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60">
						<strong>Status:</strong>{" "}
						{booking.bookingStatus}
					</div>

					<div className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-700/60 md:col-span-2">
						<strong>Payment:</strong>{" "}
						{booking.paymentStatus}
					</div>
				</div>
			</div>
		</div>
	);
}
