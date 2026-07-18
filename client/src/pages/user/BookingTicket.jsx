import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBookingById } from "@services/user/bookingService";

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
        <div className="max-w-5xl mx-auto p-6">

            <div className="bg-white rounded-xl shadow p-6">

                <h1 className="text-2xl font-bold mb-6">
                    Temple Darshan Ticket
                </h1>

                <p>
                    <strong>Temple:</strong>{" "}
                    {booking.temple.name}
                </p>

                <p>
                    <strong>Darshan:</strong>{" "}
                    {booking.darshanType.name}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                        booking.ticket.date
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>Time:</strong>{" "}
                    {booking.ticket.slotStart} - {booking.ticket.slotEnd}
                </p>

                <p>
                    <strong>Booking No:</strong>{" "}
                    {booking.bookingNumber}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {booking.bookingStatus}
                </p>

                <p>
                    <strong>Payment:</strong>{" "}
                    {booking.paymentStatus}
                </p>

            </div>

        </div>
    );
}