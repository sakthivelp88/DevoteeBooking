import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getBookingById } from "../../services/bookingService";

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
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="bg-white shadow-lg rounded-xl p-8">

                <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>

                    <h1 className="text-3xl font-bold text-green-600">
                        Booking Confirmed
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Your temple ticket has been booked successfully.
                    </p>
                </div>

                <hr className="my-8" />

                <div className="grid md:grid-cols-2 gap-6">

                    <div>
                        <h3 className="font-semibold mb-3">
                            Booking Details
                        </h3>

                        <p><strong>Booking ID:</strong><br />{booking._id}</p>

                        <p className="mt-3">
                            <strong>Quantity:</strong> {booking.quantity}
                        </p>

                        <p className="mt-3">
                            <strong>Total Amount:</strong> ₹{booking.totalAmount}
                        </p>

                        <p className="mt-3">
                            <strong>Status:</strong>{" "}
                            <span className="text-green-600 font-semibold">
                                {booking.bookingStatus}
                            </span>
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-3">
                            Contact
                        </h3>

                        <p>{booking.contact?.mobile}</p>
                        <p>{booking.contact?.email}</p>
                        <p>{booking.contact?.address}</p>
                    </div>

                </div>

                <hr className="my-8" />

                <h3 className="font-semibold mb-4">
                    Devotees
                </h3>

                <div className="space-y-3">
                    {booking.devotees?.map((devotee, index) => (
                        <div
                            key={index}
                            className="border rounded-lg p-4"
                        >
                            <p><strong>Name:</strong> {devotee.name}</p>
                            <p><strong>Age:</strong> {devotee.age}</p>
                            <p><strong>Gender:</strong> {devotee.gender}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-4 mt-10">
                    <button
                        onClick={() => navigate("/my-bookings")}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg"
                    >
                        My Bookings
                    </button>

                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                        disabled
                    >
                        Download Ticket
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BookingSuccess;