import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import BookingSummary from "@components/booking/BookingSummary";
import ContactInformation from "@components/booking/ContactInformation";
import DevoteeForm from "@components/booking/DevoteeForm";
import PaymentButton from "@components/booking/PaymentButton";

import { createOrder, verifyPayment } from "@services/user/paymentService";
import { openRazorpay } from "@/utils/razorpay";
import { validateBooking } from "@/utils/bookingValidation";

function BookingDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const { ticket, quantity } = state || {};

    const [loading, setLoading] = useState(false);

    const [contact, setContact] = useState({
        mobile: "",
        email: "",
        address: "",
    });

    const [devotees, setDevotees] = useState(
        Array.from({ length: quantity || 0 }, () => ({
            name: "",
            age: "",
            gender: "",
            idProof: "",
        }))
    );

    if (!ticket) {
        return <Navigate to="/" replace />;
    }

    const handlePaymentSuccess = async (paymentResponse) => {
        try {
            const data = await verifyPayment(paymentResponse);

            toast.success(data.message);

            navigate(`/booking-success/${data.booking._id}`);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Payment verification failed."
            );
        }
    };

    const handleContinue = async () => {
        const validationError = validateBooking(contact, devotees);

        if (validationError) {
            toast.error(validationError);
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ticketId: ticket._id,
                quantity,
                contact,
                devotees,
            };

            console.log("BookingDetails payload:", payload);

            const data = await createOrder(payload);

            openRazorpay({
                order: data.order,
                user,
                onSuccess: handlePaymentSuccess,
            });

        } catch (error) {
            console.error("Create Order Error:", error);
            console.error("Response:", error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Unable to create order."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-8 text-slate-900 dark:text-slate-100">
            <div className="mb-6 rounded-[24px] border border-orange-200 bg-orange-600 px-6 py-5 text-white shadow-lg dark:border-orange-900 dark:bg-slate-900">
                <h1 className="text-3xl font-bold">
                    Complete your booking
                </h1>
                <p className="mt-2 text-orange-50">
                    Review your details, add traveler information, and pay securely.
                </p>
            </div>

            <div className="space-y-6">
                <BookingSummary
                    ticket={ticket}
                    quantity={quantity}
                />

                <ContactInformation
                    contact={contact}
                    setContact={setContact}
                />

                <DevoteeForm
                    devotees={devotees}
                    setDevotees={setDevotees}
                />

                <PaymentButton
                    onClick={handleContinue}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default BookingDetails;