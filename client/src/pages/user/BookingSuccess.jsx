import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getBookingById } from "@services/user/bookingService";

function BookingSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooking();
    }, []);

    const fetchBooking = async () => {
        try {
            const data = await getBookingById(id);
            setBooking(data.booking);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load booking."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading booking...
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center py-20">
                Booking not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-slate-50 px-4 py-10 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
            <div className="mx-auto max-w-4xl rounded-[24px] border border-slate-200 bg-white/90 p-8 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
                <div className="text-center">
                    <div className="mb-4 text-6xl">✅</div>

                    <h1 className="text-3xl font-bold text-green-600">
                        Booking Confirmed
                    </h1>

                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        Your temple ticket has been booked successfully.
                    </p>
                </div>

                <hr className="my-8 border-slate-200 dark:border-slate-700" />

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                            Booking Details
                        </h3>

                        <p className="text-slate-700 dark:text-slate-200"><strong>Booking ID:</strong><br />{booking._id}</p>

                        <p className="mt-3 text-slate-700 dark:text-slate-200">
                            <strong>Quantity:</strong> {booking.quantity}
                        </p>

                        <p className="mt-3 text-slate-700 dark:text-slate-200">
                            <strong>Total Amount:</strong> ₹{booking.totalAmount}
                        </p>

                        <p className="mt-3 text-slate-700 dark:text-slate-200">
                            <strong>Status:</strong>{" "}
                            <span className="font-semibold text-green-600">
                                {booking.bookingStatus}
                            </span>
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">
                            Contact
                        </h3>

                        <p className="text-slate-700 dark:text-slate-200">{booking.contact?.mobile}</p>
                        <p className="text-slate-700 dark:text-slate-200">{booking.contact?.email}</p>
                        <p className="text-slate-700 dark:text-slate-200">{booking.contact?.address}</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                        Entry QR Code
                    </h3>

                    {booking.qrCode ? (
                        <img
                            src={booking.qrCode}
                            alt="Booking QR"
                            className="mx-auto h-56 w-56 rounded-lg border border-slate-200 shadow dark:border-slate-700"
                        />
                    ) : (
                        <p className="text-slate-500 dark:text-slate-400">
                            QR Code not available.
                        </p>
                    )}

                    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                        Please present this QR code at the temple entrance for verification.
                    </p>
                </div>

                <hr className="my-8 border-slate-200 dark:border-slate-700" />

                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                    Devotees
                </h3>

                <div className="space-y-3">
                    {booking.devotees?.map((devotee, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-slate-200 p-4 dark:border-slate-700"
                        >
                            <p><strong>Name:</strong> {devotee.name}</p>
                            <p><strong>Age:</strong> {devotee.age}</p>
                            <p><strong>Gender:</strong> {devotee.gender}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <button
                        onClick={() => navigate("/my-bookings")}
                        className="rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
                    >
                        My Bookings
                    </button>

                    <button
                        onClick={() =>
                            window.open(
                                `http://localhost:5000/api/bookings/${booking._id}/pdf`,
                                "_blank"
                            )
                        }
                        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Download PDF
                    </button>

                    <button
                        className="cursor-not-allowed rounded-lg bg-green-600 px-6 py-3 font-semibold text-white opacity-50"
                        disabled
                    >
                        Email Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BookingSuccess;