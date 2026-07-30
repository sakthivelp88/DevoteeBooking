import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import api from "@services/api/api";
import { cancelBooking } from "@/features/booking/services/bookingService";


export default function MyBookings() {
	const [bookings, setBookings] = useState([]);
	const navigate = useNavigate();

	const [showCancelModal, setShowCancelModal] = useState(false);
	const [selectedBookingId, setSelectedBookingId] = useState(null);
	const [reason, setReason] = useState("");
	const [otherReason, setOtherReason] = useState("");

	const cancellationReasons = [
		"Change of plans",
		"Health issues",
		"Travel issues",
		"Booked by mistake",
		"Personal reasons",
		"Other",
	];

	useEffect(() => {
		loadBookings();
	}, []);

	const loadBookings = async () => {
		const res = await api.get("/bookings/my");
		setBookings(res.data.bookings || []);
	};

	const handleCancel = async () => {
		const finalReason =
			reason === "Other" ? otherReason.trim() : reason;

		if (!finalReason) {
			toast.error("Please provide a cancellation reason.");
			return;
		}

		try {
			await cancelBooking(selectedBookingId, finalReason);

			toast.success("Ticket cancelled successfully.");

			setBookings((prev) =>
				prev.map((booking) =>
					booking._id === selectedBookingId
						? {
							...booking,
							bookingStatus: "Cancelled",
							cancellationReason: finalReason,
						}
						: booking
				)
			);

			setShowCancelModal(false);
			setReason("");
			setOtherReason("");
			setSelectedBookingId(null);
		} catch (err) {
			toast.error(
				err.response?.data?.message || "Unable to cancel ticket."
			);
		}
	};


	return (
		<div className="min-h-screen bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
			<h2 className="mb-8 text-center text-3xl font-bold text-orange-600">
				My Bookings
			</h2>

			{bookings.length === 0 ? (
				<p className="text-center text-gray-500 dark:text-slate-400">
					No bookings found.
				</p>
			) : (
				<div className="max-w-5xl mx-auto grid gap-6">
					{bookings.map((booking) => (
						<div
							key={booking._id}
							className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800"
						>
							<div className="grid md:grid-cols-2 gap-6">
								{/* Left */}
								<div>
									<h3 className="text-2xl font-bold text-orange-600">
										{booking.temple?.name}
									</h3>

									<p className="mt-1 text-gray-600 dark:text-slate-400">
										{booking.darshanType?.name}
									</p>

									<div className="mt-5 space-y-2">
										<p>
											<strong>Booking No:</strong>{" "}
											{booking.bookingNumber}
										</p>

										<p>
											<strong>Date:</strong>{" "}
											{new Date(
												booking.ticket?.date
											).toLocaleDateString()}
										</p>

										<p>
											<strong>Slot:</strong>{" "}
											{booking.ticket?.slotStart} -
											{booking.ticket?.slotEnd}
										</p>

										<p>
											<strong>Quantity:</strong>{" "}
											{booking.quantity}
										</p>

										<p>
											<strong>Total:</strong> ₹
											{booking.totalAmount}
										</p>

										<p>
											<strong>Booking:</strong>{" "}
											<span className="text-green-600 font-semibold">
												{booking.bookingStatus}
											</span>
										</p>

										<p>
											<strong>Payment:</strong>{" "}
											<span className="text-green-600 font-semibold">
												{booking.paymentStatus}
											</span>
										</p>
									</div>
								</div>

								{/* Right */}
								<div className="flex flex-col items-center justify-between">
									{booking.qrCode ? (
										<img
											src={booking.qrCode}
											alt="QR Code"
											className="w-40 h-40 border rounded-lg"
										/>
									) : (
										<div className="flex h-40 w-40 items-center justify-center rounded-lg border border-slate-300 text-gray-400 dark:border-slate-600 dark:text-slate-500">
											No QR
										</div>
									)}

									<div className="flex gap-3 mt-6">
										<button
											onClick={() =>
												navigate(`/booking-success/${booking._id}`)
											}
											className="rounded-lg bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
										>
											View Ticket
										</button>
										<button
											disabled={booking.bookingStatus === "Cancelled"}
											onClick={() => {
												setSelectedBookingId(booking._id);
												setReason("");
												setOtherReason("");
												setShowCancelModal(true);
											}}
											className={`rounded-lg px-4 py-2 text-white transition ${booking.bookingStatus === "Cancelled"
												? "cursor-not-allowed bg-gray-400"
												: "bg-orange-600 hover:bg-orange-700"
												}`}
										>
											{booking.bookingStatus === "Cancelled"
												? "Ticket Cancelled"
												: "Cancel Ticket"}
										</button>

										<button
											onClick={() =>
												window.open(
													`http://localhost:5000/api/bookings/${booking._id}/pdf`,
													"_blank"
												)
											}
											className="rounded-lg bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
										>
											PDF
										</button>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			)
			}
			{showCancelModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="w-full max-w-md overflow-scroll-auto rounded-xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-800">

						<h2 className="mb-4 text-xl font-bold text-orange-600">
							Cancel Ticket
						</h2>

						<p className="mb-4 text-gray-600 dark:text-slate-400">
							Please select a reason for cancellation.
						</p>

						<div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pr-2">
							{cancellationReasons.map((item) => (
								<label
									key={item}
									className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${reason === item
											? "border-orange-500 bg-orange-50 dark:border-orange-500 dark:bg-orange-950/40"
											: "border-gray-300 hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-700"
										}`}
								>
									<input
										type="radio"
										name="reason"
										value={item}
										checked={reason === item}
										onChange={(e) => setReason(e.target.value)}
									/>
									<span>{item}</span>
								</label>
							))}
						</div>

						{reason === "Other" && (
							<textarea
								value={otherReason}
								onChange={(e) => setOtherReason(e.target.value)}
								placeholder="Please specify..."
								className="mt-4 w-full border rounded-lg p-2"
								rows={3}
							/>
						)}

						<div className="flex justify-end gap-3 mt-6">
							<button
								onClick={() => {
									setShowCancelModal(false);
									setReason("");
									setOtherReason("");
									setSelectedBookingId(null);
								}}
								className="rounded-lg border border-slate-300 px-4 py-2 transition hover:bg-gray-100 dark:border-slate-600 dark:hover:bg-slate-700"
							>
								Close
							</button>

							<button
								onClick={handleCancel}
								className="rounded-lg bg-orange-600 px-4 py-2 text-white transition hover:bg-orange-700"
							>
								Confirm Cancellation
							</button>
						</div>

					</div>
				</div>
			)}
		</div >
	);
}
