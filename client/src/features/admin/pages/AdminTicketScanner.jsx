import { Suspense, lazy, useState } from "react";
import toast from "react-hot-toast";
import { playSuccessSound } from "@/utils/playSuccessSound";

const Scanner = lazy(() => import("@yudiel/react-qr-scanner").then((module) => ({ default: module.Scanner })));

export default function AdminTicketScanner() {
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(false);
	const [scanEnabled, setScanEnabled] = useState(true);

	const handleScan = async (results) => {
		if (!results?.length || loading) return;

		setScanEnabled(false);

		try {
			setLoading(true);

			const qrData = JSON.parse(results[0].rawValue);

			const res = await fetch(
				"http://localhost:5000/api/admin/bookings/verify",
				{
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(qrData),
				}
			);

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message);
				return;
			}

			setBooking(data.booking);
		} catch (error) {
			console.error(error);
			toast.error("Invalid QR Code");
		} finally {
			setLoading(false);
		}
	};

	const handleCheckIn = async () => {
		const res = await fetch(
			`http://localhost:5000/api/admin/bookings/${booking._id}/check-in`,
			{
				method: "PATCH",
				credentials: "include",
			}
		);

		const data = await res.json();

		if (!res.ok) {
			toast.error("Invalid QR Code");
			return;
		}

		toast.success("Entry recorded successfully.");

		setBooking(data.booking);

		playSuccessSound();

		setTimeout(() => {
			setBooking(null);
			setLoading(false);
			setScanEnabled(true);
		}, 3000);
	};

	return (
		<div className="max-w-6xl mx-auto p-8">
			<h1 className="text-3xl font-bold text-orange-600 mb-8">
				Ticket Scanner
			</h1>

			<div className="grid md:grid-cols-2 gap-8">
				<div className="border rounded-xl overflow-hidden">
					<Suspense fallback={<div className="p-6 text-center text-sm text-slate-500">Loading scanner...</div>}>
						<Scanner
							paused={!scanEnabled}
							onScan={handleScan}
							constraints={{
								facingMode: "environment",
							}}
						/>
					</Suspense>
				</div>

				<div className="bg-white rounded-xl shadow p-6">
					{booking ? (
						<>
							<h2 className="text-xl font-bold">
								Ticket Verified
							</h2>
							<div className="space-y-3">

								<p>
									<strong>Booking No:</strong>
									<br />
									{booking.bookingNumber}
								</p>

								<p>
									<strong>Temple:</strong>
									<br />
									{booking.temple.name}
								</p>

								<p>
									<strong>Darshan:</strong>
									<br />
									{booking.darshanType.name}
								</p>

								<p>
									<strong>Date:</strong>
									<br />
									{new Date(
										booking.ticket.date
									).toLocaleDateString()}
								</p>

								<p>
									<strong>Slot:</strong>
									<br />
									{booking.ticket.slotStart} -
									{booking.ticket.slotEnd}
								</p>

								<div>
									<strong>Devotees</strong>

									<div className="mt-2 space-y-2">
										{booking.devotees.map((devotee, index) => (
											<div
												key={index}
												className="rounded-lg border p-3"
											>
												<p>
													<strong>Name:</strong> {devotee.name}
												</p>

												<p>
													<strong>Age:</strong> {devotee.age}
												</p>

												<p>
													<strong>Gender:</strong> {devotee.gender}
												</p>
											</div>
										))}
									</div>
								</div>
								<div className="mt-5">
									<strong>Contact Information</strong>

									<div className="mt-2 rounded-lg border p-3 space-y-2">
										<p>
											<strong>Mobile:</strong> {booking.contact.mobile}
										</p>

										<p>
											<strong>Email:</strong> {booking.contact.email}
										</p>

										<p>
											<strong>Address:</strong> {booking.contact.address}
										</p>
									</div>
								</div>

								<p>
									<strong>Payment:</strong>
									<br />
									<span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
										{booking.paymentStatus}
									</span>
								</p>

								<p>
									<strong>Status:</strong>
									<br />
									<span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
										{booking.bookingStatus}
									</span>
								</p>

							</div>
						</>
					) : (
						<p className="text-gray-500">
							Scan a ticket QR code...
						</p>
					)}
				</div>
			</div>
			{booking && (
				<div className="mt-8">
					{booking.isVisited ? (
						<div className="rounded-xl border border-green-300 bg-green-50 p-5">

							<h3 className="text-xl font-bold text-green-700">
								✓ Entry Recorded
							</h3>

							<p className="mt-2">
								Checked In At
							</p>

							<p className="font-semibold">
								{new Date(booking.visitedAt).toLocaleString()}
							</p>

						</div>
					) : (
						<button
							onClick={handleCheckIn}
							className="w-full rounded-xl bg-green-600 py-3 text-white hover:bg-green-700"
						>
							Check In
						</button>
					)}
				</div>
			)}
		</div>
	);
}
