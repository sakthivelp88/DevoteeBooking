export const openRazorpay = ({
    order,
    user,
    onSuccess,
}) => {
    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Temple Booking",

        description: "Darshan Ticket",

        handler: onSuccess,

        prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.phone || "",
        },

        theme: {
            color: "#ea580c",
        },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
};